import API from "../API.js";
import Country from "../../Models/Location/Locations/Country.js";

export default class FranceLiveAPI extends API {
    static requests = [
        new FranceLiveAPI.APIRequest({
            infos: {type: "live", status: null, location: "France"},
            parentKeysValues: [{key: "type", value: "live"}, {key: "location", value: Country.type}]
        })
    ]
    constructor() {

        super();

        this.BASE_URL = "https://coronavirusapifr.herokuapp.com/data/live/france";

    }
    async get() {

        const apisDatas = new this.APIsDatas({requests: FranceLiveAPI.requests});

        try {

            let franceLive = await fetch(this.BASE_URL);
            apisDatas.datas = await franceLive.json();
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve France live datas. ${error}`);
            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
}