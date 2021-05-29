<template>
    <div v-if="areDatasComputed === true" class="dashboard">
        <div class="dashboard__datasContainer">
            <template v-if="formRequestCriteria.locationType === 'global'">
                <world-disease-datas-panel :diseaseDatas="datas.diseaseDatas"></world-disease-datas-panel>
            </template>
            <template v-else>
                <location-aside-panel :locationInfos="datas.locationInfos" :locationType="formRequestCriteria.locationType"></location-aside-panel>
                <country-disease-datas-panel v-if="formRequestCriteria.locationType === 'country'" :diseaseDatas="datas.diseaseDatas"></country-disease-datas-panel>
                <departement-disease-datas-panel v-if="formRequestCriteria.locationType === 'departement'" :diseaseDatas="datas.diseaseDatas"></departement-disease-datas-panel>
                <continent-disease-datas-panel v-if="formRequestCriteria.locationType === 'continent'" :diseaseDatas="datas.diseaseDatas"></continent-disease-datas-panel>
            </template>
        </div>
        <a href="#searchForm" class="dashboardBackToTopBtn" title="Retour au formulaire">
        <font-awesome-icon :icon="faLongArrowAltUp" class="dashboardBackToTopBtn__arrow dashboardBackToTopBtn__arrow--left"/>
        Retour au formulaire
        <font-awesome-icon :icon="faLongArrowAltUp" class="dashboardBackToTopBtn__arrow dashboardBackToTopBtn__arrow--right"/>
        </a>
    </div>   
</template>

<script>
//Vue Elements
import { computed, watch, reactive, ref } from "vue";
import { useStore } from "vuex";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";

//Vue components
import LocationAsidePanel from "./CountryDashboardComponents/LocationAsidePanel.vue";
import CountryDiseaseDatasPanel from "./CountryDashboardComponents/CountryDiseaseDatasPanel.vue";
import DepartementDiseaseDatasPanel from "./CountryDashboardComponents/DepartementDiseaseDatasPanel.vue";
import ContinentDiseaseDatasPanel from "./CountryDashboardComponents/ContinentDiseaseDatasPanel.vue";
import WorldDiseaseDatasPanel from "./CountryDashboardComponents/WorldDiseaseDatasPanel.vue";

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

        //Vuex
        const store = useStore();
        let areDatasComputed = ref(false);

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
        let worldLiveDatas = computed(() => store.state.worldLiveDatas.datas);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas.datas);
        let departementsLiveDatas = computed(() => store.state.departementsLiveDatas);
        let franceDepartementsEvolutionDatas = computed(() => store.state.franceDepartementsEvolutionDatas);


        //Watch for new user request
        watch(() => { return { ...props.formRequestCriteria } }, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                areDatasComputed.value = false;
                const dashboardDatasCreator = new DashboardDatasCreator();

                if (newValue.locationType === "country") {
                    newValue.country === "France" ? datas = dashboardDatasCreator.getCountryDatas(newValue.country, datas, worldLiveDatas.value, departementsLiveDatas.value): datas = dashboardDatasCreator.getCountryDatas(newValue.country, datas, worldLiveDatas.value);
                    datas.diseaseDatas.evolutionDatas = worldLocationEvolutionDatas.value[newValue.country];
                } else if (newValue.locationType === "departement") {
                    datas = dashboardDatasCreator.getDepartementDatas(newValue.departement, datas, departementsLiveDatas.value, departementsStaticDatas);
                    datas.diseaseDatas.evolutionDatas = franceDepartementsEvolutionDatas.value[newValue.departement];
                    console.log(datas);
                } else if (newValue.locationType === "continent") {
                    datas = dashboardDatasCreator.getContinentDatas(newValue.continent, datas, worldLiveDatas.value, continentsStaticDatas);
                } else if (newValue.locationType === "global") {
                    datas = dashboardDatasCreator.getGlobalDatas(datas, worldLiveDatas.value);
                    datas.diseaseDatas.evolutionDatas = worldLocationEvolutionDatas.value[newValue.continent];
                    console.log(datas);
                }

                areDatasComputed.value = true;

            }

        }, {deep: true, immediate: true});

        //Add Google Map script tag
        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);
        
        return {
            datas,
            areDatasComputed,
            faLongArrowAltUp
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
.dashboard {
    width: 90%;
    margin: 0 auto;
    &__datasContainer {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
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
    font-size: 1.2rem;
    margin-top: 2.2rem;
    padding: 1rem 2rem;
    overflow: hidden;
    transition: all 300ms;
    &:hover {
        background-color: darken(#FFF, 3%);
        .dashboardBackToTopBtn__arrow {
            transform: translate(0%);
            opacity: 1;
        }
    }
    &__arrow {
        transition: all 300ms;
        font-size: 1.5rem;
        opacity: 0;
        transform: translateY(100%);
    }
}
</style>