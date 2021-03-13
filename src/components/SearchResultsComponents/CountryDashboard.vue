<template>
    <div class="dashboard">
        <div class="locationDetails">
            <div class="locationDetails__locationName">
                <img :src="countryFlagURL">
                <p>({{ locationDetails.locationAbbreviation }}) {{ locationDetails.locationName }}</p>
            </div>
            <div>
                <ul>
                    <li>Localisation: {{ locationDetails.locationContinent }} ({{ locationDetails.continentPreciseLocation }})</li>
                    <li>Superficie: {{ locationDetails.locationSurfaceArea }}</li>
                    <li>Capitale: {{ locationDetails.locationCapitalCity }}</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>Population: {{ locationDetails.locationPopulation }}</li>
                    <li>Espérance de vie: {{ locationDetails.locationLifeExpectancy }} ans</li>
                </ul>
            </div>
            <div>
                <p>Dernière mise à jour: {{ locationDetails.locationLastUpdate }}</p>
            </div>
        </div>
        <div class="locationDatas">
            <div>
                <h2>Situation actuelle</h2>
            </div>
            <div class="locationDatas__liveDatasContainer">
                <stat-item :statName="'Cas confirmés'" :statNumber="liveRawDatas.confirmedCases"></stat-item>
                <stat-item :statName="'Décès'" :statNumber="liveRawDatas.deaths"></stat-item>
                <stat-item :statName="'Guéris'" :statNumber="liveRawDatas.recovered"></stat-item>
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
//Component
import statItem from "./CountryDashboardComponents/statItem.vue";
import Chart from "../APIComponents/Chart.vue";

//JS object
//import DatasCalculator from "../assets/DatasCalculator.js";

export default {
    data() {
        return {
            countryFlagURL: "https://www.countryflags.io/:locationAbbreviation:/flat/64.png",
            countryPeriodEvolutionDatas: this.countryDatas.countryPeriodEvolutionDatas,
            liveRawDatas: this.countryDatas.liveRawDatas,
            locationDetails: this.countryDatas.locationDetails,
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
    created() {
        let countryFlagURLArray = this.countryFlagURL.split("/");

            for (let i = 0; i < countryFlagURLArray.length; i++) {

                if (countryFlagURLArray[i] === ":locationAbbreviation:") {
                    countryFlagURLArray[i] = this.locationDetails.locationAbbreviation.toLowerCase();
                    break;
                }

            }

            let countryFlagFinalURL = countryFlagURLArray.join("/");
            this.countryFlagURL = countryFlagFinalURL;
    },
    props: {
        countryDatas: {
            required: true,
            type: Object
        }
    },
    components: {
        statItem,
        Chart,
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