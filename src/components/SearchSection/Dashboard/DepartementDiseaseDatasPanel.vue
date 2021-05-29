<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas" :locationType="'departement'"></relative-datas-panel>
        <weekly-daily-datas-panel :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'departement'"></weekly-daily-datas-panel>
        <location-evolution-graph :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'departement'"></location-evolution-graph>
    </div>
</template>

<script>
//Vue components
import CurrentSituationPanel from "./DiseaseDatasPanel/CurrentSituationPanel.vue";
import WeeklyDailyDatasPanel from "./DiseaseDatasPanel/WeeklyDailyDatasPanel.vue";
import RelativeDatasPanel from "./DiseaseDatasPanel/RelativeDatasPanel.vue";
import LocationEvolutionGraph from "./DiseaseDatasPanel/LocationEvolutionGraph.vue";


export default {
    props: {
        diseaseDatas: {
            type: Object,
            required: true
        }
    },
    components: {
        CurrentSituationPanel,
        WeeklyDailyDatasPanel,
        RelativeDatasPanel,
        LocationEvolutionGraph
    }
}
</script>