<template>

    <overview-lists :names="['geography', 'health']">

        <template v-slot:geography>
            <li>Superficie: {{ commonFormattedKeys.sqKmArea.value }} km²</li>
            <li>Pays: 

                <template v-if="isCountriesListDisplayed === true">

                    {{ formattedDatas.countriesList }}
                    <button 
                        class="listBtn" 
                        @click="isCountriesListDisplayed = !isCountriesListDisplayed" 
                        title="Réduire la liste"
                    >
                        <i class="fas fa-caret-left">
                        </i>
                    </button>
                    
                </template>

                <template v-else>

                    {{ formattedDatas.countriesListReduced }}
                    <button 
                        class="listBtn" 
                        @click="isCountriesListDisplayed = !isCountriesListDisplayed" 
                        title="Voir la liste complète"
                    >
                    ...
                    </button>

                </template>

            </li>
        </template>

        <template v-slot:health>
            <li>Population: {{ commonFormattedKeys.population.value }} habs</li>
            <li>Gentilé: {{ locationInfos.demonym }}</li>
            <li>Espérance de vie: {{ locationInfos.lifeExpectancy }} ans</li>
            <li>Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ formattedDatas.gini }}</li>
        </template>

    </overview-lists>

</template>

<script>
import OverviewLists from "./Template/OverviewLists.vue";
import { computed, reactive, ref } from "vue";

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

        let isCountriesListDisplayed = ref(false);
        
        const formattedDatas = reactive({
            gini: computed(() => props.locationInfos.gini || "N/A"),
            countriesListReduced: computed(() => {

                let firstItems = props.locationInfos.countriesList.filter((currCountry, index) => index < 3);
                return firstItems.join(", ");

            }),
            countriesList: computed(() => props.locationInfos.countriesList.join(", "))
        });

        return {
            formattedDatas,
            isCountriesListDisplayed
        }

    },
    components: {
        OverviewLists
    }
}
</script>