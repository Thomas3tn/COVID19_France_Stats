<template>
    <div class="regionsListPanel">
        <h4 class="regionsListPanel__header">Classement par {{ headerStatus }}</h4>
        <div class="regionsListPanel__chartMainContainer">
            <div class="regionsListPanel__chartSubContainer">
                <chart :chartId="'regionsDatasChart'" :chartData="chartData" :chartOptions="chartOptions" :chartType="'bar'"></chart>
            </div>
            
        </div>
    </div>
</template>

<script>
import Chart from "../SharedComponents/Chart.vue";
import DatasCalculator from "../../../../../assets/JSClasses/DatasCalculator.js";

import { reactive, computed, watch, inject } from "vue";

export default {
    props: {
        displayedStatus: {
            type: String,
            required: true
        },
        regionsDatas: {
            type: Object,
            required: true
        },
    },
    setup(props) {

        console.log(props.regionsDatas);
        let datasCalculator = new DatasCalculator();
        const chartStatusKey = inject("chartStatusKey", {});

        let headerStatus = computed(() => datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(props.displayedStatus).toLowerCase());

        const chartData = reactive({
            labels: [],
            datasets: [
                {
                label: "Cas confirmés",
                backgroundColor: [],
                data: []
                }
            ]
        });

        const chartOptions = {
            maintainAspectRatio: false,
            indexAxis: 'y',
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Predicted world population (millions) in 2050'
            }
        }

        const datas = reactive({
            confirmed: computed(() => []),
            deaths: computed(() => []),
            recovered: computed(() => []),
            hospitalizations: computed(() => []),
            intensive_care: computed(() => [])
        });

        const datasKeys = ["confirmed", "deaths", "recovered", "hospitalizations", "intensive_care"];

        for (const [regionName, regionDatas] of Object.entries(props.regionsDatas)) {

            if (regionName !== "All") {

                for (const [dataName, dataNumber] of Object.entries(regionDatas)) {

                    if (datasKeys.includes(dataName)) {

                        if (typeof datas[dataName] === "undefined") {
                            datas[dataName] = [];
                        }

                        datas[dataName].push({locationName: regionName, locationData: dataNumber});

                    }

                }

            }

        }

        //Sort each status array
        for (let keyValue of Object.entries(datas)) {

            if (keyValue[1].length !== 0) {
                keyValue[1] = datasCalculator.arrayFunctionalities.sortRegionsArray(keyValue[1]);
            }

        }

        //Set displayed datas inside chart object
        for (let i = 0; i < datas[props.displayedStatus].length; i++) {

            chartData.labels.push(datas[props.displayedStatus][i].locationName);
            chartData.datasets[0].backgroundColor.push(chartStatusKey[props.displayedStatus]);
            chartData.datasets[0].data.push(datas[props.displayedStatus][i].locationData);

        }

        watch(() => props.displayedStatus, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                if (chartData.labels.length !== 0 || chartData.datasets[0].data.length !== 0) {
                    chartData.labels = [];
                    chartData.datasets[0].data = [];
                    chartData.datasets[0].backgroundColor = [];
                }

                for (let i = 0; i < datas[newValue].length; i++) {

                    chartData.labels.push(datas[newValue][i].locationName);
                    chartData.datasets[0].data.push(datas[newValue][i].locationData);
                    chartData.datasets[0].backgroundColor.push(chartStatusKey[newValue]);

                }

                chartData.datasets[0].label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(newValue);

            }

        });

        return {
            headerStatus,
            chartData,
            chartOptions
        }

    },
    components: {
        Chart
    }
}
</script>

<style lang="scss">
.regionsListPanel {
    &__chartMainContainer {
        overflow-x: hidden;
        overflow-y: scroll;
        height: 400px;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
    &__chartSubContainer {
        height: 1000px;
    }
}
</style>