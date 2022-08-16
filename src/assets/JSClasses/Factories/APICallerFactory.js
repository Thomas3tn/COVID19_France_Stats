import CountriesRequests from "../RequestsRouters/Locations/CountriesCaller.js";
import DepartementsRequests from "../RequestsRouters/Locations/DepartementsCallers.js";

import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

export default class APICallerFactory {
    constructor({store, type}) {

        if (type === Country.type) {
            return new CountriesRequests({store});
        } else if (type === Departement.type) {
            return new DepartementsRequests({store});
        } else {
            throw "Unknown location type";
        }

    }
}