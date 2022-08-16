<template>
    <div 
        class="dashboard" 
    >
        <div class="dashboard__container">

            <location-infos 
                v-if="isAsidePanelDisplayed"
                :locationInfos="datas.infos" 
                :locationType="datas.type"
                :currentlyDisplayed="isAsidePanelDisplayed" 
                @toggle-location-panel-display="isAsidePanelDisplayed = !isAsidePanelDisplayed"
            ></location-infos>

            <location-infos-toggle-button
                v-else
                @toggle-location-panel-display="isAsidePanelDisplayed = !isAsidePanelDisplayed"
            ></location-infos-toggle-button>

            <location-disease
                :location="datas"
            >
            </location-disease>
        
        </div>

        <back-to-top-button></back-to-top-button>

    </div>   
</template>

<script>
import { provide, ref } from "vue";
import LocationInfos from "./Dashboard/LocationInfos.vue";
import LocationDisease from "./Dashboard/LocationDisease.vue";
import LocationInfosToggleButton from "./Dashboard/LocationInfosToggleButton.vue";
import BackToTopButton from "./Dashboard/BackToTopButton.vue";
import Continent from "../../assets/JSClasses/Models/Location/Locations/Continent.js";
import Country from "../../assets/JSClasses/Models/Location/Locations/Country.js";
import Departement from "../../assets/JSClasses/Models/Location/Locations/Departement.js";

export default {
    props: {
        datas: {
            type: Object,
            required: true
        }
    },
    setup() {

        provide("KEYS_TRANSLATIONS", {
            ...Continent.KEYS_TRANSLATIONS,
            ...Country.KEYS_TRANSLATIONS,
            ...Departement.KEYS_TRANSLATIONS,
            km2: "km²",
            thousandsOfHabs: "milliers d'habs"
        });
        
        return {
            isAsidePanelDisplayed: ref(true),
        }
    },
    components: {
        LocationInfos,
        LocationDisease,
        LocationInfosToggleButton,
        BackToTopButton
    }
}
</script>

<style lang="scss" scoped>
@keyframes dashboardAppearance {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.dashboard {
    animation: dashboardAppearance 1000ms ease-in;
    width: 90%;
    margin: 0 auto;
    position: relative;
    &__container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (min-width: 1024px) {
            align-items: flex-start;
            flex-direction: row;
        }
    }
}
</style>

<style lang="scss">
.dashboardSelection {
    color: #5d95b8;
    border-color: #5d95b8;
}
</style>