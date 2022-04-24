import World from "../Models/Locations/World.js"
import Continent from "../Models/Locations/Continent.js";
import Country from "../Models/Locations/Country.js";
import Departement from "../Models/Locations/Departement.js";

export default class LocationTypesFactory {
    constructor({datas, type}) {

        let location;
        if (type === "world") {
            location = new World(datas);
        } else if (["continent"].includes(type)) {
            location = new Continent(datas);
        } else if (["country", "world"].includes(type)) {
            location = new Country(datas);
        } else if (["departement"].includes(type)) {
            location = new Departement(datas);
        } else {
            throw "Unknown type format";
        }
        return location;

    }
}