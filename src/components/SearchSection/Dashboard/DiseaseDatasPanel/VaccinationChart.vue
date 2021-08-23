<template>
    <div class="datasPanel vaccinationChartPanel">
        <header class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Vaccination</h3>
        </header>
        <div v-if="areAllVaccinationDatasReceived === true" class="datasPanel__contentContainer vaccinationChartPanel__contentContainer">
            <chart :chartId="'vaccinationCampaignChart'" :chartType="'doughnut'" :chartData="chartDatas" :chartOptions="chartOptions"></chart>
        </div>
        <div v-else class="datasPanel__contentContainer vaccinationChartPanel__contentContainer vaccinationChartPanel__noDatasContainer">
            <p class="vaccinationChartPanel__noDatasPlaceholder">Données indisponibles</p>
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

        const chartStatusKey = inject("chartStatusKey", {});
        let chartDatas, chartOptions, areAllVaccinationDatasReceived;

        if (typeof props.vaccinationDatas.people_partially_vaccinated !== "undefined" && typeof props.vaccinationDatas.people_vaccinated !== "undefined" && typeof props.vaccinationDatas.population !== "undefined") {

            chartDatas = reactive({
                labels: [props.vaccinationDatas.population.dataName, props.vaccinationDatas.people_partially_vaccinated.dataName, props.vaccinationDatas.people_vaccinated.dataName],
                datasets: [{
                    label: "Population (millions)",
                    backgroundColor: [chartStatusKey.statusColor.population, chartStatusKey.statusColor.people_partially_vaccinated, chartStatusKey.statusColor.people_vaccinated],
                    data: [props.vaccinationDatas.population.dataNumber - (props.vaccinationDatas.people_partially_vaccinated.dataNumber + props.vaccinationDatas.people_vaccinated.dataNumber), props.vaccinationDatas.people_partially_vaccinated.dataNumber, props.vaccinationDatas.people_vaccinated.dataNumber]
                }]
            });

            chartOptions = reactive({
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

            areAllVaccinationDatasReceived = true;

        } else {
            areAllVaccinationDatasReceived = false;
        }

        return {
            chartDatas,
            chartOptions,
            areAllVaccinationDatasReceived
        }

    },
    components: {
        Chart
    }
}
</script>

<style lang="scss">
.vaccinationChartPanel {
    &__contentContainer {
        padding: calc(max(1rem, 2.5vw));
        height: clamp(20rem, 22vw, 40rem);
    }
    &__noDatasContainer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../../../assets/img/dashboard/vaccinationPanelBg.png") no-repeat;
        background-size: 70%;
        background-position: center;
    }
    &__noDatasPlaceholder {
        position: absolute;
        top: 42%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        user-select: none;
        font-size: clamp(2rem, 2.2vw, 3.5rem);
    }
}
</style>