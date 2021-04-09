<template>
    <section id="searchResults">

        <world-france-search-maps @clicked-location="transmitClickedLocation"></world-france-search-maps>

        <search-form @form-submitted="recordDatas" :clickedCountry="clickedLocation"></search-form>

        <div class="resultsContainer">
            <app-loader v-if="isContentLoading === true"></app-loader>
            <country-dashboard v-if="areSearchCriteriaReceived === true && areLocationEvolutionDatasReceived === true && isContentLoading === false" :searchCriteria="searchCriteria"></country-dashboard>
        </div>

        </section>
</template>

<script>
//Vuex
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";

//Components
import SearchForm from "../SearchResultsComponents/SearchForm.vue";
import countryDashboard from "../SearchResultsComponents/CountryDashboard.vue";
import WorldFranceSearchMaps from "../SearchResultsComponents/WorldFranceSearchMaps.vue";
import AppLoader from "./AppLoader.vue";

export default {
    setup() {

        //Vuex
        const store = useStore();
        
        //Datas checkers
        let areSearchCriteriaReceived = ref(false);
        let areLocationEvolutionDatasReceived = ref(false);
        let isContentLoading = ref(false);

        //Store user submission elements
        const clickedLocation = reactive({
            locationType: "",
            locationName: ""
        });
        const searchCriteria = reactive({
            country: "",
            departement: "",
            startDate: "",
            endDate: ""
        });

        function transmitClickedLocation(clickedLocationInfos) {
            console.log(clickedLocationInfos);
            clickedLocation.locationType = clickedLocationInfos.locationType;
            clickedLocation.locationName = clickedLocationInfos.locationName;
            console.log(clickedLocation);
        }

        function recordDatas(requestCriteria) {

            isContentLoading.value = true;
            areLocationEvolutionDatasReceived.value = false;
            searchCriteria.country = requestCriteria.country;
            searchCriteria.departement = requestCriteria.departement;
            searchCriteria.startDate = requestCriteria.startDate;
            searchCriteria.endDate = requestCriteria.endDate;
            areSearchCriteriaReceived.value = true;

            store.dispatch("setWorldLocationEvolutionDatas", searchCriteria.country)
            .then(response => {
                areLocationEvolutionDatasReceived.value = response;
                isContentLoading.value = false;
            })
            .catch(response => {
                areLocationEvolutionDatasReceived.value = response;
                isContentLoading.value = false;
            });

        }

        onMounted(() => {

            let countryStatsManagerScript = document.createElement("script");
            countryStatsManagerScript.setAttribute("script", "../assets/CountryStatsManager.js");
            document.head.appendChild(countryStatsManagerScript);

            let franceStatsManagerScript = document.createElement("script");
            franceStatsManagerScript.setAttribute("script", "../assets/FranceStatsManager.js");
            document.head.appendChild(franceStatsManagerScript);

        });

        return {
            clickedLocation,
            searchCriteria,
            areSearchCriteriaReceived,
            areLocationEvolutionDatasReceived,
            isContentLoading,
            transmitClickedLocation,
            recordDatas,
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
    width: 75%;
    &__sourceLink {
        text-align: center;
    }
}
</style>