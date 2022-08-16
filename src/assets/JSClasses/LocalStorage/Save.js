import CachedDatas from "../Models/LocalStorage/CachedDatas.js";
import Queue from "../DatasStructures/Queue/Queue.js";

export default class Save {
    static save({store}) {

        try {

            const cachedDatas = Save.setCachedDatas({
                APIsDatas: Save.getQueuedAPIsDatas({store}), 
                requestDate: store.state.requestDate, 
                APIsStatus: store.getters["APIsStatus/getTree"]()
            });
            console.log(cachedDatas);
            localStorage.setItem(store.state.LOCAL_STORAGE_DATAS_NAME, JSON.stringify(cachedDatas));
            return true;

        } catch (error) {

            console.warn(`Unable to save APIs datas, requests status and request date as cached datas. ${error}`);
            return false;

        }

    }
    static getQueuedAPIsDatas({store}) {

        const APIsDatas = new Queue();
        let datas = [];
        let currLocType = null;

        store.getters["APIsDatas/forEachBreadthFirst"](location => {

            if (currLocType !== null && location.data.type !== currLocType) {

                APIsDatas.enqueue({type: currLocType, datas});
                datas = [];

            }

            if (location.data.type !== currLocType) {
                currLocType = location.data.type;
            }

            datas.push(location.data);

        });

        APIsDatas.enqueue({type: currLocType, datas});

        return APIsDatas;

    }
    static setCachedDatas({APIsDatas, requestDate, APIsStatus}) {

        console.log(APIsDatas, requestDate, APIsStatus)

        const cached = new CachedDatas({
            requestDate: 1,
            datas: APIsDatas,
            requests: 1
        });

        console.log(cached);
        return cached;

    } 
}