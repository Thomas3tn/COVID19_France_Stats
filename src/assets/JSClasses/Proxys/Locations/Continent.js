import Continent from "../../Models/Location/Locations/Continent.js";

import Proxy from "../Proxy.js";

export default class ContinentProxy extends Proxy {
    constructor({store}) {

        super({store});

        if (ContinentProxy.exists) {
            return ContinentProxy.instance;
        }

        ContinentProxy.exists = true;
        ContinentProxy.instance = this;

        return this;

    }
    async get({name = false, nodeType = Continent.type}) {

        console.log(name, nodeType)

        const location = this.getCachedDatas({name, nodeType, nodePath: "name"})[0];
        console.log(location);
        return await new Promise(resolve => resolve(location));

    }
}