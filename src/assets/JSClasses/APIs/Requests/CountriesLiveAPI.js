import API from "../API";

export default class CountriesLiveAPI extends API {
    static APIsRequestsStatus = [
        new CountriesLiveAPI.APIRequest({
            infos: {type: "live", status: null, location: CountriesLiveAPI.COUNTRY_TYPE}, 
            parentKeysValues: [{key: "type", value: "root"}]
        })
    ];
    constructor() {

        super();
        this.BASE_URL = "https://covid-api.mmediagroup.fr/v1/cases";

    }
    async get() {

        const apisDatas = new this.APIsDatas({requests: CountriesLiveAPI.APIsRequestsStatus});

        try {

            const countriesLive = await fetch(this.BASE_URL);
            const datas = await countriesLive.json();
            console.log(datas);
            apisDatas.datas = {
                countriesLive: datas
            };
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve countries live datas, therefore depending requests will be ignored. ${error}`);
            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
}