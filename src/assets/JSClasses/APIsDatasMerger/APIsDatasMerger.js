import WorldMerger from "./Mergers/WorldMerger";
import ContinentsMerger from "./Mergers/ContinentsMerger";
import CountriesMerger from "./Mergers/CountriesMerger";
import CountriesFallbackMerger from "./Mergers/CountriesFallbackMerger";
import DepartementsMerger from "./Mergers/DepartementsMerger";

import APIsKeysMapper from "./APIsKeysMapper.js";

export default class APIsDatasMerger {
    static merge({store, APIsDatas}) {

        const apisKeysMapper = new APIsKeysMapper();
        const countriesMerger = this.getAdaptedMerger({store});

        const departements = DepartementsMerger.merge({
            store,
            departementsLive: APIsDatas.departementsLive
        });

        let countries = {};
        if (countriesMerger) {

            countries = countriesMerger.merge({
                store,
                apisKeysMapper,
                countriesLive: APIsDatas.countriesLive?.countriesLive,
                franceLive: APIsDatas.countriesLive?.franceLive,
                franceInfos: APIsDatas.countriesLive?.franceInfos,
                vaccination: APIsDatas.countriesLive?.vaccination,
                countriesInfos: APIsDatas.countriesLive?.countriesInfos,
                histConfirmed: APIsDatas?.histConfirmed,
                histFranceDeaths: APIsDatas?.histFranceDeaths, 
                histGlobalDeaths: APIsDatas?.histGlobalDeaths,
                departementsLive: APIsDatas?.departementsLive
            });

        }

        const world = WorldMerger.merge({countries});
        const continents = ContinentsMerger.merge({store, countries, apisKeysMapper});

        return {
            departements,
            countries,
            continents,
            world
        }

    }
    static getAdaptedMerger({store}) {

        const countriesLiveMainReqStatus = store.getters["APIsStatus/find"]({APIType: "worldCovidDatas", keysValues: [{key: "type", value: "live"}]}).data.status;
        const countriesLiveFallbackReqStatus = store.getters["APIsStatus/find"]({APIType: "franceCovidDatas", keysValues: [{key: "type", value: "live"}, {key: "location", value: "country"}]}).data.status

        if ([countriesLiveMainReqStatus, countriesLiveFallbackReqStatus].includes(true)) {
            return countriesLiveMainReqStatus === true ? CountriesMerger : CountriesFallbackMerger;
        } else {
            return null;
        }

    }
}