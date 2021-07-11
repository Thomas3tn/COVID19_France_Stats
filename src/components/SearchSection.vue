<template>
    <section id="searchSection" class="searchSection">

        <world-france-search-maps :formSelectedLocation="addedFormLocation" @clicked-location="transmitClickedLocation"></world-france-search-maps>
        <search-form @form-submitted="onFormSubmission" @added-form-location="transmitAddedFormLocation" :clickedLocation="clickedLocation"></search-form>
        <div class="resultsContainer" id="locationDashboard">
            <app-loader v-if="isContentLoading === true && areRequestResultsReceived === false"></app-loader>
            <country-dashboard v-if="isContentLoading === false && areRequestResultsReceived === true" :formRequestCriteria="formRequestCriteria"></country-dashboard>
            <div v-if="isContentLoading === false && areRequestResultsReceived === false" class="resultsContainer__noDatasPlaceholderContainer">
                <p class="resultsContainer__noDatasPlaceholder">Aucune données à afficher</p>
            </div>
        </div>
    </section>
</template>

<script>
//Vuex
import { useStore } from "vuex";
import { reactive, ref, computed } from "vue";

//Components
import SearchForm from "./SearchSection/SearchForm.vue";
import countryDashboard from "./SearchSection/Dashboard.vue";
import WorldFranceSearchMaps from "./SearchSection/WorldFranceSearchMaps.vue";
import AppLoader from "./SearchSection/DashboardSkeletonAnimation.vue";

export default {
    setup() {

        //Vuex
        const store = useStore();
        const departementsLiveDatas = computed(() => store.state.departementsLiveDatas.datas);
        
        //Datas checkers
        let areRequestResultsReceived = ref(false);
        let isContentLoading = ref(false);

        //Store user submission elements
        const clickedLocation = reactive({
            locationType: "",
            locationName: ""
        });
        let formRequestCriteria = reactive({
            continent: "",
            country: "",
            departement: "",
            locationType: ""
        });

        let addedFormLocation = reactive({
            mapToDisplay: "",
            locationName: ""
        });

        function getLocationType(formRequestCriteria) {

            const continentsName = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"];

            if (formRequestCriteria.continent === "Global" && formRequestCriteria.country === "" && formRequestCriteria.departement === "") {
                return "global";
            } else if (continentsName.includes(formRequestCriteria.continent) && formRequestCriteria.departement === "" && formRequestCriteria.country === "") {
                return "continent";
            } else if (formRequestCriteria.country !== "" && formRequestCriteria.departement === "") {
                return "country";
            } else if (formRequestCriteria.country === "France" && formRequestCriteria.departement !== "") {
                return "departement";
            }

        }

        //Transmit clicked location from maps to search form
        function transmitClickedLocation(clickedLocationInfos) {

            clickedLocation.locationType = clickedLocationInfos.locationType;
            clickedLocation.locationName = clickedLocationInfos.locationName;

        }

        //Executed when user submit a search request
        function onFormSubmission(formRequest) {

            isContentLoading.value = true;
            document.getElementById("locationDashboard").scrollIntoView();
            areRequestResultsReceived.value = false;
            formRequestCriteria.country = formRequest.country;
            formRequestCriteria.departement = formRequest.departement;
            formRequestCriteria.continent = formRequest.continent;
            formRequestCriteria.locationType = getLocationType(formRequest);

            if (formRequestCriteria.locationType === "country") {

                store.dispatch("setWorldLocationEvolutionDatas", {location: formRequest.country})
                .then(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                })
                .catch(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                });

            } else if (formRequestCriteria.locationType === "departement") {

                //formRequest object contain departement code but API request need departement name
                const departementName = departementsLiveDatas.value[formRequest.departement]["nom"];
                console.log(departementName);

                store.dispatch("setFranceDepartementsEvolutionDatas", {code: formRequest.departement, name: departementName})
                .then(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                })
                .catch(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                });

            } else if (formRequestCriteria.locationType === "continent") {
                
                areRequestResultsReceived.value = true;
                isContentLoading.value = false;

            } else if (formRequestCriteria.locationType === "global") {

                store.dispatch("setWorldLocationEvolutionDatas", {location: formRequest.continent})
                .then(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                })
                .catch(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                });

            }

            console.log(formRequestCriteria.locationType);

        }

        //Transmit added search from location to maps
        function transmitAddedFormLocation(datas) {

            addedFormLocation.mapToDisplay = datas.mapToDisplay;
            addedFormLocation.locationName = datas.locationName;

        }

        return {
            clickedLocation,
            formRequestCriteria,
            areRequestResultsReceived,
            isContentLoading,
            transmitClickedLocation,
            onFormSubmission,
            transmitAddedFormLocation,
            addedFormLocation
        }

    },
    components: {
        SearchForm,
        countryDashboard,
        WorldFranceSearchMaps,
        AppLoader
    }
}
</script>

<style lang="scss">
.searchSection {
    background-color: white;
}

.resultsContainer {
    margin: 0 auto;
    padding: 5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background: #e6f0f0;
    &__noDatasPlaceholderContainer {
        background: url("../assets/img/dashboard/bacteriaCellCovid.png") no-repeat, #e6f0f0;
        background-position: center;
        background-size: 80%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__noDatasPlaceholder {
        background-color: #ffffffa1;
        border-radius: 3px;
        padding: 0.5rem 1rem;
    }
}
</style>