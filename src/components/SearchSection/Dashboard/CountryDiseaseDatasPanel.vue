<template>
    <div class="diseaseDatasPanel">
        <div v-if="diseaseDatas.country === 'China'" class="warningPanel datasPanel">
            <font-awesome-icon :icon="faExclamationTriangle" class="warningPanel__warningSign"/>
            <p class="warningPanel__content">Certaines sources affirment que les données à propos de la Chine sont en réalité sous-estimées et que les chiffres réels pourraient être en réalité plus élevés.
                Les chiffres présentées ci-dessous sont ceux communiqués par le gouvernement chinois.
            </p>
        </div>
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
import CurrentSituationPanel from "./DiseaseDatasPanel/CurrentSituationPanel.vue";
import DetailedGeoDatasPanel from "./DiseaseDatasPanel/DetailedGeoDatasPanel.vue";
import WeeklyDailyDatasPanel from "./DiseaseDatasPanel/WeeklyDailyDatasPanel.vue";
import VaccinationChart from "./DiseaseDatasPanel/VaccinationChart.vue";
import RelativeDatasPanel from "./DiseaseDatasPanel/RelativeDatasPanel.vue";
import LocationEvolutionGraph from "./DiseaseDatasPanel/LocationEvolutionGraph";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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
            detailedGeoDatasPanelCountries,
            faExclamationTriangle
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
.diseaseDatasPanel {
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    flex: 3;
    width: 100%;
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
        flex-direction: column;
        @media (min-width: 1024px) {
            min-height: clamp(23rem, 33vw, 45rem);
            flex-direction: row;
            > div {
            flex: 1;
            margin: 0;
            }
            > div:first-child {
                margin-right: 1.5vw;
            }
            > div:last-child {
                margin-left: 1.5vw;
            }
        }
    }
}

.warningPanel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    &__warningSign {
        color: #FFCF2D;
        font-size: 2rem;
        margin-right: 1rem;
    }
    &__content {
        margin: 0;
    }
}
</style>