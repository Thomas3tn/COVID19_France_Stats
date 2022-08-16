import CountryInfosMerger from "./LocationsMergers/CountriesInfosMerger.js";
import Merger from "../Merger.js";

export default class CountriesMerger extends Merger {
    static merge({store, Location, countriesLive, franceLive, countriesVacc, countriesInfos, histConfirmed, histFranceDeaths, histGlobalDeaths}) {

        const MERGING_METHODS = ["addName", "mergeVaccination", "mergeHistStatus", "formatName", "mergeFranceLive", "mergeCountriesInfos"];

        MERGING_METHODS.forEach(METHOD => countriesLive = CountriesMerger.mergingErrorHandler(
            CountriesMerger[METHOD]({
                store, 
                Location, 
                countriesLive, 
                countriesVacc, 
                franceLive, 
                countriesInfos, 
                histConfirmed, 
                histFranceDeaths, 
                histGlobalDeaths
            })
        ));

        return countriesLive;

    }
    static addName({countriesLive, Location}) {

        Object.entries(countriesLive).forEach(([name, datas]) => {

            if (Location.findAPIPath({datas: datas.All, key: "name"}) === null) {
                datas.All[Location.APIS_KEYS_PATHS.NAME[0]] = name;
            }

        });

        return countriesLive;

    }
    static mergeVaccination({store, countriesLive, countriesVacc}) {

        const vaccReqStatus = store.getters["APIsStatus/find"]({
            keysValues: [{key: "type", value: "vaccination"}]
        }).data.status;

        if (vaccReqStatus) {

            //Add vaccines datas for each country
            Object.entries(countriesVacc).forEach(([countryName, vaccDatas]) => {

                //Test if the both vaccines country and cases country have the same country name
                if (countriesLive[countryName]) {
                    countriesLive[countryName].All = {...countriesLive[countryName].All, ...vaccDatas.All};
                }

            });

        }

        return countriesLive;

    }
    static mergeHistStatus({store, countriesLive, histConfirmed, histFranceDeaths, histGlobalDeaths}) {

        const histReqStatus = store.getters["APIsStatus/find"]({ 
            keysValues: [{key: "type", value: "historical"}]
        }).data.status;

        if (histReqStatus) {

            /*const histConfirmedReqStatus = store.getters["APIsStatus/find"]({
                keysValues: [{key: "type", value: "confirmed"}]
            }).data.status;
            const histDeathsReqStatus = store.getters["APIsStatus/find"]({
                keysValues: [{key: "type", value: "deaths"}]
            }).data.status;*/

            const histConfirmedReqStatus = true;
            const histDeathsReqStatus = true;

            if ([histConfirmedReqStatus, histDeathsReqStatus].includes(true)) {

                Object.entries(countriesLive).forEach(([name, datas]) => {

                    datas.All.historical = {};
    
                    if (histConfirmedReqStatus) {
                        datas.All.historical.confirmed = histConfirmed.confirmed[name].All.dates;
                    }
        
                    
                    if (histDeathsReqStatus && ["Global", "France"].includes(name)) {
    
                        const histDeaths = name === "Global" ? histGlobalDeaths : histFranceDeaths;
                        datas.All.historical.deaths = histDeaths.deaths.All.dates;
    
                    }
        
                });

            }

        }

        return countriesLive;

    }
    static formatName({countriesLive}) {

        //Names are formatted after all datas from the same APIs have been merged
        //to avoid names matching errors (special characters)

        Object.entries(countriesLive).forEach(([name, datas]) => {

            if (name.match(/\*/)) {
                
                const formattedName = name.match(/[a-zâäàéèùêëîïôöçñ\s,'()-]{1,}/i)[0];
                countriesLive[formattedName] = datas;
                countriesLive[formattedName].All.country = formattedName
                delete countriesLive[name];

            }

        });

        return countriesLive;

    }
    static mergeFranceLive({store, countriesLive, franceLive}) {

        const fraLive = store.getters["APIsStatus/find"]({
            keysValues: [{key: "type", value: "live"}, {key: "location", value: "country"}]
        }).data.status;

        if (fraLive) {
            countriesLive.France.All = {...countriesLive.France.All, ...franceLive[0]};
        }

        return countriesLive;

    }
    static mergeCountriesInfos({store, Location, countriesLive, countriesInfos}) {

        const countriesInfosReqStatus = store.getters["APIsStatus/find"]({
            keysValues: [{key: "type", value: "root"}]
        }).data.status;

        if (countriesInfosReqStatus) {
            countriesLive = CountryInfosMerger.merge({countriesLive, countriesInfos, Location});
        }

        return countriesLive;

    }
}