export default class FallbackRequest {
    constructor() {

        this.FALLBACK_REQUESTS = {
            BASE_URL: "https://coronavirusapifr.herokuapp.com/data/live/france",
            FURTHER_REQUESTS_URLS: {
                FRANCE_INFOS: "https://restcountries.com/v3.1/name/france"
            }
        }

    }
    async triggerFallBackRequests() {

        const APIsDatas = {
            datas: {},
            APIsRequestsStatus: {
                franceCovidDatas: [],
                countriesInfosDatas: []
            }
        }

        try {

            let franceLive = await this.setFranceCovidDatas();
            let franceInfos = await this.setFranceInfosDatas();

            APIsDatas.datas.franceLive = franceLive.datas;
            APIsDatas.datas.franceInfos = franceInfos.datas;
            APIsDatas.APIsRequestsStatus.franceLive = franceLive.APIsRequestsStatus;
            APIsDatas.APIsRequestsStatus.franceInfos = franceInfos.APIsRequestsStatus;

        } catch (error) {

            console.error(`Unable to complete countries live fallback requests. Error: ${error}`);
            APIsDatas.datas = false;

        }

        return APIsDatas;

    }
    async setFranceCovidDatas() {

        const APIDatas = {
            datas: null,
            APIsRequestsStatus: [
                {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}, 
                {datas: {type: "live", status: null}, parentKeysValues: [{key: "type", value: "root"}], idKeysValues: [{key: "type", value: "live"}]}
            ]
        }

        try {

            let datas = await fetch(this.FALLBACK_REQUESTS.BASE_URL);
            APIDatas.datas = await datas.json();
            APIDatas.APIsRequestsStatus.forEach(reqStatus => reqStatus.datas.status = true);

        } catch (error) {

            APIDatas.APIsRequestsStatus.forEach(reqStatus => reqStatus.datas.status = false);
            throw new Error(`Unable to retrieve France covid-19 datas as a fallback main request. Error: ${error}`);

        }

        return APIDatas;

    }
    async setFranceInfosDatas() {

        const APIDatas = {
            datas: null,
            APIsRequestsStatus: [
                {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}
            ]
        }

        try {

            let datas = await fetch(this.FURTHER_REQUESTS_URLS.FRANCE_INFOS);
            APIDatas.datas = await datas.json();
            APIDatas.APIsRequestsStatus.forEach(reqStatus => reqStatus.datas.status = true);

        } catch (error) {

            console.error(`Unable to retrieve France RESTCountries datas as a fallback secondary request. Error: ${error}`);
            APIDatas.APIsRequestsStatus.forEach(reqStatus => reqStatus.datas.status = false);

        }

        return APIDatas;

    }
}