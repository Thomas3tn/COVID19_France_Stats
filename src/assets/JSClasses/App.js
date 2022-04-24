import LocalStorageManager from "./LocalStorageManager.js";

import CountryProxy from "./Proxys/Country.js";
import CountryHistoricalProxy from "./Proxys/CountryHistorical.js";
import DepartementProxy from "./Proxys/Departement.js";

import APIsDatasMerger from "./APIsDatasMerger/APIsDatasMerger.js";
import TreeBuilder from "./TreeBuilder.js";

export default class App {
    constructor(store) {

        this.store = store;

    }
    async ignit() {

        //Datas saving when session is closing
        //Add vuex function that copy LS datas to Vuex

        try {

            const { datas, validity } = this.getLocalStorageDatas();

            //Store outdated local storage datas in case of unsuccessfull APIs requests
            if (datas !== null && validity === false) {
                this.store.LocalStorageDatas.commit("COPY_OUTDATED_LOCAL_STORAGE_DATAS", datas.datas);
            }

            if (validity === false) {
                throw "Null/Outdated Local Storage Datas";
            }

        } catch {
            this.launchRequests();
        }

        this.store.state.haveInitialRequestsBeenCompleted = true;

    }
    getLocalStorageDatas() {

        if (LocalStorageManager.get(this.store.state.LOCAL_STORAGE_DATAS_NAME)) {

            const datas = LocalStorageManager.get(this.store.state.LOCAL_STORAGE_DATAS_NAME);

            if ((datas.requestDate + this.store.state.REQUEST_DATE_LIMIT) > Date.now()) {

                this.store.APIsDatas.commit("SET_TREE", datas.datas);
                this.store.commit("SET_REQUEST_DATE", datas.requestDate);
                return {
                    datas: datas,
                    validity: true
                };

            } else {

                return {
                    datas: datas,
                    validy: false
                };

            }

        } else {
            return {
                datas: null,
                validity: false
            };
        }

    }
    async launchRequests() {

        let [countryProxy, countryHistoricalProxy, departementProxy] = [new CountryProxy(this.store), new CountryHistoricalProxy(this.store), new DepartementProxy(this.store)];

        //Add error handlers
        let APIsDatas = await Promise.all([
            countryProxy.get(),
            countryHistoricalProxy.get({status: ["confirmed"], type: "country"}).catch(() => { return {} }),
            countryHistoricalProxy.get({name: "France", status: ["deaths"], type: "country"}).catch(() => { return {} }),
            countryHistoricalProxy.get({name: "Global", status: ["deaths"], type: "global"}).catch(() => { return {} }),
            departementProxy.get().catch(() => { return [] })
        ]);

        APIsDatas = {
            countriesLive: APIsDatas[0],
            histConfirmed: APIsDatas[1],
            histFranceDeaths: APIsDatas[2],
            histGlobalDeaths: APIsDatas[3],
            departementsLive: APIsDatas[4]
        }

        APIsDatas = APIsDatasMerger.merge({store: this.store, APIsDatas})
        console.log(APIsDatas);
        TreeBuilder.buildTree({store: this.store, APIsDatas});
        console.log("Requests ended");
        this.store.commit("CONFIRM_REQUESTS");

    }
}