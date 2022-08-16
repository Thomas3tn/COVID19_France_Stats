<template>

    <panel>

        <template v-slot:header>
            <h3 class="datasPanel__header">Vaccination</h3>
        </template>

        <template v-slot:content>

            <div v-if="areVaccDatasAvailable" class="contentContainer">

            <div>
                <chart 
                    :chartId="'vaccinationCampaignChart'" 
                    :chartType="'doughnut'" 
                    :chartData="chartDatas" 
                    :chartOptions="chartOptions"
                ></chart>
            </div>

                <status-form
                    class="statusForm"
                    :position="'VERTICAL'"
                    :inputsType="'checkbox'"
                    :statusList="Object.keys(statusStates)"
                    :componentName="'vaccinationPanel'"
                    @selectable-status-change="onChange"
                ></status-form>

            </div>

            <div v-else class="contentContainer noDatasContainer">
                <p class="noDatasPlaceholder">Données indisponibles</p>
            </div>

        </template>
        
    </panel>
    
</template>

<script>
import Chart from "./Common/DatasDisplay/Chart.vue";
import Panel from "./Common/Panel/Panel.vue";
import { reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import StatusForm from "./Common/Forms/StatusForm.vue";
import StringCustomMethods from "../../../../../assets/JSClasses/CustomMethods/String.js";

export default {
    props: {
        location: {
            type: Object,
            required: true,
        }
    },
    setup(props) {

        const store = useStore();
        const CHART_COLORS = computed(() => store.state.DashboardAssets.COLORS.COLORS);
        const KEYS_TRANSLATIONS = inject("KEYS_TRANSLATIONS");
        KEYS_TRANSLATIONS.unvaccinated = "Non vaccinés";
        const areVaccDatasAvailable = computed(() => {

            const keys = [props.location.infos.population, props.location.live.vaccinated, props.location.live.partiallyVaccinated];
            return keys.every(status => status !== null);

        });

        const datas = reactive({
            unvaccinated: props.location.infos.population - props.location.live.partiallyVaccinated,
            partiallyVaccinated: props.location.live.partiallyVaccinated - props.location.live.vaccinated,
            vaccinated: props.location.live.vaccinated
        });

        const statusStates = reactive({
            unvaccinated: true,
            partiallyVaccinated: true,
            vaccinated: true
        });

        const chartDatas = reactive({
            labels: [
                KEYS_TRANSLATIONS.unvaccinated,
                KEYS_TRANSLATIONS.partiallyVaccinated,
                KEYS_TRANSLATIONS.vaccinated
            ],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [
                    CHART_COLORS.value.POPULATION, 
                    CHART_COLORS.value.PARTIALLY_VACCINATED, 
                    CHART_COLORS.value.VACCINATED
                ],
                data: [
                    datas.unvaccinated,
                    datas.partiallyVaccinated,
                    datas.vaccinated
                ]
            }]
        });
        const chartOptions = reactive({
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        });

        const onChange = statusState => {

            console.log(statusState)

            statusStates[statusState.status] = statusState.state;

            chartDatas.labels = [];
            chartDatas.datasets[0].backgroundColor = [];
            chartDatas.datasets[0].data = [];

            Object.keys(statusStates).forEach(status => {

                if (statusStates[status] === true) {

                    chartDatas.labels.push(status);
                    chartDatas.datasets[0].backgroundColor.push(CHART_COLORS.value[StringCustomMethods.getConstantNameFromVariable(status)]);
                    chartDatas.datasets[0].data.push(datas[status]);

                }

            });

        };

        return {
            chartDatas,
            chartOptions,
            areVaccDatasAvailable,
            statusStates,
            onChange
        }

    },
    components: {
        Panel,
        Chart,
        StatusForm
    }
}
</script>

<style lang="scss" scoped>
.noDatasContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../../../../assets/img/dashboard/vaccinationPanelBg.png") no-repeat;
    background-size: 70%;
    background-position: center;
}
.noDatasPlaceholder {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    user-select: none;
    font-size: clamp(2rem, 2.2vw, 3.5rem);
}
.contentContainer {
    padding: calc(max(1rem, 2.5vw));
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: clamp(20rem, 22vw, 40rem);
    @media (min-width: 1232px) {
        flex-direction: row;
        padding-right: 0;
        padding-left: 0;
    } 
}
.statusForm {
    height: 55%;
    display: flex;
    flex-direction: row;
    @media (min-width: 1232px) {
        flex-direction: column;
    }
}
</style>