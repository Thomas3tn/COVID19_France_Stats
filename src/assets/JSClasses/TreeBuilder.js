import LocationTypesFactory from "./Factories/LocationTypesFactory.js";

//import _ from "lodash";

//Add correct parentKeyValue (ex continent name)
//Dynamic parent Node depending on API datas availability

export default class TreeBuilder {
    static buildTree({store, APIsDatas}) {

        const treeLevelsDatas = this.setTreeLevelsDatas({APIsDatas});
        this.addNodes({store, treeLevelsDatas});

    }
    static setTreeLevelsDatas({APIsDatas}) {

        return [
            {datas: APIsDatas.world, type: "world"},
            {datas: APIsDatas.continents, type: "continent"},
            {datas: APIsDatas.countries, type: "country"},
            {datas: APIsDatas.departements, type: "departement"}
        ];


    }
    static addNodes({store, treeLevelsDatas}) {

        let previousNodeType = null;

        treeLevelsDatas.forEach(geoLvl => {

            Object.values(geoLvl.datas).forEach(location => {
                
                const node = new LocationTypesFactory({datas: location, type: geoLvl.type});
                const parentKeysValues = this.setParentKeysValues({nodeType: geoLvl.type, previousNodeType, node})
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

        if (["country", "departement"].includes(nodeType)) {

            parentKeysValues.push({
                key: "name", 
                value: nodeType === "country" ? node.infos.region : "France"
            });

        }

        return parentKeysValues;

    }
}