<template>
    <div class="datasPanel" id="detailedGeoDatasPanel">
        <header class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Situation geographique détaillée</h3>
        </header>
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
                <regions-list-panel :regionsDatas="locationRegionsDatas" :displayedStatus="displayedDatas" :displayedCountry="displayedCountry"></regions-list-panel>
            </div>
            <form class="detailedGeoDatasForm" @submit.prevent>
                <div class="detailedGeoDatasForm__mapInputs">
                    <div class="detailedGeoDatasForm__datatypeContainer">
                        <label for="datasTypeDetailMapInput"><i class="far fa-list-alt datasPanelForm__logoLabel" aria-hidden="true"></i><span class="screenreaderText">Type de données</span></label>
                        <select v-model="formCriteria.displayedDatastype" class="datasPanelForm__input datasPanelForm__inputPart" id="datasTypeDetailMapInput">
                            <option value="relativeDatas">Données relatives</option>
                            <option value="rawDatas">Données brutes</option>
                        </select>
                    </div>
                    <div class="detailedGeoDatasForm__statusContainer">
                        <template v-for="item in currentStatusKeys" :key="item.idName">
                            <template v-if="displayedDatas === item.idName">
                                <input type="radio" @click="changeDisplayedDatas" class="detailedGeoDatasForm__radioInput" :id="item.idName + '_DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName" checked/>
                                <label :for="item.idName + '_DetailedMapInput'" :id="item.idName + 'DetailedMapLabel'" :title="item.dashboardName" :class="'selectableStatus selectableStatus--horizontalDisplay selectableStatus--' + item.idName + 'Active'" @keyup="onKeyboardInput" tabindex="0" role="button" aria-pressed="true"><font-awesome-icon :icon="item.logo" aria-hidden="true"/><span class="screenreaderText">{{ item.dashboardName }}</span></label>
                            </template>
                            <template v-else>
                                <input type="radio" @click="changeDisplayedDatas" class="detailedGeoDatasForm__radioInput" :id="item.idName + '_DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName" aria-pressed="false"/>
                                <label :for="item.idName + '_DetailedMapInput'" :id="item.idName + 'DetailedMapLabel'" class="selectableStatus selectableStatus--horizontalDisplay" :title="item.dashboardName" @keyup="onKeyboardInput" tabindex="0" role="button"><font-awesome-icon :icon="item.logo" aria-hidden="true"/><span class="screenreaderText">{{ item.dashboardName }}</span></label>
                            </template>
                        </template>
                    </div>
                </div>
                <button @click="isDetailedChartListDisplayed = !isDetailedChartListDisplayed" id="detailedGeoDatasPanelToggleContentBtn" class="detailedGeoDatasForm__contentToggleBtn" title="Alterner carte/liste"><font-awesome-icon :icon="faList" aria-hidden="true"/><span class="screenreaderText">Altérner affichage carte/liste des régions</span></button>
            </form>
        </div>
    </div>
</template>

<script>
//Vue & Vuex Elements
import { ref, onMounted, reactive, watch, inject, computed } from "vue";

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

        console.log(props.displayedCountry, props.locationRegionsDatas);

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
                    max: 2,
                    class: "confirmedCasesLvl1",
                    color: ""
                },
                key2: {
                    min: 2,
                    max: 6,
                    class: "confirmedCasesLvl2",
                    color: ""
                },
                key3: {
                    min: 6,
                    max: 12,
                    class: "confirmedCasesLvl3",
                    color: ""
                },
                key4: {
                    min: 12,
                    max: 19,
                    class: "confirmedCasesLvl4",
                    color: ""
                },
                key5: {
                    min: 19,
                    max: 32,
                    class: "confirmedCasesLvl5",
                    color: ""
                },
                key6: {
                    min: 32,
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

        let mapKeysRawDatasValues = computed(() => {

            let highestValues = {};
            let mapKeysRawDatasValues = {};
            let authorizedValues = ["confirmed", "deaths", "recovered", "hospitalizations", "intensive_care"];

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

                let highestValue = Math.round(value * 10 / 100) + value;
                let valuesGap = highestValue / 6;
                mapKeysRawDatasValues[key] = {};
                
                for (let i = 1; i < 7; i++) {

                    let currentKey = "key" + i;

                    mapKeysRawDatasValues[key][currentKey] = {};
                    i === 1 ? mapKeysRawDatasValues[key][currentKey]["min"] = 0 : mapKeysRawDatasValues[key][currentKey]["min"] = mapKeysRawDatasValues[key]["key" + (i - 1)]["max"] + 1;
                    mapKeysRawDatasValues[key][currentKey]["max"] = Math.round(valuesGap * i);

                }

            }

            return mapKeysRawDatasValues;

        });

        //Functions
        function onKeyboardInput(event) {

            if (event.key === "Enter") {
                formCriteria.displayedStatus = event.target.htmlFor.split("_")[0];
            }

        }

        function changeDisplayedDatas(event) {
            formCriteria.displayedStatus = event.currentTarget.value;
        }

        function changeDisplayedDatastype(event) {
            formCriteria.displayedDatastype = event.currentTarget.value;
        }

        function setDetailedMap(displayedDatastype, displayedDatas, locationDatas, mapKeys) {

            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");
            console.log(displayedDatastype, displayedDatas, locationDatas, mapKeys);

            //Check if country/continent is equal to 0
            //In that case each province/country data is add to the displayedDatasTotal variable
            let displayedDatasTotal = 0;

            if (props.displayedCountry === "Global") {
                displayedDatasTotal = locationDatas.Global[displayedDatas];
            } else {

                if (locationDatas.All[displayedDatas] === 0) {

                    for (const [key, value] of Object.entries(locationDatas)) {

                        if (key !== "All") {
                            displayedDatasTotal += value[displayedDatas];
                        }

                    }

                } else {
                    displayedDatasTotal = locationDatas.All[displayedDatas];
                }

            }

            for (let i = 0; i < mapPaths.length; i++) {

                if (typeof locationDatas[mapPaths[i].id] !== "undefined") {

                    let currentRegionData;
                    if (props.displayedCountry === "Global") {
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / displayedDatasTotal) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    } else {
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / displayedDatasTotal) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    }

                    for (const keyValue of Object.entries(mapKeys[displayedDatastype])) {

                        if (currentRegionData >= keyValue[1].min && currentRegionData <= keyValue[1].max) {

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
                        currentMapPathChildren[a].setAttribute("class", formCriteria.displayedStatus + "HighlightAnimation");
                    }

                }

            }

        }

        function removeRegionsHighlight(color) {

            //Color will be used to set path tag fill attribute back to normal
            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");

            for (let i = 0; i < mapPaths.length; i++) {

                //SVG element className return an object and we access its className by the baseVal attribute
                if (mapPaths[i].firstElementChild.className.baseVal === formCriteria.displayedStatus + "HighlightAnimation") {

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
        for (const keyValue of Object.entries(mapKeys)) {

            for (const [key, value] of Object.entries(keyValue[1])) {
                value.color = chartStatusKey.statusGradient[displayedDatas.value][key.split("")[key.split("").length - 1]];
            }

        }

        onMounted(() => {

            //Set map key colors for the automatically displayed status
            for (const [key, value] of Object.entries(mapKeys[formCriteria.displayedDatastype])) {

                const level = key.split("")[key.split("").length - 1];
                value.color = chartStatusKey.statusGradient[displayedDatas.value][level];

            }

            setDetailedMap(formCriteria.displayedDatastype, displayedDatas.value, props.locationRegionsDatas, mapKeys);
            document.querySelector("#detailedGeoDatasPanel .regionsListPanel").className += " regionsListPanel--hidden";
            document.getElementById("detailedGeoDatasPanelToggleContentBtn").className = document.getElementById("detailedGeoDatasPanelToggleContentBtn").className.split(" ")[0] + " " + document.getElementById("detailedGeoDatasPanelToggleContentBtn").className.split(" ")[0] + "--" + formCriteria.displayedStatus;

        });

        watch(() => { return { ...formCriteria }}, ((newValue, oldValue) => {

            console.log(oldValue, newValue);

            displayedDatas.value = newValue.displayedStatus;

            //Update mapKeys values
            if ((newValue.displayedDatastype === "rawDatas" && oldValue.displayedDatastype !== "rawDatas")) {

                for (const [key, value] of Object.entries(mapKeys[newValue.displayedDatastype])) {

                    value.min = mapKeysRawDatasValues.value[newValue.displayedStatus][key]["min"];
                    value.max = mapKeysRawDatasValues.value[newValue.displayedStatus][key]["max"];

                }

            }

            //Update mapKeys color to the new status
            for (const [key, value] of Object.entries(mapKeys[newValue.displayedDatastype])) {
                value.color = chartStatusKey.statusGradient[displayedDatas.value][key.split("")[key.split("").length - 1]];
            }

            setDetailedMap(newValue.displayedDatastype, newValue.displayedStatus, props.locationRegionsDatas, mapKeys);

            let statusLabels = document.querySelectorAll(".detailedGeoDatasForm__statusContainer label");

            for (let i = 0; i < statusLabels.length; i++) {
                statusLabels[i].className = "selectableStatus selectableStatus--horizontalDisplay selectableStatus--inactive";
                statusLabels[i].setAttribute("aria-pressed", "false");
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
            document.getElementById(newValue.displayedStatus + "DetailedMapLabel").setAttribute("aria-pressed", "true");

            document.getElementById("detailedGeoDatasPanelToggleContentBtn").className = document.getElementById("detailedGeoDatasPanelToggleContentBtn").className.split(" ")[0] + " " + document.getElementById("detailedGeoDatasPanelToggleContentBtn").className.split(" ")[0] + "--" + newValue.displayedStatus;

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
            onKeyboardInput,
            mapKeysRawDatasValues

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

@mixin highlightRegionsAnimation {
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
}

@mixin highlightAnimationStart {
    transform-origin: center;
    transform: scale(1);
    stroke-width: 0.5px;
}

@mixin highlightAnimationEnd {
    transform: scale(1.01);
    transform-origin: center;
    stroke-width: 1.5px;
}

@keyframes confirmedHighlight {
    0% {
        fill: #FFF5C7;
        @include highlightAnimationStart;
    }
    100% {
        fill: #e73a51;
        @include highlightAnimationEnd;
    }
}

@keyframes recoveredHighlight {
    from {
        fill: #B5F0AD;
        @include highlightAnimationStart;
    }
    to {
        fill: #3CF525;
        @include highlightAnimationEnd;
    }
}

@keyframes deathsHighlight {
    from {
        fill: #D6D6D6;
        @include highlightAnimationStart;
    }
    to {
        fill: #3A3A3A;
        @include highlightAnimationEnd;
    }
}

@keyframes hospitalizationsHighlight {
    from {
        fill: #FFE1A4;
        @include highlightAnimationStart;
    }
    to {
        fill: #FFC042;
        @include highlightAnimationEnd;
    }
}

@keyframes intensiveCareHighlight {
    from {
        fill: #FFF5C7;
        @include highlightAnimationStart;
    }
    to {
        fill: #e73a51;
        @include highlightAnimationEnd;
    }
}

.confirmedHighlightAnimation {
    animation-name: confirmedHighlight;
    @include highlightRegionsAnimation;
}

.recoveredHighlightAnimation {
    animation-name: recoveredHighlight;
    @include highlightRegionsAnimation;
}

.deathsHighlightAnimation {
    animation-name: deathsHighlight;
    @include highlightRegionsAnimation;
}

.hospitalizationsAnimation {
    animation-name: hospitalizationsHighlight;
    @include highlightRegionsAnimation;
}

.intensive_careAnimation {
    animation-name: intensiveCareHighlight;
    @include highlightRegionsAnimation;
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
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    &__mapInputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 2.5rem;
        @media (min-width: 768px) {
            flex-direction: row;
            margin: 0;
        }
    }
    &__datatypeContainer {
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (min-width: 768px) {
            margin-right: 2vw;
            margin-bottom: 0;
        }
    }
    &__selectInput {
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        height: 32px;
        border: 1px solid black;
        background-color: rgb(250, 250, 250);
    }
    &__statusContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        @media (min-width: 768px) {
            justify-content: space-between;
            width: 40%;
        }
    }
    &__radioInput {
        display: none;
    }
    &__contentToggleBtn {
        width: 100%;
        border: 2px solid black;
        border-radius: 3px;
        background-color: inherit;
        padding: 0.2rem 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 300ms;
        @media (min-width: 768px) {
            width: auto;
        }
        &--confirmed:hover {
            color: #FF6866;
            border-color: #FF6866;
        }
        &--deaths:hover {
            color: #3A3A3A;
            border-color: #3A3A3A;
        }
        &--recovered:hover {
            color: #3CF525;
            border-color: #3CF525;
        }
        &--hospitalizations {
            color: #FFC042;
            border-color: #FFC042;
        }
        &--intensive_care {
            color: #FF6866;
            border-color: #FF6866;
        }
    }
}
</style>