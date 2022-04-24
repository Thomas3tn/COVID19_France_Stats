export class ContinentProxy {
    constructor(store, continentLiveDatasAPI) {
        this.datas = store.state.datas;
        this.continentLiveDatasAPI = continentLiveDatasAPI;
    }
    getDatas(name) {

        const cachedDatas = this.datas.find({name, type: "continent"});

        if (cachedDatas) {
            return cachedDatas;
        }

        const datas = this.continentLiveDatasAPI.requestsManager(name);

    }
}