import Proxy from "../../Proxy.js";
import CountriesHistoricalDatasAPI from "../../../APIs/Requests/CountriesHistoricalAPI.js";

import Country from "../../../Models/Location/Locations/Country.js";

export default class CountryHistoricalProxy extends Proxy {
    constructor({store}) {

        super({store});
        this.worldHistoricalDatasAPI = new CountriesHistoricalDatasAPI(store);

    }
    async get({name = false, status = [...CountriesHistoricalDatasAPI.STATUS], nodeType = Country.type, cachedCountry = false}) {

        if (cachedCountry === false) {
            cachedCountry = this.getCachedLocation({name, nodeType, nodePath: "historical"});
        } 

        if (cachedCountry) {

            status = this.getUnregisteredStatus({cachedCountry, status});

            if (status === null) {
                return cachedCountry;
            }
        
        }

        return await this.worldHistoricalDatasAPI.get({name, status});

    }
    getUnregisteredStatus({cachedCountry, status}) {

        const unregisteredStatus = status.filter(currStatus => cachedCountry.registeredHistoricalStatus.includes(currStatus) === false);
        return unregisteredStatus.length === 0 ? null : unregisteredStatus;

    }
}