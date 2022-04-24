export default class DepartementsLiveDatasAPI {
    constructor() {

        this.BASE_URL = "https://coronavirusapifr.herokuapp.com/data/live/departements";

    }
    async get() {

        const APIsDatas = {
            datas: {},
            APIsRequestsStatus: {
                franceCovidDatas: [
                    {datas: {type: "root", status: null}, idKeysValues: [{key: "type", value: "root"}]}, 
                    {datas: {type: "live", status: null, location: "departement"}, parentKeysValues: [{key: "type", value: "root"}], idKeysValues: [{key: "type", value: "live"}, {key: "location", value: "departement"}]}
                ]
            }
        };

        try {

            let datas = await fetch(this.BASE_URL);
            datas = await datas.json();

            datas.forEach(departement => APIsDatas.datas[departement.dep] = departement);
            APIsDatas.APIsRequestsStatus.franceCovidDatas.forEach(reqStatus => reqStatus.datas.status = true);

        } catch (error) {

            console.error(`Unable to retrieve departements live datas. Error: ${error}`);
            APIsDatas.datas = false;
            APIsDatas.APIsRequestsStatus.franceCovidDatas.forEach(reqStatus => reqStatus.datas.status = false);

        }

        return APIsDatas;

    }
}