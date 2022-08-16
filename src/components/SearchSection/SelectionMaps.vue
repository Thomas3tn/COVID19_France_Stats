<template>
    <div 
        v-if="isMobileDevice === false"
        class="selectionsMaps"
    >

        <world-map-button
            v-if="displayedMap === MAPS_IDS.FRANCE"
            @world-map-button-click="onWorldMapBtnClick"
        ></world-map-button>
        
        <overview-map
            v-if="APIsStatus.country === true && displayedMap === MAPS_IDS.WORLD"
            :name="MAPS_CONTENT.WORLD.NAME"
            :status="MAPS_CONTENT.WORLD.STATUS"
            :description="MAPS_CONTENT.WORLD.DESCRIPTION"
            @location-selected="onMapSelection"
        ></overview-map>

        <overview-map
            v-else-if="APIsStatus.departement === true && displayedMap === MAPS_IDS.FRANCE"
            :name="MAPS_CONTENT.FRANCE.NAME"
            :status="MAPS_CONTENT.FRANCE.STATUS"
            :description="MAPS_CONTENT.FRANCE.DESCRIPTION"
            @location-selected="onMapSelection"
        ></overview-map>

    </div>    
</template>

<script>
import { ref, watch, reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import OverviewMap from "./SelectionMaps/Map.vue";
import WorldMapButton from "./SelectionMaps/WorldMapButton.vue";

export default {
    setup() {

        const store = useStore();
        const LOC_TYPES = inject("LOCATION_TYPES");
        const MAPS_IDS = {
            WORLD: 0,
            FRANCE: 1
        };

        const MAPS_CONTENT = {
            FRANCE: {
                NAME: "FRANCE",
                STATUS: "HOSPITALISATIONS",
                DESCRIPTION: "État du taux d'hospitalisations par milliers d'habitants"
            },
            WORLD: {
                NAME: "MONDE",
                STATUS: "Cas confirmés",
                DESCRIPTION: "État du monde hebdomadaire face à la pandémie de COVID-19"
            }
        };

        let isMobileDevice = computed(() => window.screen.width < 768);

        const APIsStatus = reactive({
            country: computed(() => isMobileDevice.value ? false : store.getters["APIsStatus/find"]({
                keysValues: [
                    {key: "type", value: "live"},
                    {key: "location", value: LOC_TYPES.COUNTRY}
                ]
            })?.data?.status || false),
            departement: computed(() => isMobileDevice.value ? false : store.getters["APIsStatus/find"]({
                keysValues: [
                    {key: "type", value: "live"},
                    {key: "location", value: LOC_TYPES.DEPARTEMENT}
                ]
            })?.data?.status || false)
        });

        let displayedMap = ref(APIsStatus.country.value ? MAPS_IDS.WORLD : MAPS_IDS.FRANCE);

        function onWorldMapBtnClick() {

            store.commit("UserSelections/RESET_CONTENT", {type: LOC_TYPES.COUNTRY});
            store.commit("UserSelections/RESET_CONTENT", {type: LOC_TYPES.DEPARTEMENT});

        }

        const onMapSelection = mapSelections => mapSelections.forEach(mapSelection => store.commit("UserSelections/UPDATE_CONTENT", mapSelection));

        watch(() => ({...store.state.UserSelections.content}), newQuery => {

            if (newQuery[LOC_TYPES.COUNTRY] === "France" && APIsStatus.departement.value === true) {
                displayedMap.value = MAPS_IDS.FRANCE;
            } else {
                displayedMap.value = MAPS_IDS.WORLD;
            }

        }, {deep: true});

        return {
            MAPS_IDS,
            MAPS_CONTENT,
            displayedMap,
            isMobileDevice,
            APIsStatus,
            onWorldMapBtnClick,
            onMapSelection
        }

    },
    components: {
        OverviewMap,
        WorldMapButton,
    }
}
</script>

<style lang="scss">
@mixin mapPathHover {
    cursor: pointer;
}

.seletionsMaps {
    display: none;
    position: relative;
    @media (min-width: 768px) {
        display: block;
    }
}



.noDatas {
    fill: #e6e6e6;
    cursor: not-allowed;
}

.confirmedCasesLvl1 {
    fill: #FFF5C7;
    @include mapPathHover;
}

.confirmedCasesLvl2 {
    fill: #FECCA7;
    @include mapPathHover;
}

.confirmedCasesLvl3 {
    fill: #FDA38B;
    @include mapPathHover;
}

.confirmedCasesLvl4 {
    fill: #ff8581;
    @include mapPathHover;
}

.confirmedCasesLvl5 {
    fill: #eb4a5f;
    @include mapPathHover;
}

.confirmedCasesLvl6 {
    fill: #e73a51;
    @include mapPathHover;
}

.confirmedCasesLvl7 {
    fill: #e7213c;
    @include mapPathHover;
}
</style>