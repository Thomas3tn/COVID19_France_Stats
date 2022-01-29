<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <detailed-geo-datas-panel :locationRegionsDatas="diseaseDatas.regionsDatas" :displayedCountry="diseaseDatas.country"></detailed-geo-datas-panel>
        <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas"></relative-datas-panel>
        <div class="diseaseDatasPanel__vaccRelDatasContainer">
            <div class="test">
                <vaccination-chart :vaccinationDatas="diseaseDatas.vaccinationDatas"></vaccination-chart>
                <regions-proportional-datas-panel :locationRegionsDatas="diseaseDatas.regionsDatas"></regions-proportional-datas-panel>
            </div>
            <twitter-panel></twitter-panel>
        </div>
        <weekly-daily-datas-panel :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'global'"></weekly-daily-datas-panel>
        <location-evolution-graph :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'global'"></location-evolution-graph>
    </div>
</template>

<script>
import CurrentSituationPanel from "./DiseaseDatasPanel/CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DiseaseDatasPanel/DetailedGeographicalSituationPanel.vue";
import WeeklyDailyDatasPanel from "./DiseaseDatasPanel/WeeklyDailyEvolutionPanel.vue";
import VaccinationChart from "./DiseaseDatasPanel/VaccinationPanel.vue";
import TwitterPanel from "./DiseaseDatasPanel/TwitterPanelGlobal.vue";
import LocationEvolutionGraph from "./DiseaseDatasPanel/EvolutionPanel.vue";
import RelativeDatasPanel from "./DiseaseDatasPanel/RelativeDatasPanel.vue";
import RegionsProportionalDatasPanel from "./DiseaseDatasPanel/RegionsProportionalDatasPanel.vue";

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
        RelativeDatasPanel,
        RegionsProportionalDatasPanel
    }
}
</script>