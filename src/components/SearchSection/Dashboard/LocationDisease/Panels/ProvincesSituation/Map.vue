<template>
    
    <div id="current-situation-map" class="container">

        <map-key 
            :DATATYPES="DATATYPES"
            :mapKeys="MAP_KEYS" 
            :datatype="datatype" 
            @map-key-color-enter="highlightRegions" 
            @map-key-color-leave="removeRegionsHighlight"
        ></map-key>

        <france-map v-if="abbreviation === 'FR'"></france-map>
        <us-map v-else-if="abbreviation === 'US'"></us-map>
        <canada-map v-else-if="abbreviation === 'CA'"></canada-map>
        <india-map v-else-if="abbreviation === 'IN'"></india-map>
        <brazil-map v-else-if="abbreviation === 'BR'"></brazil-map>
        <china-map v-else-if="abbreviation === 'CN'"></china-map>
        <russia-map v-else-if="abbreviation === 'RU'"></russia-map>
        <south-america-map v-else-if="abbreviation === 'CSA'"></south-america-map>
        <north-america-map v-else-if="abbreviation === 'CNA'"></north-america-map>
        <europe-map v-else-if="abbreviation === 'CEU'"></europe-map>
        <africa-map v-else-if="abbreviation === 'CAF'"></africa-map>
        <asia-map v-else-if="abbreviation === 'CAS'"></asia-map>
        <ocenia-map v-else-if="abbreviation === 'COC'"></ocenia-map>
        <world-map v-else-if="abbreviation === 'Global'"></world-map>

    </div>

</template>

<script>
import { computed } from "vue";
import MapKey from "./DetailedGeoDatasPanel/MapKeyPanel.vue";
import FranceMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/FranceMap.vue";
import USMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/UsMap.vue";
import CanadaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/CanadaMap.vue";
import IndiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/IndiaMap";
import BrazilMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/BrazilMap.vue";
import ChinaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/ChinaMap.vue";
import RussiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/RussiaMap.vue";
import SouthAmericaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/SouthAmericaMap.vue";
import NorthAmericaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/NorthAmericaMap.vue";
import EuropeMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/EuropeMap.vue";
import AfricaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/AfricaMap.vue";
import AsiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/AsiaMap.vue";
import OceaniaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/OceniaMap.vue";
import WorldMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/WorldMap.vue";

export default {
    props: {
        mapKeys: {
            type: Object,
            required: true
        },
        location: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        DATATYPES: {
            type: Object,
            required: true
        },
        datatype: {
            type: Number,
            required: true
        }
    },
    setup() {

        const abbreviation = computed(() => props.location.infos.abbreviation);
        
        function setDetailedMap({datatype, status, location, MAP_KEYS}) {

            let mapPaths = document.querySelectorAll("#current-situation-map svg a");

            mapPaths.forEach(mapPath => {

                const children = mapPath.children;

                if (typeof location.provinces[mapPath.id] !== "undefined") {

                    const provinceData = datatype === props.DATATYPES.RELATIVE ? 
                    100 * (location.provinces[mapPath.id][status] / location.live[status]) 
                    :  
                    locationDatas.provinces[mapPath.id][status];

                    Object.values(MAP_KEYS).forEach(KEY_DATAS => {

                        if (provinceData >= KEY_DATAS.MIN && provinceData <= KEY_DATAS.MAX) {
                            children.forEach(child => child.setAttribute("style", `fill: ${KEY_DATAS.color}`));
                        }

                    });

                } else {
                    children.forEach(child => child.setAttribute("class", "noDatas"));
                }

            });

        }

        function highlightRegions(color) {

            let mapPaths = document.querySelectorAll("#current-situation-map svg a");

            mapPaths.forEach(mapPath => {

                if (mapPath.firsElementChild.style.fill === color) {

                    mapPath.children.forEach(child => {

                        child.removeAttribute("style");
                        child.setAttribute("class", `${formCriteria.status}HighlightAnimation`);

                    });

                }

            });

        }

        function removeRegionsHighlight(color) {

            //Color will be used to set path tag fill attribute back to normal
            let mapPaths = document.querySelectorAll("#current-situation-map svg a");

            mapPaths.forEach(mapPath => {

                //SVG element className return an object and we access its className by the baseVal attribute
                if (mapPath.firstElementChild.className.baseVal === `${formCriteria.displayedStatus}HighlightAnimation`) {

                    mapPath.children.forEach(child => {

                        child.removeAttribute("class");
                        child.setAttribute("style", `fill: ${color}`);

                    });

                }

            });

        }

        onMounted(() => {

            setDetailedMap({
                datatype: formCriteria.datatype, 
                status: props.status, 
                location: props.location, 
                MAP_KEYS: props.mapKeys
            });

        });

        return {
            abbreviation,
            highlightRegions,
            removeRegionsHighlight
        }

    },
    components: {
        MapKey,
        FranceMap,
        USMap,
        CanadaMap,
        IndiaMap,
        BrazilMap,
        ChinaMap,
        RussiaMap,
        SouthAmericaMap,
        NorthAmericaMap,
        EuropeMap,
        AfricaMap,
        AsiaMap,
        OceaniaMap,
        WorldMap
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: #FFF;
    position: relative;
    path {
        stroke: #FFF;
        stroke-width: 0.5px;
    }
}
</style>