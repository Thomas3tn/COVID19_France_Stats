<template>
    <div v-if="typeof liveRawDatas[searchCriteria.country] === 'undefined'">
        <p>Aucune disponible pour cette localisation</p>
    </div>
    <div v-else class="dashboard">
        <div class="locationDetails">
            <div class="locationDetails__locationName">
                <img :src="currentCountryFlagURL">
                <p>({{ liveRawDatas[searchCriteria.country]["All"]["abbreviation"] }}) {{ liveRawDatas[searchCriteria.country]["All"]["country"] }}</p>
            </div>
            <div>
                <GoogleMap
                api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
                style="width: 100%; height: 200px"
                :center="{lat: parseInt(liveRawDatas[searchCriteria.country]['All']['lat'], 10), lng: parseInt(liveRawDatas[searchCriteria.country]['All']['long'], 10)}"
                :zoom="4"
                >
                    <Marker :options="{ position: {lat: parseInt(liveRawDatas[searchCriteria.country]['All']['lat'], 10), lng: parseInt(liveRawDatas[searchCriteria.country]['All']['long'], 10)}}" />
                </GoogleMap>
            </div>
            <div>
                <ul>
                    <li>Localisation: {{ liveRawDatas[searchCriteria.country]["All"]["continent"] }} ({{ liveRawDatas[searchCriteria.country]["All"]["location"] }})</li>
                    <li>Superficie: {{ liveRawDatas[searchCriteria.country]["All"]["sq_km_area"] }} km²</li>
                    <li>Capitale: {{ liveRawDatas[searchCriteria.country]["All"]["capital_city"] }}</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>Population: {{ liveRawDatas[searchCriteria.country]["All"]["population"] }} personnes</li>
                    <li>Espérance de vie: {{ liveRawDatas[searchCriteria.country]["All"]["life_expectancy"] }} ans</li>
                </ul>
            </div>
            <div>
                <p>Dernière mise à jour: {{ liveRawDatas[searchCriteria.country]["All"]["updated"] }}</p>
            </div>
        </div>
        <div class="locationDatas">
            <div>
                <h2>Situation actuelle</h2>
            </div>
            <div class="locationDatas__liveDatasContainer">
                <stat-item :statName="'Cas confirmés'" :statNumber="liveRawDatas[searchCriteria.country]['All']['confirmed']"></stat-item>
                <stat-item :statName="'Décès'" :statNumber="liveRawDatas[searchCriteria.country]['All']['deaths']"></stat-item>
                <stat-item :statName="'Guéris'" :statNumber="liveRawDatas[searchCriteria.country]['All']['recovered']"></stat-item>
            </div>
            <div>
                <chart :chartId="'locationEvolutionPopulation'" :chartData="charts.doughnut.chartData" :chartOptions="charts.doughnut.chartOptions" :chartType="charts.doughnut.chartType"></chart>
            </div>
            <div>
                <chart :chartId="'evolutionGraph'" :chartData="charts.linesChart.chartData" :chartOptions="charts.linesChart.chartOptions" :chartType="charts.linesChart.chartType"></chart>
            </div>
        </div>
    </div>   
</template>

<script>
//Vue Elements
import { computed, watch } from "vue";
import { useStore } from "vuex";

//Component
import statItem from "./CountryDashboardComponents/statItem.vue";
import Chart from "../APIComponents/Chart.vue";
import { GoogleMap, Marker } from 'vue3-google-map';

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

        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);

        //Vuex
        const store = useStore();
        let liveRawDatas = computed(() => store.state.worldDatas);
        const center = { lat: 40.689247, lng: -74.044502 };

        const countryFlagURL = {
            urlFirstPart: "https://www.countryflags.io/",
            urlSecondPart: "/flat/64.png"
        }

        const countryAbbreviation = computed(function() {
            if (typeof liveRawDatas.value["France"]["All"]["abbreviation"] !== "undefined" && typeof props.searchCriteria.country !== "undefined") {
                return liveRawDatas.value[props.searchCriteria.country]["All"]["abbreviation"];
            } else {
                return "FR";
            }
        })
        const currentCountryFlagURL = computed(() => countryFlagURL.urlFirstPart + countryAbbreviation.value.toLowerCase() + countryFlagURL.urlSecondPart);

        watch(props.searchCriteria.country, (newValue) => {
            console.log(newValue);
            this.countryAbbreviation = this.liveRawDatas[newValue.country]["All"]["abbreviation"];
        })
        
        return {
            countryFlagURL,
            countryAbbreviation,
            currentCountryFlagURL,
            liveRawDatas,
            center
        }
    },
    data() {
        return {
            charts: {
                doughnut: {
                    chartType: "doughnut",
                    chartData: {
                        labels: ["Décès", "Guéris", "Cas confirmés"],
                        datasets: [
                            {
                                label: "Décès",
                                data: [87.695],
                                backgroundColor: "rgba(75,75,75,1)",
                                borderColor: "rgba(75,75,75,1)",
                            },
                            {
                                label: "Guéris",
                                data: [268.073],
                                backgroundColor: "rgba(86,255,55,1)",
                                borderColor: "rgba(86,255,55,1)",
                            },
                            {
                                label: "Autre",
                                data: [521.591],
                                backgroundColor: "rgba(255,188,55,1)",
                                borderColor: "rgba(255,188,55,1)",
                            }
                        ],
                    },
                    chartOptions: {

                    }
                },
                linesChart: {
                    chartType: "line",
                    chartData: {
                        labels: ["Jan1", "Jan2", "Jan3", "Jan4", "Jan5", "Jan6",  "Jan7"],
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
                    },
                    chartOptions: {
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
                        },
                    }
                }
            }
        }
    },
    components: {
        statItem,
        Chart,
        GoogleMap,
        Marker
    }
}
</script>

<style lang="scss">
.dashboard {
    display: flex;
}

.locationDetails {
    &__locationName {
        display: flex;
    }
}

.locationDatas {
    &__liveDatasContainer {
        display: flex;
    }
}
</style>