<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <detailed-geo-datas-panel :locationRegionsDatas="diseaseDatas.regionsDatas" :displayedCountry="diseaseDatas.country"></detailed-geo-datas-panel>
        <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas"></relative-datas-panel>
        <div class="diseaseDatasPanel__vaccRelDatasContainer">
            <vaccination-chart :vaccinationDatas="diseaseDatas.vaccinationDatas"></vaccination-chart>
            <twitter-panel></twitter-panel>
        </div>
        <weekly-daily-datas-panel :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'global'"></weekly-daily-datas-panel>
        <location-evolution-graph :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'global'"></location-evolution-graph>
    </div>
</template>

<script>
import CurrentSituationPanel from "./DiseaseDatasPanel/CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DiseaseDatasPanel/DetailedGeoDatasPanel.vue";
import WeeklyDailyDatasPanel from "./DiseaseDatasPanel/WeeklyDailyDatasPanel.vue";
import VaccinationChart from "./DiseaseDatasPanel/VaccinationChart.vue";
import TwitterPanel from "./LocationAsidePanel/TwitterPanel.vue";
import LocationEvolutionGraph from "./DiseaseDatasPanel/LocationEvolutionGraph.vue";
import RelativeDatasPanel from "./DiseaseDatasPanel/RelativeDatasPanel.vue";

export default {
    props: {
        diseaseDatas: {
            type: Object,
            required: true
        }
    },
    components: {
        CurrentSituationPanel,
        DetailedGeoDatasPanel,
        WeeklyDailyDatasPanel,
        VaccinationChart,
        TwitterPanel,
        LocationEvolutionGraph,
        RelativeDatasPanel
    }
}
</script>