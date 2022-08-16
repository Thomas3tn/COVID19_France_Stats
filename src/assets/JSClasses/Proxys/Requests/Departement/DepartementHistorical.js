import Proxy from "../../Proxy.js";
import DepartementHistoricalAPI from "../../../APIs/Requests/DepartementHistoricalAPI.js";
import Departement from "../../../Models/Location/Locations/Departement.js";

export default class DepartementHistoricalProxy extends Proxy {
    constructor({store}) {

        super({store})
        this.store = store;
        this.departementHistoricalAPI = new DepartementHistoricalAPI(this.store);

    }
    async get({name = false, date = false, cachedDepartement = false}) {

        if (cachedDepartement === false) {
            cachedDepartement = this.getCachedLocation({name, nodeType: Departement.type, nodePath: "historical"});
        }

        if (cachedDepartement !== null && cachedDepartement.isHistBeenRegistered) {
            return cachedDepartement;
        }

        return await this.departementHistoricalAPI.get({name, date});

    }
}