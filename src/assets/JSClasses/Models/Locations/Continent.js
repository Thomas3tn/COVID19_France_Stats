import Location from "../Location.js";

export default class Continent extends Location {
    constructor(datas) {

        datas.type = "continent";
        const parentConstructor = super(datas);
        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            confirmed: datas.confirmed || null,
        }

        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.abbreviation || null,
            countriesList: datas.countriesList,
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
}