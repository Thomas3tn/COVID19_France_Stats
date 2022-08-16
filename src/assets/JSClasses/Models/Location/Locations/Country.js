import Location from "../Location.js";

import ObjectCustomMethods from "../../../CustomMethods/Object";

export default class Country extends Location {
    static get type() {
        return "country";
    }
    static get KEYS_TRANSLATIONS() {

        return {
            ...this.PARENT_KEYS_TRANSLATIONS,
            confirmed: "Cas confirmés",
            hospitalizations: "Hospitalisations",
            intensiveCare: "Réanimations",
            administredVaccines: "Vaccins administrés",
            vaccinated: "Personnes vaccinées",
            partiallyVaccinated: "Personnes partiellement vaccinées",
            abbreviation: "Abréviation",
            region: "Continent",
            subRegion: "Région",
            demonym: "Démonyme",
            capitalCity: "Capitale",
            gini: "GINI",
            update: "Mise à jour"
        }

    }
    constructor(datas) {

        datas.type = Country.type;
        const parentConstructor = super(datas);

        this._provinces = (() => {

            const provinces = {};

            Object.entries(datas).forEach(([name, datas]) => {

                if (name !== "All") {

                    provinces[name] = {};

                    provinces[name].confirmed = datas?.[ObjectCustomMethods.zeroValueHandler({object: datas, propNames: ["confirmed"]})];
                    provinces[name].deaths = datas?.[ObjectCustomMethods.zeroValueHandler({object: datas, propNames: ["deaths"]})];
                    provinces[name].recovered = datas?.[ObjectCustomMethods.zeroValueHandler({object: datas, propNames: ["recovered"]})];

                }

            })

            return provinces;

        })();

        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            confirmed: datas.conf || datas.confirmed || null,
            hospitalizations: datas.hosp || null,
            intensiveCare: datas.rea || null,
            administredVaccines: datas.administered || null,
            vaccinated: datas.people_vaccinated || null,
            partiallyVaccinated: datas.people_partially_vaccinated || null
        }


        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.cca2 || datas.abbreviation || null,
            region: datas.continent || datas?.continents?.[0] || null,
            subRegion: datas.subRegion || datas.location || null,
            demonym: datas.demonyms ?. fra ?. m || datas.demonym || null,
            capitalCity: datas.capital?.[0] || datas.capital_city || null,
            isIndependant: datas?.independent || null,
            isUNMember: datas?.unMember || null,
            languages: (() => {

                try {

                    let languages = "";
                    Object.values(datas.languages).forEach((language, index) => {

                        languages += `${language}`;
                        if (index !== Object.values(datas.languages).length - 1) {
                            languages += `, `;
                        }

                    });
                    return languages;

                } catch {
                    return null;
                }

            })(),
            currencies: (() => {

                try {

                    let currencies = "";
                    Object.values(datas.currencies).forEach((currency, index) => {

                        currencies += `${currency.name} (${currency.symbol})`;

                        if (index !== Object.values(datas.currencies).length - 1) {
                            currencies += `, `;
                        }

                    });
                    return currencies;

                } catch {
                    return null;
                }

            })(),
            gini: {
                year: (() => {

                    try {
                        return Object.keys(datas.gini)[0];
                    } catch {
                        return null;
                    }

                })(),
                data: (() => {

                    try {
                        return Object.values(datas.gini)[0];
                    } catch {
                        return null;
                    }

                })()
            },
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