<template>
    <div class="datasPanel">
        <div class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Situation geographique détaillée</h3>
        </div>
        <div>
            <div id="currentSituationMap" class="detailedGeoDatasPanel__mapContainer">
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
            <div class="detailedGeoDatasPanel__formRankingContainer">
                <form @submit.prevent="onFormSubmission" class="detailedGeoDatasForm">
                    <h4 class="detailedGeoDatasForm__header">Données à afficher</h4>
                    <div class="detailedGeoDatasForm__inputTypeContainer">
                        <p>Type de données</p>
                        <div class="detailedGeoDatasForm__datatypeContainer">
                            <input type="radio" @click="changeDisplayedDatastype" id="relativeDatasDetailedMapInput" name="displayedDatastype" value="relativeDatas" checked="checked" title="Données relatives"/><label for="relativeDatasDetailedMapInput" title="Données relatives">Données relatives</label>
                            <input type="radio" @click="changeDisplayedDatastype" id="rawDatasDetailedMapInput" name="displayedDatastype" value="rawDatas" title="Données brutes"/><label for="rawDatasDetailedMapInput" title="Données brutes">Données brutes</label>
                        </div>
                    </div>
                    <div class="detailedGeoDatasPanel__inputTypeContainer">
                        <p>Type de status</p>
                        <div class="detailedGeoDatasForm__statusContainer">
                            <template v-for="item in currentStatusKeys" :key="item.idName">
                                <template v-if="displayedDatas === item.idName">
                                    <label :for="item.idName + 'DetailedMapInput'" :title="item.dashboardName"><input type="radio" @click="changeDisplayedDatas" :id="item.idName + 'DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName" checked/>{{ item.dashboardName }}</label>
                                </template>
                                <template v-else>
                                    <label :for="item.idName + 'DetailedMapInput'" :title="item.dashboardName"><input type="radio" @click="changeDisplayedDatas" :id="item.idName + 'DetailedMapInput'" name="displayedStatus" :value="item.idName" :title="item.dashboardName"/>{{ item.dashboardName }}</label>
                                </template>
                            </template>
                            
                        </div>
                    </div>
                    <input type="submit" value="Valider" title="Valider" class="detailedGeoDatasForm__submitBtn"/>
                </form>
                <regions-list-panel :regionsDatas="locationRegionsDatas" :displayedStatus="displayedDatas"></regions-list-panel>
            </div>
        </div>
    </div>
</template>

<script>
//Vue & Vuex Elements
import { ref, onMounted, reactive } from "vue";

//Vue Components
import RegionsListPanel from "./RegionsListPanel.vue";
import franceMap from "./FranceMap.vue";
import usMap from "./UsMap.vue";
import canadaMap from "./CanadaMap.vue";
import indiaMap from "./IndiaMap";
import BrazilMap from "./BrazilMap.vue";
import ChinaMap from "./ChinaMap.vue";
import RussiaMap from "./RussiaMap.vue";
import SouthAmericaMap from "./SouthAmericaMap.vue";
import NorthAmericaMap from "./NorthAmericaMap.vue";
import EuropeMap from "./EuropeMap.vue";
import AfricaMap from "./AfricaMap.vue";
import AsiaMap from "./AsiaMap.vue";
import OceniaMap from "./OceniaMap.vue";
import WorldMap from "./WorldMap.vue";

//JS Class
import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

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
        console.log(props.displayedCountry);

        const datasCalculator = new DatasCalculator();

        const mapKeys = {
            relativeDatas: {
                key1: {
                    min: 0,
                    max: 0,
                    class: "confirmedCasesLvl1"
                },
                key2: {
                    min: 0,
                    max: 5,
                    class: "confirmedCasesLvl2"
                },
                key3: {
                    min: 5,
                    max: 12,
                    class: "confirmedCasesLvl3"
                },
                key4: {
                    min: 12,
                    max: 25,
                    class: "confirmedCasesLvl4"
                },
                key5: {
                    min: 25,
                    max: 38,
                    class: "confirmedCasesLvl5"
                },
                key6: {
                    min: 38,
                    max: 100,
                    class: "confirmedCasesLvl6"
                }
            },
            rawDatas: {
                confirmed: {

                },
                deaths: {

                },
                recovered: {

                },
                hospitalizations: {

                },
                intensiveCare: {
                    
                }
            }
        }

        //Form
        let formCriteria = reactive({
            displayedDatastype: "relativeDatas",
            displayedStatus: ""
        });

        //Transmitted map options
        let displayedDatas = ref("");

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
                        console.log(mapPaths[i].id, displayedDatas)
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / locationDatas.Global[displayedDatas]) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    } else {
                        displayedDatastype === "relativeDatas" ? currentRegionData = 100 * (locationDatas[mapPaths[i].id][displayedDatas] / locationDatas.All[displayedDatas]) : currentRegionData = locationDatas[mapPaths[i].id][displayedDatas];
                    }

                    for (const keyValue of Object.entries(mapKeys[displayedDatastype])) {

                        if (currentRegionData > keyValue[1].min && currentRegionData >= keyValue[1].max) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", keyValue[1].class);
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

        function onFormSubmission() {
            setDetailedMap(formCriteria.displayedDatastype, displayedDatas.value, props.locationRegionsDatas, mapKeys);
            displayedDatas.value = formCriteria.displayedStatus;
        }

        //Get all input form status
        const diseaseStatusValues = ["confirmed", "deaths", "recovered", "hospitalizations", "intensive_care"];
        let currentStatusKeys = [];

        if (props.displayedCountry === "Global") {

            currentStatusKeys = [{idName: "confirmed", dashboardName: "Cas confirmés"}, {idName: "deaths", dashboardName: "Décès"}, {idName: "recovered", dashboardName: "Guéris"}];

        } else {

            for (const keyValue of Object.entries(props.locationRegionsDatas.All)) {

                if (diseaseStatusValues.includes(keyValue[0]) && typeof keyValue[1] !== "undefined") {

                    let currentStatus = {};
                    currentStatus.idName = keyValue[0],
                    currentStatus.dashboardName = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(keyValue[0]);
                    currentStatusKeys.push(currentStatus);

                }

            }

        }

        

        //Set displayed status as the first map key element
        displayedDatas.value = currentStatusKeys[0].idName;

        onMounted(() => {
            setDetailedMap(formCriteria.displayedDatastype, displayedDatas.value, props.locationRegionsDatas, mapKeys);
        });


        return {
            changeDisplayedDatas,
            changeDisplayedDatastype,
            currentStatusKeys,
            onFormSubmission,
            displayedDatas,
        }

    },
    components: {
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
.detailedGeoDatasPanel {
    &__mapContainer {
        background-color: #FFF;
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &__statusContainer {
        display: flex;
        flex-direction: column;
    }
}
</style>