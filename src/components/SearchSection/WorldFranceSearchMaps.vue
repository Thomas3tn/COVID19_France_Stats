<template>
    <div class="searchMap">
        <world-search-map v-if="displayedMap === 'WorldSearchMap'" @clicked-country="getSelectedLocation" :selectedLocationRequested="worldSelectedLocation"></world-search-map>
        <france-search-map v-else-if="displayedMap === 'FranceSearchMap'" @world-map-request="switchMap" @clicked-country="getSelectedLocation" :selectedLocationRequested="franceSelectedLocation"></france-search-map>
    </div>    
</template>

<script>
//Vue Elements
import { ref, watch } from "vue";

//Vue components
import WorldSearchMap from "./WorldFranceSearchMaps/WorldSearchMap.vue";
import FranceSearchMap from "./WorldFranceSearchMaps/FranceSearchMap.vue";

export default {
    props: {
        formSelectedLocation: {
            type: Object,
            required: false
        }
    },
    setup(props, context) {

        let displayedMap = ref("WorldSearchMap");
        let worldSelectedLocation = ref("");
        let franceSelectedLocation = ref("");

        //Check and transmit clicked location to the parent component
        function getSelectedLocation(selectedLocation) {

            if ((typeof selectedLocation.locationName === "string" && selectedLocation.locationName === "France") || (Array.isArray(selectedLocation.locationName) && selectedLocation.locationName.includes("France"))) {
                displayedMap.value = "FranceSearchMap";
            }

            context.emit("clicked-location", selectedLocation);

        }

        function switchMap(desiredLocation) {

            displayedMap.value = desiredLocation.mapToDisplay;
            desiredLocation.mapToDisplay === "WorldSearchMap" ? worldSelectedLocation.value = desiredLocation.locationName : franceSelectedLocation.value = desiredLocation.locationName;

        }

        watch(() => { return { ...props.formSelectedLocation } }, (newValue) => {
            switchMap(newValue);
        }, {deep: true});

        return {
            displayedMap,
            getSelectedLocation,
            switchMap,
            worldSelectedLocation,
            franceSelectedLocation
        }

    },
    components: {
        WorldSearchMap,
        FranceSearchMap
    }
}
</script>

<style lang="scss">
@keyframes buttonAppearance {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
}

@keyframes arrowAnimationOnHover {
    0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0%);
    }
}

@keyframes selectedLocation {
    0% {
        background-color: white;
    }
    50% {
        background-color: red;
    }
    100% {
        background-color: white;
    }
}

.searchMap {
    display: none;
    position: relative;
    @media (min-width: 768px) {
        display: block;
    }
    &__headerContainer {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    &__header {
        letter-spacing: 2px;
        text-align: center;
        margin: 0;
        &--status {
            font-weight: lighter;
        }
    }
    &__subHeader {
        text-align: center;
        margin: 0;
    }
    &__worldMapBtn {
        border-radius: 0 5px 5px 0;
        padding: 2rem 0.5rem;
        background-color: #334455;
        color: white;
        animation: buttonAppearance 500ms ease-out both;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
        border: none;
        &:hover {
            cursor: pointer;
            .searchMap__worldMapBtn--arrow {
                animation: arrowAnimationOnHover 1000ms ease-in-out both infinite;
            }
        }
        &--globe {
            margin-left: 0.5rem;
        }
    }
}

.selectedLocation {
    fill: blue;
}

.searchMap path {
    stroke: #FFF;
    stroke-width: 1px;
}

.searchMap a:hover path {
    transition: all 300ms;
    cursor: pointer;
    stroke-width: 2px;
}

.noDatas {
    fill: #e6e6e6;
}

.confirmedCasesLvl1 {
    fill: #FFF5C7;
}

.confirmedCasesLvl2 {
    fill: #FECCA7;
}

.confirmedCasesLvl3 {
    fill: #FDA38B;
}

.confirmedCasesLvl4 {
    fill: #ff8581;
}

.confirmedCasesLvl5 {
    fill: #eb4a5f;
}

.confirmedCasesLvl6 {
    fill: #e73a51;
}

.confirmedCasesLvl7 {
    fill: #e7213c;
}
</style>