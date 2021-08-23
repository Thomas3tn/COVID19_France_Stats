<template>
    <div v-if="areDatasComputed === true" class="dashboard">
        <div class="dashboard__datasContainer">
            <template v-if="formRequestCriteria.locationType === 'global'">
                <world-disease-datas-panel :diseaseDatas="datas.diseaseDatas"></world-disease-datas-panel>
            </template>
            <template v-else>
                <location-aside-panel :locationInfos="datas.locationInfos" :locationType="formRequestCriteria.locationType" :currentlyDisplayed="!isLapToggleBtnDisplay" @toggle-location-panel-display="isLapToggleBtnDisplay = !isLapToggleBtnDisplay"></location-aside-panel>
                <button v-if="isLapToggleBtnDisplay === true" class="dashboard__lapToggleBtn" id="dashboard__lapToggleBtn" @click="isLapToggleBtnDisplay = !isLapToggleBtnDisplay" title="Afficher les détails de la localisation"><i class="fas fa-chevron-right" aria-hidden="true"><span class="screenreaderText">Afficher les détails de la localisation</span></i></button>
                <country-disease-datas-panel v-if="formRequestCriteria.locationType === 'country'" :diseaseDatas="datas.diseaseDatas"></country-disease-datas-panel>
                <departement-disease-datas-panel v-if="formRequestCriteria.locationType === 'departement'" :diseaseDatas="datas.diseaseDatas"></departement-disease-datas-panel>
                <continent-disease-datas-panel v-if="formRequestCriteria.locationType === 'continent'" :diseaseDatas="datas.diseaseDatas"></continent-disease-datas-panel>
            </template>
        </div>
        <a href="#searchForm" class="dashboardBackToTopBtn" title="Retour au formulaire">
        <font-awesome-icon :icon="faLongArrowAltUp" class="dashboardBackToTopBtn__arrow dashboardBackToTopBtn__arrow--left" aria-hidden="true"/>
        Retour au formulaire
        <font-awesome-icon :icon="faLongArrowAltUp" class="dashboardBackToTopBtn__arrow dashboardBackToTopBtn__arrow--right" aria-hidden="true"/>
        </a>
    </div>   
</template>

<script>
//Vue Elements
import { computed, watch, reactive, ref, provide } from "vue";
import { useStore } from "vuex";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";

//Vue components
import LocationAsidePanel from "./Dashboard/LocationAsidePanel.vue";
import CountryDiseaseDatasPanel from "./Dashboard/CountryDiseaseDatasPanel.vue";
import DepartementDiseaseDatasPanel from "./Dashboard/DepartementDiseaseDatasPanel.vue";
import ContinentDiseaseDatasPanel from "./Dashboard/ContinentDiseaseDatasPanel.vue";
import WorldDiseaseDatasPanel from "./Dashboard/WorldDiseaseDatasPanel.vue";

//Static Datas
import departementsStaticDatas from "../../assets/staticDatas/franceDepartementsDatas.js";
import continentsStaticDatas from "../../assets/staticDatas/continentsStaticDatas.js";

import DashboardDatasCreator from "../../assets/JSClasses/dashboardDatasCreator.js";

export default {
    props: {
        formRequestCriteria: {
            required: true,
            type: Object
        }
    },
    setup(props) {

        console.log(props.formRequestCriteria);

        //Charts status colors
        const chartStatusKey = reactive({
            statusColor: {
                confirmed: "#FF6866",
                deaths: "#A0A0A0",
                recovered: "#3CF525",
                hospitalizations: "#FFC042",
                intensive_care: "#FF6866",
                people_vaccinated: "#334455",
                people_partially_vaccinated: "#457b9d",
                administered: "#2DFF90",
                population: "#5caddf",
                new_hospitalizations: "#FFC042",
                new_intensive_care: "#FF6866"
            },
            statusGradient: {
                confirmed: {
                    1: "#FFF5C7",
                    2: "#FECCA7",
                    3: "#FDA38B",
                    4: "#ff8581",
                    5: "#eb4a5f",
                    6: "#e73a51"
                },
                deaths: {
                    1: "#D6D6D6",
                    2: "#BDBDBD",
                    3: "#9C9C9C",
                    4: "#7F7E7E",
                    5: "#5D5D5D",
                    6: "#3A3A3A"
                },
                recovered: {
                    1: "#B5F0AD",
                    2: "#9EF093",
                    3: "#87EF79",
                    4: "#71EF61",
                    5: "#59F146",
                    6: "#3CF525"
                },
                hospitalizations: {
                    1: "#FFE1A4",
                    2: "#FFDA90",
                    3: "#FFD47F",
                    4: "#FFCE6C",
                    5: "#FFC655",
                    6: "#FFC042"
                },
                intensive_care: {
                    1: "#FFF5C7",
                    2: "#FECCA7",
                    3: "#FDA38B",
                    4: "#ff8581",
                    5: "#eb4a5f",
                    6: "#e73a51"
                }
            }
        });

        provide("chartStatusKey", chartStatusKey);

        //Vuex
        const store = useStore();
        let areDatasComputed = ref(false);

        let isLapToggleBtnDisplay = ref(false);

        //Datas object
        let datas = reactive({
            locationInfos: {},
            diseaseDatas: {
                country: props.formRequestCriteria.country,
                evolutionDatas: {},
                currentSituation: {},
                vaccinationDatas: {},
                relativeDatas: {},
                regionsDatas: {}
            }
        });

        //Computed datas
        let worldLiveDatas = computed(() => store.state.worldLiveDatas);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas.datas);
        let departementsLiveDatas = computed(() => store.state.departementsLiveDatas);
        let franceDepartementsEvolutionDatas = computed(() => store.state.franceDepartementsEvolutionDatas);


        //Watch for new user request
        watch(() => { return { ...props.formRequestCriteria } }, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                areDatasComputed.value = false;
                const dashboardDatasCreator = new DashboardDatasCreator();

                //Empty datas object (world locationInfos object and country locationInfos Object doesn't contain the same properties)
                datas.locationInfos = {};
                for (let keyValue of Object.entries(datas.diseaseDatas)) {

                    if (typeof value !== "string") {
                        keyValue[1] = {};
                    }

                }

                if (newValue.locationType === "country") {
                    newValue.country === "France" ? datas = dashboardDatasCreator.getCountryDatas(newValue.country, datas, worldLiveDatas.value, departementsLiveDatas.value): datas = dashboardDatasCreator.getCountryDatas(newValue.country, datas, worldLiveDatas.value);
                    datas.diseaseDatas.evolutionDatas = worldLocationEvolutionDatas.value[newValue.country];
                } else if (newValue.locationType === "departement") {
                    datas = dashboardDatasCreator.getDepartementDatas(newValue.departement, newValue.country, datas, departementsLiveDatas.value, departementsStaticDatas);
                    datas.diseaseDatas.evolutionDatas = franceDepartementsEvolutionDatas.value[newValue.departement];
                    console.log(datas);
                } else if (newValue.locationType === "continent") {
                    datas = dashboardDatasCreator.getContinentDatas(newValue.continent, datas, worldLiveDatas.value, continentsStaticDatas);
                    console.log(datas);
                } else if (newValue.locationType === "global") {
                    datas = dashboardDatasCreator.getGlobalDatas(datas, worldLiveDatas.value);
                    datas.diseaseDatas.evolutionDatas = worldLocationEvolutionDatas.value[newValue.continent];
                    console.log(datas);
                }

                areDatasComputed.value = true;

            }

        }, {deep: true, immediate: true});
        
        return {
            datas,
            areDatasComputed,
            faLongArrowAltUp,
            isLapToggleBtnDisplay
        }
    },
    components: {
        LocationAsidePanel,
        CountryDiseaseDatasPanel,
        DepartementDiseaseDatasPanel,
        ContinentDiseaseDatasPanel,
        WorldDiseaseDatasPanel
    }
}
</script>

<style lang="scss">
$selectionColor: lightblue;

//Status color variables
$confirmedColor: #FF6866;
$deathsColor: #A0A0A0;
$recoveredColor: #3CF525;
$hospitalizationsColor: #FFC042;
$intensiveCareColor: #FF6866;
$peopleVaccinatedColor: #334455;
$peoplePartiallyVaccinatedColor: #457b9d;
$inactiveColor: black;

$selectableStatusVerticalPadding: calc(max(0.2rem, 0.2vw));
$selectableStatusHorizontalPadding: calc(max(0.5rem, 0.5vw));

$datasPanelPadding: calc(max(1rem, 1.3vw));

@keyframes dashboardAppearance {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.dashboard {
    animation: dashboardAppearance 400ms ease-in;
    width: 90%;
    margin: 0 auto;
    position: relative;
    &__datasContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (min-width: 1024px) {
            align-items: flex-start;
            flex-direction: row;
        }
    }
    &__lapToggleBtn {
        display: none;
        border: none;
        position: absolute;
        background-color: #FFF;
        right: 103.7%;
        top: 50%;
        height: 10%;
        transform: translateY(50%);
        border-radius: 0 4px 4px 0;
        &:hover {
            cursor: pointer;
        }
        @media (min-width: 1024px) {
            display: block;
        }
    }
}

.dashboardBackToTopBtn {
    display: block;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #303030;
    text-decoration: none;
    margin-top: 3vw;
    padding: 1vw 2vw;
    overflow: hidden;
    transition: all 300ms;
    &:hover {
        .dashboardBackToTopBtn__arrow {
            transform: translate(0%);
            opacity: 1;
        }
    }
    &__arrow {
        transition: all 300ms;
        opacity: 0;
        transform: translateY(100%);
    }
}

.datasPanel {
    overflow: hidden;
    background-color: white;
    margin: 3vw 0;
    padding-left: $datasPanelPadding;
    padding-right: $datasPanelPadding;
    padding-bottom: $datasPanelPadding;
    padding-top: $datasPanelPadding;
    color: #303030;
    border-radius: 3px;
    &__headerContainer {
        border-bottom: 1px solid #303030;
    }
    &__header {
        margin: 0;
        padding-bottom: calc(max(1rem, 1vw));
        font-size: clamp(1.5rem, 1.5vw, 2.7rem);
        text-align: center;
        @media (min-width: 1024px) {
            text-align: left;
        }
    }
    &__toggleFormBtn {
        border: 2px solid black;
        color: black;
        border-radius: 3px;
        background-color: inherit;
        padding: 0.2rem 0.5rem;
        transition: all 300ms;
        margin-bottom: 1rem;
        width: 100%;
        @media (min-width: 1024px) {
            width: auto;
        }
        &:hover {
            cursor: pointer;
            border-color: lightblue;
            color: lightblue;
        }
    }
}

.datasPanelForm {
    &__inputContainer {
        display: flex;
        align-items: center;
        margin: 0 1rem;
    }
    &__inputPart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 1.1vw;
    }
    &__input {
        background-color: rgb(250, 250, 250);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        border: 1px solid black;
        font-size: clamp(0.9rem, 1vw, 2.5rem);
        &:hover {
            cursor: pointer;
        }
    }
    &__label {
        margin-bottom: 0.3rem;
        font-size: clamp(1rem, 1vw, 1.3rem);
        abbr {
            cursor: help;
        }
    }
    &__logoLabel {
        font-size: clamp(1.5rem, 2vw, 2.7rem)
    }
}

.selectableStatus {
    background-color: inherit;
    border: 2px solid black;
    font-size: clamp(1.5rem, 1.6vw, 3.5rem);
    padding-top: $selectableStatusVerticalPadding;
    padding-bottom: $selectableStatusVerticalPadding;
    padding-left: $selectableStatusHorizontalPadding;
    padding-right: $selectableStatusHorizontalPadding;
    border-radius: 3px;
    transition: all 300ms;
    &:hover {
        cursor: pointer;
    }
    &--horizontalDisplay {
        margin: 0 0.5vw;
    }
    &--verticalDisplay {
        margin: 0.3vw 0;
    }
    &--dashedBorder {
        border-style: dashed;
    }
    &--confirmedActive {
        border-color: $confirmedColor;
        color: $confirmedColor;
    }
    &--deathsActive {
        border-color: $deathsColor;
        color: $deathsColor;
    }
    &--recoveredActive {
        border-color: $recoveredColor;
        color: $recoveredColor;
    }
    &--hospitalizationsActive {
        border-color: $hospitalizationsColor;
        color: $hospitalizationsColor;
    }
    &--new_hospitalizationsActive {
        border-color: $hospitalizationsColor;
        color: $hospitalizationsColor;
    }
    &--intensive_careActive {
        border-color: $intensiveCareColor;
        color: $intensiveCareColor;
    }
    &--new_intensive_careActive {
        border-color: $intensiveCareColor;
        color: $intensiveCareColor;
    }
    &--inactive {
        border-color: $inactiveColor;
        color: $inactiveColor;
    }
}
</style>