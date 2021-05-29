<template>
    <div class="diseaseDatasPanel">
        <current-situation-panel :currentSituationDatas="diseaseDatas.currentSituation"></current-situation-panel>
        <detailed-geo-datas-panel v-if="detailedGeoDatasPanelCountries.includes(diseaseDatas.country)" :locationRegionsDatas="diseaseDatas.regionsDatas" :displayedCountry="diseaseDatas.country"></detailed-geo-datas-panel>
        <div class="diseaseDatasPanel__vaccRelDatasContainer">
            <vaccination-chart v-if="Object.entries(diseaseDatas.vaccinationDatas).length > 0" :vaccinationDatas="diseaseDatas.vaccinationDatas"></vaccination-chart>
            <relative-datas-panel :relativeDatas="diseaseDatas.relativeDatas"></relative-datas-panel>
        </div>
        <weekly-daily-datas-panel :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'country'"></weekly-daily-datas-panel>
        <location-evolution-graph :locationEvolutionDatas="diseaseDatas.evolutionDatas" :locationType="'country'"></location-evolution-graph>
    </div>
</template>

<script>
import CurrentSituationPanel from "./CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DetailedGeoDatasPanel.vue";
import WeeklyDailyDatasPanel from "./WeeklyDailyDatasPanel.vue";
import VaccinationChart from "./VaccinationChart.vue";
import RelativeDatasPanel from "./RelativeDatasPanel.vue";
import LocationEvolutionGraph from "./LocationEvolutionGraph";

export default {
    props: {
        diseaseDatas: {
            type: Object,
            required: true
        }
    },
    setup() {

        const detailedGeoDatasPanelCountries = ["France", "US", "Canada", "India", "Brazil", "China", "Russia"];

        return {
            detailedGeoDatasPanelCountries
        }

    },
    components: {
        CurrentSituationPanel,
        DetailedGeoDatasPanel,
        WeeklyDailyDatasPanel,
        VaccinationChart,
        RelativeDatasPanel,
        LocationEvolutionGraph
    }
}
</script>

<style lang="scss">
.datasPanel {
    overflow: hidden;
    background-color: white;
    margin: 3rem 0rem 3rem 1rem;
    padding: 0 1rem;
    color: #303030;
    &__headerContainer {
        border-bottom: 1px solid #303030;
    }
    &__header {
        margin: 0;
        padding: 1rem 0;
    }
}

.diseaseDatasPanel {
    flex: 2;
    > div {
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    &__vaccRelDatasContainer {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        div {
            flex: 1;
        }
    }
}
</style>