import Continent from "../../assets/JSClasses/Models/Location/Locations/Continent.js";
import Country from "../../assets/JSClasses/Models/Location/Locations/Country.js";
import Departement from "../../assets/JSClasses/Models/Location/Locations/Departement.js";

export default {
    namespaced: true,
    state: () => ({
        content: {},
        query: {
            type: null,
            name: null
        }
    }),
    mutations: {
        CREATE_CONTENT_OBJECT: (state, locTypes) => locTypes.forEach(locType => state.content[locType] = null),
        UPDATE_CONTENT(state, {type, name}) {

            if (Object.prototype.hasOwnProperty.call(state.content, type)) {
                state.content[type] = name;
            }
            
        },
        RESET_CONTENT(state, {type}) {

            if (Object.prototype.hasOwnProperty.call(state.content, type)) {
                state.content[type] = null;
            }

        },
        SUBMIT_CONTENT(state) {

            const LOCATIONS_ORDER = [Departement.type, Country.type, Continent.type];

            const type = LOCATIONS_ORDER.find(locType => typeof state.content[locType] !== "undefined" && state.content[locType] !== null);
            state.query = {
                type,
                name: state.content[type]
            }

        }
    },
    getters: {
        getRequestedLocation: (state) => () => state.query,
        isSelectionEmpty: (state) => () => {
            
            const values = Object.values(state.content);
            const isValid = values.every(selection => [null].includes(selection));
            isValid ? true : false
        
        }
    }
}