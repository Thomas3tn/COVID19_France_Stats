<template>
    <canvas :id="currentChartId"></canvas>
</template>

<script>
//Loading ChartJS Library
import Chart from "chart.js/auto";

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
    data() {
        return {
            currentChartId: this.chartId,
            chartObject: null
        }
    },
    watch: {
        chartData: {
            handler() {
                //this.updateChart();
            },
            deep: true
        }
    },
    methods: {
        chartConstructor(chartType, chartData, chartOptions) {
            const chartElement = document.getElementById(this.currentChartId);
            const chart = new Chart(chartElement, {
                type: chartType,
                data: chartData,
                options: chartOptions
            });
            console.log(chart);
            this.chartObject = chart;
            chart.update();
        },
        updateChart() {
            this.chartObject.update();
        }
    },
    mounted() {
        let {chartType, chartData, chartOptions} = this;
        this.chartConstructor(chartType, chartData, chartOptions);
    }
}
</script>

<style lang="scss">
.chart {
    height: 100%;
}
</style>