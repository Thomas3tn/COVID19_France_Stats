<template>
    <section id="searchResults">

        <world-france-search-maps :formSelectedLocation="addedFormLocation" @clicked-location="transmitClickedLocation"></world-france-search-maps>
        <search-form @form-submitted="recordDatas" @added-form-location="transmitAddedFormLocation" :clickedCountry="clickedLocation"></search-form>
        <div class="resultsContainer" id="locationDashboard">
            <app-loader v-if="isContentLoading === true"></app-loader>
            <country-dashboard v-if="isContentLoading === false && areRequestResultsReceived === true" :formRequestCriteria="formRequestCriteria"></country-dashboard>
        </div>

        </section>
</template>

<script>
//Vuex
import { useStore } from "vuex";
import { reactive, ref, computed } from "vue";

//Components
import SearchForm from "../SearchResultsComponents/SearchForm.vue";
import countryDashboard from "../SearchResultsComponents/CountryDashboard.vue";
import WorldFranceSearchMaps from "../SearchResultsComponents/WorldFranceSearchMaps.vue";
import AppLoader from "./AppLoader.vue";

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
            country: "",
            departement: "",
        });

        let addedFormLocation = reactive({
            mapToDisplay: "",
            locationName: ""
        });

        //Transmit clicked location from maps to search form
        function transmitClickedLocation(clickedLocationInfos) {

            clickedLocation.locationType = clickedLocationInfos.locationType;
            clickedLocation.locationName = clickedLocationInfos.locationName;

        }

        //Execute when user submit a search request
        function recordDatas(formRequest) {

            isContentLoading.value = true;
            document.getElementById("locationDashboard").scrollIntoView();
            areRequestResultsReceived.value = false;
            formRequestCriteria.country = formRequest.country;
            formRequestCriteria.departement = formRequest.departement;

            if (formRequest.departement === "") {

                store.dispatch("setWorldLocationEvolutionDatas", {location: formRequest.country})
                .then(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                })
                .catch(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                });

            } else if (formRequest.country === "France" && formRequest.departement !== "") {

                //formRequest object contain departement code
                //API request need departement name
                const departementName = departementsLiveDatas.value[formRequest.departement]["nom"];
                console.log(departementName);

                store.dispatch("setFranceDepartementsEvolutionDatas", departementName)
                .then(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                })
                .catch(response => {
                    areRequestResultsReceived.value = response;
                    isContentLoading.value = false;
                });

            }

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
            recordDatas,
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
.resultsContainer {
    margin: 0 auto;
    padding: 5rem 0;
    width: 100%;
    background-color: #93B1A7;
    &__sourceLink {
        text-align: center;
    }
}
</style>