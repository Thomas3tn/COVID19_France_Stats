import CountryLiveProxy from "../../Proxys/Requests/Country/CountryLive.js";
import CountryHistoricalProxy from "../../Proxys/Requests/Country/CountryHistorical.js";
import CountriesInfosProxy from "../../Proxys/Requests/Country/CountriesInfos.js";
import CountriesVaccination from "../../Proxys/Requests/Country/CountryVaccination.js";
import FranceLive from "../../Proxys/Requests/Country/FranceLive.js";

export default class CountriesRequests {
    constructor({store}) {

        this.store = store;

    }
    async setRoot() {

        const countryLiveProxy = new CountryLiveProxy({store: this.store});
        return {
            countriesLive: await countryLiveProxy.get()
        }

    }
    async setAdditional() {

        [this.countriesInfosProxy, this.countryHistoricalProxy, this.countriesVaccination, this.franceLive] = [new CountriesInfosProxy({store: this.store}), new CountryHistoricalProxy({store: this.store}), new CountriesVaccination({store: this.store}), new FranceLive({store: this.store})];

        let APIsDatas = await Promise.all([
            this.countriesInfosProxy.get(),
            this.countryHistoricalProxy.get({status: ["confirmed"], type: "country"}),
            this.countryHistoricalProxy.get({name: "France", status: ["deaths"], type: "country"}),
            this.countryHistoricalProxy.get({name: "Global", status: ["deaths"], type: "global"}),
            this.countriesVaccination.get(),
            this.franceLive.get()
        ]);

        return {
            countriesInfos: APIsDatas[0],
            histConfirmed: APIsDatas[1],
            histFranceDeaths: APIsDatas[2],
            histGlobalDeaths: APIsDatas[3],
            countriesVacc: APIsDatas[4],
            franceLive: APIsDatas[5]
        }

    }
}