import FallbackRequest from "./WorldLiveDatas/FallbackRequests";
import FurtherRequests from "./WorldLiveDatas/FurtherRequests";

export default class WorldLiveDatasAPI {
    constructor() {

        this.BASE_URL = "https://covid-api.mmediagroup.fr/v1/cases";

        this.furtherRequests = new FurtherRequests();
        this.fallbackRequest = new FallbackRequest();

    }
    async get() {

        const APIsDatas = {
            datas: null,
            APIsRequestsStatus: {
                worldCovidDatas: [
                    {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}, 
                    {datas: {type: "live", status: null}, parentKeysValues: [{key: "type", value: "root"}]}
                ],
                franceCovidDatas: [],
                countriesInfosDatas: []
            }
        }

        try {

            let countriesLive = await fetch(this.BASE_URL);
            APIsDatas.datas = {
                countriesLive: await countriesLive.json()
            };
            APIsDatas.APIsRequestsStatus.worldCovidDatas.forEach(reqStatus => reqStatus.datas.status = true);

            const furtherRequests = await this.furtherRequests.triggerFurtherRequests();
            Object.entries(furtherRequests.APIsRequestsStatus).forEach(
                ([APIType, requestsStatus]) => APIsDatas.APIsRequestsStatus[APIType] = [...APIsDatas.APIsRequestsStatus[APIType], ...requestsStatus]
            );
            APIsDatas.datas = {...APIsDatas.datas, ...furtherRequests.datas};

        } catch (error) {

            console.error(`Unable to retrieve world live datas. Error: ${error}`);
            APIsDatas.APIsRequestsStatus.worldCovidDatas.forEach(reqStatus => reqStatus.datas.status = false);
            const fallbackReqDatas = await this.fallbackRequestHandler();
            Object.entries(fallbackReqDatas.APIsRequestsStatus).forEach(
                ([APIType, requestsStatus]) => APIsDatas.APIsRequestsStatus[APIType].concat(APIsDatas.APIsRequestsStatus[APIType], requestsStatus)
            );
            APIsDatas.datas = {...APIsDatas.datas, ...fallbackReqDatas.datas};

        }

        return APIsDatas;

    }
    async fallbackRequestHandler() {

        try {
            return await this.fallbackRequest.triggerFallBackRequests();
        } catch (error) {
            return error;
        }

    }
}