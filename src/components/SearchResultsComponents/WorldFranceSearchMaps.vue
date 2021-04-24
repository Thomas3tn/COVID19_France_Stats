<template>
    <div class="mapContainer">
        <world-search-map v-if="displayedMap === 'WorldSearchMap'" @clicked-country="getSelectedLocation" :selectedLocationRequested="worldSelectedLocation"></world-search-map>
        <france-search-map v-else-if="displayedMap === 'FranceSearchMap'" @world-map-request="switchMap" @clicked-country="getSelectedLocation" :selectedLocationRequested="franceSelectedLocation"></france-search-map>
    </div>    
</template>

<script>
//Vue Elements
import { ref, watch } from "vue";

//Vue components
import WorldSearchMap from "./WorldSearchMap.vue";
import FranceSearchMap from "./FranceSearchMap.vue";

export default {
    props: {
        formSelectedLocation: {
            type: Object,
            required: false
        }
    },
    setup(props, context) {

        let displayedMap = ref("FranceSearchMap");
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