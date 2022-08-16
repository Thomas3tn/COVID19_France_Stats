export default class FranceHistoricalAPI {
    constructor() {

        this.baseURL = "https://coronavirusapifr.herokuapp.com/data/france-by-date/";

    }
    async get({date}) {

        const APIsDatas = {
            datas: {},
            APIsRequestsStatus: {
                franceCovidDatas: [
                    {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}, 
                    {datas: {type: "historical", status: null, location: "country"}, parentKeysValues: [{key: "type", value: "root"}], idKeysValues: [{key: "type", value: "live"}, {key: "location", value: "country"}]}
                ]
            }
        }

        try {

            let datas = await fetch(`${this.baseURL}${date}`);
            datas = await datas.json();

            APIsDatas.datas = datas[0];
            APIsDatas.APIsRequestsStatus.franceCovidDatas.forEach(reqStatus => reqStatus.datas.status = true);

        } catch (error) {

            console.error(`Unable to retrieve France historical datas. Error: ${error}`);
            APIsDatas.datas = false;
            APIsDatas.APIsRequestsStatus.franceCovidDatas.forEach(reqStatus => reqStatus.datas.status = false);

        }

        return APIsDatas;

    }
}