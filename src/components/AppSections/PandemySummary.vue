<template>
    <covid-origin></covid-origin>
    <covid-infos></covid-infos>
    <covid-external-links></covid-external-links>
    <world-france-summary></world-france-summary>
</template>

<script>
//Vue components
import CovidOrigin from "../PandemySummaryComponents/CovidOrigin.vue";
import CovidInfos from "../PandemySummaryComponents/CovidInfos.vue";
import CovidExternalLinks from "../PandemySummaryComponents/CovidExternalLinks.vue";
import WorldFranceSummary from "../PandemySummaryComponents/WorldFranceSummary.vue";

export default {
    components: {
        CovidOrigin,
        CovidInfos,
        CovidExternalLinks,
        WorldFranceSummary
    }  
}
</script>