export default class APIsRequestsMerger {
    static merge({store, requests}) {

        APIsRequestsMerger.addRequests({store, requests: requests.rootRequests});
        APIsRequestsMerger.addRequests({store, requests: requests.additionalRequests});

    }
    static addRequests({store, requests}) {

        requests.forEach(request => {

            store.dispatch("APIsStatus/addNode", {
                infos: request.infos, 
                parentKeysValues: request.parentKeysValues,
                //idKeysValues: request.idKeysValues
            });

        });

    }
}