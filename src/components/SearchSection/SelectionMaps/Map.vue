<template>

    <div class="headerContainer">
        <h2 class="header">{{ name }} <span class="header--status">{{ status.toUpperCase() }}</span></h2>
        <p class="description">{{ description }}</p>
    </div>

    <world-map 
        v-if="locName === LOC_NAMES.WORLD"
        class="selectionMap"
        @location-selected="transmitSelection"
    >
    </world-map>

    <france-map 
        v-else-if="locName === LOC_NAMES.FRANCE"
        class="selectionMap"
        @location-selected="transmitSelection"
    >
    </france-map>

</template>

<script>
import WorldMap from "./Map/World.vue";
import FranceMap from "./Map/France.vue";
import { useStore } from "vuex";
import { inject, computed, onMounted } from "vue";
import DateCustomMethods from "../../../assets/JSClasses/CustomMethods/Date.js";

export default {
    props: {
        name: {
            type: String,
            required: true,
            validator(value) {
                return ["FRANCE", "MONDE"].includes(value.toUpperCase())
            }
        },
        status: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    emits: ["location-selected"],
    setup(props, context) {
        
        const store = useStore();
        const LOC_TYPES = inject("LOCATION_TYPES");
        const LOC_NAMES = {
            WORLD: "MONDE",
            FRANCE: "FRANCE"
        };

        const locName = computed(() => props.name.toUpperCase());

        const MAP_KEYS = computed(() => {

            const MAP_KEYS = {};
            const MAP_KEYS_SETTINGS = {
                MONDE: {
                    KEYS_NUMBER: 7,
                    MIN: [0, 201, 1001, 9001, 50001, 100001, 200001],
                    MAX: [200, 1000, 9000, 50000, 100000, 200000, 1000000000000000000000]
                },
                FRANCE: {
                    KEYS_NUMBER: 5,
                    MIN: [0, 10, 25, 50, 100],
                    MAX: [10, 25, 50, 100, 100000000000000000000]
                }
            }

            for (let i = 0; i < MAP_KEYS_SETTINGS[locName.value].KEYS_NUMBER; i++) {

                MAP_KEYS[i+1] = {
                    MIN: MAP_KEYS_SETTINGS[locName.value].MIN[i],
                    MAX: MAP_KEYS_SETTINGS[locName.value].MAX[i],
                    CLASS: `confirmedCasesLvl${i+1}`
                }

            }

            return MAP_KEYS;

        });

        const list = computed(() => {

            const list = {};
            const LOC_TYPE = locName.value === LOC_NAMES.WORLD ? LOC_TYPES.COUNTRY : LOC_TYPES.DEPARTEMENT;
            store.getters["APIsDatas/forEachBreadthFirst"](location => {

                if (location.data.type === LOC_TYPE) {
                    list[location.data.infos.abbreviation] = location.data;
                }

            });
            
            return list;

        });

        const getHospPerThous = ({list, mapPathId}) => (list[mapPathId].live.hospitalizations / list[mapPathId].infos.population) * 100000;
        const getWeeklyConfirmed = ({list, store, mapPathId}) => {

            const currCountry = list[mapPathId];
            const weekAgo = DateCustomMethods.getDay({datas: currCountry.historical, date: store.state.weekAgoTimestamp});
            return currCountry.live.confirmed - weekAgo.cumulative.confirmed;

        }

        function setDetailedMap(store, list, MAP_KEYS) {

            const mapPaths = document.querySelectorAll(`#${props.name.toLowerCase()}-selection-map a`);

            mapPaths.forEach(mapPath => {

                if (typeof list[mapPath.id] !== "undefined") {
                    
                    const data = locName.value === LOC_NAMES.WORLD ? getWeeklyConfirmed({list, store, mapPathId: mapPath.id}) : getHospPerThous({list, mapPathId: mapPath.id});
                    Object.values(MAP_KEYS).forEach(currKey => {

                        if (data >= currKey.MIN && data <= currKey.MAX) {
                            mapPath.children.forEach(child => child.setAttribute("class", currKey.CLASS));
                        }

                    });

                } else {

                    mapPath.children.forEach(child => child.setAttribute("class", "noDatas"));

                }

            });

        }

        function transmitSelection(locId) {

            if (typeof list.value[locId] !== "undefined") {

                const mapSelections = [
                    {type: list.value[locId].type, name: list.value[locId].name}
                ];

                if (locName.value === LOC_NAMES.WORLD) {
                    mapSelections.unshift({type: LOC_TYPES.CONTINENT, name: list.value[locId].infos.region})
                }

                context.emit("location-selected", mapSelections);

            }
            
        }

        onMounted(() => setDetailedMap(store, list.value, MAP_KEYS.value));

        return {
            list,
            LOC_NAMES,
            locName,
            transmitSelection
        }

    },
    components: {
        WorldMap,
        FranceMap
    }
}
</script>

<style lang="scss" scoped>
.headerContainer {
    margin-top: 2rem;
    margin-bottom: 1rem;
}
.header {
    font-size: clamp(1.4rem, 2.2vw, 3.5rem);
    letter-spacing: 2px;
    text-align: center;
    margin: 0;
    &--status {
        font-weight: lighter;
    }
}
.description {
    text-align: center;
    margin: 0;
}
</style>

<style lang="scss">
.selectionMap path {
    stroke: #FFF;
    stroke-width: 1px;
}

.selectionMap a:hover path {
    transition: all 300ms;
    stroke-width: 2px;
}
</style>