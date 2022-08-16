<template>

    <current-situation 
        :location="country"
    >
    </current-situation>

    <!--<detailed-geo-datas-panel 
        v-if="detailedGeoDatasPanelCountries.includes(country.country)" 
        :locationRegionsDatas="country.regionsDatas" 
        :displayedCountry="country.country"
    >
    </detailed-geo-datas-panel>-->

    <div class="locationDisease__horizontalDisplay">

        <vaccination 
            :location="country"
            class="panel--noVerticalMargin"
        >
        </vaccination>

        <relative-datas 
            :location="country"
            class="panel--noVerticalMargin"
        >
        </relative-datas>

    </div>

    <periods-totals :location="country"></periods-totals>
    <epidemic-evolution :location="country"></epidemic-evolution>

</template>

<script>
import CurrentSituation from "./Panels/CurrentSituation.vue";
//import DetailedGeoDatasPanel from "./DiseaseDatasPanel/DetailedGeographicalSituationPanel.vue";
import PeriodsTotals from "./Panels/PeriodsTotals.vue";
import Vaccination from "./Panels/Vaccination.vue";
import RelativeDatas from "./Panels/RelativeDatas.vue";
import EpidemicEvolution from "./Panels/EpidemicEvolution.vue";


export default {
    props: {
        country: {
            type: Object,
            required: true
        }
    },
    components: {
        CurrentSituation,
        /*DetailedGeoDatasPanel,*/
        PeriodsTotals,
        Vaccination,
        RelativeDatas,
        EpidemicEvolution
    }
}
</script>