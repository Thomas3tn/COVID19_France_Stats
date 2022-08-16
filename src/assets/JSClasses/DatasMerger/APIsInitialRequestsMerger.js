import WorldMerger from "./Mergers/WorldMerger";
import ContinentsMerger from "./Mergers/ContinentsMerger";
import CountriesMerger from "./Mergers/CountriesMerger";
import DepartementsMerger from "./Mergers/DepartementsMerger";

import Location from "../Models/Location/Location.js";
import locationWithAPIKeysMapper from "../decorators/locationWithAPIKeysMapper.js";

import World from "../Models/Location/Locations/World.js";
import Continent from "../Models/Location/Locations/Continent.js";
import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

export default class APIsInitialRequestsMerger {
    static merge({store, APIsDatas}) {

        let mergedDatas = {};
        const DecLocation = locationWithAPIKeysMapper({Location});

        if (APIsDatas.rootRequests.countriesLive) {
            
            const mergedCountries = APIsInitialRequestsMerger.mergeCountriesDatas({
                store, 
                DecLocation, 
                APIsDatas: {...APIsDatas.rootRequests, ...APIsDatas.additionalRequests}
            });
            mergedDatas = {...mergedCountries, ...mergedDatas};

        }

        if (APIsDatas.rootRequests.departementsLive) {

            const mergedDepartements = APIsInitialRequestsMerger.mergeDepartementsDatas({
                store,
                APIsDatas: {...APIsDatas.rootRequests, ...APIsDatas.additionalRequests}
            });
            mergedDatas = {...mergedDepartements, ...mergedDatas};

        }

        return mergedDatas;

    }
    static mergeDepartementsDatas({store, APIsDatas}) {

        let mergedDatas = {};

        mergedDatas[Departement.type] = DepartementsMerger.merge({
            store,
            departementsLive: APIsDatas.departementsLive,
            departementsHist: APIsDatas.departementsHist
        });

        return mergedDatas;
    
    }
    static mergeCountriesDatas({store, DecLocation, APIsDatas}) {

        let mergedDatas = {};

        mergedDatas[Country.type] = CountriesMerger.merge({
            store,
            Location: DecLocation,
            countriesLive: APIsDatas.countriesLive?.countriesLive,
            franceLive: APIsDatas?.franceLive,
            countriesVacc: APIsDatas?.countriesVacc,
            countriesInfos: APIsDatas?.countriesInfos,
            histConfirmed: APIsDatas?.histConfirmed,
            histFranceDeaths: APIsDatas?.histFranceDeaths, 
            histGlobalDeaths: APIsDatas?.histGlobalDeaths,
            departementsLive: APIsDatas?.departementsLive
        });

        mergedDatas[World.type] = WorldMerger.merge({countries: mergedDatas[Country.type]});
        mergedDatas[Continent.type] = ContinentsMerger.merge({
            store, 
            countries: mergedDatas[Country.type], 
            Location: DecLocation
        });

        console.log(mergedDatas[World.type])

        return mergedDatas;

    }
}