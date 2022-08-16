import Country from "../Models/Location/Locations/Country.js";
import Departement from "../Models/Location/Locations/Departement.js";

import APICallerFactory from "../Factories/APICallerFactory.js";
import APIsInitialDatas from "../Models/API/APIsInitialDatas.js";

export default class APIsDatasRequests {
    static async get({store, requests}) {

        const apisInitialDatas = new APIsInitialDatas();

        const APIsCallers = APIsDatasRequests.setRequestedCallers({requests, store});

        const rootDatas = await APIsDatasRequests.setRootRequests({APIsCallers});
        APIsDatasRequests.recordAPIsResponses({APIsResponses: rootDatas, apisInitialDatas, requestType: "root"});
        
        const additionalDatas = await APIsDatasRequests.setAdditionalRequests({
            rootDatas, 
            APIsCallers
        });
        APIsDatasRequests.recordAPIsResponses({APIsResponses: additionalDatas, apisInitialDatas, requestType: "additional"});

        return apisInitialDatas;

    }
    static setRequestedCallers({requests, store}) {

        const callers = {};
        requests.forEach(locType => callers[locType] = new APICallerFactory({store, type: locType}));
        return callers;

    }
    static async setRootRequests({APIsCallers}) {

        let datas = await Promise.all([
            APIsCallers[Country.type].setRoot(),
            APIsCallers[Departement.type].setRoot()
        ]);

        datas = {
            [Country.type]: datas[0],
            [Departement.type]: datas[1]
        };

        Object.entries(datas).forEach(([key, value]) => {

            if (value === null) {
                delete datas[key];
            }

        });

        return datas;

    }
    static async setAdditionalRequests({rootDatas, APIsCallers}) {

        const additionalDatas = {};
        const locationsOrder = [];

        let datas = await Promise.all(Object.entries(rootDatas).map(([locType, data]) => {

            if (data !== false) {

                locationsOrder.push(locType);
                const datas = APIsCallers[locType].setAdditional();
                return datas;

            }

        }));

        datas.forEach((data, index) => additionalDatas[locationsOrder[index]] = data);

        return additionalDatas;

    }
    static recordAPIsResponses({APIsResponses, apisInitialDatas, requestType}) {

        let APIsDatas = {};
        let APIsRequests = [];

        Object.values(APIsResponses).forEach(locDatas => {

            Object.entries(locDatas).forEach(([APIRequestType, APIResponse]) => {

                APIsDatas[APIRequestType] = APIResponse.datas;
                APIsRequests = [...APIsRequests, ...APIResponse.requests]

            });

        });

        apisInitialDatas.addDatas({requestType, datas: APIsDatas});
        apisInitialDatas.addRequests({requestType, requests: APIsRequests});

    }
}