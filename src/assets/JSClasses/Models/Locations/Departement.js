import Location from "../Location.js";

export default class Departement extends Location {
    constructor(datas) {

        datas.type = "departement";
        const parentConstructor = super(datas);
        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            hospitalizations: datas.hosp || null,
            intensiveCare: datas.rea || null,
            dailyHospitalizations: datas.incid_hosp || null,
            dailyIntensiveCare: datas.incid_rea || null,
            dailDeaths: datas.incid_dc_hosp || null,
            dailyRecovered: datas.incid_rad || null
        }

        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.dep || null,
            region: datas.lib_reg || null,
            demonym: datas.demonym || null,
            capitalCity: datas.capital_city || null,
        }

    }

    static get keys() {

        const keys = {};
        Object.keys(this._live).forEach(key => keys[key.toUpperCase()] = key);
        Object.keys(this._infos).forEach(key => keys[key.toUpperCase()] = key);
        return keys;

    }

}