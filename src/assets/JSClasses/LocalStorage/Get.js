import LocalStorage from "../Models/LocalStorage/LocalStorage.js";
import CachedDatas from "../Models/LocalStorage/CachedDatas.js";
import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

export default class LocalStorageGet {
    static DATAS_STATUS = {
        MISSING: 0,
        UPTODATE: 1,
        OUTDATED: 2
    }
    static get({store, name}) {

        const _localStorage = new LocalStorage({
            remainingRequests: [Country.type, Departement.type],
            status: LocalStorageGet.DATAS_STATUS.MISSING
        });

        if (localStorage.getItem(name)) {

            _localStorage.cachedDatas = new CachedDatas(JSON.parse(localStorage.getItem(name)));

            _localStorage.status = LocalStorageGet.checkExpirationDate({
                requestDate: _localStorage.cachedDatas.requestDate, 
                REQUEST_DATE_LIMIT: store.state.REQUEST_DATE_LIMIT
            });

            if (_localStorage.status === LocalStorageGet.DATAS_STATUS.UPTODATE) {
                _localStorage.remainingRequests = LocalStorageGet.getRemainingRequests({APIsRequests: _localStorage.cachedDatas.requests});
            }

        }

        return _localStorage;

    }
    static checkExpirationDate({requestDate, REQUEST_DATE_LIMIT}) {

        console.log(requestDate, REQUEST_DATE_LIMIT);

        if (requestDate) {

            const areDatasUptodate = (requestDate + REQUEST_DATE_LIMIT) > Date.now();
            return areDatasUptodate ? LocalStorageGet.DATAS_STATUS.UPTODATE : LocalStorageGet.DATAS_STATUS.OUTDATED;

        }

    }
    static getRemainingRequests({APIsRequests}) {

        const remainingRequests = [];

        const rootReqs = {
            [Country.type]: APIsRequests.find({keysValues: [{key: "type", value: "live"}]}),
            [Departement.type]: APIsRequests.find({keysValues: [{key: "type", value: "live"}, {key: "location", value: "departement"}]})
        }


        Object.entries(rootReqs).forEach(([locType, status]) => {

            if (status === false) {
                remainingRequests.push(locType);
            }

        });

        return remainingRequests;

    }
}