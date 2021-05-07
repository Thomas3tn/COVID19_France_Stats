<template>
    <aside class="locationDetails">
        <div class="locationDetails__locationName">
            <img :src="locationLogo" :title="locationInfos.country">
            <h2>({{ locationInfos.abbreviation || locationInfos.code }}) {{ locationInfos.country || locationInfos.nom }}</h2>
        </div>
        <div>
            <GoogleMap
            api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
            style="width: 100%; height: 300px"
            :center="{lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}"
            :zoom="4"
            >
                <Marker :options="{ position: {lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}}" />
            </GoogleMap>
        </div>
        <div>
            <h4 class="locationDetails__overviewHeader"><i class="far fa-compass"></i> Aperçu</h4>
            <ul class="locationDetails__list">
                <li v-if="locationInfos.country !== 'undefined'">Localisation: {{ locationInfos.continent }} ({{ locationInfos.location }})</li>
                <li v-else>Localisation: {{ locationInfos.location }}</li>                
                <li>Superficie: {{ locationInfos.sq_km_area }} km²</li>
                <li>Capitale: {{ locationInfos.capital_city }}</li>
                <li>Gentilé: {{ locationInfos.demonym }}</li>
            </ul>
            <ul class="locationDetails__list">
                <li>Population: {{ locationInfos.population }} pers.</li>
                <li>Espérance de vie: {{ locationInfos.life_expectancy }} ans</li>
                <li>Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ locationInfos.gini}}</li>
            </ul>
            <ul>
                <li v-if="locationInfos.country !== 'undefined' && locationInfos.updated !== 'undefined'">Dernière mise à jour: {{ locationInfos.updated }}</li>
                <li v-else>Source: {{ locationInfos.source.nom }}</li>
            </ul>
        </div>       
        <twitter-panel :country="locationInfos.country"></twitter-panel>
    </aside>
</template>

<script>
//Vue Components
import { GoogleMap, Marker } from "vue3-google-map";
import TwitterPanel from "./TwitterPanel.vue";

//Vue Elements
import { computed } from "vue";

export default {
    props: {
        locationInfos: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        console.log(props.locationInfos)

        let locationLogo = computed(() => "https://www.countryflagicons.com/FLAT/64/" + props.locationInfos.abbreviation.toUpperCase() + ".png");

        return {
            locationLogo
        }

    },
    components: {
        GoogleMap,
        Marker,
        TwitterPanel
    }
}
</script>

<style lang="scss">
.locationDetails {
    flex: 1;
    background-color: white;
    padding: 1rem;
    position: sticky;
    top: 0;
    margin-right: 2rem;
    &__locationName {
        display: flex;
        align-items: center;
    }
    &__overviewHeader {
        font-size: 1.5rem;
    }
    &__list {
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
    }
}
</style>