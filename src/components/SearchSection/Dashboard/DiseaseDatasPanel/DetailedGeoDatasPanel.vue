<template>
    <div class="datasPanel" id="detailedGeoDatasPanel">
        <div class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Situation geographique détaillée</h3>
        </div>
        <div class="detailedGeoDatasPanel__contentContainer">
            <div class="detailedGeoDatasPanel__locationGraphsContainer">
                <div id="currentSituationMap" class="detailedGeoDatasPanel__mapContainer">
                    <map-key :mapKeys="mapKeys" :displayedStatus="displayedDatas" :displayedDatastype="formCriteria.displayedDatastype" @map-key-color-enter="highlightRegions" @map-key-color-leave="removeRegionsHighlight"></map-key>
                    <france-map v-if="displayedCountry === 'France'"></france-map>
                    <us-map v-else-if="displayedCountry === 'US'"></us-map>
                    <canada-map v-else-if="displayedCountry === 'Canada'"></canada-map>
                    <india-map v-else-if="displayedCountry === 'India'"></india-map>
                    <brazil-map v-else-if="displayedCountry === 'Brazil'"></brazil-map>
                    <china-map v-else-if="displayedCountry === 'China'"></china-map>
                    <russia-map v-else-if="displayedCountry === 'Russia'"></russia-map>
                    <south-america-map v-else-if="displayedCountry === 'South America'"></south-america-map>
                    <north-america-map v-else-if="displayedCountry === 'North America'"></north-america-map>
                    <europe-map v-else-if="displayedCountry === 'Europe'"></europe-map>
                    <africa-map v-else-if="displayedCountry === 'Africa'"></africa-map>
                    <asia-map v-else-if="displayedCountry === 'Asia'"></asia-map>
                    <ocenia-map v-else-if="displayedCountry === 'Oceania'"></ocenia-map>
                    <world-map v-else-if="displayedCountry === 'Global'"></world-map>
                </div>
                <regions-list-panel :regionsDatas="locationRegionsDatas" :displayedStatus="displayedDatas"></regions-list-panel>
            </div>
            <form class="detailedGeoDatasForm" @submit.prevent>
                <div class="detailedGeoDatasForm__mapInputs">
                    <select v-model="formCriteria.displayedDatastype" class="detailedGeoDatasForm__selectInput">
                        <option value="relativeDatas">Données relatives</option>
                        <option value="rawDatas">Données brutes</option>
                    </select>
                    <div class="detailedGeoDatasForm__statusContainer">
                        <template v-for="item in currentStatusKeys" :key="item.idName">
                            <template v-if="displayedDatas === item.idName">
                                <input type="radio" @click="changeDisplayedDatas" class="detailedGeoDatasForm__radioInput" :id="item.idName + 'DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName" checked/>
                                <label :for="item.idName + 'DetailedMapInput'" :id="item.idName + 'DetailedMapLabel'" :title="item.dashboardName" :class="'selectableStatus selectableStatus--' + item.idName + 'Active'"><font-awesome-icon :icon="item.logo"/></label>
                            </template>
                            <template v-else>
                                <input type="radio" @click="changeDisplayedDatas" class="detailedGeoDatasForm__radioInput" :id="item.idName + 'DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName"/>
                                <label :for="item.idName + 'DetailedMapInput'" :id="item.idName + 'DetailedMapLabel'" class="selectableStatus" :title="item.dashboardName"><font-awesome-icon :icon="item.logo"/></label>
                            </template>
                        </template>
                    </div>
                </div>
                <button @click="isDetailedChartListDisplayed = !isDetailedChartListDisplayed" id="detailedGeoDatasPanelToggleContentBtn" class="detailedGeoDatasForm__contentToggleBtn" title="Alterner carte/liste"><font-awesome-icon :icon="faList"/></button>
            </form>
        </div>
    </div>
</template>

<script>
//Vue & Vuex Elements
import { ref, onMounted, reactive, watch, inject } from "vue";

//Vue Components
import MapKey from "./DetailedGeoDatasPanel/MapKey.vue";
import RegionsListPanel from "./DetailedGeoDatasPanel/RegionsListPanel.vue";
import franceMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/FranceMap.vue";
import usMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/UsMap.vue";
import canadaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/CanadaMap.vue";
import indiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/IndiaMap";
import BrazilMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/BrazilMap.vue";
import ChinaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/ChinaMap.vue";
import RussiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Country/RussiaMap.vue";
import SouthAmericaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/SouthAmericaMap.vue";
import NorthAmericaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/NorthAmericaMap.vue";
import EuropeMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/EuropeMap.vue";
import AfricaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/AfricaMap.vue";
import AsiaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/AsiaMap.vue";
import OceniaMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/Continent/OceniaMap.vue";
import WorldMap from "./DetailedGeoDatasPanel/DetailedGeoDatasPanelMaps/WorldMap.vue";

import { faCross, faMale, faWalking, faProcedures, faHospitalUser, faList } from "@fortawesome/free-solid-svg-icons";

//JS Class
import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator.js";

export default {
    props: {
        displayedCountry: {
            type: String,
            required: false,
            default: "France"
        },
        locationRegionsDatas: {
            type: Object,
            required: false
        }
    },
    setup(props) {

        console.log(props.locationRegionsDatas);

        const datasCalculator = new DatasCalculator();
        const chartStatusKey = inject("chartStatusKey", {});

        //Form
        let formCriteria = reactive({
            displayedDatastype: "relativeDatas",
            displayedStatus: ""
        });

        //Transmitted map options
        let displayedDatas = ref("");

        let isDetailedChartListDisplayed = ref(false);

        const mapKeys = reactive({
            relativeDatas: {
                key1: {
                    min: 0,
                    max: 0,
                    class: "confirmedCasesLvl1",
                    color: ""
                },
                key2: {
                    min: 0,
                    max: 5,
                    class: "confirmedCasesLvl2",
                    color: ""
                },
                key3: {
                    min: 5,
                    max: 12,
                    class: "confirmedCasesLvl3",
                    color: ""
                },
                key4: {
                    min: 12,
                    max: 25,
                    class: "confirmedCasesLvl4",
                    color: ""
                },
                key5: {
                    min: 25,
                    max: 38,
                    class: "confirmedCasesLvl5",
                    color: ""
                },
                key6: {
                    min: 38,
                    max: 100,
                    class: "confirmedCasesLvl6",
                    color: ""
                }
            },
            rawDatas: {
                key1: {
                    min: 0,
                    max: 0,
                    class: "confirmedCasesLvl1",
                    color: ""
                },
                key2: {
                    min: 0,
                    max: 5,
                    class: "confirmedCasesLvl2",
                    color: ""
                },
                key3: {
                    min: 5,
                    max: 12,
                    class: "confirmedCasesLvl3",
                    color: ""
                },
                key4: {
                    min: 12,
                    max: 25,
                    class: "confirmedCasesLvl4",
                    color: ""
                },
                key5: {
                    min: 25,
                    max: 38,
                    class: "confirmedCasesLvl5",
                    color: ""
                },
                key6: {
                    min: 38,
                    max: 100,
                    class: "confirmedCasesLvl6",
                    color: ""
                }
            }
        });

        /*let mapKeysRawDatasValues = computed(() => {

            let highestValues = {};
            let mapKeysRawDatasValues = {};
            let authorizedValues = ["confirmed", "deaths", "recovered"];

            //Find the highest value for each status
            for (const [regionKey, regionValue] of Object.entries(props.locationRegionsDatas)) {

                if (regionKey !== "All") {

                    for (const [key, value] of Object.entries(regionValue)) {

                        if (authorizedValues.includes(key)) {

                            if (typeof highestValues[key] === "undefined" || value > highestValues[key]) {
                                highestValues[key] = value;
                            }
                    
                        }

                    }

                }

            }

            //Calculate each intermediate values from the highest value
            for (const [key, value] of Object.entries(highestValues)) {

                let highestValue = (value * 10 / 100) + highestValue;
                let valuesGap = highestValue / 6;
                mapKeysRawDatasValues[key] = {};
                
                for (let i = 1; i < 7; i++) {

                    let currentKey = "key" + i;

                    mapKeysRawDatasValues[key][currentKey] = {};
                    console.log(mapKeysRawDatasValues, i);
                    //i === 1 ? mapKeysRawDatasValues["key" + i]["min"] = 0 : mapKeysRawDatasValues["key" + i]["min"] = mapKeysRawDatasValues["key" + (i - 1)]["min"] + 1;
                    mapKeysRawDatasValues[currentKey]["min"] = 0
                    mapKeysRawDatasValues[currentKey]["max"] = valuesGap * i;

                }

            }

            return mapKeysRawDatasValues;

        });*/

        //Functions
        function changeDisplayedDatas(event) {
            formCriteria.displayedStatus = event.currentTarget.value;
        }

        function changeDisplayedDatastype(event) {
            formCriteria.displayedDatastype = event.currentTarget.value;
        }

        function setDetailedMap(displayedDatastype, displayedDatas, locationDatas, mapKeys) {

            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");

            for (let i = 0; i < mapPaths.length; i++) {

                if (typeof locationDatas[mapPaths[i].id] !== "undefined") {

                    let currentRegionData;
                    if (props.displayedCountry === "Global") {
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / locationDatas.Global[displayedDatas]) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    } else {
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / locationDatas.All[displayedDatas]) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    }

                    for (const keyValue of Object.entries(mapKeys[displayedDatastype])) {

                        if (currentRegionData > keyValue[1].min && currentRegionData >= keyValue[1].max) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("style", "fill: " + keyValue[1].color);
                            }

                        }

                    }

                } else {

                    //If current location has no datas
                    let currentMapPathChildren = mapPaths[i].children;
                    for (let a = 0; a < currentMapPathChildren.length; a++) {
                        currentMapPathChildren[a].setAttribute("class", "noDatas");
                    }

                }

            }

        }

        function highlightRegions(color) {

            console.log(color);

            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");

            for (let i = 0; i < mapPaths.length; i++) {

                if (mapPaths[i].firstElementChild.style.fill === color) {
                    console.log(mapPaths[i].firstElementChild.style.fill, color);

                    let currentMapPathChildren = mapPaths[i].children;
                    for (let a = 0; a < currentMapPathChildren.length; a++) {
                        currentMapPathChildren[a].removeAttribute("style");
                        currentMapPathChildren[a].setAttribute("class", "selectedMapLocation");
                    }

                }

            }

        }

        function removeRegionsHighlight(color) {

            //Color will be used to set path tag fill attribute back to normal
            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");

            for (let i = 0; i < mapPaths.length; i++) {

                //SVG element className return an object and we access its className by the baseVal attribute
                if (mapPaths[i].firstElementChild.className.baseVal === "selectedMapLocation") {

                    let currentMapPathChildren = mapPaths[i].children;
                    for (let a = 0; a < currentMapPathChildren.length; a++) {
                        currentMapPathChildren[a].removeAttribute("class");
                        currentMapPathChildren[a].setAttribute("style", "fill: " + color);
                    }

                }

            }

        }

        //Get all input form status content (logo, idName & dashboardName) from props
        const diseaseStatusValues = ["confirmed", "deaths", "recovered", "hospitalizations", "intensive_care"];
        let currentStatusKeys = [];

        if (props.displayedCountry === "Global") {

            currentStatusKeys = [{idName: "confirmed", dashboardName: "Cas confirmés", logo: faMale}, {idName: "deaths", dashboardName: "Décès", logo: faCross}, {idName: "recovered", dashboardName: "Guéris", logo: faWalking}];

        } else {

            for (const keyValue of Object.entries(props.locationRegionsDatas.All)) {

                if (diseaseStatusValues.includes(keyValue[0]) && typeof keyValue[1] !== "undefined") {

                    let currentStatus = {};
                    currentStatus.idName = keyValue[0],
                    currentStatus.dashboardName = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(keyValue[0]);

                    switch (keyValue[0]) {
                        case "confirmed":
                            currentStatus["logo"] = faMale;
                            break;

                        case "deaths":
                            currentStatus["logo"] = faCross;
                            break;

                        case "recovered":
                            currentStatus["logo"] = faWalking;
                            break;

                        case "hospitalizations":
                            currentStatus["logo"] = faHospitalUser;
                            break;

                        case "intensive_care":
                            currentStatus["logo"] = faProcedures;
                            break;
                    
                        default:
                            currentStatus["logo"] = "";
                            break;
                    }

                    currentStatusKeys.push(currentStatus);

                }

            }

        }

        //Set displayed status as the first map key element
        displayedDatas.value = currentStatusKeys[0].idName;
        formCriteria.displayedStatus = displayedDatas.value;

        //Set gradient colors
        for (const [key, value] of Object.entries(mapKeys.relativeDatas)) {
            value.color = chartStatusKey.statusGradient[displayedDatas.value][key.split("")[key.split("").length - 1]];
        }

        console.log(mapKeys.relativeDatas);

        onMounted(() => {

            //Set map key colors for the automatically displayed status
            for (const [key, value] of Object.entries(mapKeys[formCriteria.displayedDatastype])) {

                const level = key.split("")[key.split("").length - 1];
                value.color = chartStatusKey.statusGradient[displayedDatas.value][level];

            }

            setDetailedMap(formCriteria.displayedDatastype, displayedDatas.value, props.locationRegionsDatas, mapKeys);
            document.querySelector("#detailedGeoDatasPanel .regionsListPanel").className += " regionsListPanel--hidden";

        });

        watch(() => { return { ...formCriteria }}, ((newValue, oldValue) => {

            console.log(oldValue, newValue);

            displayedDatas.value = newValue.displayedStatus;

            //Update mapKeys values
            /*if (newValue.displayedDatastype === "rawDatas") {

                for (const [key, value] of Object.entries(mapKeys[newValue.displayedDatastype])) {

                    value.min = mapKeysRawDatasValues[key]["min"];
                    value.max = mapKeysRawDatasValues[key]["max"];

                }

                if (newValue.displayedStatus !== oldValue.displayedStatus) {

                    for (const [key, value] of Object.entries(mapKeys[newValue.displayedDatastype])) {

                        value.min = mapKeysRawDatasValues[key]["min"];
                        value.max = mapKeysRawDatasValues[key]["max"];
                        
                    }

                }

                console.log(mapKeysRawDatasValues);

            }*/

            //Update mapKeys color to the new status
            for (const [key, value] of Object.entries(mapKeys[newValue.displayedDatastype])) {
                value.color = chartStatusKey.statusGradient[displayedDatas.value][key.split("")[key.split("").length - 1]];
            }

            setDetailedMap(newValue.displayedDatastype, newValue.displayedStatus, props.locationRegionsDatas, mapKeys);

            let statusLabels = document.querySelectorAll(".detailedGeoDatasForm__statusContainer label");

            for (let i = 0; i < statusLabels.length; i++) {
                statusLabels[i].className = "selectableStatus selectableStatus--inactive";
            }

            let newActiveStatus = document.getElementById(newValue.displayedStatus + "DetailedMapLabel");
            if (newActiveStatus.className.split(" ").includes("selectableStatus--inactive")) {

                let newActiveStatusClasses = newActiveStatus.className.split(" ");

                for (let i = 0; i < newActiveStatusClasses.length; i++) {

                    if (newActiveStatusClasses[i] === "selectableStatus--inactive") {
                        newActiveStatusClasses.splice(i, 1);
                        break;
                    }

                }

                newActiveStatus.className = newActiveStatusClasses.join(" ");

            }

            document.getElementById(newValue.displayedStatus + "DetailedMapLabel").className += " selectableStatus--" + newValue.displayedStatus + "Active";

            //Change toggle content button active color when status is changed
            if (isDetailedChartListDisplayed.value === true && (oldValue.displayedStatus !== newValue.displayedStatus)) {

                let toggleContentBtn = document.getElementById("detailedGeoDatasPanelToggleContentBtn");
                let toggleContentBtnClasses = toggleContentBtn.className.split(" ");

                for (let i = 0; i < toggleContentBtnClasses.length; i++) {

                    if (toggleContentBtnClasses[i].split("--")[1] === oldValue.displayedStatus + "Active") {
                        toggleContentBtnClasses.splice(i, 1);
                        break;
                    }

                }

                toggleContentBtnClasses.push("selectableStatus--" + displayedDatas.value + "Active");
                toggleContentBtn.className = toggleContentBtnClasses.join(" ");

            }

        }));

        watch(isDetailedChartListDisplayed, newValue => {

            let regionsListPanel = document.querySelector("#detailedGeoDatasPanel > .detailedGeoDatasPanel__contentContainer > .detailedGeoDatasPanel__locationGraphsContainer > .regionsListPanel");
            newValue === true ? regionsListPanel.className = "regionsListPanel" : regionsListPanel.className += " regionsListPanel--hidden";

            let toggleContentBtn = document.getElementById("detailedGeoDatasPanelToggleContentBtn");
            let toggleContentBtnClasses = toggleContentBtn.className.split(" ");

            //Toggle content button active color is set accordingly to which status is displayed
            if (newValue === true) {
                
                toggleContentBtnClasses.push("selectableStatus--" + displayedDatas.value + "Active");
                toggleContentBtn.className = toggleContentBtnClasses.join(" ");

            } else if (newValue === false) {
                
                for (let i = 0; i < toggleContentBtnClasses.length; i++) {

                    if (toggleContentBtnClasses[i].split("--")[1] === displayedDatas.value + "Active") {
                        toggleContentBtnClasses.splice(i, 1);
                        break;
                    }

                }

                toggleContentBtn.className = toggleContentBtnClasses.join(" ");

            }

        });

        return {
            changeDisplayedDatas,
            changeDisplayedDatastype,
            currentStatusKeys,
            displayedDatas,
            formCriteria,
            isDetailedChartListDisplayed,
            mapKeys,
            faList,
            highlightRegions,
            removeRegionsHighlight,

        }

    },
    components: {
        MapKey,
        RegionsListPanel,
        franceMap,
        usMap,
        canadaMap,
        indiaMap,
        BrazilMap,
        ChinaMap,
        RussiaMap,
        SouthAmericaMap,
        NorthAmericaMap,
        EuropeMap,
        AfricaMap,
        AsiaMap,
        OceniaMap,
        WorldMap
    }
}
</script>

<style lang="scss">
@keyframes selectedMapLocation {
    0% {
        fill: #FFF5C7;
        transform-origin: center;
        transform: scale(1);
        stroke-width: 0.5px;
    }
    100% {
        fill: #e73a51;
        transform: scale(1.01);
        transform-origin: center;
        stroke-width: 1.5px;
    }
}

.selectedMapLocation {
    animation: selectedMapLocation 2000ms infinite alternate ease-in-out;
}

.detailedGeoDatasPanel {
    &__locationGraphsContainer {
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        .regionsListPanel {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }
    &__mapContainer {
        background-color: #FFF;
        position: relative;
        path {
            stroke: #FFF;
            stroke-width: 0.5px;
        }
    }
    &__formRankingContainer {
        display: flex;
        justify-content: space-between;
        align-content: center;
        div, form {
            flex: 1;
        }
    }
}

.detailedGeoDatasForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__mapInputs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 35%;
    }
    &__selectInput {
        border-radius: 3px;
    }
    &__statusContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 40%;
    }
    &__radioInput {
        display: none;
    }
    &__contentToggleBtn {
        border: 2px solid black;
        border-radius: 3px;
        background-color: inherit;
        padding: 0.2rem 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 300ms;
        &:hover {
            background-color: darken(white, 5%);
        }
    }
}
</style>