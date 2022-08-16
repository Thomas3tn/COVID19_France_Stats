import Proxy from "../../Proxy.js";

import Country from "../../../Models/Location/Locations/Country.js";
import CountriesInfosAPI from "../../../APIs/Requests/CountriesInfosAPI.js";

export default class CountriesInfosProxy extends Proxy {
    constructor({store}) {

        super({store});
        this.countriesInfosAPI = new CountriesInfosAPI();

    }
    async get(country = false) {

        const cachedDatas = this.getCachedLocation({name: country, nodeType: Country.type, nodePath: "infos"});

        if (cachedDatas !== null) {
            return cachedDatas;
        }

        return await this.countriesInfosAPI.get();

    }
}