<template>
<div class="datasPanel vaccinationChartPanel">
    <header class="datasPanel__headerContainer">
        <h3 class="datasPanel__header">Données régionales proportionnelles</h3>
    </header>
    <div class="datasPanel__contentContainer vaccinationChartPanel__contentContainer">
        <chart :chartId="'regionsProportionalDatasPanel'" :chartType="'pie'" :chartData="chartDatas" :chartOptions="chartOptions"></chart>
        <div class="relativeDatasPanel__btnsContainer">
            <button v-for="status in statusBtnsList" :key="status.idName" :class="'selectableStatus selectableStatus--verticalDisplay selectableStatus--' + status.idName + 'InactiveHover'" :id="'rpdp' + status.idName" :value="status.idName" @click="displayedStatus = status.idName" :title="status.dashboardName">
                <font-awesome-icon :icon="status.icon" aria-hidden="true"/>
                <span class="screenreaderText">{{ status.dashboardName }}</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
//Vue components
import Chart from "./SharedComponents/Chart.vue";

import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator";

import { inject, reactive, ref, watch } from "vue";

export default {
    props: {
        locationRegionsDatas: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        console.log(props.locationRegionsDatas);
        
        const datasCalculator = new DatasCalculator();
        const chartStatusKey = inject("chartStatusKey", {});
        const dashboardIcons = inject("dashboardIcons", {});

        const displayedStatus = ref("");

        let datas = reactive({});

        let chartDatas = reactive({
            labels: [],
            datasets: [{
                label: "Population (millions)",
                backgroundColor: [chartStatusKey.statusColor.population, chartStatusKey.statusColor.people_partially_vaccinated, chartStatusKey.statusColor.people_vaccinated, chartStatusKey.statusColor.population, chartStatusKey.statusColor.people_partially_vaccinated, chartStatusKey.statusColor.people_vaccinated, chartStatusKey.statusColor.people_partially_vaccinated],
                data: []
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

        //Fill the datas object

        const statusList = ["confirmed", "recovered", "deaths", "people_vaccinated"];

        for (const [countryName, countryDatas] of Object.entries(props.locationRegionsDatas)) {

            if ((countryName !== "Global" || countryName !== "All") && typeof countryDatas.continent !== "undefined") {

                for (const [dataName, dataValue] of Object.entries(countryDatas)) {

                    if (statusList.includes(dataName)) {

                        if (typeof datas[dataName] === "undefined") {
                            datas[dataName] = {};
                        }

                        if (typeof datas[dataName][countryDatas.continent] === "undefined") {
                            datas[dataName][countryDatas.continent] = dataValue;
                        } else {
                            datas[dataName][countryDatas.continent] += dataValue;
                        }

                        //Wdatas[dataName][countryDatas.continent] === "undefined" ? datas[dataName][countryDatas.continent] = dataValue : datas[dataName][countryDatas.continent] += dataValue;

                    }
                
                }

            }

        }

        console.log(datas);

        //Fill the chartDatas object

        const statusBtnsList = [];

        for (const [statusName, statusDatas] of Object.entries(datas)) {

            if (displayedStatus.value === "") {

                displayedStatus.value = statusName;

                for (const [continentName, continentDatas] of Object.entries(statusDatas)) {

                    chartDatas.labels.push(continentName);
                    chartDatas.datasets[0].data.push(continentDatas);
            
                }
            
            }

            statusBtnsList.push({idName: statusName, dashboardName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusName), icon: dashboardIcons.status[statusName]});

        }

        watch(() => displayedStatus.value, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                chartDatas.labels = [];
                chartDatas.datasets[0].data = [];

                for (const [continentName, continentDatas] of Object.entries(datas[newValue])) {

                    chartDatas.labels.push(continentName);
                    chartDatas.datasets[0].data.push(continentDatas);
            
                }

            }

        });

        return {
            chartDatas,
            chartOptions,
            statusBtnsList,
            displayedStatus
        }

    },
    components: {
        Chart
    }
}
</script>