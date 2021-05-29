<template>
    <aside class="locationDetails">
        <div class="locationDetails__locationName">
            <img  v-if="locationLogo !== ''" :src="locationLogo" :title="locationInfos.country || locationInfos.nom">


            <h2 v-if="locationType === 'continent'">{{ locationInfos.abbreviation }} {{ locationInfos.continent }}</h2>
            <h2 v-if="locationType === 'country'">({{ locationInfos.abbreviation }}) {{ locationInfos.country }}</h2>
            <h2 v-else-if="locationType === 'departement'">({{ locationInfos.code }}) {{ locationInfos.nom }}</h2>

        </div>
        <div>
            <GoogleMap
            api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
            style="width: 100%; height: 300px"
            :center="{lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}"
            :zoom="mapZoom"
            >
                <Marker :options="{ position: {lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}}" />
            </GoogleMap>
        </div>
        <div>
            <h4 class="locationDetails__overviewHeader"><i class="far fa-compass"></i> Aperçu</h4>
            <ul class="locationDetails__list">
                
                <!-- country/departement location -->
                <li v-if="locationType === 'country'">Localisation: {{ locationInfos.continent }} ({{ locationInfos.location }})</li>
                <li v-else-if="locationType === 'departement'">Localisation: {{ locationInfos.location }}</li>
                
                <li>Superficie: {{ locationInfos.sq_km_area }} km²</li>

                <!-- Location capital city -->
                <li v-if="locationType === 'country'">Capitale: {{ locationInfos.capital_city }}</li>
                <li v-else-if="locationType === 'departement'">Préfecture: {{ locationInfos.capital_city }}</li>

                <li>Gentilé: {{ locationInfos.demonym }}</li>

                <li v-if="locationType === 'continent'">Pays: {{ countriesList }} ({{ countriesTotalNumber }})</li>

            </ul>
            <ul class="locationDetails__list">
                <li>Population: {{ locationInfos.population }} pers.</li>
                <li>Espérance de vie: {{ locationInfos.life_expectancy }} ans</li>
                <li v-if="locationType === 'country' || locationType === 'continent'">Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ locationInfos.gini}}</li>
            </ul>
            <ul>
                <li v-if="locationType === 'country' && locationInfos.updated !== ''">Dernière mise à jour: {{ locationInfos.updated }}</li>
                <li v-else-if="locationType === 'departement'">Source: {{ locationInfos.source.nom }}</li>
            </ul>
        </div>       
        <twitter-panel :country="locationInfos.country"></twitter-panel>
    </aside>
</template>

<script>
//Vue Components
import { GoogleMap, Marker } from "vue3-google-map";
import TwitterPanel from "./LocationAsidePanel/TwitterPanel.vue";

//Vue Elements
import { computed } from "vue";

export default {
    props: {
        locationType: {
            type: String,
            required: true
        },
        locationInfos: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        let locationLogo = computed(() => {
            
            if (props.locationType === "country") {
                return "https://www.countryflagicons.com/FLAT/64/" + props.locationInfos.abbreviation.toUpperCase() + ".png";
            } else if (props.locationType === "departement") {
                return "https://www.regions-departements-france.fr/images/departements/logo/" + props.locationInfos.code.split("-")[1] + "-logo-" + props.locationInfos.nom.toLowerCase() + ".jpg";
            } else {
                return "";
            }
            
        });

        let countriesTotalNumber = computed(() => {

            if (props.locationType === "continent") {
                return props.locationInfos.countriesList.length - 1;
            } else {
                return "";
            }
        });

        let countriesList = computed(() => {

            if (props.locationType === "continent") {

                let currentCountryList = "";

                for (let i = 0; i < props.locationInfos.countriesList.length; i++) {
                    let currentCountry = " " + props.locationInfos.countriesList[i];
                    if (props.locationInfos.countriesList[i + 1] !== "undefined") {
                        currentCountry += ",";
                    }
                    currentCountryList += currentCountry;
                }

                return currentCountryList;


            } else {
                return "";
            }

        });

        const mapZoom = computed(() => {

            if (props.locationInfos.sq_km_area < 2000) {
                return 9;
            } else if (props.locationInfos.sq_km_area >= 2000 && props.locationInfos.sq_km_area < 20000) {
                return 7;
            } else if (props.locationInfos.sq_km_area >= 35000 && props.locationInfos.sq_km_area < 75000) {
                return 6;
            } else if (props.locationInfos.sq_km_area >= 75000 && props.locationInfos.sq_km_area < 500000) {
                return 5;
            } else if (props.locationInfos.sq_km_area >= 500000 && props.locationInfos.sq_km_area < 5000000) {
                return 4;
            } else if (props.locationInfos.sq_km_area >= 5000000 && props.locationInfos.sq_km_area < 8500000) {
                return 3;
            } else if (props.locationInfos.sq_km_area >= 8500000) {
                return 2;
            } else {
                return 5;
            }

        });

        return {
            locationLogo,
            countriesTotalNumber,
            countriesList,
            mapZoom
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