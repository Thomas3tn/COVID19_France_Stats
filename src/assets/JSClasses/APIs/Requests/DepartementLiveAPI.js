import API from "../API.js";

export default class DepartementsLiveAPI extends API {
    static requests = [ 
        new DepartementsLiveAPI.APIRequest({
            infos: {type: "live", status: null, location: DepartementsLiveAPI.DEPARTEMENT_TYPE}, 
            parentKeysValues: [{key: "type", value: "root"}]
        })
    ];
    constructor() {

        super();
        this.BASE_URL = "https://coronavirusapifr.herokuapp.com/data/live/departements";

    }
    async get() {

        const apisDatas = new this.APIsDatas({requests: DepartementsLiveAPI.requests});

        try {

            let datas = await fetch(this.BASE_URL);
            apisDatas.datas = await datas.json();
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve departements live datas, therefore depending requests will be ignored. ${error}`);

            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
}