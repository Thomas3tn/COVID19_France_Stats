<template>
    <canvas :id="currentChartId"></canvas>
</template>

<script>
//Loading ChartJS Library
import Chart from "chart.js/auto";

//Vue Elements
import { ref, reactive, onMounted, watch } from "vue";

import _ from "lodash";

export default {
    props: {
        chartId: {
            type: String,
            required: true
        },
        chartType: {
            type: String,
            required: true
        },
        chartData: {
            type: Object,
            required: true
        },
        chartOptions: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        let currentChartId = ref(props.chartId);
        let currentChart = reactive({});

        function chartConstructor(chartType, chartData, chartOptions) {
            const chartElement = document.getElementById(currentChartId.value);
            const chart = new Chart(chartElement, {
                type: chartType,
                data: chartData,
                options: chartOptions
            });
            
            return chart;
        }

        onMounted(() => {
            currentChart = chartConstructor(props.chartType, props.chartData, props.chartOptions);
        });

        watch(() => _.cloneDeep(props.chartData), (newValue, oldValue) => {

            console.log(oldValue, newValue);

            if (newValue !== oldValue) {
                currentChart.update();
            }

        }, {deep: true});

        return {
            currentChartId,
            currentChart
        }

    }
}
</script>

<style lang="scss">
.chart {
    height: 100%;
}
</style>