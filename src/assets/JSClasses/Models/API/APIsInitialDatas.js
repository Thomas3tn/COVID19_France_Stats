export default class APIsInitialDatas {
    constructor() {

        this._rootRequests = {
            datas: {},
            requests: []
        };

        this._additionalRequests = {
            datas: {},
            requests: []
        }

    }
    get rootRequests() {
        return this._rootRequests;
    }
    get additionalRequests() {
        return this._additionalRequests;
    }
    get datas() {
        
        return {
            rootRequests: this._rootRequests.datas,
            additionalRequests: this._additionalRequests.datas
        }

    }
    get requests() {

        return {
            rootRequests: this._rootRequests.requests,
            additionalRequests: this._additionalRequests.requests
        }

    }
    addDatas({datas, requestType}) {

        this[`_${requestType}Requests`].datas = {...datas, ...this[`_${requestType}Requests`].datas};

    }
    addRequests({requests, requestType}) {

        this[`_${requestType}Requests`].requests = [...requests, ...this[`_${requestType}Requests`].requests];

    }
}