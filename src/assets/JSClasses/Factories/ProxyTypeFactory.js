import Continent from "../Models/Location/Locations/Continent.js";
import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

import ContinentProxy from "../Proxys/Locations/Continent.js";
import CountryProxy from "../Proxys/Locations/Country.js";
import DepartementProxy from "../Proxys/Locations/Departement.js";

export default class ProxyTypeFactory {
    constructor({type, store}) {

        console.log(type);

        if (type === Continent.type) {
            return new ContinentProxy({store});
        } else if (type === Country.type) {
            return new CountryProxy({store});
        } else if (type === Departement.type) {
            return new DepartementProxy({store});
        } else {
            throw "Unknown type format";
        }

    }
}