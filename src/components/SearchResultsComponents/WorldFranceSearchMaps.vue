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
    setup() {

        let displayedMap = ref("WorldSearchMap");

        return {
            displayedMap
        }

    },
    components: {
        WorldSearchMap,
        FranceSearchMap
    },
    methods: {
        getSelectedLocation(selectedLocation) {

            if (typeof selectedLocation !== "object") {
                console.error("The getSelectedLocation first parameter has to be an object.");
                return;
            }

            if (selectedLocation.locationName === "France") {
                this.displayedMap = "FranceSearchMap";
            }

            this.$emit("clicked-location", selectedLocation);

        },
        worldMapRequest() {

            this.displayedMap = "WorldSearchMap";

        }
    },
    /*watch: {
        displayedMap(newValue) {

            //Will toggle map between world map and France map
            if (newValue === "FranceSearchMap") {
                this
            }

        }
    }*/
}
</script>

<style lang="scss">

</style>