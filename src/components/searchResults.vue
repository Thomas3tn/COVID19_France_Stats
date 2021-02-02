<template>
    <section id="searchResults">

        <search-form @form-submitted="recordDatas"></search-form>

        <div>
            <search-criteria :location="location" :date="date"></search-criteria>
            <div>
                <stat-item></stat-item>
            </div>
        </div>

            

            <p>Source: <a href="#">Ministère des Solidarités et de la Santé</a></p>

        </section>
</template>

<script>
import searchForm from "./searchForm.vue";
import searchCriteria from "./searchCriteria.vue";
import statItem from "./statItem.vue";
import DatasManager from "../assets/APIRequestManager.js";

export default {
    data() {
        return {
            location: "",
            date: "",
            includeOnlyThisDay: ""
        }
    },
    components: {
        searchForm,
        searchCriteria,
        statItem
    },
    methods: {
        recordDatas: function(searchCriteria) {

            this.location = searchCriteria.location;
            this.date = searchCriteria.date;
            this.includeOnlyThisDay = searchCriteria.includeOnlyThisDay;

            let datasManager = new DatasManager();
            datasManager.userRequestRouter({location: this.location, date: this.date, includeOnlyThisDay: this.includeOnlyThisDay})
            .then((response) => {
                console.log(response);
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