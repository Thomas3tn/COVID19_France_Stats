import WorldHistoricalDatasAPI from "../VuexFunctionalities/WorldHistoricalDatasAPI";

export default class CountryHistoricalProxy {
    constructor(store) {
        this.cachedDatas = [];
        this.store = store;
        this.worldHistoricalDatasAPI = new WorldHistoricalDatasAPI(this.store);
    }
    async get({name = false, status = ["confirmed", "deaths", "recovered"], type = "country"}) {

        this.setCachedCountries();

        //Handle countries list
        let cachedCountries = this.getCachedCountry({name, type});

        if (cachedCountries) {

            status = this.getUnregisteredStatus({cachedCountries, status});

            if (status === null) {
                return cachedCountries;
            }
        }

        try {

            const APIsDatas = await this.worldHistoricalDatasAPI.get({name, status});
            this.setAPIsRequestsStatus({APIsRequestsStatus: APIsDatas.APIsRequestsStatus});
            return APIsDatas.datas;

        } catch (error) {

            console.log(error);
            this.setAPIsRequestsStatus({APIsRequestsStatus: error.APIsRequestsStatus});
            let searchCriteria = [{key: "type", value: type}];
            if (name !== false) {
                searchCriteria.push({key: "name", value: name});
            }

            return this.store.getters["LocalStorageDatas/find"](searchCriteria);

        }

    }
    setCachedCountries() {

        try {

            const countriesList = this.store.getters["LocalStorageDatas/find"]([{key: "type", value: "country"}]);

            if (this.cachedDatas.length === 0 && countriesList !== null) {
                this.cachedDatas = [...countriesList];
            }

        } catch (error) {
            this.cachedDatas = [];
        }

    }
    getCachedCountry({name = false, type = false}) {

        if (this.cachedDatas.length !== 0) {

            let selectedCountry;

            if (name !== false && type !== false) {
                selectedCountry = this.cachedDatas.filter(country => country.name === name && country.type === type)
            } else if (name === false && type !== false) {
                selectedCountry = this.cachedDatas.filter(country => country.type === type);
            } else if (name !== false && type === false) {
                selectedCountry = this.cachedDatas.filter(country => country.name === name);
            } else {
                selectedCountry = this.cachedDatas;
            }

            if (selectedCountry.length === 0) {
                return null;
            }

            return selectedCountry;

        }

        return null;

    }
    getUnregisteredStatus({cachedCountries, status}) {

        let unregisteredStatus = [];

        cachedCountries.forEach(country => {
            unregisteredStatus = status.filter(currentStatus => country.registeredHistoricalStatus.includes(currentStatus) === false)
        });

        if (unregisteredStatus.length === 0) {
            return null;
        } else {
            return unregisteredStatus;
        }

    }
    setAPIsRequestsStatus({APIsRequestsStatus}) {

        Object.entries(APIsRequestsStatus).forEach(([APIType, requestsStatus]) => {

            requestsStatus.forEach(requestStatus => {

                this.store.dispatch("APIsStatus/addNode", {
                    APIType, 
                    datas: requestStatus.datas, 
                    parentKeysValues: requestStatus.parentKeysValues, 
                    idKeysValues: requestStatus.idKeysValues
                });

            });

        });

    }
}