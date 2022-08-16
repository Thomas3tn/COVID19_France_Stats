import Location from "../Location.js";

export default class World extends Location {
    static get type() {
        return "world";
    }
    static get KEYS_TRANSLATIONS() {

        return {
            ...this.PARENT_KEYS_TRANSLATIONS,
            confirmed: "Cas confirmés",
            administredVaccines: "Vaccins administrés",
            vaccinated: "Personnes vaccinés",
            partiallyVaccinated: "Personnes partiellement vaccinés"
        }

    }
    constructor(datas) {
        datas.type = World.type;
        const parentConstructor = super(datas);
        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            confirmed: datas.confirmed || null,
            administredVaccines: datas.administered || null,
            vaccinated: datas.people_vaccinated || null,
            partiallyVaccinated: datas.people_partially_vaccinated || null
        }

    }

    static get keys() {

        const keys = {};
        Object.keys(this._live).forEach(key => keys[key.toUpperCase()] = key);
        Object.keys(this._infos).forEach(key => keys[key.toUpperCase()] = key);
        return keys;

    }

}