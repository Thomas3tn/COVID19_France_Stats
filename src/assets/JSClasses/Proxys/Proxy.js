export default class Proxy {
    constructor({store}) {

        this.store = store;

    }
    getCachedLocation({nodeType, name, nodePath = false}) {

        try {

            let selectedLocation = {};

            this.store.getters["APIsDatas/forEachBreadthFirst"](currLocation => {
            
                if (currLocation.data.type === nodeType) {

                    const path = nodePath === false ? currLocation.data : currLocation.data[nodePath];

                    if (path === name) {
                        selectedLocation = currLocation.data;
                    }

                }

            });

            return Object.keys(selectedLocation).length > 0 ? selectedLocation : null;

        } catch {
            return null;
        }

    }
}