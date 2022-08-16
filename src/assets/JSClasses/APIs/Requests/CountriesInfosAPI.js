import API from "../API.js";

export default class CountriesInfosAPI extends API {
    static requests = [
        new CountriesInfosAPI.APIRequest({
            infos: {type: "infos", status: null, location: CountriesInfosAPI.COUNTRY_TYPE}, 
            parentKeysValues: [{key: "type", value: "live"}, {key: "location", value: CountriesInfosAPI.COUNTRY_TYPE}]
        })
    ];
    constructor() {

        super();

        this.BASE_URL = "https://restcountries.com/v3.1/all";
        this.FRANCE_URL = "https://restcountries.com/v3.1/name/france";

    }
    async get() {

        const apisDatas = new this.APIsDatas({requests: CountriesInfosAPI.requests});

        try {

            let countriesInfos = await fetch(this.BASE_URL);
            apisDatas.datas = await countriesInfos.json();
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve countries infos datas. ${error}`);
            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
}