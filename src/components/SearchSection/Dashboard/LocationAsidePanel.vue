<template>
    <aside v-if="currentlyDisplayed === true" class="locationDetails">
        <button class="locationDetails__toggleDisplayBtn" title="Cacher les détails de la localisation" @click="toggleLocationAsidePanelDisplay"><i class="fas fa-chevron-left" aria-hidden="true"></i><span class="screenreaderText">Cacher les détails de la localisation</span></button>
        <header class="locationDetails__locationName">
            <img v-if="locationLogo !== '' && isLocationLogoUrlValid === true" :src="locationLogo" :title="locationInfos.nom || locationInfos.fr_name" :alt="locationLogoAltTag" @error="onLocationLogoError">
            <font-awesome-icon v-if="isLocationLogoUrlValid === false || locationLogo === ''" :icon="defaultLocationLogo" class="locationDetails__defaultLogo"/>

            <h2 v-if="locationType === 'continent'">{{ locationInfos.abbreviation }} {{ locationInfos.continent }}</h2>
            <h2 v-if="locationType === 'country'">({{ locationInfos.abbreviation }}) {{ locationInfos.fr_name }}</h2>
            <h2 v-else-if="locationType === 'departement'">({{ formattedDepartementCode }}) {{ locationInfos.nom }}</h2>

        </header>
            <GoogleMap
            api-key="AIzaSyBrX2QbmLhIX_J0hKBelUxLSZD7RiylBEU"
            style="width: 100%; height: 21.4vw; minHeight: 256px"
            :center="{lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}"
            :zoom="mapZoom"
            >
                <Marker :options="{ position: {lat: parseInt(locationInfos.lat, 10), lng: parseInt(locationInfos.long, 10)}}" />
            </GoogleMap>
        <dropdown-element :detailsElementId="'locationDetails'" :openByDefault="true" :activeClassName="'active'" :inactiveClassName="'inactive'">
            <template v-slot:header>
                <div><i class="far fa-compass" aria-hidden="true"></i><h3> Aperçu</h3></div>
            </template>
            <template v-slot:content>
                <ul class="locationDetails__list">
                
                <!-- country/departement location -->
                <li v-if="locationType === 'country'">Localisation: {{ locationInfos.continent }} ({{ locationInfos.location }})</li>
                <li v-else-if="locationType === 'departement'">Localisation: {{ locationInfos.location }}</li>
                
                <li>Superficie: {{ formattedSurfaceArea }} km²</li>

                <!-- Location capital city -->
                <li v-if="locationType === 'country'">Capitale: {{ locationInfos.capital_city }}</li>
                <li v-else-if="locationType === 'departement'">Préfecture: {{ locationInfos.capital_city }}</li>

                <li>Gentilé: {{ locationInfos.demonym }}</li>

                <li v-if="locationType === 'continent'">Pays: 
                    <template v-if="isCountriesListDisplayed === true">{{ countriesList.entireList }}</template>
                    <template v-else>{{ countriesList.listExtract }}</template>
                    <button v-if="isCountriesListDisplayed === false" class="locationDetails__listBtn"  @click="isCountriesListDisplayed = !isCountriesListDisplayed" title="Voir la liste complète">...</button>
                    ({{ countriesTotalNumber }})
                    <button v-if="isCountriesListDisplayed === true" class="locationDetails__listBtn" @click="isCountriesListDisplayed = !isCountriesListDisplayed" title="Réduire la liste"><i class="fas fa-caret-left"></i></button>
                </li>

                </ul>
                <ul class="locationDetails__list">
                    <li>Population: {{ formattedPopulation }} habs</li>
                    <li>Espérance de vie: {{ locationInfos.life_expectancy }} ans</li>
                    <li v-if="locationType === 'country' || locationType === 'continent'">Indice <abbr title="L'indice de GINI mesure l'inégalité des revenus d'un pays, allant de 0 (égalité parfaite) à 100 (inégalité parfaite).">GINI</abbr>: {{ formattedGini }}</li>
                </ul>
                <ul class="locationDetails__list" v-if="locationType === 'country' && formattedUpdateDateDatas !== ''">
                    <li>Dernière mise à jour: {{ formattedUpdateDateDatas }}</li>
                </ul>
                <ul class="locationDetails__list" v-else-if="locationType === 'departement'">
                    <li>Source: {{ locationInfos.source.nom }}</li>
                </ul>
            </template>
        </dropdown-element>
        <dropdown-element :detailsElementId="'locationInfos'">
            <template v-slot:header>
                <div><i class="fas fa-newspaper" aria-hidden="true"></i><h3> Dernières actualités</h3></div>
            </template>
            <template v-slot:content>
                <twitter-panel></twitter-panel>
            </template>
        </dropdown-element>
    </aside>
</template>

<script>
//Vue Components
import { GoogleMap, Marker } from "vue3-google-map";
import TwitterPanel from "./SharedComponents/TwitterPanel.vue";
import DropdownElement from "../../SharedComponents/DropdownElement.vue";

//Vue Elements
import { computed, ref } from "vue";

//JS Script
import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

import { faFlag, faMapMarkerAlt, faGlobeEurope, faGlobeAfrica, faGlobeAsia, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

export default {
    props: {
        locationType: {
            type: String,
            required: true
        },
        locationInfos: {
            type: Object,
            required: true
        },
        currentlyDisplayed: {
            type: Boolean,
            required: true,
        }
    },
    setup(props, context) {

        console.log(props.locationInfos);
        let isLocationLogoUrlValid = ref(true);

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

        let locationLogoAltTag = computed(() => {

            if (props.locationType === "country") {
                return "Drapeau du pays: " + props.locationInfos.fr_name;
            } else if (props.locationType === "departement") {
                return "Logo du département: " + props.locationInfos.nom;
            } else {
                return "";
            }

        })

        let defaultLocationLogo = computed(() => {

            if (props.locationType === "departement") {
                return faMapMarkerAlt;
            } else if (props.locationType === "country") {
                return faFlag;
            } else if (props.locationType === "continent") {

                switch (props.locationInfos.continent) {
                    case "Europe":
                        return faGlobeEurope;

                    case "Afrique":
                        return faGlobeAfrica

                    case "Asie":
                        return faGlobeAsia;

                    case "Océanie":
                        return faGlobeAsia;

                    case "Amérique du Sud":
                        return faGlobeAmericas;

                    case "Amérique du Nord":
                        return faGlobeAmericas;

                    default:
                        return "";

                }

            } else {
                return "";
            }

        });

        let formattedDepartementCode = computed(() => {

            if (props.locationType === "departement") {
                return props.locationInfos.code.split("-")[1];
            } else {
                return "";
            }

        });

        let formattedSurfaceArea = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.locationInfos.sq_km_area));
        let formattedPopulation = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.locationInfos.population));
        let formattedGini = computed(() => {

            if (props.locationType === "country" || props.locationType === "continent") {
                return datasCalculator.numberFunctionalities.roundFloatNumber(props.locationInfos.gini);
            } else {
                return "";
            }

        })

        let isCountriesListDisplayed = ref(false);

        let countriesTotalNumber = computed(() => {

            if (props.locationType === "continent") {
                return props.locationInfos.countriesList.length - 1;
            } else {
                return "";
            }
        });

        let countriesList = computed(() => {

            if (props.locationType === "continent") {

                let currentCountryList = {
                    entireList: "",
                    listExtract: ""
                };

                for (let i = 0; i < props.locationInfos.countriesList.length; i++) {

                    let currentCountry = " " + props.locationInfos.countriesList[i];
                    if (i !== (props.locationInfos.countriesList.length - 1)) {
                        currentCountry += ",";
                    }
                    
                    currentCountryList.entireList += currentCountry;

                    if (i < 2) {
                        currentCountryList.listExtract += currentCountry;
                    } else if (i === 2) {
                        currentCountryList.listExtract += currentCountry.split("").slice(0, currentCountry.split("").length - 1).join("");
                    }

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

        function onLocationLogoError() {
            isLocationLogoUrlValid.value = false;
        }

        function toggleLocationAsidePanelDisplay() {
            context.emit("toggle-location-panel-display");
        }

        //Add Google Map script tag
        let googleMapScript = document.createElement("script");
        googleMapScript.setAttribute("src", "https://unpkg.com/vue3-google-map");
        document.head.appendChild(googleMapScript);

        return {
            locationLogo,
            countriesTotalNumber,
            countriesList,
            mapZoom,
            formattedSurfaceArea,
            formattedPopulation,
            formattedUpdateDateDatas,
            locationLogoAltTag,
            onLocationLogoError,
            isLocationLogoUrlValid,
            defaultLocationLogo,
            formattedDepartementCode,
            toggleLocationAsidePanelDisplay,
            isCountriesListDisplayed,
            formattedGini
        }

    },
    components: {
        GoogleMap,
        Marker,
        TwitterPanel,
        DropdownElement
    }
}
</script>

<style lang="scss">
$locationDetailsPadding: calc(max(1rem, 1vw));

.locationDetails {
    background-color: $white;
    padding-top: $locationDetailsPadding;
    padding-bottom: $locationDetailsPadding;
    padding-left: $locationDetailsPadding;
    padding-right: $locationDetailsPadding;
    border-radius: 3px;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
    @media (min-width: 1024px) {
        position: sticky;
        top: 0;
        flex: 1;
        margin-bottom: 0;
        margin-right: 3vw;
    }
    &:hover {
        .locationDetails__toggleDisplayBtn {
            transform: translate(0%, 50%);
            opacity: 1;
        }
    }
    h3 {
        font-size: clamp(1.5rem, 1.5vw, 2.7rem);
    }
    summary:hover {
        color: $dashboard-selection;
        transition: all 300ms;
    }
    &__toggleDisplayBtn {
        z-index: -1;
        opacity: 0;
        display: none;
        height: 10%;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translate(100%, 50%);
        transition: transform 300ms 0ms ease-in-out, opacity 150ms 150ms ease-in-out;
        background-color: inherit;
        border-radius: 4px 0 0 4px;
        border: none;
        @media (min-width: 1024px) {
            display: flex;
        }
        &:hover {
            cursor: pointer;
            transform: translate(0%, 50%);
            opacity: 1;
        }
    }
    &__locationName {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.75rem;
        @media (min-width: 1024px) {
            justify-content: flex-start;
        }
        img {
            width: 20%;
        }
        h2 {
            margin: 0;
            margin-left: 5%;
            font-size: clamp(2rem, 1.7vw, 3rem);
        }
    }
    &__defaultLogo {
        font-size: clamp(2rem, 2vw, 3rem);
    }
    &__summaryContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 300ms;
        &:hover {
            cursor: pointer;
            color: $dashboard-selection;
        }
        div {
            display: flex;
            justify-content: center;
            align-items: baseline;
            i {
                margin-right: 0.5vw;
                font-size: 1.5rem;
            }
        }
    }
    &__list {
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
        list-style-type: square;
        &:last-of-type {
            border-bottom: none;
        }
        li {
            position: relative;
            right: clamp(7%, 2%);
            //Add vertical margin for high resolution screen
            margin: 0.1vw 0;
            abbr {
                cursor: help;
            }
        }
    }
    &__listBtn {
        border: none;
        background-color: inherit;
        &:hover {
            cursor: pointer;
        }
    }
}

.active {
    color: lightblue;
}

.inactive {
    color: black;
}
</style>