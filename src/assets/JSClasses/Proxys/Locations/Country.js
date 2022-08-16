import CountryHistoricalProxy from "../Requests/Country/CountryHistorical.js";
import Proxy from "../Proxy.js";
import Country from "../../Models/Location/Locations/Country.js";

export default class CountryProxy extends Proxy {
    constructor({store}) {

        super({store});

        if (CountryProxy.exists) {
            return Country.instance;
        }

        CountryProxy.exists = true;
        CountryProxy.instance = this;

        this.countryHistorical = new CountryHistoricalProxy({store});

        return this;

    }
    async get({name, nodeType = Country.type}) {

        if (this.onNameError({name}) === false) {
            return;
        }

        const cachedCountry = this.getCachedLocationHandler({name, nodeType});

        try {

            const APIsDatas = await this.countryHistorical.get({name, nodeType, cachedCountry});
            cachedCountry.addNewHistoricalStatus({datas: APIsDatas.datas});

        } catch (error) {
            console.warn(error);
        }

        return cachedCountry;

    }
    onNameError({name}) {

        if (name === false) {

            console.warn("A country name must be filled in when using the country proxy.");
            return false;

        }

    }
    getCachedLocationHandler({name, nodeType}) {

        try {
            return this.getCachedLocation({name, nodeType, nodePath: "name"})
        } catch (error) {

            console.warn(`An error has occured while retrieving the requested cached country. ${error}`);
            throw "Non-existent data";

        }

    }
}