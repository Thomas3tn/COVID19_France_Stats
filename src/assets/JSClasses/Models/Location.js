export default class Location {
    constructor(datas) {

        this._type = datas.type;
        datas = datas.All;
        this._name = (datas?.country || datas?.name?.common || datas?.name || datas?.lib_dep)?.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0] || null;

        this._live = {
            deaths: datas?.dchosp || datas?.deaths || null,
            recovered: datas?.rad || datas?.recovered || null,
        }

        this._historical = (() => {

            try {

                const historical = [];

                Object.entries(datas.historical).forEach(([status, datas]) => {

                    let isArrayEmpty = historical.length === 0 ? true : false;

                    Object.entries(datas).forEach(([date, data]) => {

                        const currentDay = {
                            date,
                            [status]: data
                        };

                        if (isArrayEmpty) {
                            historical.push(currentDay);
                        } else {
                            const targetDay = historical.find(day => day.date === currentDay.date);
                            Object.entries(currentDay).forEach(([key, value]) => targetDay[key] = value);
                        }

                    });

                    isArrayEmpty = false;

                });

                return historical;

            } catch (error) {
                return null;
            }

        })();

        this._infos = {
            name: (datas?.country || datas?.name?.common || datas?.lib_dep)?.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0] || null,
            frName: datas?.frName || datas?.translations ?. fra ?. common || datas?.country || datas?.lib_dep || null,
            population: datas?.population || null,
            lifeExpectancy: datas?.life_expectancy || null,
            sqKmArea: datas?.area || datas?.sq_km_area || null,
            coordinates: {
                lat: datas?.lat || null,
                long: datas?.long || null
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
    get infos() {
        return this._infos;
    }

    static get histCumulativeStatus() {
        return ["confirmed", "deaths", "recovered"];
    }

    get registeredHistoricalStatus() {
        return Object.keys(this._historical[0]).filter(status => status !== "date");
    }

    addFurtherHistoricalDatas({datas}) {

        Object.entries(datas).forEach(([status, datas]) => {

            let isArrayEmpty = this._historical.length === 0 ? true : false;

            Object.entries(datas).forEach(([date, data]) => {

                const currentDay = {
                    date,
                    [status]: data
                };

                if (isArrayEmpty) {
                    this._historical.push(currentDay);
                } else {
                    const targetDay = this._historical.find(day => day.date === currentDay.date);
                    Object.entries(currentDay).forEach(([key, value]) => targetDay[key] = value);
                }

            });

            isArrayEmpty = false;

        });

    }
}