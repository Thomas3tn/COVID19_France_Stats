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
            </div>
            <form>
                <h4>Données à afficher</h4>
                <template v-if="displayedCountry === 'France'">
                    <input type="radio" @click="changeDisplayedDatas" id="hospitalizationsInput" name="displayedStatus" value="hospitalizations"/><label for="hospitalizationsInput">Hospitalisations</label>
                    <input type="radio" @click="changeDisplayedDatas" id="intensiveCareInput" name="displayedStatus" value="intensive_care"/><label for="intensiveCareInput">Réanimations</label>
                    <input type="radio" @click="changeDisplayedDatas" id="deathsInput" name="displayedStatus" value="deaths"/><label for="deathsInput">Décès</label>
                    <input type="radio" @click="changeDisplayedDatas" id="recoveredInput" name="displayedStatus" value="recovered"/><label for="recoveredInput">Guéris</label>
                </template>
                <template v-else>
                    <input type="radio" @click="changeDisplayedDatas" id="confirmedInput" value="confirmed" name="displayedStatus" checked="true"/><label for="confirmedInput">Cas confirmés</label>
                    <input type="radio" @click="changeDisplayedDatas" id="deathsInput" value="deaths" name="displayedStatus"/><label for="deathsInput">Décès</label>
                    <input type="radio" @click="changeDisplayedDatas" id="recoveredInput" value="recovered" name="displayedStatus"/><label for="recoveredInput">Guéris</label>
                </template>
            </form>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

//Vue Components
import franceMap from "./FranceMap.vue";
import usMap from "./UsMap.vue";
import canadaMap from "./CanadaMap.vue";
import indiaMap from "./IndiaMap";
import BrazilMap from "./BrazilMap.vue";
import ChinaMap from "./ChinaMap.vue";
import RussiaMap from "./RussiaMap.vue";

export default {
    props: {
        displayedCountry: {
            type: String,
            required: false,
            default: "France"
        }
    },
    setup(props) {

        //Vuex
        const store = useStore();
        let locationDatas;
        props.country === "France" ? locationDatas = store.departementsLiveDatas.datas : locationDatas = computed(() => store.state.worldLiveDatas.datas[props.displayedCountry]);
            console.log(locationDatas);
        //Variables
        let displayedDatas = ref("confirmed");
        //Calculate %region compared to country total

        //Functions
        function changeDisplayedDatas(event) {
            displayedDatas.value = event.currentTarget.value;
        }

        let regionsTotal = ref(0);

        onMounted(() => {

            let mapPaths = document.querySelectorAll("#currentSituationMap svg a");

                for (let i = 0; i < mapPaths.length; i++) {

                    console.log(mapPaths[i].id);

                    if (displayedDatas.value === "confirmed") {

                        let regionNationalPart = 100 * (locationDatas.value[mapPaths[i].id]["confirmed"] / locationDatas.value.All.confirmed);
                        console.log(regionNationalPart);
                        regionsTotal.value += regionNationalPart;

                        if (regionNationalPart === 0) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 0 && regionNationalPart <= 5) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 5 && regionNationalPart <= 12) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 25 && regionNationalPart <= 38) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 50 && regionNationalPart <= 75) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 75) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }
                            
                        }

                    }

                }

        });

        //Watcher
        watch(() => displayedDatas.value, (newValue, oldValue) => {

            console.log(newValue, oldValue);
            
            if (newValue !== oldValue) {

                let mapPaths = Array.from(document.querySelectorAll("#currentSituationMap svg a"));

                for (let i = 0; i < mapPaths.length; i++) {

                    if (displayedDatas.value === "confirmed") {

                        let regionNationalPart = 100 * (locationDatas[mapPaths[i].id][newValue] / locationDatas.All[newValue]);

                        if (regionNationalPart === 0) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 0 && regionNationalPart <= 5) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 5 && regionNationalPart <= 12) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 25 && regionNationalPart <= 38) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 50 && regionNationalPart <= 75) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }

                        } else if (regionNationalPart > 75) {

                            let currentMapPathChildren = mapPaths[i].children;
                            for (let a = 0; a < currentMapPathChildren.length; a++) {
                                currentMapPathChildren[a].setAttribute("class", "confirmedCasesLvl1");
                            }
                            
                        }

                    }

                }

            }

        }, {immediate: true});

        return {
            changeDisplayedDatas,
            regionsTotal
        }

    },
    components: {
        franceMap,
        usMap,
        canadaMap,
        indiaMap,
        BrazilMap,
        ChinaMap,
        RussiaMap
    }
}
</script>

<style lang="scss">
.detailedGeoDatasPanel {
    &__mapContainer {
        background-color: #FFF;
        path {
            stroke: #FFF;
            stroke-width: 2px;
        }
    }
}
</style>