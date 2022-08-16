import API from "../API.js";
import Country from "../../Models/Location/Locations/Country.js";

export default class CountriesVaccinationAPI extends API {
    static requests = [
        new CountriesVaccinationAPI.APIRequest({
            infos: {type: "vaccination", status: null, location: Country.type}, 
            parentKeysValues: [{key: "type", value: "live"}, {key: "location", value: Country.type}]
        })
    ]
    constructor() {

        super();
        this.BASE_URL = "https://covid-api.mmediagroup.fr/v1/vaccines";

    }
    async get() {

        const apisDatas = new this.APIsDatas({requests: CountriesVaccinationAPI.requests});

        try {

            let countriesVacc = await fetch(this.BASE_URL);
            apisDatas.datas = await countriesVacc.json();
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve countries vaccination datas. ${error}`);
            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
}