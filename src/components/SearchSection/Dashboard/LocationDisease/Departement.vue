<template>

    <current-situation :location="departement"></current-situation>
    <relative-datas :location="departement"></relative-datas>
    <periods-totals :location="departement"></periods-totals>
    <epidemic-evolution :location="departement"></epidemic-evolution>

</template>

<script>
import CurrentSituation from "./Panels/CurrentSituation.vue";
import PeriodsTotals from "./Panels/PeriodsTotals.vue";
import RelativeDatas from "./Panels/RelativeDatas.vue";
import EpidemicEvolution from "./Panels/EpidemicEvolution.vue";


export default {
    props: {
        departement: {
            type: Object,
            required: true
        }
    },
    components: {
        CurrentSituation,
        PeriodsTotals,
        RelativeDatas,
        EpidemicEvolution
    }
}
</script>