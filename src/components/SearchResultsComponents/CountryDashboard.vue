<template>
    <div class="dashboard">
        <aside class="locationDetails">
            <div class="locationDetails__locationName">
                <img :src="locationDatas.locationInfos.logoPath" :title="locationDatas.locationInfos.locationName">
                <p>({{ locationDatas.locationInfos.abbreviation }}) {{ locationDatas.locationInfos.locationName }}</p>
            </div>
            <div>
                <GoogleMap
                api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
                style="width: 100%; height: 300px"
                :center="{lat: parseInt(locationDatas.locationInfos.lat, 10), lng: parseInt(locationDatas.locationInfos.long, 10)}"
                :zoom="4"
                >
                    <Marker :options="{ position: {lat: parseInt(locationDatas.locationInfos.lat, 10), lng: parseInt(locationDatas.locationInfos.long, 10)}}" />
                </GoogleMap>
            </div>
            <p><i class="fas fa-binoculars"></i> Aperçu</p>
            <ul class="locationDetails__list">
                <li v-if="searchCriteria.departement !== ''">Localisation: {{ locationDatas.locationInfos.location }}</li>
                <li else>Localisation: {{ locationDatas.locationInfos.continent }} ({{ locationDatas.locationInfos.location }})</li>                
                <li>Superficie: {{ locationDatas.locationInfos.sq_km_area }} km²</li>
                <li>Capitale: {{ locationDatas.locationInfos.capital_city }}</li>
            </ul>
            <ul class="locationDetails__list">
                <li>Population: {{ locationDatas.locationInfos.population }} pers.</li>
                <li>Espérance de vie: {{ locationDatas.locationInfos.life_expectancy }} ans</li>
            </ul>
            <ul>
                <li v-if="searchCriteria.departement === ''">Dernière mise à jour: {{ locationDatas.locationInfos.updated }}</li>
                <li v-if="searchCriteria.departement !== ''">Source: <a href="https://www.data.gouv.fr/fr/organizations/sante-publique-france/" title="Santé Publique France (lien externe)">{{ locationDatas.locationInfos.source }} <i class="fas fa-external-link-alt"></i></a></li>
            </ul>
        </aside>
        <div class="locationDatas">
            <div class="locationDatas__heading">
                <h2>Situation actuelle</h2>
                <div class="locationDatas__liveDatasContainer">
                    <stat-item v-for="item in locationDatas.diseaseDatas" :statName="item.dataName" :statNumber="item.data" :key="item.dataName"></stat-item>
                </div>
                <h2>Données relatives</h2>
                <stat-item :statName="'Infections par km²'" :statNumber="locationDatas.relativeDatas.infectionsPerKms"></stat-item>
                <stat-item :statName="'Infections par milliers d\'hab'" :statNumber="locationDatas.relativeDatas.infectionsPerThousand"></stat-item>
            </div>
            <div>
                <h2>Evolution les sept derniers jours</h2>
                <stat-item v-for="item in locationDatas.diseaseLastSevenDaysDatas" :statName="item.dataName" :statNumber="item.data" :key="item.dataName"></stat-item>
            </div>
            
            <!--<div>
                <chart :chartId="'locationCasesTypesPart'" :chartData="locationDatas.pieChartDatas" :chartOptions="{}" :chartType="'pie'"></chart>
            </div>-->
            <!--<div>
                <chart :chartId="'evolutionGraph'" :chartData="lineChartDatas" :chartOptions="lineChartOptions" :chartType="'line'"></chart>
            </div>-->
            <location-evolution-graph :locationEvolutionDatas="locationDatas.diseaseEvolutionDatas"></location-evolution-graph>
        </div>
    </div>   
</template>

<script>
//Vue Elements
import { computed, watch, reactive } from "vue";
import { useStore } from "vuex";

//Component
import statItem from "./CountryDashboardComponents/statItem.vue";
//import Chart from "../APIComponents/Chart.vue";
import { GoogleMap, Marker } from 'vue3-google-map';
import LocationEvolutionGraph from "./CountryDashboardComponents/LocationEvolutionGraph.vue";

//Static Datas
import departementsStaticDatas from "../../assets/staticDatas/franceDepartementsDatas.js";

//JS object
//import DatasCalculator from "../assets/DatasCalculator.js";

export default {
    props: {
        searchCriteria: {
            required: true,
            type: Object
        }
    },
    setup(props) {

        //Vuex
        const store = useStore();
        let locationDatas = reactive({
            locationInfos: {
                lat: 0,
                long: 0
            },
            diseaseDatas: {},
            relativeDatas: {},
            pieChartDatas: {},
            locationEvolutionGraphDatas: {},
            diseaseLastSevenDaysDatas: {}
        });

        let lineChartDatas = {
            labels: ["", "", "", "", "", "",  ""],
            datasets: [
                {
                    label: "This week",
                    data: [12, 19, 10, 17, 6, 3, 7],
                    backgroundColor: "rgba(224, 248, 255, 0.4)",
                    borderColor: "#5cddff",
                    lineTension: 0,
                    pointBackgroundColor: "#5cddff",
                },
                {
                    label: "Last week",
                    data: [10, 25, 3, 25, 17, 4, 9],
                    backgroundColor: "rgba(241, 225, 197, 0.4)",
                    borderColor: "#ffc764",
                    lineTension: 0,
                    pointBackgroundColor: "#ffc764",
                },
            ],
        }

        let lineChartOptions = {
            scales: {
                xAxes: [
                    {
                    stacked: true,
                    gridLines: { display: false },
                    },
                ],
                yAxes: [
                    {
                    ticks: {
                        stepSize: 1,
                        callback: function(value, index, values) {
                        if (value % Math.round(values[0] / 6) == 0) {
                            return value;
                        } else if (value === 0) {
                            return value;
                        }
                        },
                    },
                    // stacked: true
                    },
                ],
            },
            maintainAspectRatio: false,
            legend: {
                labels: {
                    boxWidth: 10,
                },
                position: "top",
            },
            animation: {
                duration: 2000,
                easing: "easeInOutQuart",
            }
        }

        watch([props.searchCriteria.country, props.searchCriteria.departement], () => {

            //Gathering datas from which location the user has chose
            if (props.searchCriteria.country === "France" && props.searchCriteria.departement !== "") {

                //If user is searching a departement
                let depStaticKeyProps = props.searchCriteria.departement.split("-")[0] + props.searchCriteria.departement.split("-")[1];
                let departementsLiveDatas = computed(() => store.state.departementsDatas[props.searchCriteria.departement]);

                locationDatas.locationInfos.locationName = departementsLiveDatas.value.nom;
                locationDatas.locationInfos.population = departementsStaticDatas[depStaticKeyProps]["population"];
                locationDatas.locationInfos.sq_km_area = departementsStaticDatas[depStaticKeyProps]["sq_km_area"];
                locationDatas.locationInfos.life_expectancy = departementsStaticDatas[depStaticKeyProps]["life_expectancy"];
                locationDatas.locationInfos.location = departementsStaticDatas[depStaticKeyProps]["location"];
                locationDatas.locationInfos.abbreviation = departementsLiveDatas.value.code;
                locationDatas.locationInfos.capital_city = departementsStaticDatas[depStaticKeyProps]["capital_city"];
                locationDatas.locationInfos.lat = departementsStaticDatas[depStaticKeyProps]["lat"];
                locationDatas.locationInfos.long = departementsStaticDatas[depStaticKeyProps]["long"];
                locationDatas.locationInfos.source = departementsLiveDatas.value.source.nom;
                locationDatas.locationInfos.logoPath = "../../assets/img/departementsLogos/" + props.searchCriteria.departement + ".svg";
                
                locationDatas.diseaseDatas.hospitalizations = {
                    data: departementsLiveDatas.value.hospitalises + departementsLiveDatas.value.nouvellesHospitalisations,
                    dataName: "Hospitalisations"
                }
                locationDatas.diseaseDatas.intensiveCare = {
                    data: departementsLiveDatas.value.reanimation + departementsLiveDatas.value.nouvellesReanimations,
                    dataName: "Réanimations"
                }
                locationDatas.diseaseDatas.recovered = {
                    data: departementsLiveDatas.value.gueris,
                    dataName: "Guéris"
                }
                locationDatas.diseaseDatas.deaths = {
                    data: departementsLiveDatas.value.deces,
                    dataName: "Décès"
                }

                locationDatas.relativeDatas.infectionsPerKms = departementsLiveDatas.value.confirmed / departementsStaticDatas[depStaticKeyProps]["sq_km_area"];
                locationDatas.relativeDatas.infectionsPerThousand = departementsLiveDatas.value.confirmed / departementsStaticDatas[depStaticKeyProps]["population"];

            } else {

                //If user is searching for a country
                let worldLiveDatas = computed(() => store.state.worldDatas[props.searchCriteria.country]["All"]);
                let locationEvolutionDatas = computed(() => store.state.worldEvolutionDatas[props.searchCriteria.country]);

                locationDatas.locationInfos.locationName = worldLiveDatas.value.country;
                locationDatas.locationInfos.population = worldLiveDatas.value.population;
                locationDatas.locationInfos.sq_km_area = worldLiveDatas.value.sq_km_area;
                locationDatas.locationInfos.life_expectancy = worldLiveDatas.value.life_expectancy;
                locationDatas.locationInfos.location = worldLiveDatas.value.location;
                locationDatas.locationInfos.continent = worldLiveDatas.value.continent;
                locationDatas.locationInfos.abbreviation = worldLiveDatas.value.abbreviation;
                locationDatas.locationInfos.capital_city = worldLiveDatas.value.capital_city;
                locationDatas.locationInfos.lat = worldLiveDatas.value.lat;
                locationDatas.locationInfos.long = worldLiveDatas.value.long;
                locationDatas.locationInfos.updated = worldLiveDatas.value.updated;
                locationDatas.locationInfos.logoPath = "https://www.countryflags.io/" + locationDatas.locationInfos.abbreviation.toLowerCase() + "/flat/64.png";

                locationDatas.diseaseDatas.confirmed = {
                    data: worldLiveDatas.value.confirmed,
                    dataName: "Cas confirmés"
                }
                locationDatas.diseaseDatas.deaths = {
                    data: worldLiveDatas.value.deaths,
                    dataName: "Décès"
                }
                locationDatas.diseaseDatas.recovered = {
                    data: worldLiveDatas.value.recovered,
                    dataName: "Guéris"
                }

                locationDatas.relativeDatas.infectionsPerKms = worldLiveDatas.value.confirmed / worldLiveDatas.value.sq_km_area;
                locationDatas.relativeDatas.infectionsPerThousand = worldLiveDatas.value.confirmed / worldLiveDatas.value.population;

                locationDatas.pieChartDatas = {
                    labels: ["Cas confirmés", "Décès", "Guéris"],
                    datasets: [
                        {
                            label: "Test",
                            data: [worldLiveDatas.value.confirmed - (worldLiveDatas.value.deaths + worldLiveDatas.value.recovered), worldLiveDatas.value.deaths, worldLiveDatas.value.recovered],
                            backgroundColor: ["#F1C40F", "#6C6C6C", "#DAF7A6"]
                        }
                    ]
                }

                locationDatas.diseaseEvolutionDatas = locationEvolutionDatas;
                console.log(locationDatas.diseaseEvolutionDatas);

            }

        }, { immediate: true });

        //Add Google Map script tag
        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);
        
        return {
            locationDatas,
            lineChartDatas,
            lineChartOptions
        }
    },
    components: {
        statItem,
        //Chart,
        GoogleMap,
        Marker,
        LocationEvolutionGraph
    }
}
</script>

<style lang="scss">
.dashboard {
    display: flex;
    justify-content: space-between;
}

.locationDetails {
    background-color: lightgray;
    padding: 0.75rem;
    &__locationName {
        display: flex;
        align-items: center;
    }
    &__list {
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
    }
}

.locationDatas {
    &__liveDatasContainer {
        display: flex;
    }
    &__heading {
        padding-bottom: 0.5rem;
        border-bottom: 1px solid black;
    }
}
</style>