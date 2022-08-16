import Proxy from "../../Proxy.js";

import Country from "../../../Models/Location/Locations/Country.js";
import CountriesVaccinationAPI from "../../../APIs/Requests/CountriesVaccination.js";

export default class CountryVaccination extends Proxy {
    constructor({store}) {

        super({store});
        this.countriesVaccinationAPI = new CountriesVaccinationAPI();

    }
    async get(country = false) {

        const cachedDatas = this.getCachedLocation({name: country, nodeType: Country.type, nodePath: "vaccination"});

        if (cachedDatas !== null) {
            return cachedDatas;
        }

        return await this.countriesVaccinationAPI.get();

    }
}