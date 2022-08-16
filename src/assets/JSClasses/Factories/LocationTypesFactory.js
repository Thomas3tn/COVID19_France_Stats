import World from "../Models/Location/Locations/World.js"
import Continent from "../Models/Location/Locations/Continent.js";
import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

export default class LocationTypesFactory {
    constructor({datas, type}) {

        let location;
        if (type === World.type) {
            location = new World(datas);
        } else if (type === Continent.type) {
            location = new Continent(datas);
        } else if (type === Country.type) {
            location = new Country(datas);
        } else if (type === Departement.type) {
            location = new Departement(datas);
        } else {
            throw "Unknown type format";
        }
        return location;

    }
}