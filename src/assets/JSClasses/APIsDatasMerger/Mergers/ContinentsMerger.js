import ContinentsStatic from "../../../staticDatas/Continents.js";

export default class ContinentsMerger {
    static merge({countries, apisKeysMapper}) {

        const DEFAULT_CONTINENT_VALUE = "Others";

        countries = this.addCountriesDefaultContinentValue({
            countries, 
            defaultValue: DEFAULT_CONTINENT_VALUE, 
            apisKeysMapper
        });

        let continents = this.mergeCountries({
            countries, 
            defaultValue: DEFAULT_CONTINENT_VALUE,
            apisKeysMapper
        });

        continents = this.renameCountryContinentDuplicateKeys({continents});
        return this.mergeCountriesStatic({continents, continentsStatic: ContinentsStatic});

    }
    static addCountriesDefaultContinentValue({countries, defaultValue, apisKeysMapper}) {

        Object.values(countries).forEach(country => {

            if (apisKeysMapper.find({datas: country.All, key: "region"}) === null) {
                country.All[apisKeysMapper.getMap().region[0]] = defaultValue;
            }

        });

        return countries;

    }
    static mergeCountries({countries, defaultValue, apisKeysMapper}) {

        const continents = {
            [defaultValue]: {
                All: {}
            }
        };

        Object.values(countries).forEach(country => {

            country = country.All;
            const cntryContinent = apisKeysMapper.find({datas: country, key: "region"});

            if (cntryContinent !== null) {

                if (typeof continents[cntryContinent] === "undefined") {
                    continents[cntryContinent] = {
                        All: {}
                    };
                }

                continents[cntryContinent].All = this.addCountryDatas({
                    continent: continents[cntryContinent].All, 
                    country,
                    apisKeysMapper
                });

            }

        });

        return continents;

    }
    static addCountryDatas({continent, country, apisKeysMapper}) {

        const KEYS_TYPE = {
            NUMBER: ["confirmed", "deaths", "recovered", "population", "sqKmArea", "gini"],
            NON_NUMBER: ["name"]
        }

        Object.entries(KEYS_TYPE).forEach(([type, statusList]) => {

            statusList.forEach(status => {

                const currentDatas = apisKeysMapper.find({datas: country, key: status});
                
                if (currentDatas !== null) {

                    if (typeof continent[status] === "undefined") {
                        continent[status] = type === "NUMBER" ? 0 : [];
                    }

                    type === "NUMBER" ? continent[status] += currentDatas : continent[status].push(currentDatas);

                }

            });

        });

        return continent;

    }
    static renameCountryContinentDuplicateKeys({continents}) {

        const DUPLICATE_NAMES = [{old: ["name"], new: "countriesList"}];

        Object.values(continents).forEach(continent => {

            DUPLICATE_NAMES.forEach(duplicateKey => {

                continent.All[duplicateKey.new] = continent.All[duplicateKey.old];
                delete continent.All[duplicateKey.old];

            });

        });

        return continents;

    }
    static mergeCountriesStatic({continents, continentsStatic}) {

        Object.entries(continents).forEach(([contName, contDatas]) => {

            const formattedStaticName = contName.split(" ").join("");
            if (continentsStatic[formattedStaticName]) {
                contDatas.All = {...contDatas.All, ...continentsStatic[formattedStaticName]};
            }

        });

        return continents;

    }
}