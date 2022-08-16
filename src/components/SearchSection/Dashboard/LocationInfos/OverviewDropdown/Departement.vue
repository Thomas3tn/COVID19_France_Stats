<template>

    <overview-lists :names="['geography', 'politic', 'health']">

        <template v-slot:geography>
            <li>Localisation: {{ locationInfos.region }}</li>
            <li>Code: {{ locationInfos.abbreviation }}</li>
            <li>Superficie: {{ commonFormattedKeys.sqKmArea.value }} km²</li>
        </template>

        <template v-slot:politic>
            <li>Préfecture: {{ locationInfos.capitalCity }}</li>
            <li>Gentilé: {{ locationInfos.demonym }}</li>
        </template>

        <template v-slot:health>
            <li>Population: {{ commonFormattedKeys.population.value }} habs</li>
            <li>Espérance de vie: {{ locationInfos.lifeExpectancy }} ans</li>
        </template>

    </overview-lists>

</template>

<script>
import OverviewLists from "./Template/OverviewLists.vue";

export default {
    props: {
        locationInfos: {
            type: Object,
            required: true
        },
        commonFormattedKeys: {
            type: Object,
            required: true
        },
        locationType: {
            type: String, 
            required: true
        }
    },
    components: {
        OverviewLists
    }
}
</script>