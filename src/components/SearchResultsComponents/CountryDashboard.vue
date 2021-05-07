<template>
    <div v-if="areDatascomputed === true" class="dashboard">
        <div class="dashboard__datasContainer">
            <location-aside-panel :locationInfos="datas.locationInfos"></location-aside-panel>
            <country-disease-datas-panel :diseaseDatas="datas.diseaseDatas"></country-disease-datas-panel>
            
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

//Static Datas
import departementsStaticDatas from "../../assets/staticDatas/franceDepartementsDatas.js";

export default {
    props: {
        formRequestCriteria: {
            required: true,
            type: Object
        }
    },
    setup(props) {

        //Vuex
        const store = useStore();
        let areDatascomputed = ref(false);

        //Datas object
        let datas = reactive({
            locationInfos: {},
            diseaseDatas: {
                country: props.formRequestCriteria.country,
                evolutionDatas: {},
                currentSituation: {},
                vaccinationDatas: {},
                relativeDatas: {}
            }
        });

        //Computed datas
        let worldLiveDatas = computed(() => store.state.worldLiveDatas.datas);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas.datas);
        let departementsLiveDatas = computed(() => store.state.departementsLiveDatas);
        let franceDepartementsEvolutionDatas = computed(() => store.state.franceDepartementsEvolutionDatas);


        //Watch for new user request
        watch(() => { return { ...props.formRequestCriteria } }, (newValue, oldValue) => {

            console.log(newValue);

            if (newValue !== oldValue) {

                areDatascomputed.value = false;

                //Get live datas
                newValue.departement === "" ? datas.diseaseDatas.evolutionDatas = worldLocationEvolutionDatas.value[newValue.country] : datas.diseaseDatas.evolutionDatas = franceDepartementsEvolutionDatas[newValue.departement];

                //Get evolution datas
                let locationDatas = {};
                if (newValue.departement !== "") {
                    //Creating france static datas object key
                    let staticDatasKey = newValue.departement.split("-")[0] + newValue.departement.split("-")[1];
                    locationDatas = Object.assign(departementsLiveDatas.value[newValue.departement], departementsStaticDatas[staticDatasKey]);
                } else {
                    locationDatas = worldLiveDatas.value[newValue.country]["All"];
                }

                //Fill array with to indicate which datas retrieve for each dashboard component

                    let locInfosKeys = [];
                    let vaccCampKeys = [];
                    let relDatasKeys = [];
                    let currSituationKeys = [];

                    if (newValue.departement !== "") {

                        locInfosKeys.push("location", "sq_km_area", "capital_city", "population", "life_expectancy", "lat", "long", "code", "nom", "date", "source", "sourceType");
                        relDatasKeys.push("population", "sq_km_area", "hospitalizations");
                        currSituationKeys.push("hospitalizations", "intensive_care", "deaths", "recovered");

                    } else {

                        locInfosKeys.push("country", "demonym", "gini", "population", "sq_km_area", "life_expectancy", "continent", "abbreviation", "location", "capital_city", "lat", "long", "updated");
                        vaccCampKeys.push("population", "administered", "people_vaccinated", "people_partially_vaccinated");
                        relDatasKeys.push("population", "sq_km_area", "confirmed");
                        currSituationKeys.push("confirmed", "deaths", "recovered", "people_vaccinated");

                    }

                    //Distribute datas for each dashboard components
                    console.log(locationDatas);
                    for (const [key, value] of Object.entries(locationDatas)) {

                        let currentKey = "";
                        switch (key) {
                            case "confirmed":
                                currentKey = "Cas confirmés"
                                break;
                        
                            case "deaths":
                                currentKey = "Décès"
                                break;
                            
                            case "recovered":
                                currentKey = "Guéris"
                                break;
                            
                            case "administered":
                                currentKey = "Doses administrées"
                                break;
                            
                            case "people_vaccinated":
                                currentKey = "Personnes vaccinées"
                                break;
                            
                            case "people_partially_vaccinated":
                                currentKey = "Personnes partiellement vaccinées"
                                break;

                            case "population":
                                currentKey = "Population non vaccinée"
                                break;

                            case "hospitalizations":
                                currentKey = "Hospitalisations";
                                break;

                            case "intensive_care":
                                currentKey = "Réanimations";
                                break;
                        
                            default:
                                currentKey = "";
                                break;
                        }

                        if (locInfosKeys.includes(key)) {
                            datas.locationInfos[key] = value;
                        }
                        if (currSituationKeys.includes(key)) {
                            datas.diseaseDatas.currentSituation[key] = {
                                dataName: currentKey,
                                dataNumber: value
                            };
                        }
                        if (vaccCampKeys.includes(key)) {
                            datas.diseaseDatas.vaccinationDatas[key] = {
                                dataName: currentKey,
                                dataNumber: value
                            };
                        }
                        if (relDatasKeys.includes(key)) {
                            datas.diseaseDatas.relativeDatas[key] = value;
                        }

                    }

                console.log(datas.diseaseDatas);
                areDatascomputed.value = true;

            }

        }, {deep: true, immediate: true});

        //Add Google Map script tag
        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);
        
        return {
            datas,
            areDatascomputed,
            faLongArrowAltUp
        }
    },
    components: {
        LocationAsidePanel,
        CountryDiseaseDatasPanel
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