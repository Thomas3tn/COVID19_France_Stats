<template>
    <aside class="locationDetails">
        <div class="locationDetails__locationName">
            <img  v-if="locationLogo !== ''" :src="locationLogo" :title="locationInfos.country || locationInfos.nom">

            <h2 v-if="locationType === 'continent'">{{ locationInfos.abbreviation }} {{ locationInfos.continent }}</h2>
            <h2 v-if="locationType === 'country'">({{ locationInfos.abbreviation }}) {{ locationInfos.fr_name }}</h2>
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
            <h3 class="locationDetails__overviewHeader"><i class="far fa-compass"></i> Aperçu</h3>
            <ul class="locationDetails__list">
                
                <!-- country/departement location -->
                <li v-if="locationType === 'country'">Localisation: {{ locationInfos.continent }} ({{ locationInfos.location }})</li>
                <li v-else-if="locationType === 'departement'">Localisation: {{ locationInfos.location }}</li>
                
                <li>Superficie: {{ formattedSurfaceArea }} km²</li>

                <!-- Location capital city -->
                <li v-if="locationType === 'country'">Capitale: {{ locationInfos.capital_city }}</li>
                <li v-else-if="locationType === 'departement'">Préfecture: {{ locationInfos.capital_city }}</li>

                <li>Gentilé: {{ locationInfos.demonym }}</li>

                <li v-if="locationType === 'continent'">Pays: {{ countriesList }} ({{ countriesTotalNumber }})</li>

            </ul>
            <ul class="locationDetails__list">
                <li>Population: {{ formattedPopulation }} habs</li>
                <li>Espérance de vie: {{ locationInfos.life_expectancy }} ans</li>
                <li v-if="locationType === 'country' || locationType === 'continent'">Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ locationInfos.gini}}</li>
            </ul>
            <ul>
                <li v-if="locationType === 'country' && formattedUpdateDateDatas !== ''">Dernière mise à jour: {{ formattedUpdateDateDatas }}</li>
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

//JS Script
import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

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

        console.log(props.locationInfos);

        const datasCalculator = new DatasCalculator();

        let locationLogo = computed(() => {
            
            if (props.locationType === "country") {
                return "https://www.countryflagicons.com/FLAT/64/" + props.locationInfos.abbreviation.toUpperCase() + ".png";
            } else if (props.locationType === "departement") {
                return "https://www.regions-departements-france.fr/images/departements/logo/" + props.locationInfos.code.split("-")[1] + "-logo-" + props.locationInfos.nom.toLowerCase() + ".jpg";
            } else {
                return "";
            }
            
        });

        let formattedSurfaceArea = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.locationInfos.sq_km_area));
        let formattedPopulation = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.locationInfos.population));

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

        let formattedUpdateDateDatas = computed(() => {

            if (typeof props.locationInfos.updated !== "undefined") {
                console.log(props.locationInfos.updated);

                let updateDateDatas = new Date(props.locationInfos.updated);

                if (props.locationType === "departement") {
                    return datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getDate()) + "/" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getMonth() + 1) + "/" + updateDateDatas.getFullYear();
                } else {
                    return datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getDate()) + "/" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getMonth() + 1) + "/" + updateDateDatas.getFullYear() + " à " + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getHours()) + "H" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(updateDateDatas.getMinutes());
                }

            } else {
                return "";
            }

        });

        return {
            locationLogo,
            countriesTotalNumber,
            countriesList,
            mapZoom,
            formattedSurfaceArea,
            formattedPopulation,
            formattedUpdateDateDatas
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
    background-color: white;
    padding: 1rem;
    border-radius: 3px;
    margin-bottom: 1.5rem;
    @media (min-width: 1024px) {
        position: sticky;
        top: 0;
        flex: 1;
        margin-bottom: 0;
        margin-right: 2rem;
    }
    &__locationName {
        display: flex;
        align-items: center;
        img {
            width: 20%;
        }
        h2 {
            margin-left: 5%;
        }
    }
    &__list {
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
    }
}
</style>