import Proxy from "../../Proxy.js";

import Departement from "../../../Models/Location/Locations/Departement.js";
import DepartementLiveDatasAPI from "../../../APIs/Requests/DepartementLiveAPI.js";

export default class DepartementProxy extends Proxy {
    constructor({store}) {

        super({store});
        this.departementsLiveDatasAPI = new DepartementLiveDatasAPI();

    }
    async get(name = false) {

        const departement = this.getCachedLocation({name, nodeType: Departement.type});
        
        if (departement !== null) {
            return departement;
        }

        return await this.departementsLiveDatasAPI.get();

    }
}