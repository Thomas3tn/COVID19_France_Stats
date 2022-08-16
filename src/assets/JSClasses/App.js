import LocalStorageGet from "./LocalStorage/Get.js";
import TreeBuilder from "./DatasAdder/TreeBuilder.js";
import APIsRequestsRouter from "./RequestsRouters/APIsRequestsRouter.js";
import APIsInitialRequestsMerger from "./DatasMerger/APIsInitialRequestsMerger.js";
import APIsRequestsMerger from "./APIsRequestsMerger.js";

export default class App {
    constructor(store) {

        this.store = store;

    }
    async ignit() {

        try {

            const localStorage = LocalStorageGet.get({name: this.store.state.LOCAL_STORAGE_DATAS_NAME});

            if (localStorage.status === LocalStorageGet.DATAS_STATUS.UPTODATE) {

                this.store.commit("SET_REQUEST_DATE", localStorage.cachedDatas.requestDate);
                //Create APIsStatus tree
                //Get root reqs status

            } else if (localStorage.status === LocalStorageGet.DATAS_STATUS.OUTDATED) {

                this.store.LocalStorageDatas.commit("ADD_TREE", localStorage.cachedDatas.datas);
                localStorage.cachedDatas.datas = [];

            }

            throw localStorage;

        } catch (localStorage) {

            let APIsDatas = {};

            if (localStorage.remainingRequests.length > 0) {

                const apisInitialDatas = await APIsRequestsRouter.get({store: this.store, requests: localStorage.remainingRequests});
                APIsRequestsMerger.merge({store: this.store, requests: apisInitialDatas.requests});

                APIsDatas = APIsInitialRequestsMerger.merge({
                    store: this.store, 
                    APIsDatas: apisInitialDatas.datas
                });

            }

            TreeBuilder.build({store: this.store, cachedDatas: localStorage?.cachedDatas?.datas, APIsDatas});

        }

        this.store.commit("CONFIRM_REQUESTS");
        this.store.commit("APIsDatas/SHOW_TREE");
        this.store.commit("APIsStatus/SHOW_TREE");

    }
}