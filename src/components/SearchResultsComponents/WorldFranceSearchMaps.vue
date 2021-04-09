<template>
    <div class="mapContainer">
        <world-search-map v-if="displayedMap === 'WorldSearchMap'" @clicked-country="getSelectedLocation"></world-search-map>
        <france-search-map v-else-if="displayedMap === 'FranceSearchMap'" @world-map-request="worldMapRequest" @clicked-country="getSelectedLocation"></france-search-map>
    </div>    
</template>

<script>
//Vue Elements
import { ref } from "vue";

//Vue components
import WorldSearchMap from "./WorldSearchMap.vue";
import FranceSearchMap from "./FranceSearchMap.vue";

export default {
    setup(props, context) {

        let displayedMap = ref("WorldSearchMap");

        //Check and transmit clicked location to the parent component
        function getSelectedLocation(selectedLocation) {

            if (selectedLocation.locationName === "France") {
                displayedMap.value = "FranceSearchMap";
            }
            context.emit("clicked-location", selectedLocation);

        }

        function worldMapRequest() {
            displayedMap.value = "WorldSearchMap";
        }

        return {
            displayedMap,
            getSelectedLocation,
            worldMapRequest
        }

    },
    components: {
        WorldSearchMap,
        FranceSearchMap
    }
}
</script>