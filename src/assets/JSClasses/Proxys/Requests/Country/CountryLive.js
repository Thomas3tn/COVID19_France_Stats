import Proxy from "../../Proxy.js";

import CountriesLiveAPI from "../../../APIs/Requests/CountriesLiveAPI.js";
import Country from "../../../Models/Location/Locations/Country.js";

export default class CountryLiveProxy extends Proxy {
    constructor({store}) {

        super({store});
        this.countriesLiveAPI = new CountriesLiveAPI();

    }
    async get(country = false) {

        const cachedDatas = this.getCachedLocation({name: country, nodePath: "live", nodeType: Country.type});
        if (cachedDatas !== null) {
            return cachedDatas;
        }

        return await this.countriesLiveAPI.get();

    }
}