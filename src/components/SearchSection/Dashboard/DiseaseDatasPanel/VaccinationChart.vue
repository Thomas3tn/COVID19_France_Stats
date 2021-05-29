<template>
    <div class="datasPanel">
        <div class="datasPanel__headerContainer">
            <h2 class="datasPanel__header">Vaccination</h2>
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
import { reactive } from "vue";

export default {
    props: {
        vaccinationDatas: {
            type: Object,
            required: true,
        }
    },
    setup(props) {

        console.log(props.vaccinationDatas);

        let chartDatas = reactive({
            labels: [props.vaccinationDatas.population.dataName, props.vaccinationDatas.people_partially_vaccinated.dataName, props.vaccinationDatas.people_vaccinated.dataName],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [props.vaccinationDatas.population.dataNumber - (props.vaccinationDatas.people_partially_vaccinated.dataNumber + props.vaccinationDatas.people_vaccinated.dataNumber), props.vaccinationDatas.people_partially_vaccinated.dataNumber, props.vaccinationDatas.people_vaccinated.dataNumber]
            }]
        });

        let chartOptions = reactive({
            title: {
                display: true,
                text: "État de la campagne de vaccination"
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