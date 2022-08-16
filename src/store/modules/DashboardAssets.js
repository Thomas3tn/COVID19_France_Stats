import { 
    faCross, 
    faHospitalUser, 
    faMale, 
    faProcedures, 
    faSyringe, 
    faWalking, 
    faUsers, 
    faMapMarkedAlt, 
    faHourglassStart, 
    faHourglassEnd, 
    faListAlt, 
    faList, 
    faSearch, 
    faCalendarPlus, 
    faGlobeEurope, 
    faGlobeAfrica, 
    faGlobeAsia, 
    faGlobeAmericas, 
    faFlag, 
    faMapMarkerAlt, 
    faShip, 
    faTrophy,
    faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

export default {
    namespaced: true,
    state: () => ({
        ICONS: {
            STATUS: {
                CONFIRMED: faMale,
                DEATHS: faCross,
                RECOVERED: faWalking,
                HOSPITALIZATIONS: faHospitalUser,
                NEW_HOSPITALIZATIONS: faHospitalUser,
                INTENSIVE_CARE: faProcedures,
                NEW_INTENSIVE_CARE: faProcedures,
                VACCINATED: faSyringe,
                PARTIALLY_VACCINATED: faSyringe,
                POPULATION: faUsers,
                UNVACCINATED: faUsers
            },
            FORM: {
                DATATYPE: faListAlt,
                DATA_LIST: faList,
                START_DATE: faHourglassStart,
                END_DATE: faHourglassEnd,
                SEARCH: faSearch,
                ADD_CUSTOM_PERIOD: faCalendarPlus,
                SWITCH_PERIOD: faCalendarAlt
            },
            RELATIVE_DATAS: {
                THOUSANDS_OF_HABS: faUsers,
                KM2: faMapMarkedAlt
            },
            LOCATION: {
                EUROPE: faGlobeEurope,
                AFRICA: faGlobeAfrica,
                ASIA: faGlobeAsia,
                OCEANIA: faGlobeAsia,
                NORTH_AMERICA: faGlobeAmericas,
                SOUTH_AMERICA: faGlobeAmericas,
                OTHERS: "",
                SHIP: faShip,
                EVENT: faTrophy,
                COUNTRY: faFlag,
                DEPARTEMENT: faMapMarkerAlt
            }
        },
        COLORS: {
            COLORS: {
                CONFIRMED: "#FF6866",
                DEATHS: "#A0A0A0",
                RECOVERED: "#3CF525",
                HOSPITALIZATIONS: "#FFC042",
                INTENSIVE_CARE: "#FF6866",
                VACCINATED: "#334455",
                PARTIALLY_VACCINATED: "#457b9d",
                ADMINISTRED: "#2DFF90",
                POPULATION: "#5caddf",
                UNVACCINATED: "#5caddf",
                NEW_HOSPITALIZATIONS: "#FFC042",
                NEW_INTENSIVE_CARE: "#FF6866",
            },
            GRADIENTS: {
                CONFIRMED: {
                    1: "#FFF5C7",
                    2: "#FECCA7",
                    3: "#FDA38B",
                    4: "#ff8581",
                    5: "#eb4a5f",
                    6: "#e73a51"
                },
                DEATHS: {
                    1: "#D6D6D6",
                    2: "#BDBDBD",
                    3: "#9C9C9C",
                    4: "#7F7E7E",
                    5: "#5D5D5D",
                    6: "#3A3A3A"
                },
                RECOVERED: {
                    1: "#B5F0AD",
                    2: "#9EF093",
                    3: "#87EF79",
                    4: "#71EF61",
                    5: "#59F146",
                    6: "#3CF525"
                },
                HOSPITALIZATIONS: {
                    1: "#FFE1A4",
                    2: "#FFDA90",
                    3: "#FFD47F",
                    4: "#FFCE6C",
                    5: "#FFC655",
                    6: "#FFC042"
                },
                INTENSIVE_CARE: {
                    1: "#FFF5C7",
                    2: "#FECCA7",
                    3: "#FDA38B",
                    4: "#ff8581",
                    5: "#eb4a5f",
                    6: "#e73a51"
                }
            }
        }
    }),
    mutations: {},
    actions: {},
    getters: {}
}