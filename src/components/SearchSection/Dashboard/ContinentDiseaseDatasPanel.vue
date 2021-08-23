<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <detailed-geo-datas-panel :locationRegionsDatas="diseaseDatas.regionsDatas" :displayedCountry="diseaseDatas.country"></detailed-geo-datas-panel>
        <div class="diseaseDatasPanel__vaccRelDatasContainer">
            <vaccination-chart :vaccinationDatas="diseaseDatas.vaccinationDatas"></vaccination-chart>
            <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas" :locationType="'continent'"></relative-datas-panel>
        </div>
    </div>
</template>

<script>
import CurrentSituationPanel from "./DiseaseDatasPanel/CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DiseaseDatasPanel/DetailedGeoDatasPanel.vue";
import VaccinationChart from "./DiseaseDatasPanel/VaccinationChart.vue";
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
        VaccinationChart,
        RelativeDatasPanel
    }
}
</script>