import DepartementsStatic from "../../../staticDatas/Departements.js";

export default class DepartementsMerger {
    static merge({store, departementsLive}) {

        departementsLive = this.formatDatasObject({departementsLive});
        return this.mergeDepartementsStatic({store, departementsLive, departementsStatic: DepartementsStatic});

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
            keysValues: [{key: "type", value: "live"}, {key: "location", value: "departement"}]
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
}