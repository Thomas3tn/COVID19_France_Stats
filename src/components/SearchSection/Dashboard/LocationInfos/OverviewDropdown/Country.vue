<template>

    <overview-lists :names="['geography', 'politic', 'health', 'update']">

        <template v-slot:geography>
            <li>Localisation: {{ formattedDatas.localization }}</li>
            <li>{{ formattedDatas.isIndependant }}</li>
            <li>{{ formattedDatas.isUNMember }}</li>
            <li>Superficie: {{ commonFormattedKeys.sqKmArea.value }} km²</li>
        </template>

        <template v-slot:politic>
            <li>Capitale: {{ locationInfos.capitalCity }}</li>
            <li>Langue(s): {{ locationInfos.languages }}</li>
            <li>Monnaie(s): {{ locationInfos.currencies }}</li>
            <li>Gentilé: {{ locationInfos.demonym }}</li>
        </template>

        <template v-slot:health>
            <li>Population: {{ commonFormattedKeys.population.value }} habs</li>
            <li>Espérance de vie: {{ locationInfos.lifeExpectancy }} ans</li>
            <li>Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ formattedDatas.gini }}</li>
        </template>

        <template v-slot:update>
            <li>Dernière mise à jour: {{ formattedDatas.update }}</li>
        </template>

    </overview-lists>

</template>

<script>
import DateCustomMethods from "../../../../../assets/JSClasses/CustomMethods/Date.js";
import OverviewLists from "./Template/OverviewLists.vue";
import { computed, reactive, inject } from "vue";

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
    setup(props) {

        const LOC_TYPES = inject("LOCATION_TYPES");
        console.log(props.commonFormattedKeys)
        
        const formattedDatas = reactive({
            localization: computed(() => `${props.locationInfos.region} (${props.locationInfos.subRegion})`),
            gini: computed(() => {

                if ([props.locationInfos.gini.data, props.locationInfos.gini.year].every(data => data === null)) {
                    return "N/A";
                } else {
                    return `${props.locationInfos.gini.data} (${props.locationInfos.gini.year})`;
                }

            }),
            isIndependant: computed(() => props.locationInfos.isIndependant ? "Pays indépendant" : "Pays non indépendant"),
            isUNMember: computed(() => props.locationInfos.isUNMember ? "Membre de l'ONU" : "Non membre de l'ONU"),
            update: computed(() => {

                if (props.locationInfos.update) {
                    return `${DateCustomMethods.switchDateFormat({date: DateCustomMethods.dateFromTimestamp({date: props.locationInfos.update}), newSeparator: "/"})} ${DateCustomMethods.timeFromTimestamp({date: props.locationInfos.update})}`;
                } else {
                    return "N/A";
                }

            })
        });

        return {
            LOC_TYPES,
            formattedDatas,
        }

    },
    components: {
        OverviewLists
    }
}
</script>