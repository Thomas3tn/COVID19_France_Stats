export default class APIsDatas {
    constructor({datas, requests}) {

        this._datas = datas || {};
        this._requests = [...requests] || [];

    }
    get datas() {
        return this._datas;
    }
    get requests() {
        return this._requests;
    }
    set datas(datas) {
        this._datas = datas;
    }
    set requests(requests) {
        
        if (Array.isArray(requests)) {
            this._requests = requests;
        }

    }
    updateAllRequests(newStatus) {
        this._requests.forEach(request => request.updateStatus(newStatus));
    }
    addRequests(requests) {

        requests = Array.from(requests);
        requests.forEach(request => this._requests.push(request));

    }
    forEachRequest(callback) {

        this.requests.forEach(request => request = callback(request));

    }
}