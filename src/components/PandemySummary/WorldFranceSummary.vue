<template>
    <section class="worldFranceSummary">
        <article class="locationSummary locationSummary--france">
            <div class="locationSummary__container">
                <div class="locationSummary__locationContainer">
                    <p class="locationSummary__locationPara" aria-hidden="true"><span class="locationSummary__locationLetter">F</span><span class="locationSummary__locationLetter">R</span><span class="locationSummary__locationLetter">A</span><span class="locationSummary__locationLetter">N</span><span class="locationSummary__locationLetter">C</span><span class="locationSummary__locationLetter">E</span></p>
                </div>
                <div class="locationSummary__grid locationSummary__grid--france">
                    <div class="locationSummary__img locationSummary__img--france">
                    </div>
                    <div class="locationSummary__contentContainer">
                        <h2 class="locationSummary__header">La France enregistre une {{ franceFormattedWeeklyConfirmedPercentage.trend }} hebdomadaire de <span class="locationSummary__highlightedTitleData">{{ franceFormattedWeeklyConfirmedPercentage.percentage }}</span> des cas de COVID-19</h2>
                        <p class="locationSummary__content">C'est à dire {{ franceFormattedWeeklyConfirmedPercentage.rawEvolution }} cas supplémentaires, faisant s'élever le nombre total de contaminations à {{ franceFormattedConfirmed }}, soit {{ franceInfectionRate }} de la population et {{ franceFormattedDeaths }} sont décèdés des suites du COVID-19.</p>
                        <p class="locationSummary__content">Sur la même période les hospitalisations sont en {{ franceFormattedWeeklyHospitalizationsPercentage.trend }} de {{ franceFormattedWeeklyHospitalizationsPercentage.percentage }} ({{ franceFormattedWeeklyHospitalizationsPercentage.rawEvolution }} hosp.) avec {{ franceFormattedHospitalizations }} personnes hospitalisées tandis que les admissions en réanimations sont en {{ franceFormattedWeeklyIntensiveCarePercentage.trend }} de {{ franceFormattedWeeklyIntensiveCarePercentage.percentage }} ({{ franceFormattedWeeklyIntensiveCarePercentage.rawEvolution }} pers.), soit un total de {{ franceFormattedIntensiveCare }} individus en réanimation.</p>
                        <p class="locationSummary__content">Enfin la couverture vaccinale progresse puisque {{ franceVaccinationCoverageFirstShot }} de la population ({{ franceFormattedVaccFirstShot }}) a reçu une première dose et {{ franceVaccinationCoverageSecShot }} ({{ franceFormattedVaccSecShot }}) une seconde.</p>
                    </div>
                </div>
            </div>
        </article>
        <article class="locationSummary locationSummary--world">
            <div class="locationSummary__container">
                <div class="locationSummary__locationContainer">
                    <p class="locationSummary__locationPara" aria-hidden="true"><span class="locationSummary__locationLetter">M</span><span class="locationSummary__locationLetter">O</span><span class="locationSummary__locationLetter">N</span><span class="locationSummary__locationLetter">D</span><span class="locationSummary__locationLetter">E</span></p>
                </div>
                <div class="locationSummary__grid locationSummary__grid--world">
                    <div class="locationSummary__img locationSummary__img--world">
                    </div>
                    <div class="locationSummary__contentContainer">
                        <h2 class="locationSummary__header">À ce jour, <span class="locationSummary__highlightedTitleData">{{ worldFormattedDeaths }}</span> personnes sont mortes du COVID-19 autour du globe</h2>
                        <p class="locationSummary__content">Ce qui correspond à un taux de mortalité de {{ worldMortalityRate }}, en comparaison le taux mortalité de la grippe saisonnière s'élève à 2% (New York Times). À partir de cet indicateur les pays les plus endeuillés sont: <template v-for="(item, index) in mostBereavedCountries.list" :key="item.countryName"><template v-if="(index + 1) === mostBereavedCountries.list.length"> et {{ item.countryName }}</template><template v-else>{{ item.countryName }}, </template></template> et comptabilisent à eux seuls {{ mostBereavedCountries.worldShare.deaths }} des décès et {{ mostBereavedCountries.worldShare.confirmed }} des cas confirmés.</p>
                        <p class="locationSummary__content">Il y a {{ worldFormattedConfirmed }} cas confirmés de COVID dans le monde aujourd'hui et {{ worldConfirmedWeeklyEvolution.rawEvolution }} cas supplémentaires depuis la semaine dernière, soit une hausse de {{ worldConfirmedWeeklyEvolution.percentage }}.</p>
                        <p class="locationSummary__content">Pour finir, le monde a administré {{ worldVaccines.administered }} doses de vaccins, rendant {{ worldVaccines.firstShot }} personnes pleinement vaccinées tandis que {{ worldVaccines.secondShot }} personnes attendent leur deuxième dose.</p>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
//Vue elements
import { computed } from "vue";
import { useStore } from "vuex";

//JS File
import DatasCalculator from "../../assets/JSClasses/DatasCalculator.js";

export default {
    setup() {
        
        //Computed variables
        const datasCalculator = new DatasCalculator();
        
        //Date used to get datas from a week ago
        let weekTimestamp = 604800000;
        let weekAgo = Date.now();
        weekAgo -= weekTimestamp;
        weekAgo = new Date(weekAgo);

        //Vuex
        const store = useStore();
        let worldLiveDatas = computed(() => store.state.worldLiveDatas);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas);
        let weeklyEvolutionDatas = computed(() => store.state.weeklyEvolutionDatas);
        let areworldLiveDatasReceived = computed(() => {

            if (typeof worldLiveDatas.value !== "undefined" && typeof worldLiveDatas.value.Global !== "undefined" && typeof worldLiveDatas.value.France !== "undefined") {
                return true;
            } else {
                return false;
            }

        });
        let areworldEvolutionDatasReceived = computed(() => {

            if (typeof worldLocationEvolutionDatas.value.datas !== "undefined" && typeof worldLocationEvolutionDatas.value.datas.Global !== "undefined" && typeof worldLocationEvolutionDatas.value.datas.France !== "undefined") {
                return true;
            } else {
                return false;
            }

        });
        let areWeeklyEvolutionDatasReceived = computed(() => {

            if (typeof weeklyEvolutionDatas.value !== "undefined") {
                return true;
            } else {
                return false;
            }

        });

        //France Datas
        
        let franceFormattedWeeklyConfirmedPercentage = computed(() => {

            let franceFormattedWeeklyConfirmedPercentage = {};

            if (areworldLiveDatasReceived.value === true && areworldEvolutionDatasReceived.value === true) {

                let weeklyNewConfirmed = worldLiveDatas.value.France.All.confirmed - worldLocationEvolutionDatas.value.datas.France.confirmed[weekAgo.getFullYear() + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(weekAgo.getMonth() + 1) + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(weekAgo.getDate())];
                franceFormattedWeeklyConfirmedPercentage.rawEvolution = datasCalculator.numberFunctionalities.formatNumber(weeklyNewConfirmed);

                let weeklyNewConfirmedPerc = datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(weeklyNewConfirmed, worldLiveDatas.value.France.All.confirmed);
                franceFormattedWeeklyConfirmedPercentage.percentage = datasCalculator.numberFunctionalities.roundFloatNumber(weeklyNewConfirmedPerc) + "%";

                weeklyNewConfirmedPerc >= 0 ? franceFormattedWeeklyConfirmedPercentage.trend = "hausse" : franceFormattedWeeklyConfirmedPercentage.trend = "baisse";
                return franceFormattedWeeklyConfirmedPercentage;

            } else {
                return 0;
            }

        });        
        let franceFormattedConfirmed = computed(() => {
            
            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.confirmed);
            } else {
                return 0;
            }

        });
        let franceInfectionRate = computed(() => {
            
            if (areworldLiveDatasReceived.value === true) {
                let infectionRate = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.confirmed / worldLiveDatas.value.France.All.population));
                return infectionRate + "%";
            } else {
                return 0;
            }

        });
        let franceFormattedWeeklyHospitalizationsPercentage = computed(() => {

            let franceFormattedWeeklyHospitalizationsPercentage = {};

            if (areWeeklyEvolutionDatasReceived.value === true && areworldLiveDatasReceived.value === true) {

                let weeklyNewHospitalizations = worldLiveDatas.value.France.All.hospitalizations - weeklyEvolutionDatas.value.hospitalises;
                weeklyNewHospitalizations <= 0 ? franceFormattedWeeklyHospitalizationsPercentage.rawEvolution = weeklyNewHospitalizations : franceFormattedWeeklyHospitalizationsPercentage.rawEvolution = "+" + weeklyNewHospitalizations;

                let weeklyNewHospitalizationsPerc = datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(weeklyNewHospitalizations, weeklyEvolutionDatas.value.hospitalises);
                franceFormattedWeeklyHospitalizationsPercentage.percentage = Math.abs(datasCalculator.numberFunctionalities.roundFloatNumber(weeklyNewHospitalizationsPerc)) + "%";

                weeklyNewHospitalizationsPerc >= 0 ? franceFormattedWeeklyHospitalizationsPercentage.trend = "hausse" : franceFormattedWeeklyHospitalizationsPercentage.trend = "baisse";

                return franceFormattedWeeklyHospitalizationsPercentage;

            } else {
                return 0;
            }
        });
        let franceFormattedHospitalizations = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.hospitalizations);
            } else {
                return 0;
            }

        });
        let franceFormattedWeeklyIntensiveCarePercentage = computed(() => {

            let franceFormattedWeeklyIntensiveCarePercentage = {};

            if (areWeeklyEvolutionDatasReceived.value === true && areworldLiveDatasReceived.value === true) {

                let weeklyNewIntensiveCare = worldLiveDatas.value.France.All.intensive_care - weeklyEvolutionDatas.value.reanimation;
                weeklyNewIntensiveCare <= 0 ? franceFormattedWeeklyIntensiveCarePercentage.rawEvolution = weeklyNewIntensiveCare : franceFormattedWeeklyIntensiveCarePercentage.rawEvolution = "+" + weeklyNewIntensiveCare;
                let weeklyNewIntensiveCarePerc = datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(weeklyNewIntensiveCare, weeklyEvolutionDatas.value.reanimation);
                franceFormattedWeeklyIntensiveCarePercentage.percentage = Math.abs(datasCalculator.numberFunctionalities.roundFloatNumber(weeklyNewIntensiveCarePerc)) + "%";

                weeklyNewIntensiveCarePerc >= 0 ? franceFormattedWeeklyIntensiveCarePercentage.trend = "hausse" : franceFormattedWeeklyIntensiveCarePercentage.trend = "baisse";
                
                return franceFormattedWeeklyIntensiveCarePercentage;

            } else {
                return 0;
            }

        });
        let franceFormattedIntensiveCare = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.intensive_care);
            } else {
                return 0;
            }

        });
        let franceFormattedDeaths = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.deaths);
            } else {
                return 0;
            }

        });
        let franceVaccinationCoverageFirstShot = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                let vaccinationCoverage = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.people_partially_vaccinated / worldLiveDatas.value.France.All.population));
                return vaccinationCoverage + "%";
            } else {
                return 0;
            }

        });
        let franceFormattedVaccFirstShot = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.people_partially_vaccinated);
            } else {
                return 0;
            }

        });
        let franceVaccinationCoverageSecShot = computed(() => {
                
            if (areworldLiveDatasReceived.value === true) {
                let vaccinationCoverage = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.people_vaccinated / worldLiveDatas.value.France.All.population));
                return vaccinationCoverage + "%";
            } else {
                return 0;
            }

        });
        let franceFormattedVaccSecShot = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.people_vaccinated);
            } else {
                return 0;
            }

        });

        //World datas

        let worldFormattedDeaths = computed(() => {

            if (areworldLiveDatasReceived.value === true) {

                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.deaths);

            } else {
                return 0;
            }

        });
        let worldMortalityRate = computed(() => {

            if (areworldLiveDatasReceived.value === true) {

                let data = datasCalculator.numberFunctionalities.roundFloatNumber(datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(worldLiveDatas.value.Global.All.deaths, worldLiveDatas.value.Global.All.confirmed));
                return data + "%";

            } else {
                return 0;
            }

        });
        let mostBereavedCountries = computed(() => {

            let mostBereavedCountries = {};
            mostBereavedCountries.list = [];

            const excludedPlaces = ["Diamond Princess", "Global", "MS Zaandam", "Summer Olympics 2020"];

            for (const keyValue of Object.entries(worldLiveDatas.value)) {

                if (excludedPlaces.includes(keyValue[0]) === false) {

                    if (mostBereavedCountries.list.length < 5) {
                        mostBereavedCountries.list.push({countryName: keyValue[1].All.country, deaths: keyValue[1].All.deaths});
                    } else {

                        for (let i = 0; i < mostBereavedCountries.list.length; i++) {

                            if (keyValue[1].All.deaths > mostBereavedCountries.list[i].deaths) {
                                mostBereavedCountries.list.splice(i, 0, {countryName: keyValue[1].All.country, deaths: keyValue[1].All.deaths});
                                mostBereavedCountries.list.pop();
                                break;
                            }

                        }

                    }

                }

            }

            mostBereavedCountries.worldShare = {};
            let confirmedWorldShare, deathsWorldShare;

            for (let i = 0; i < mostBereavedCountries.list.length; i++) {

                i === 0 ? confirmedWorldShare = worldLiveDatas.value[mostBereavedCountries.list[i].countryName]["All"]["confirmed"] : confirmedWorldShare += worldLiveDatas.value[mostBereavedCountries.list[i].countryName]["All"]["confirmed"];
                i === 0 ? deathsWorldShare = worldLiveDatas.value[mostBereavedCountries.list[i].countryName]["All"]["deaths"] : deathsWorldShare += worldLiveDatas.value[mostBereavedCountries.list[i].countryName]["All"]["deaths"];

                mostBereavedCountries.list[i].countryName = worldLiveDatas.value[mostBereavedCountries.list[i].countryName]["All"]["fr_name"];

            }

            mostBereavedCountries.worldShare.confirmed = datasCalculator.numberFunctionalities.roundFloatNumber(datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(confirmedWorldShare, worldLiveDatas.value.Global.All.confirmed)) + "%";
            mostBereavedCountries.worldShare.deaths = datasCalculator.numberFunctionalities.roundFloatNumber(datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(deathsWorldShare, worldLiveDatas.value.Global.All.deaths)) + "%";

            return mostBereavedCountries;

        });
        let worldFormattedConfirmed = computed(() => {

            if (areworldLiveDatasReceived.value === true) {
                return datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.confirmed);
            } else {
                return null;
            }
            
        });
        let worldConfirmedWeeklyEvolution = computed(() => {

            let worldConfirmedWeeklyEvolution = {};

            if (areworldLiveDatasReceived.value === true && areworldEvolutionDatasReceived.value === true) {

                let weeklyNewConfirmed = worldLiveDatas.value.Global.All.confirmed - worldLocationEvolutionDatas.value.datas.Global.confirmed[weekAgo.getFullYear() + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(weekAgo.getMonth() + 1) + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(weekAgo.getDate())];
                worldConfirmedWeeklyEvolution.rawEvolution = datasCalculator.numberFunctionalities.formatNumber(weeklyNewConfirmed);

                let weeklyNewConfirmedPerc = datasCalculator.numberFunctionalities.getPercentageOfPartFromTotal(weeklyNewConfirmed, worldLiveDatas.value.Global.All.confirmed);
                worldConfirmedWeeklyEvolution.percentage = datasCalculator.numberFunctionalities.roundFloatNumber(weeklyNewConfirmedPerc) + "%";

                weeklyNewConfirmedPerc >= 0 ? worldConfirmedWeeklyEvolution.trend = "hausse" : worldConfirmedWeeklyEvolution.trend = "baisse";
                return worldConfirmedWeeklyEvolution;

            } else {
                return 0;
            }

        });
        let worldVaccines = computed(() => {

            return {
                firstShot: datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.people_partially_vaccinated),
                secondShot: datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.people_vaccinated),
                administered: datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.administered)
            }

        });

        return {
            worldLiveDatas,
            franceInfectionRate,
            franceVaccinationCoverageFirstShot,
            franceVaccinationCoverageSecShot,
            worldMortalityRate,
            franceFormattedConfirmed,
            franceFormattedHospitalizations,
            franceFormattedIntensiveCare,
            franceFormattedDeaths,
            franceFormattedVaccFirstShot,
            franceFormattedVaccSecShot,
            worldFormattedConfirmed,
            worldFormattedDeaths,
            franceFormattedWeeklyHospitalizationsPercentage,
            franceFormattedWeeklyIntensiveCarePercentage,
            franceFormattedWeeklyConfirmedPercentage,
            worldConfirmedWeeklyEvolution,
            worldVaccines,
            mostBereavedCountries
        }

    },
}
</script>

<style lang="scss">
.locationSummary {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    @media (min-width: 1024px) {
        min-height: 34vw;
    }
    @media (min-width: 1440px) {
        padding: 0 3rem;
    }
    &--france {
        background-color: $primary;
    }
    &--world {
        background-color: $secondary;
        color: $white;
    }
    &__container {
        display: flex;
        justify-content: center;
        position: relative;
        @media (min-width: 1232px) {
            right: -1.5%;
        }
    }
    &__locationContainer {
        display: none;
        @media (min-width: 1232px) {
            display: block;
            writing-mode: vertical-rl;
            text-orientation: upright;
            position: absolute;
            height: 100%;
            margin: 0;
            left: 0;
        }
        
    }
    &__locationPara {
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__locationLetter {
        display: block;
    }
    &__grid {
        @media (min-width: 1232px) {
            display: grid;
            position: relative;
            right: 20%;
            grid-template-columns: 43% 70%;
            width: 94%;
        }
        &--france {
            background: url("../../assets/img/pandemySummary/triumphalArcFullTest.png") no-repeat center;
            background-size: contain;
            @media (min-width: 1232px) {
                background: none;
            }
        }
        &--world {
            background: url("../../assets/img/pandemySummary/worldGlobeFullTest.png") no-repeat center;
            background-size: contain;
            @media (min-width: 1232px) {
                background: none;
            }
        }
    }
    &__imgContainer {
        overflow: hidden;
    }
    &__img {
        display: none;
        @media (min-width: 1232px) {
            display: block;
        }
        &--france {
            background: url("../../assets/img/pandemySummary/triumphalArch.png") no-repeat right;
            background-size: contain;
        }
        &--world {
            background: url("../../assets/img/pandemySummary/worldGlobeWhite.png") no-repeat right;
            background-size: contain;
        }
    }
    &__contentContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        @media (min-width: 1232px) {
            margin-left: 3%;
        }
        @media (min-width: 1232px) {
            display: block;
        }
        p {
            margin-bottom: 1rem;
            &:last-child {
                margin-bottom: -0.8%;
            }
        }
    }
    &__header {
        text-align: center;
        margin: 0;
        margin-bottom: 1.5rem;
        margin-top: -1.8%;
        font-size: clamp(1.5rem, 2vw, 3.4rem);
        @media (min-width: 1232px) {
            text-align: left;
        }
    }
    &__content {
        margin: 0;
        line-height: 1.5;
        text-align: justify;
    }
    &__highlightedTitleData {
        color: #EB4647;
        font-size: 1.5em;
    }
    &__highlightedData {
        color: #e46061;
        font-weight: bold;
    }
}
</style>