import StringCustomMethods from "../CustomMethods/String.js";

export default function locationWithAPIKeysMapper({Location}) {

    Location.APIS_KEYS_PATHS = {
        CONFIRMED: [["confirmed"]],
        DEATHS: [["deaths"]],
        RECOVERED: [["recovered"]],
        REGION: [["continent"], ["continents", 0]],
        POPULATION: [["population"]],
        SQ_KM_AREA: [["sq_km_area"], ["area"]],
        GINI: [["gini"], ["gini", [0]]],
        NAME: [["country"], ["name", "common"]],
        ALT_SPELLINGS: [["altSpellings"]],
        ABBREVIATION: [["abbreviation"]],
        TRANSLATIONS: [["translations"]],
        CAPITAL_CITY: [["capital", [0]]],
        VACCINATED: [["people_vaccinated"]],
        PARTIALLY_VACCINATED: [["people_partially_vaccinated"]]
    }

    Location.findAPIPath = ({datas, key}) => {

        try {

            let path = datas;
            const formattedKey = StringCustomMethods.getConstantNameFromVariable(key);
            Location.APIS_KEYS_PATHS[formattedKey].find((currentPath, index) => {

                currentPath.forEach(currentKey => path = path[currentKey]);

                if (typeof path !== "undefined" && path !== datas) {
                    return path;
                } else if (index !== Location.APIS_KEYS_PATHS[formattedKey].length - 1) {
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

    return Location;

}