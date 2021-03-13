<template>
    <section id="searchResults">

        <search-form @form-submitted="recordDatas"></search-form>

        <div class="resultsContainer">
            <country-dashboard v-if="locationType === 'country'" :countryDatas="requestResults"></country-dashboard>
        </div>

        </section>
</template>

<script>

//Components
import SearchForm from "../SearchResultsComponents/SearchForm.vue";
import countryDashboard from "../SearchResultsComponents/CountryDashboard.vue";

//JS API Datas Manager
import FranceStatsManager from "../../assets/JSClasses/FranceStatsManager.js";
import CountryStatsManager from "../../assets/JSClasses/CountryStatsManager.js";

export default {
    data() {
        return {
            locationType: "",
            country: "",
            departement: "",
            startDate: "",
            endDate: "",
            requestResults: {}
        }
    },
    components: {
        SearchForm,
        countryDashboard
    },
    methods: {
        recordDatas: function(searchCriteria) {

            console.log(searchCriteria);

            this.country = searchCriteria.country;
            this.departement = searchCriteria.departement;
            this.startDate = searchCriteria.startDate;
            this.endDate = searchCriteria.endDate;

            if (this.locationName === "France" && this.departement !== "") {
                this.FranceDatasHandler();
            } else if (this.locationName !== "" && this.departement === "") {
                this.countryDatasHandler();
            }

        },
        countryDatasHandler: function() {

            let countryStatsManager = new CountryStatsManager();
            countryStatsManager.requestManager({locationName: this.country})
            .then((response) => {

                console.log(response);
                this.locationType = response.locationDetails.locationType;
                this.locationName = response.locationDetails.locationName;
                this.requestResults = response;

            })
            .catch((error) => {
                console.log(error);
            });

        },
        FranceDatasHandler: function() {

            let franceStatsManager = new FranceStatsManager();
            franceStatsManager.requestManager({location: this.location, date: this.date, includeOnlyThisDay: this.includeOnlyThisDay})
            .then((response) => {

                this.requestResults.requestInfos.locationType = response.requestInfos.locationType;
                this.requestResults.requestInfos.date = response.requestInfos.date;
                this.requestResults.requestInfos.locationName = response.requestInfos.locationName;
                this.requestResults.requestInfos.sourceName = response.requestInfos.sourceName;
                console.log(this.requestResults.requestInfos.locationType);

                this.requestResults.stats = {};

                if (this.requestResults.requestInfos.locationType === "departementsList") {

                    this.requestResults.stats.departementsList = [];

                    for (let i = 0; i < response.departementsList.length; i++) {

                        this.requestResults.stats.departementsList.push(response.departementsList[i]);
                        console.log(response.departementsList[i]);

                    }

                } else {

                    this.requestResults.stats.statsHeader = {};
                    this.requestResults.stats.statsBody = [];

                    if (this.requestResults.stats.statsBody.length !== 0) {
                    this.requestResults.stats.statsBody = [];
                    }
                    if (response.stats.statsHeader.confirmedCases) {
                        this.requestResults.stats.statsHeader = response.stats.statsHeader.confirmedCases;
                    }
                    for (let i = 0; i < response.stats.statsBody.length; i++) {
                        this.requestResults.stats.statsBody.push(response.stats.statsBody[i]);
                    }

                }

                

            })
            .catch((response) => {
                console.log(response);
            });

        }
    },
    mounted() {

        let countryStatsManagerScript = document.createElement("script");
        countryStatsManagerScript.setAttribute("script", "../assets/CountryStatsManager.js");
        document.head.appendChild(countryStatsManagerScript);

        let franceStatsManagerScript = document.createElement("script");
        franceStatsManagerScript.setAttribute("script", "../assets/FranceStatsManager.js");
        document.head.appendChild(franceStatsManagerScript);

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