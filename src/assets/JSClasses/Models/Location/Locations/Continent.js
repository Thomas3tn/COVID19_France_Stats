import Location from "../Location.js";
//Add countriesCount (countriesList length)
export default class Continent extends Location {
    static get type() {
        return "continent";
    }
    static get DEFAULT_NAME() {
        return "Others";
    }
    static get KEYS_TRANSLATIONS() {

        return {
            ...this.PARENT_KEYS_TRANSLATIONS,
            confirmed: "Cas confirmés",
            abbreviation: "Abréviation",
            countriesList: "Liste des pays",
            countriesCount: "Nombre de pays",
            demonym: "Démonyme",
            gini: "GINI"
        }

    }
    constructor(datas) {

        datas.type = Continent.type;
        const parentConstructor = super(datas);
        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            confirmed: datas.confirmed || null,
            vaccinated: datas.vaccinated || null,
            partiallyVaccinated: datas.partiallyVaccinated || null
        }

        this._historical = null;

        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.abbreviation || null,
            countriesList: datas.countriesList,
            countriesCount: datas.countriesCount,
            demonym: datas.demonym || null,
            gini: datas.gini || null,
        }

    }

    static get keys() {

        const keys = {};
        Object.keys(this._live).forEach(key => keys[key.toUpperCase()] = key);
        Object.keys(this._infos).forEach(key => keys[key.toUpperCase()] = key);
        return keys;

    }

    static get KEYS_TYPE() {

        return {
            NUMBER: ["confirmed", "deaths", "recovered", "population", "sqKmArea", "gini", "vaccinated", "partiallyVaccinated"],
            NON_NUMBER: ["name"]
        };

    }

    
}