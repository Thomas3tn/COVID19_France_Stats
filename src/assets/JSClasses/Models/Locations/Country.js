import Location from "../Location.js";

export default class Country extends Location {
    constructor(datas) {

        datas.type = "country";
        const parentConstructor = super(datas);

        this._provinces = (() => {

            const filteredList = Object.entries(datas).filter(provinceDatas => provinceDatas[0] !== "All");
            const formattedList = {};
            filteredList.forEach(provinceDatas => formattedList[provinceDatas[0]] = provinceDatas[1]);
            return formattedList;

        })();

        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            confirmed: datas.conf || datas.confirmed || null,
            hospitalizations: datas.hosp || null,
            intensiveCare: datas.rea || null,
            administredVaccines: datas.administred || null,
            vaccinated: datas.people_vaccinated || null,
            partiallyVaccinated: datas.people_partially_vaccinated || null
        }


        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.cca2 || datas.abbreviation || null,
            region: datas.continent || datas?.continents?.[0] || null,
            subRegion: datas.subRegion || datas.location || null,
            demonym: datas.demonyms ?. fra ?. m || datas.demonym || null,
            capitalCity: datas.capital || datas.capital_city || null,
            gini: (datas.gini && (`${Object.entries(datas.gini)?.[1]} (${Object.entries(datas.gini)?.[0]})`)) || datas?.gini || null,
            update: datas.updated || null
        }

    }

    get provinces() {
        return this._provinces;
    }

    static get keys() {

        const keys = {};
        Object.keys(this._live).forEach(key => keys[key.toUpperCase()] = key);
        Object.keys(this._infos).forEach(key => keys[key.toUpperCase()] = key);
        return keys;

    }

}