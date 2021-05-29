<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <detailed-geo-datas-panel :locationRegionsDatas="diseaseDatas.regionsDatas" :displayedCountry="diseaseDatas.country"></detailed-geo-datas-panel>
        <vaccination-chart :vaccinationDatas="diseaseDatas.vaccinationDatas"></vaccination-chart>
        <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas" :locationType="'continent'"></relative-datas-panel>
    </div>
</template>

<script>
import CurrentSituationPanel from "./CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DetailedGeoDatasPanel.vue";
import VaccinationChart from "./VaccinationChart.vue";
import RelativeDatasPanel from "./RelativeDatasPanel.vue";

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
        VaccinationChart,
        RelativeDatasPanel
    }
}
</script>