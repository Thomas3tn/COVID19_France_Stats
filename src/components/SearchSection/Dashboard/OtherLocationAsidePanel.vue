<template>
    <aside class="locationDetails">
        <header class="locationDetails__locationName">
            <img v-if="locationLogo !== ''" :src="locationLogo" :title="locationInfos.nom || locationInfos.fr_name" :alt="locationLogoAltTag">

            <h2 v-if="locationType === 'continent'">{{ locationInfos.abbreviation }} {{ locationInfos.continent }}</h2>
            <h2 v-if="locationType === 'country'">({{ locationInfos.abbreviation }}) {{ locationInfos.fr_name }}</h2>
            <h2 v-else-if="locationType === 'departement'">({{ locationInfos.code }}) {{ locationInfos.nom }}</h2>

        </header>
        <img/>
        <div>
            <h3 class="locationDetails__overviewHeader"><i class="far fa-compass" aria-hidden="true"></i> Aperçu</h3>
            <ul class="locationDetails__list">
                
                <!-- country/departement location -->
                <li v-if="locationType === 'country'">Localisation: {{ locationInfos.continent }} ({{ locationInfos.location }})</li>

                <li v-if="locationType === 'continent'">Pays: {{ countriesList }} ({{ countriesTotalNumber }})</li>

            </ul>
            <ul class="locationDetails__list">
                <li>Population: {{ formattedPopulation }} habs</li>
                <li>Espérance de vie: {{ locationInfos.life_expectancy }} ans</li>
                <li v-if="locationType === 'country' || locationType === 'continent'">Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ locationInfos.gini}}</li>
            </ul>
            <ul class="locationDetails__list">
                <li v-if="locationType === 'country' && formattedUpdateDateDatas !== ''">Dernière mise à jour: {{ formattedUpdateDateDatas }}</li>
                <li v-else-if="locationType === 'departement'">Source: {{ locationInfos.source.nom }}</li>
            </ul>
        </div>       
        <twitter-panel :country="locationInfos.country"></twitter-panel>
    </aside>
</template>

<script>
export default {
    
}
</script>