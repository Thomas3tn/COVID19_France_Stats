<template>

    <GoogleMap
        api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
        style="width: 100%; height: 21.4vw; minHeight: 256px"
        :center="{lat: parseInt(checkedCoordinates.lat, 10), lng: parseInt(checkedCoordinates.long, 10)}"
        :zoom="mapZoom"
    >
        <Marker v-if="areCoordinatesUnavailable === false" :options="{ position: {lat: parseInt(checkedCoordinates.lat, 10), lng: parseInt(checkedCoordinates.long, 10)}}" />
    </GoogleMap>

</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import { computed } from "vue";

export default {
    props: {
        sqKmArea: {
            type: Number,
            required: true,
            default: 0
        },
        coordinates: {
            type: Object, 
            required: true
        }
    },
    setup(props) {

        const areCoordinatesUnavailable = computed(() =>  Object.values(props.coordinates).every(coor => coor === null));
        const checkedCoordinates = computed(() => areCoordinatesUnavailable.value ? {lat: 0, long: 0} : props.coordinates);
        
        const mapZoom = computed(() => {

            if (areCoordinatesUnavailable.value) {
                return 1;
            } else {

                if (props.sqKmArea < 2000) {
                    return 9;
                } else if (props.sqKmArea >= 2000 && props.sqKmArea < 20000) {
                    return 7;
                } else if (props.sqKmArea >= 35000 && props.sqKmArea < 75000) {
                    return 6;
                } else if (props.sqKmArea >= 75000 && props.sqKmArea < 500000) {
                    return 5;
                } else if (props.sqKmArea >= 500000 && props.sqKmArea < 5000000) {
                    return 4;
                } else if (props.sqKmArea >= 5000000 && props.sqKmArea < 8500000) {
                    return 3;
                } else if (props.sqKmArea >= 8500000) {
                    return 2;
                } else {
                    return 5;
                }

            }

        });

        //Add Google Map script tag
        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);

        return {
            areCoordinatesUnavailable,
            checkedCoordinates,
            mapZoom
        }

    },
    components: {
        GoogleMap,
        Marker
    }
}
</script>