import API from "../API.js";

export default class DepartementHistoricalAPI extends API {
    static APIsRequestsStatus = [
        new DepartementHistoricalAPI.APIRequest({
            infos: {type: "historical", status: null, location: DepartementHistoricalAPI.DEPARTEMENT_TYPE}, 
            parentKeysValues: [{key: "type", value: "live"}, {key: "location", value: DepartementHistoricalAPI.DEPARTEMENT_TYPE}]
        })
    ];
    constructor() {

        super();

        this.URLS = {
            SINGLE_DEP: "https://coronavirusapifr.herokuapp.com/data/departement/",
            DEPS_LIST_BY_DATE: "https://coronavirusapifr.herokuapp.com/data/departements-by-date/"
        }   

    }
    async get({date = false, name = false}) {

        const apisDatas = new this.APIsDatas({requests: DepartementHistoricalAPI.APIsRequestsStatus});

        try {

            let datas = await fetch(this.setURL({name, date}));
            apisDatas.datas = await datas.json();
            apisDatas.updateAllRequests(true);

        } catch (error) {

            console.warn(`Unable to retrieve departements historical datas. ${error}`);
            apisDatas.datas = false;
            apisDatas.updateAllRequests(false);

        }

        return apisDatas;

    }
    setURL({date, name}) {

        if (name === false && date !== false) {
            return `${this.URLS.DEPS_LIST_BY_DATE}${date}`;
        } else if (name !== false) {
            return date === false ? `${this.URLS.SINGLE_DEP}${name}` : `${this.URLS.SINGLE_DEP}${name}/${date}`;
        } else {
            throw "Error";
        }

    }
}