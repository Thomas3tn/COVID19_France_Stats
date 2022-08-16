import ObjectCustomMethods from "../../CustomMethods/Object.js";

export default class Location {
    static get PARENT_KEYS_TRANSLATIONS() {

        return {
            deaths: "Décès",
            recovered: "Guéris"
        }

    }
    constructor(datas) {

        this._type = datas.type;
        datas = datas.All;
        this._name = (datas?.country || datas?.name?.common || datas?.name || datas?.lib_dep)?.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0] || null;

        this._live = {
            deaths: datas?.[ObjectCustomMethods.zeroValueHandler({object: datas, propNames: ["dchosp", "deaths"]})],
            recovered: datas?.[ObjectCustomMethods.zeroValueHandler({object: datas, propNames: ["rad", "recovered"]})]
        }

        this._historical = (() => {

            if (datas.historical) {

                try {

                    let historical = [];
    
                    Object.entries(datas.historical).forEach(([status, datas]) => {
    
                        let isArrayEmpty = historical.length === 0 ? true : false;
    
                        Object.entries(datas).forEach(([date, data]) => {
    
                            const currentDay = {
                                date,
                                cumulative: {
                                    [status]: data
                                }
                            };
    
                            if (isArrayEmpty) {
                                historical.push(currentDay);
                            } else {
    
                                const targetDay = historical.find(day => day.date === currentDay.date);
                                Object.entries(currentDay).forEach(([key, value]) => {
                                    targetDay[key] = typeof value === "object" ? {...targetDay[key], ...value} : value;
                                });
                            }
    
                        });
    
                        isArrayEmpty = false;
    
                    });
    
                    if (Date.parse(historical[0].date) > Date.parse(historical[historical.length - 1].date)) {
                        historical = historical.reverse();
                    }
    
                    historical.forEach((currDay, index) => {
    
                        currDay.daily = {};
    
                        if (index === 0) {
                            Object.keys(currDay.cumulative).forEach(status => currDay.daily[status] = 0);
                        } else {
                            
                            const prevDay = historical[index - 1];
    
                            Object.entries(currDay.cumulative).forEach(([status, data]) => {
                                currDay.daily[status] = data - prevDay.cumulative[status] || 0;
                            });
    
                        }
    
                    });
    
                    return historical;
    
                } catch (error) {
    
                    console.error(`An error has occured while adding historical evolution during the construction of the country object. ${error}`);
                    return [];
                
                }

            } else {
                return null;
            }

        })();

        this._infos = {
            name: (datas?.country || datas?.name?.common || datas?.name || datas?.lib_dep)?.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0] || null,
            frName: datas?.frName || datas?.translations ?. fra ?. common || datas?.country || datas?.lib_dep || null,
            population: datas?.population || null,
            lifeExpectancy: datas?.life_expectancy || null,
            sqKmArea: datas?.area || datas?.sq_km_area || datas?.sqKmArea || null,
            coordinates: {
                lat: datas?.lat || datas?.latlng?.[0] || null,
                long: datas?.long || datas?.latlng?.[1] || null
            },
        }

    }
    get type() {
        return this._type;
    }

    get name() {
        return this._name;
    }

    get live() {
        return this._live;
    }

    get historical() {
        return this._historical;
    }

    get dailyHistorical() {

        const datas = [];
        this.historical.forEach(day => datas.push({date: day.date, ...day.daily}));
        return datas;

    }

    get cumulativeHistorical() {

        const datas = [];
        this.historical.forEach(day => datas.push({date: day.date, ...day.cumulative}));
        return datas;

    }

    get infos() {
        return this._infos;
    }

    static get histCumulativeStatus() {
        return ["confirmed", "deaths", "recovered"];
    }

    get registeredHistoricalStatus() {
        return this._historical === null ? null : Object.keys(this._historical[0].cumulative);
    }

    addNewHistoricalStatus({datas}) {

        try {

            Object.entries(datas).forEach(([status, datas]) => {

                Object.entries(datas.All.dates).forEach(([date, data], index) => {

                    const currentDay = {
                        cumulative: {
                            [status]: data
                        },
                        daily: {}
                    };

                    if (index === 0) {
                        Object.keys(currentDay.cumulative).forEach(status => currentDay.daily[status] = 0);
                    } else {

                        const prevDay = this._historical[this._historical.findIndex(day => Date.parse(day.date) === Date.parse(date)) - 1];

                        Object.entries(currentDay.cumulative).forEach(([status, data]) => {
                            currentDay.daily[status] = data - prevDay?.cumulative?.[status] || 0;
                        });

                    }

                    const targetDay = this._historical.find(day => day.date === date);
                    Object.entries(currentDay).forEach(([key, value]) => {
                        targetDay[key] = typeof value === "object" ? {...targetDay[key], ...value} : value;
                    });

                });

            });

        } catch (error) {

            console.warn(`An error has occured while adding new historical status to the location. ${error}`);
        
        }

    }
    addFurtherHistDayDatas({datas, date}) {

        try {

            const day = this._historical.find(currentDay => currentDay.date === date);
            Object.entries(datas).forEach(([status, data]) => {

                const translatedStatus = this.getHistStatusTranslation({status});
                if (translatedStatus) {
                    day[translatedStatus] = data;
                }

            });

            return true;

        } catch (error) {
            return false;
        }

    }
}