import DepartementLiveProxy from "../../Proxys/Requests/Departement/DepartementLive.js";
import DepartementHistoricalProxy from "../../Proxys/Requests/Departement/DepartementHistorical.js";
import DateCustomMethods from "../../CustomMethods/Date.js";

export default class DepartementsRequests {
    constructor({store}) {

        this.store = store;

    }
    async setRoot() {

        const departementProxy = new DepartementLiveProxy({store: this.store});
        return {
            departementsLive: await departementProxy.get()
        };

    }
    async setAdditional() {

        const departementHistProxy = new DepartementHistoricalProxy({store: this.store});
        const date = DateCustomMethods.switchDateFormat({date: DateCustomMethods.dateFromTimestamp({date: this.store.state.weekAgoTimestamp})});

        return {
            departementsHist: await departementHistProxy.get({date})
        };

    }
}