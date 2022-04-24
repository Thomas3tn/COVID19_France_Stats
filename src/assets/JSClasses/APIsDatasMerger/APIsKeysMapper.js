export default class APIsKeysMapper {
    constructor() {

        this.APIS_KEYS_PATHS = {
            confirmed: [["confirmed"]],
            deaths: [["deaths"]],
            recovered: [["recovered"]],
            region: [["continent"], ["continents", 0]],
            population: [["population"]],
            sqKmArea: [["sq_km_area"], ["area"]],
            gini: [["gini"], ["gini", [0]]],
            name: [["country"], ["name", "common"]],
            altSpellings: [["altSpellings"]],
            abbreviation: [["abbreviation"]],
            translations: [["translations"]]
        };

    }
    getMap() {
        return this.APIS_KEYS_PATHS;
    }
    find({datas, key}) {

        try {

            let path = datas;
            this.APIS_KEYS_PATHS[key].find((currentPath, index) => {

                currentPath.forEach(currentKey => path = path[currentKey]);

                if (typeof path !== "undefined" && path !== datas) {
                    return path;
                } else if (index !== this.APIS_KEYS_PATHS[key].length - 1) {
                    path = datas;
                } else {
                    throw "Key not found.";
                }

            });
            
            return path;

        } catch (error) {
            return null;
        }

    }
}