import WorldLiveDatasAPI from "../VuexFunctionalities/WorldLiveDatasAPI.js";

export default class CountryProxy {
    constructor(store) {
        this.cachedDatas = [];
        this.store = store;
        this.worldLiveDatasAPI = new WorldLiveDatasAPI(this.store);
    }
    async get(country = false) {

        this.setCachedCountries();
        let cachedCountry = this.getCachedRequestedCountry(country);

        if (cachedCountry !== null) {
            return cachedCountry;
        }

        try {

            const APIsDatas = await this.worldLiveDatasAPI.get();
            this.setAPIsRequestsStatus({APIsRequestsStatus: APIsDatas.APIsRequestsStatus});
            return APIsDatas.datas;

        } catch (error) {

            this.setAPIsRequestsStatus({APIsRequestsStatus: error.APIsRequestsStatus});
            return this.store.getters["LocalStorageDatas/find"]([{key: "type", value: "country"}]);

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
    getCachedRequestedCountry(requestedCountry = false) {

        if (this.cachedDatas.length !== 0) {

            if (requestedCountry === false) {
                return this.cachedDatas;
            } else {
                const selectedCountry = this.cachedDatas.filter(country => country.name === requestedCountry);

                if (selectedCountry.length === 0) {
                    return null;
                }

                return selectedCountry;

            }

        }

        return null;

    }
    setAPIsRequestsStatus({APIsRequestsStatus}) {

        Object.entries(APIsRequestsStatus).forEach(([APIType, requestsStatus]) => {

            requestsStatus.forEach(requestStatus => this.store.dispatch("APIsStatus/addNode", {
                APIType, 
                datas: requestStatus.datas, 
                parentKeysValues: requestStatus.parentKeysValues,
                idKeysValues: requestStatus.idKeysValues
            }
            ));

        });

    }
}