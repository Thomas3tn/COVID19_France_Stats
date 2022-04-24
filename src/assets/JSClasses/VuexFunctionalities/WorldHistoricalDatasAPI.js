export default class WorldHistoricalDatasAPI {
    constructor() {

        this.BASE_URL = "https://covid-api.mmediagroup.fr/v1/history?";
        this.STATUS_PARAMS = ["confirmed", "deaths", "recovered"];

    }
    async get({name = false, status = this.STATUS_PARAMS}) {

        let requestParameters = this.setRequestParameters({name, status});

        const requestsAmount = requestParameters.URLStatusKeysValues.length;
        let failedRequests = 0;

        let datas = await Promise.all(requestParameters.URLStatusKeysValues.map(
            async statusParam => {
                
                return await fetch(`${this.BASE_URL}${statusParam}&${requestParameters.URLLocationKeysValues}`)
                .catch(error => {
                    this.failedRequestHandler({error, status: statusParam.split("=")[1]})
                    failedRequests++;
                });

            }
        ));
        datas = await Promise.all(datas.map(data => data.json()));
        datas = this.formatDatas({datas, URLStatusKeysValues: requestParameters.URLStatusKeysValues});

        let APIsRequestsStatus = this.setAPIRequestsStatus({datas});
        APIsRequestsStatus = this.updateRootRequestStatus({APIsRequestsStatus, failedRequests, requestsAmount});
        let final = this.setFinalResponse({datas, APIsRequestsStatus, failedRequests, requestsAmount});
        return final;

    }
    setRequestParameters({name, status}) {

        let requestParameters = {};

        const locationType = name === false ? "countriesList" : "country";
        requestParameters.URLLocationKeysValues = locationType === "country" ? "country=" + encodeURIComponent(name) : "";
        requestParameters.URLStatusKeysValues = [];

        if (status !== false) {

            status = Array.from(status);
            status.forEach(currentStatus => requestParameters.URLStatusKeysValues.push("status=" + encodeURIComponent(currentStatus)));

        } else {

            //If no status have been filled, we assumed a request need to be done for each of them
            this.STATUS_PARAMS.forEach(STATUS => requestParameters.URLStatusKeysValues.push(`status=${encodeURIComponent(STATUS)}`));
        
        }

        return requestParameters;

    }
    failedRequestHandler({error, status}) {

        console.warn(`Unable to retrieve ${status} evolution datas. Error: ${error}`);
        return {};

    }
    formatDatas({datas, URLStatusKeysValues}) {

        let formattedDatas = {};
        datas.forEach((data, index) => {

            const currentStatus = URLStatusKeysValues[index].split("=")[1];
            formattedDatas[currentStatus] = data;

        });
        return formattedDatas;

    }
    setAPIRequestsStatus({datas}) {

        const APIS_REQUESTS_STATUS = {
            worldCovidDatas: [
                {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]},
                {datas: {type: "historical", status: null}, parentKeysValues: [{key: "type", value: "root"}], idKeysValues: [{key: "type", value: "historical"}]}
            ]
        };

        Object.entries(datas).forEach(([status, data]) => {

            const currentReqStatus = Object.entries(data).length === 0 ? false : true;

            APIS_REQUESTS_STATUS.worldCovidDatas.push({
                datas: {type: status, status: currentReqStatus}, 
                parentKeysValues: [{key: "type", value: "historical"}], 
                idKeysValues: [{key: "type", value: status}]
            });

        });

        return APIS_REQUESTS_STATUS;

    }
    updateRootRequestStatus({APIsRequestsStatus, failedRequests, requestsAmount}) {

        const rootReqStatus = failedRequests === requestsAmount ? false : true;

        APIsRequestsStatus.worldCovidDatas.forEach(requestType => {

            if (["root", "historical"].includes(requestType.datas.type)) {

                if ([null, false].includes(requestType.datas.status) && rootReqStatus === true) {
                    requestType.datas.status = rootReqStatus;
                }

            }

        });

        return APIsRequestsStatus;

    }
    setFinalResponse({datas, APIsRequestsStatus, failedRequests, requestsAmount}) {

        const rootReqStatus = failedRequests === requestsAmount ? false : true;
        const APIsDatas = {datas: null, APIsRequestsStatus};

        if (rootReqStatus) {
            APIsDatas.datas = datas;
        }

        return APIsDatas;

    }
}