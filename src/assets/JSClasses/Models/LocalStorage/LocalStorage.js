export default class LocalStorage {
    constructor({DATAS_STATUS, cachedDatas, status, remainingRequests}) {

        this._DATAS_STATUS = DATAS_STATUS || null;
        this._cachedDatas = cachedDatas || null;
        this._status = status || 0;
        this._remainingRequests = remainingRequests || null;

    }
    get DATAS_STATUS() {
        return this._DATAS_STATUS;
    }
    get cachedDatas() {
        return this._cachedDatas;
    }
    get status() {
        return this._status;
    }
    get remainingRequests() {
        return this._remainingRequests;
    }
    set status(newStatus) {
        this._status = newStatus;
    }
    set remainingRequests(newRemainingRequests) {

        if (Array.isArray(newRemainingRequests)) {
            this.remainingRequests = newRemainingRequests;
        }
    
    }
    set cachedDatas(datas) {
        this._cachedDatas = datas;
    }
}