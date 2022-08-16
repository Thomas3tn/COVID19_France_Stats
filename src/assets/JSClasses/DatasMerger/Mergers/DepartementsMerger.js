import DepartementsStatic from "../../../staticDatas/Departements.js";
import Merger from "../Merger.js";
import Departement from "../../Models/Location/Locations/Departement.js";

export default class DepartementsMerger extends Merger {
    
    static merge({store, departementsLive, departementsHist}) {

        const MERGING_METHODS = ["getDatasObject", "formatDatasObject", "mergeDepartementsStatic", "mergeWeekAgoHistDatas"];

        MERGING_METHODS.forEach(METHOD => departementsLive = DepartementsMerger.mergingErrorHandler(
            DepartementsMerger[METHOD]({
                store,
                departementsLive,
                departementsStatic: DepartementsStatic,
                departementsHist
            })
        ));

        return departementsLive;

    }
    static getDatasObject({departementsLive}) {

        const datasObject = {};
        departementsLive.forEach(currDep => datasObject[currDep.dep] = currDep);
        return datasObject;

    }
    static formatDatasObject({departementsLive}) {

        const formattedObject = {};

        Object.entries(departementsLive).forEach(([code, datas]) => {

            formattedObject[code] = {
                All: datas
            }

        });

        return formattedObject;

    }
    static mergeDepartementsStatic({store, departementsLive, departementsStatic}) {

        const depLiveReqStatus = store.getters["APIsStatus/find"]({
            APIType: "franceCovidDatas", 
            keysValues: [{key: "type", value: "live"}, {key: "location", value: Departement.type}]
        }).data.status;

        if (depLiveReqStatus) {

            Object.entries(departementsLive).forEach(([code, datas]) => {

                if (departementsStatic[`DEP${code}`]) {
                    Object.entries(departementsStatic[`DEP${code}`]).forEach(([status, data]) => datas.All[status] = data);
                }
    
            });

        }

        return departementsLive;

    }
    static mergeWeekAgoHistDatas({store, departementsLive, departementsHist}) {

        const depsHistStatus = store.getters["APIsStatus/find"]({ 
            keysValues: [{key: "type", value: "historical"}, {key: "location", value: Departement.type}]
        }).data.status;

        console.log(depsHistStatus, departementsLive, departementsHist)

        if (depsHistStatus) {
            departementsHist.forEach(currDep => departementsLive[currDep.dep].All.historical = [currDep]);
        }

        return departementsLive;

    }
}