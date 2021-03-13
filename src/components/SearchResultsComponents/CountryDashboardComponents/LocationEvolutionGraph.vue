<template>
    <div>
        <form>
            <div>
                <select v-model="chartCriteria.datasType">
                    <option value="cumulativeDatas">Données cumulatives</option>
                    <option value="dailyDatas">Données quotidiennes</option>
                </select>
                <div>
                    <input v-model="chartCriteria.datasToShow" value="confirmedCases" type="checkbox" id="confirmedCasesInput"><label for="confirmedCasesInput">Cas confirmés</label>
                    <input v-model="chartCriteria.datasToShow" value="confirmedCases" type="checkbox" id="deathsInput"><label for="deathsInput">Décès</label>
                    <input v-model="chartCriteria.datasToShow" value="confirmedCases" type="checkbox" id="recoveredInput"><label for="recoveredInput">Guéris</label>
                </div>
            </div>
        </form>
        <chart :chartId="'evolutionGraph'" :chartData="chartDatas.chartData" :chartOptions="chartDatas.chartOptions" :chartType="chartDatas.chartType"></chart>
    </div>
</template>

<script>
import Chart from "./Chart.vue";

export default {
    data() {
        return {
            countryPeriodDatas: {
                confirmed: this.datas.confirmed,
                deaths: this.datas.deaths,
                recovered: this.datas.recovered
            },
            chartCriteria: {
                datasType: "",
                datasToShow: []
            },
            chartDatas: {
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
    },
    methods: {
        updateChartCriteria: function() {

        }
    },
    components: {
        Chart
    },
    props: {
        datas: {
            type: Object,
            required: true
        }
    }
}
</script>