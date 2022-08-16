import Proxy from "../../Proxy.js";

import Country from "../../../Models/Location/Locations/Country.js";
import FranceLiveAPI from "../../../APIs/Requests/FranceLiveAPI.js";

export default class CountriesInfosProxy extends Proxy {
    constructor({store}) {

        super({store});
        this.franceLiveAPI = new FranceLiveAPI();

    }
    async get() {

        const cachedDatas = this.getCachedLocation({name: "France", nodeType: Country.type, nodePath: "infos"});

        if (cachedDatas !== null) {
            return cachedDatas;
        }

        return await this.franceLiveAPI.get();

    }
}