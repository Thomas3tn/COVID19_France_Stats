//import StringCustomMethods from "../../DatasCalculator/TextFunctionalities.js";


//If name is not contains inside datas, add object name key property to it

export default class CountriesMerger {
    static merge({store, apisKeysMapper, countriesLive, franceLive, vaccination, countriesInfos, histConfirmed, histFranceDeaths, histGlobalDeaths}) {
        
        countriesLive = this.addName({countriesLive, apisKeysMapper});
        countriesLive = this.mergeVaccination({store, countriesLive, vaccination});
        countriesLive = this.mergeFranceLive({store, countriesLive, franceLive});
        countriesLive = this.mergeCountriesInfos({store, apisKeysMapper, countriesLive, countriesInfos});
        countriesLive = this.mergeHistStatus({store, countriesLive, histConfirmed, histFranceDeaths, histGlobalDeaths});

        return countriesLive;

    }
    static addName({countriesLive, apisKeysMapper}) {

        Object.entries(countriesLive).forEach(([name, datas]) => {

            if (apisKeysMapper.find({datas: datas.All, key: "name"}) === null) {
                datas.All[apisKeysMapper.getMap().name[0]] = name;
            }

        });

        return countriesLive;

    }
    static mergeVaccination({store, countriesLive, vaccination}) {

        const vaccReqStatus = store.getters["APIsStatus/find"]({
            APIType: "worldCovidDatas", 
            keysValues: [{key: "type", value: "vaccination"}]
        }).data.status;

        if (vaccReqStatus) {

            //Add vaccines datas for each country
            Object.entries(vaccination).forEach(([countryName, vaccDatas]) => {

                //Test if the both vaccines country and cases country have the same country name
                if (countriesLive[countryName]) {
                    countriesLive[countryName].All = {...countriesLive[countryName].All, ...vaccDatas.All};
                }

            });

        }

        return countriesLive;

    }
    static mergeFranceLive({store, countriesLive, franceLive}) {

        const fraLive = store.getters["APIsStatus/find"]({
            APIType: "franceCovidDatas", 
            keysValues: [{key: "type", value: "live"}, {key: "location", value: "country"}]
        }).data.status;

        if (fraLive) {
            countriesLive.France.All = {...countriesLive.France.All, ...franceLive[0]};
        }

        return countriesLive;

    }
    static mergeCountriesInfos({store, apisKeysMapper, countriesLive, countriesInfos}) {

        const countriesInfosReqStatus = store.getters["APIsStatus/find"]({
            APIType: "countriesInfosDatas", 
            keysValues: [{key: "type", value: "root"}]
        }).data.status;

        if (countriesInfosReqStatus) {

            countriesInfos.forEach(RESTCountry => {

                //Trying to match countriesLive country and RESTCountries country by name
                let matchedCovidCountry = countriesLive[apisKeysMapper.find({datas: RESTCountry, key: "name"})] || null;

                if (matchedCovidCountry === null) {

                    //Trying to match countriesLive country and RESTCountries country by altSpellings (name/abbreviation)
                    const RESTAltSpellings = apisKeysMapper.find({datas: RESTCountry, key: "altSpellings"});
                    const RESTTranslations = apisKeysMapper.find({datas: RESTCountry, key: "translations"});

                    if (RESTAltSpellings || RESTTranslations) {

                        matchedCovidCountry = Object.entries(countriesLive).find(([name, datas]) => {

                            const CovidAltSpellings = [
                                name, 
                                apisKeysMapper.find({datas: datas.All, key: "abbreviation"})
                            ];

                            if (RESTAltSpellings.some(altSpelling => CovidAltSpellings.includes(altSpelling))) {
                                return true;
                            } else {
                            
                                //Trying to match both countries by translations
                                const haveCountriesMatched = Object.values(RESTTranslations).find(translation => Object.values(translation).includes(name));
                                return haveCountriesMatched ? true : false;

                            }

                        }) || null;

                    }

                    if (matchedCovidCountry !== null) {
                        matchedCovidCountry = matchedCovidCountry[1];
                    }

                }

                if (matchedCovidCountry) {
                    matchedCovidCountry.All = {...matchedCovidCountry.All, ...RESTCountry};
                }

            });

        }

        return countriesLive;

    }
    static mergeHistStatus({store, countriesLive, histConfirmed, histFranceDeaths, histGlobalDeaths}) {

        const histReqStatus = store.getters["APIsStatus/find"]({
            APIType: "worldCovidDatas", 
            keysValues: [{key: "type", value: "historical"}]
        }).data.status;

        if (histReqStatus) {

            const histConfirmedReqStatus = store.getters["APIsStatus/find"]({
                APIType: "worldCovidDatas", 
                keysValues: [{key: "type", value: "confirmed"}]
            }).data.status;
            const histDeathsReqStatus = store.getters["APIsStatus/find"]({
                APIType: "worldCovidDatas", 
                keysValues: [{key: "type", value: "deaths"}]
            }).data.status;

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
}