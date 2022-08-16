import Departement from "../../Models/Location/Locations/Departement.js";
import Proxy from "../Proxy.js";
import DepartementsHistoricalAPI from "../../APIs/Requests/DepartementHistoricalAPI.js";

export default class DepartementProxy extends Proxy {
    constructor({store}) {

        super({store});

        if (DepartementProxy.exists) {
            return DepartementProxy.instance;
        }

        DepartementProxy.exists = true;
        DepartementProxy.instance = this;

        this.departementHistorical = new DepartementsHistoricalAPI({store});

        return this;

    }
    async get({name = false}) {

        console.log(name);

        const cachedDepartement = this.getCachedLocation({name, nodeType: Departement.type, nodePath: "name"});
        console.log(cachedDepartement)

        try {

            const APIsDatas = await this.departementHistorical.get({name, cachedDepartement});
            console.log(APIsDatas);
            cachedDepartement.setHistorical({datas: APIsDatas.datas})

        } catch (error) {
            console.error(error);
        }

        return cachedDepartement;

    }
}