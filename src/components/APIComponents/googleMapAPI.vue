<template>
    <div id="map"></div>
</template>

<script>
//JS Script
import googleMapInit from "../assets/JSClasses/googleMapInit.js";

export default {
    mounted() {

        let googleMapApi = document.createElement("script");
        googleMapApi.setAttribute("script", "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU&callback=initMap&libraries=&v=weekly");
        googleMapApi.setAttribute("async", "async");
        document.head.appendChild(googleMapApi);

        let mapInit = document.createElement("script");
        mapInit.setAttribute("script", googleMapInit);
        document.head.appendChild(mapInit);

    },
    beforeUnmount() {

        //Détruire google map api script tag

    }
}
/*
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}*/
</script>