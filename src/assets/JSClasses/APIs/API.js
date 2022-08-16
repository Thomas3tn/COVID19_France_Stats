import APIRequest from "../Models/API/APIRequest.js";
import APIsDatas from "../Models/API/APIsDatas.js";

import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

export default class API {
    static APIRequest = APIRequest;
    static COUNTRY_TYPE = Country.type;
    static DEPARTEMENT_TYPE = Departement.type;
    constructor() {

        this.APIRequest = API.APIRequest;
        this.APIsDatas = APIsDatas;

    }
}