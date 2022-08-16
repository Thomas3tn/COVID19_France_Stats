export default class CachedDatas {
    constructor({requestDate, datas, requests}) {

        console.log(requestDate, datas, requests);

        /*if (CachedDatas.exists) {
            return CachedDatas.instance;
        }*/

        this._requestDate = requestDate || null;
        this._datas = datas || null;
        this._requests = requests || null;

        /*CachedDatas.exists = true;
        CachedDatas.instance = this;*/

    }
    get requestDate() {
        return this._requestDate;
    }
    get datas() {
        return this._datas;
    }
    get requests() {
        return this._requests;
    }
}