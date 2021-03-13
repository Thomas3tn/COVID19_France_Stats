<template>
    <div>
        <canvas :id="currentChartId"></canvas>
    </div>
</template>

<script>
//Loading ChartJS Library
import Chart from "chart.js";

export default {
    data() {
        return {
            currentChartId: this.chartId
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
        }
    },
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
    mounted() {
        let {chartType, chartData, chartOptions} = this;
        this.chartConstructor(chartType, chartData, chartOptions);
    }
}
</script>