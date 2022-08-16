import LocationTypesFactory from "../Factories/LocationTypesFactory.js";

import Location from "../Models/Location/Location.js";
import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";
import World from "../Models/Location/Locations/World.js";
import Continent from "../Models/Location/Locations/Continent.js";

//import _ from "lodash";

export default class TreeBuilder {
    static build({store, APIsDatas, cachedDatas = false}) {

        const treeLevelsDatas = this.setTreeLevelsDatas({APIsDatas, cachedDatas});
        this.addNodes({store, treeLevelsDatas});

    }
    static setTreeLevelsDatas({APIsDatas, cachedDatas}) {

        const LOCATIONS_ORDER = [World.type, Continent.type, Country.type, Departement.type];
        const treeLevelsDatas = [];

        LOCATIONS_ORDER.forEach(LOCATION => {

            let datas = {};

            try {

                datas = cachedDatas?.find(geoLvl => geoLvl.type === LOCATION);
                treeLevelsDatas.push(datas);

            } catch {

                if (APIsDatas[LOCATION]) {

                    datas = {datas: APIsDatas[LOCATION], type: LOCATION};
                    treeLevelsDatas.push(datas);

                }
            
            }

        });

        return treeLevelsDatas;

    }
    static addNodes({store, treeLevelsDatas}) {

        let previousNodeType = null;

        console.log(treeLevelsDatas);

        treeLevelsDatas.forEach(geoLvl => {

            Object.values(geoLvl.datas).forEach(location => {

                let node = {};

                //If datas come from local storage and already formatted
                if (location instanceof Location === false) {
                    node = new LocationTypesFactory({datas: location, type: geoLvl.type});
                }
                
                const parentKeysValues = this.setParentKeysValues({nodeType: geoLvl.type, previousNodeType, node});
                store.dispatch("APIsDatas/addNode", {
                    datas: node, 
                    parentKeysValues
                });
    
            });

            previousNodeType = geoLvl.type;

        });

    }
    static setParentKeysValues({nodeType, previousNodeType, node}) {

        const parentKeysValues = [{key: "type", value: previousNodeType}];

        if ([Country.type, Departement.type].includes(nodeType)) {

            parentKeysValues.push({
                key: "name", 
                value: nodeType === Country.type ? node.infos.region : "France"
            });

        }

        return parentKeysValues;

    }
}