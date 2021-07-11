<template>
    <div class="datasPanel vaccinationChartPanel">
        <div class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Vaccination</h3>
        </div>
        <div class="datasPanel_contentContainer">
            <chart :chartId="'vaccinationCampaignChart'" :chartType="'doughnut'" :chartData="chartDatas" :chartOptions="chartOptions"></chart>
        </div>
    </div>
</template>

<script>
//Vue components
import Chart from "./SharedComponents/Chart.vue";

//Vue elements
import { reactive, inject } from "vue";

export default {
    props: {
        vaccinationDatas: {
            type: Object,
            required: true,
        }
    },
    setup(props) {

        console.log(props.vaccinationDatas);
        const chartStatusKey = inject("chartStatusKey", {});

        let chartDatas = reactive({
            labels: [props.vaccinationDatas.population.dataName, props.vaccinationDatas.people_partially_vaccinated.dataName, props.vaccinationDatas.people_vaccinated.dataName],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [chartStatusKey.statusColor.population, chartStatusKey.statusColor.people_partially_vaccinated, chartStatusKey.statusColor.people_vaccinated],
                data: [props.vaccinationDatas.population.dataNumber - (props.vaccinationDatas.people_partially_vaccinated.dataNumber + props.vaccinationDatas.people_vaccinated.dataNumber), props.vaccinationDatas.people_partially_vaccinated.dataNumber, props.vaccinationDatas.people_vaccinated.dataNumber]
            }]
        });

        let chartOptions = reactive({
            title: {
                display: true,
                text: "État de la campagne de vaccination",
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });

        return {
            chartDatas,
            chartOptions
        }

    },
    components: {
        Chart
    }
}
</script>

<style lang="scss">

</style>