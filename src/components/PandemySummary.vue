<template>
    <covid-origin></covid-origin>
    <covid-infos></covid-infos>
    <covid-external-links></covid-external-links>
    <world-france-summary></world-france-summary>
</template>

<script>
//Vue components
import CovidOrigin from "./PandemySummary/CovidOrigin.vue";
import CovidInfos from "./PandemySummary/CovidInfos.vue";
import CovidExternalLinks from "./PandemySummary/CovidExternalLinks.vue";
import WorldFranceSummary from "./PandemySummary/WorldFranceSummary.vue";

export default {
    components: {
        CovidOrigin,
        CovidInfos,
        CovidExternalLinks,
        WorldFranceSummary
    }  
}
</script>