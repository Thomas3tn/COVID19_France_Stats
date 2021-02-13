<template>
    <section id="searchResults">

        <search-form @form-submitted="recordDatas"></search-form>

        <div class="resultsContainer">
            <stat-section-location v-if="requestResults.requestInfos.locationType === 'country' || requestResults.requestInfos.locationType === 'departement'" :requestResults="requestResults"></stat-section-location>
            <stat-section-list v-else-if="requestResults.requestInfos.locationType === 'departementsList'" :requestResults="requestResults"></stat-section-list>
        </div>

        </section>
</template>

<script>
import searchForm from "./searchForm.vue";
import DatasManager from "../assets/APIRequestManager.js";
import statSectionLocation from "./statSectionLocation.vue";
import statSectionList from "./statSectionList.vue";

export default {
    data() {
        return {
            requestResults: {
                requestInfos: {
                    locationType: "",
                    locationName: "",
                    date: "",
                    sourceName: ""
                },
                stats: {}
            }
        }
    },
    components: {
        searchForm,
        statSectionLocation,
        statSectionList
    },
    methods: {
        recordDatas: function(searchCriteria) {

            console.log(searchCriteria);

            this.location = searchCriteria.location;
            this.date = searchCriteria.date;
            this.includeOnlyThisDay = searchCriteria.includeOnlyThisDay;

            let datasManager = new DatasManager();
            datasManager.requestManager({location: this.location, date: this.date, includeOnlyThisDay: this.includeOnlyThisDay})
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

        let externalScript = document.createElement("script");
        externalScript.setAttribute("script", "../assets/APIRequestManager.js");
        document.head.appendChild(externalScript);
        
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