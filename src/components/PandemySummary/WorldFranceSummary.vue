<template>
    <section class="worldFranceSummary">

        <france-summary :computeWeeklyEvo="computeWeeklyEvo"></france-summary>
        <world-summary :computeWeeklyEvo="computeWeeklyEvo"></world-summary>

    </section>
</template>

<script>
import FranceSummary from "./WorldFranceSummary/France.vue";
import WorldSummary from "./WorldFranceSummary/World.vue";
import DateCustomMethods from "../../assets/JSClasses/CustomMethods/Date.js";
import NumberCustomMethods from "../../assets/JSClasses/CustomMethods/Number.js";

export default {
    setup() {

        function computeWeeklyEvo({location, status, weekAgoTimestamp, types}) {

            const weekAgoData = DateCustomMethods.getDay({datas: location.historical, date: weekAgoTimestamp})?.cumulative?.[status];

            if (types.length === 1) {

                return types[0] === "raw" ? 
                location.live[status] - weekAgoData 
                : 
                NumberCustomMethods.getPercentageOfPartFromTotal(location.live[status] - weekAgoData, location.live[status]);

            } else {

                return {
                    raw: location.live[status] - weekAgoData,
                    perc: NumberCustomMethods.getPercentageOfPartFromTotal(location.live[status] - weekAgoData, location.live[status])
                }

            }

        }

        return {
            computeWeeklyEvo
        }

    },
    components: {
        FranceSummary,
        WorldSummary
    }
}
</script>