<template>

    <origin></origin>
    <infos></infos>
    <external-links></external-links>
    <world-france-summary></world-france-summary>

</template>

<script>
import Origin from "./PandemySummary/Origin.vue";
import Infos from "./PandemySummary/Infos.vue";
import ExternalLinks from "./PandemySummary/ExternalLinks.vue";
import WorldFranceSummary from "./PandemySummary/WorldFranceSummary.vue";

export default {
    components: {
        Origin,
        Infos,
        ExternalLinks,
        WorldFranceSummary
    }  
}
</script>