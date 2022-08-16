import ContinentsStatic from "../../../staticDatas/Continents.js";
import Continent from "../../Models/Location/Locations/Continent.js";
import Merger from "../Merger.js";

export default class ContinentsMerger extends Merger {
    static merge({countries, Location}) {

        countries = this.addCountriesDefaultContinentValue({
            countries, 
            defaultValue: Continent.DEFAULT_NAME, 
            Location
        });

        const MERGING_METHODS = ["mergeCountries", "renameCountryContinentDuplicateKeys", "mergeContinentsStatic"];
        let continents = {};

        MERGING_METHODS.forEach(METHOD => continents = ContinentsMerger.mergingErrorHandler(
            ContinentsMerger[METHOD]({
                countries,
                defaultValue: Continent.DEFAULT_NAME,
                Location,
                continentsStatic: ContinentsStatic,
                continents
            })
        ));

        return continents;

    }
    static addCountriesDefaultContinentValue({countries, defaultValue, Location}) {

        Object.values(countries).forEach(country => {

            if (Location.findAPIPath({datas: country.All, key: "region"}) === null) {
                country.All[Location.APIS_KEYS_PATHS.REGION[0]] = defaultValue;
            }

        });

        return countries;

    }
    static mergeCountries({countries, defaultValue, Location}) {

        const continents = {
            [defaultValue]: {
                All: {}
            }
        };

        Object.values(countries).forEach(country => {

            country = country.All;
            const cntryContinent = Location.findAPIPath({datas: country, key: "region"});

            if (cntryContinent !== null) {

                if (typeof continents[cntryContinent] === "undefined") {
                    continents[cntryContinent] = {
                        All: {}
                    };
                }

                continents[cntryContinent].All = this.addCountryDatas({
                    continent: continents[cntryContinent].All, 
                    country,
                    Location
                });

            }

        });

        return continents;

    }
    static addCountryDatas({continent, country, Location}) {

        Object.entries(Continent.KEYS_TYPE).forEach(([type, statusList]) => {

            statusList.forEach(status => {

                const currentDatas = Location.findAPIPath({datas: country, key: status});
                
                if (currentDatas !== null) {

                    if (typeof continent[status] === "undefined") {
                        continent[status] = type === "NUMBER" ? 0 : [];
                    }

                    type === "NUMBER" ? continent[status] += currentDatas : continent[status].push(currentDatas);

                }

            });

        });

        continent.countriesCount = continent.name.length;
        //Should update key

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
    static mergeContinentsStatic({continents, continentsStatic}) {

        Object.entries(continents).forEach(([contName, contDatas]) => {

            const formattedStaticName = contName.split(" ").join("");
            if (continentsStatic[formattedStaticName]) {
                contDatas.All = {...contDatas.All, ...continentsStatic[formattedStaticName]};
            }

        });

        return continents;

    }
}