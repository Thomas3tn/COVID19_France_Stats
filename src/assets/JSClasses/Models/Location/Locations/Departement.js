import Location from "../Location.js";

export default class Departement extends Location {
    static get type() {
        return "departement";
    }
    static get keys() {

        const keys = {};
        Object.keys(this._live).forEach(key => keys[key.toUpperCase()] = key);
        Object.keys(this._infos).forEach(key => keys[key.toUpperCase()] = key);
        return keys;

    }
    static get KEYS_TRANSLATIONS() {

        return {
            ...this.PARENT_KEYS_TRANSLATIONS,
            hospitalizations: "Hospitalisations",
            intensiveCare: "Réanimations",
            dailyHospitalizations: "Hospitalisations quotidiennes",
            dailyIntensiveCare: "Réanimations quotidiennes",
            dailyDeaths: "Décès quotidiens",
            dailyRecovered: "Guéris quotidiens",
            abbreviation: "abréviations",
            region: "Région",
            demonym: "Démonyme",
            capitalCity: "Préfecture"
        }

    }
    constructor(datas) {

        datas.type = Departement.type;
        const parentConstructor = super(datas);
        datas = datas.All;

        this._live = {
            ...parentConstructor._live,
            hospitalizations: datas.hosp || null,
            intensiveCare: datas.rea || null,
            dailyHospitalizations: datas.incid_hosp || null,
            dailyIntensiveCare: datas.incid_rea || null,
            dailyDeaths: datas.incid_dc_hosp || null,
            dailyRecovered: datas.incid_rad || null
        }

        this._infos = {
            ...parentConstructor._infos,
            abbreviation: datas.dep || null,
            region: datas.lib_reg || null,
            demonym: datas.demonym || null,
            capitalCity: datas.capital_city || null,
        }

        this._isHistBeenRegistered = false;

        this._historical = (() => {

            try {

                let historical = [];

                const TRANSLATIONS = {
                    DAILY: {
                        incid_hosp: "hospitalizations",
                        incid_rea: "intensiveCare",
                        incid_rad: "recovered",
                        incid_dchosp: "deaths",
                    },
                    CUMULATIVE: {
                        hosp: "hospitalizations",
                        rea: "intensiveCare",
                        rad: "recovered",
                        dchosp: "deaths",
                    }
                }

                datas.historical.forEach(currDate => {

                    const currentDay = {
                        date: currDate.date,
                        daily: {},
                        cumulative: {}
                    }

                    Object.entries(TRANSLATIONS).forEach(([TYPE, TRANSLATIONS_LIST]) => {

                        Object.entries(TRANSLATIONS_LIST).forEach(([APIPropName, AppPropName]) => {

                            if (typeof currDate[APIPropName] !== "undefined") {

                                //Set to 0 if value is equal to null
                                currentDay[TYPE.toLocaleLowerCase()][AppPropName] = currDate[APIPropName] || 0;

                            }
    
                        });

                    });

                    historical.push(currentDay);

                });

                return historical;

            } catch (error) {

                console.warn(`An error has occured while adding historical evolution during the construction of the departement object. ${error}`);
                return [];

            }

        })();

    }

    get live() {
        return this._live;
    }

    get infos() {
        return this._infos;
    }

    get isHistBeenRegistered() {
        return this._isHistBeenRegistered;
    }

    setHistorical({datas}) {

        console.log(datas);

        let historical = [];

        try {

            const TRANSLATIONS = {
                DAILY: {
                    incid_hosp: "hospitalizations",
                    incid_rea: "intensiveCare",
                    incid_rad: "recovered",
                    incid_dchosp: "deaths",
                },
                CUMULATIVE: {
                    hosp: "hospitalizations",
                    rea: "intensiveCare",
                    rad: "recovered",
                    dchosp: "deaths",
                }
            }

            datas.forEach(currDate => {

                const currentDay = {
                    date: currDate.date,
                    daily: {},
                    cumulative: {}
                }

                Object.entries(TRANSLATIONS).forEach(([TYPE, TRANSLATIONS_LIST]) => {

                    Object.entries(TRANSLATIONS_LIST).forEach(([APIPropName, AppPropName]) => {

                        if (typeof currDate[APIPropName] !== "undefined") {

                            //Set to 0 if value is equal to null
                            currentDay[TYPE.toLowerCase()][AppPropName] = currDate[APIPropName] || 0;

                        }

                    });

                });

                historical.push(currentDay);

            });

            this._isHistBeenRegistered = true;

        } catch (error) {

            console.warn(`An error has occured while adding historical evolution to the current departement. ${error}`);

        }

        this._historical = historical;

    }

}