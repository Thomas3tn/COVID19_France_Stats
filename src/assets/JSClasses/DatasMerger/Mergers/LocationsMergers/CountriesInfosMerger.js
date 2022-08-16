export default class CountriesInfosMerger {
    static merge({countriesLive, countriesInfos, Location}) {

        countriesInfos.forEach(RESTCountry => {

            let matchedCovidCountry = CountriesInfosMerger.matchByName({countriesLive, RESTCountry, Location});

            if (matchedCovidCountry === false) {
                matchedCovidCountry = CountriesInfosMerger.setManualSearch({countriesLive, RESTCountry, Location});
            }

            if (matchedCovidCountry) {
                matchedCovidCountry.All = {...matchedCovidCountry.All, ...RESTCountry};
            }

        });
        
        return countriesLive;

    }
    static matchByName({countriesLive, RESTCountry, Location}) {
        return countriesLive[Location.findAPIPath({datas: RESTCountry, key: "name"})] || false;
    }
    static setManualSearch({countriesLive, RESTCountry, Location}) {

        const RESTAltSpellings = Location.findAPIPath({datas: RESTCountry, key: "altSpellings"});
        const RESTTranslations = Location.findAPIPath({datas: RESTCountry, key: "translations"});

        if (RESTAltSpellings || RESTTranslations) {

            return Object.entries(countriesLive).find(([name, datas]) => {

                let haveCountriesMatched

                haveCountriesMatched = CountriesInfosMerger.matchByAltSpellings({name, datas, Location, RESTAltSpellings});

                if (haveCountriesMatched) {
                    return true;
                }

                haveCountriesMatched = CountriesInfosMerger.matchByTranslations({RESTTranslations, name});

                if (haveCountriesMatched) {
                    return true;
                }

                haveCountriesMatched = CountriesInfosMerger.matchByCapitalCity({name, RESTCountry, Location});

                if (haveCountriesMatched) {
                    return true;
                }

            })?.[1] || null;

        } else {
            return null;
        }

    }
    static matchByAltSpellings({name, datas, Location, RESTAltSpellings}) {

        const covidSpellings = [
            name, 
            Location.findAPIPath({datas: datas.All, key: "abbreviation"})
        ];

        return RESTAltSpellings.some(altSpelling => covidSpellings.includes(altSpelling));

    }
    static matchByTranslations({RESTTranslations, name}) {

        return Object.values(RESTTranslations).find(translation => Object.values(translation).includes(name)) || false;

    }
    //In order to differentiate both Congos
    static matchByCapitalCity({RESTCountry, name, Location}) {

        let covidCapitalCity = name.match(/\([a-z]{1,}\)/i)?.[0] || false;

        if (covidCapitalCity) {

            covidCapitalCity = covidCapitalCity.match(/[a-z]{1,}/i)[0];
            let RESTCapitalCity = Location.findAPIPath({datas: RESTCountry, key: "capital_city"});

            return RESTCapitalCity === covidCapitalCity ? true : false;

        } else {
            return false;
        }

    }
}