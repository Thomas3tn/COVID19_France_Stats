import DepartementLiveDatasAPI from "../VuexFunctionalities/DepartementLiveDatasAPI.js";

export default class DepartementProxy {
    constructor(store) {
        this.store = store;
        this.cachedDatas = [];
        this.departementsLiveDatasAPI = new DepartementLiveDatasAPI();
    }
    async get(requestedDepartement = false) {

        this.setCachedDepartements();
        const departement = this.getCachedRequestedDepartement(requestedDepartement);
        
        if (departement !== null) {
            return departement;
        }

        try {
            
            const APIsDatas = await this.departementsLiveDatasAPI.get();
            this.setAPIsRequestsStatus({APIsRequestsStatus: APIsDatas.APIsRequestsStatus});
            return APIsDatas.datas;

        } catch (error) {

            this.setAPIsRequestsStatus({APIsRequestsStatus: error.APIsRequestsStatus});
            return this.store.getters["LocalStorageDatas/find"]([{key: "type", value: "departement"}]);

        }

    }
    setCachedDepartements() {

        try {

            const departementsList = this.store.getters["LocalStorageDatas/find"]([{key: "type", value: "departement"}]);

            if (this.cachedDatas.length === 0 && departementsList !== null) {
                this.cachedDatas = [...departementsList];
            }

        } catch (error) {
            this.cachedDatas = [];
        }

    }
    getCachedRequestedDepartement(requestedDepartement = false) {

        if (this.cachedDatas.length !== 0) {

            if (requestedDepartement === false) {
                return this.cachedDatas;
            } else {
                const selectedCountry = this.cachedDatas.filter(departement => departement.name === requestedDepartement);

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

            requestsStatus.forEach(
                requestStatus => this.store.dispatch("APIsStatus/addNode", {
                    APIType, 
                    datas: requestStatus.datas, 
                    parentKeysValues: requestStatus.parentKeysValues,
                    idKeysValues: requestStatus.idKeysValues
                
                })
            );

        });

    }
}