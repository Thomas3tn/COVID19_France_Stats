<template>
    <section class="worldFranceSummary" v-if="areDatasLoaded === true">
        <article class="locationSummary locationSummary--france">
            <div class="locationSummary__container">
                <div class="locationSummary__locationContainer">
                    <p class="locationSummary__locationPara"><span class="locationSummary__locationLetter">F</span><span class="locationSummary__locationLetter">R</span><span class="locationSummary__locationLetter">A</span><span class="locationSummary__locationLetter">N</span><span class="locationSummary__locationLetter">C</span><span class="locationSummary__locationLetter">E</span></p>
                </div>
                <div class="locationSummary__grid locationSummary__grid--france">
                    <div class="locationSummary__img locationSummary__img--france">
                    </div>
                    <div class="locationSummary__contentContainer">
                        <h2 class="locationSummary__header">La France a enregistré <span class="locationSummary__highlightedData">{{ franceFormattedConfirmed }}</span> cas confirmés de coronavirus</h2>
                        <p class="locationSummary__content">Par conséquent {{ franceInfectionRate }} de la population est ou a été infectée par le COVID-19. De même {{ franceFormattedHospitalizations }} personnes sont actuellement hospitalisés et {{ franceFormattedIntensiveCare }} sont en réanimation tandis que {{ franceFormattedDeaths }} personnes sont décèdées des suites du virus. Enfin la couverture vaccinale progresse puisque {{ franceVaccinationCoverageFirstShot }} de la population ({{ franceFormattedVaccFirstShot }}) a reçu une première dose et {{ franceVaccinationCoverageSecShot }} ({{ franceFormattedVaccSecShot }}) une seconde.</p>
                    </div>
                </div>
            </div>
        </article>
        <article class="locationSummary locationSummary--world">
            <div class="locationSummary__container">
                <div class="locationSummary__locationContainer">
                    <p class="locationSummary__locationPara"><span class="locationSummary__locationLetter">M</span><span class="locationSummary__locationLetter">O</span><span class="locationSummary__locationLetter">N</span><span class="locationSummary__locationLetter">D</span><span class="locationSummary__locationLetter">E</span></p>
                </div>
                <div class="locationSummary__grid locationSummary__grid--world">
                    <div class="locationSummary__img locationSummary__img--world">
                    </div>
                    <div class="locationSummary__contentContainer">
                        <h2 class="locationSummary__header">Il y a <span class="locationSummary__highlightedData">{{ worldFormattedConfirmed }}</span> cas confirmés de COVID-19 à travers le monde</h2>
                        <p class="locationSummary__content">Depuis la semaine dernière c'est une {{ worldConfirmedCasesTrend }} de {{ worldConfirmedCasesDifference }} cas, soit {{ worldWeekTotalConfirmedCasesPercentage }} des cas totaux.</p>
                        <p class="locationSummary__content">Depuis le début de la pandémie, {{ worldFormattedDeaths }} personnes sont mortes du COVID-19, faisant s'élevé le taux de mortalité à {{ worldMortalityRate }} alors qu'en comparaison le taux de mortalité de la grippe saisonnière est de 0.1% aux U.S (New York Times).</p>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
//Vue elements
import { computed, watch } from "vue";
import { useStore } from "vuex";

//JS File
import DatasCalculator from "../../assets/JSClasses/DatasCalculator.js";

export default {
    setup() {

        //Computed variables
        const datasCalculator = new DatasCalculator();
        
        //Vuex
        const store = useStore();
        let worldLiveDatas = computed(() => store.state.worldLiveDatas.datas);
        console.log(worldLiveDatas.value);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas.datas.Global);
        let areworldLiveDatasReceived = computed(() => store.state.areWorldLiveDatasReceived);
        let areworldEvolutionDatasReceived = computed(() => store.state.areWorldEvolutionDatasRequestsReceived.confirmed);
        let areDatasLoaded = computed(() => {

            console.log(areworldLiveDatasReceived.value, areworldEvolutionDatasReceived.value);
            console.log(areworldEvolutionDatasReceived);

            if (areworldLiveDatasReceived.value === true && areworldEvolutionDatasReceived.value === true) {
                return true;
            } else {
                return false;
            }

        });

        let worldFormattedConfirmed = 0;

        let worldConfirmedCasesTrend = 0;
        let worldConfirmedCasesDifference = 0;
        let worldWeekTotalConfirmedCasesPercentage = 0;
        let worldFormattedDeaths = 0;
        let worldMortalityRate = 0;

        let franceFormattedConfirmed = 0;
        let franceFormattedHospitalizations = 0;
        let franceFormattedIntensiveCare = 0;
        let franceFormattedDeaths = 0;
        let franceInfectionRate = 0;
        let franceVaccinationCoverageFirstShot = 0;
        let franceFormattedVaccFirstShot = 0;
        let franceVaccinationCoverageSecShot = 0;
        let franceFormattedVaccSecShot = 0;

        watch(() => areDatasLoaded.value, newValue => {

            console.log(newValue);

            if (newValue === true) {

                worldFormattedConfirmed = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.confirmed));

                worldConfirmedCasesDifference = computed(() => {

                    let mostRecentDayData;
                    let weekAgoData;
                    let i = 1;

                    for (const keyValue of Object.entries(worldLocationEvolutionDatas.value.confirmed)) {

                        if (i === 1) {
                            mostRecentDayData = keyValue[1];
                        } else if (i === 7) {
                            weekAgoData = keyValue[1];
                            break;
                        }

                        i++;

                    }

                    return datasCalculator.numberFunctionalities.formatNumber(mostRecentDayData - weekAgoData);

                });
                worldConfirmedCasesTrend = computed(() => {

                    if (worldConfirmedCasesDifference.value > 0) {
                        return "augmentation";
                    } else if (worldConfirmedCasesDifference.value < 0) {
                        return "diminution"
                    } else {
                        return "erreur";
                    }

                });
                worldWeekTotalConfirmedCasesPercentage = computed(() => {

                    let data = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldConfirmedCasesDifference.value / worldLiveDatas.value.Global.All.confirmed));
                    return data + "%";

                });
                worldFormattedDeaths = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.Global.All.deaths));
                worldMortalityRate = computed(() => {

                    let data = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.Global.All.deaths / worldLiveDatas.value.Global.All.population));
                    return data + "%";

                });

                franceFormattedConfirmed = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.confirmed));
                franceFormattedHospitalizations = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.hospitalizations));
                franceFormattedIntensiveCare = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.intensive_care));
                franceFormattedDeaths = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.deaths));
                franceInfectionRate = computed(() => {
                    
                    let infectionRate = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.confirmed / worldLiveDatas.value.France.All.population));
                    return infectionRate + "%";

                });
                franceVaccinationCoverageFirstShot = computed(() => {

                    let vaccinationCoverage = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.people_partially_vaccinated / worldLiveDatas.value.France.All.population));
                    return vaccinationCoverage + "%";

                });
                franceFormattedVaccFirstShot = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.people_partially_vaccinated));
                franceVaccinationCoverageSecShot = computed(() => {
                
                    let vaccinationCoverage = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.people_vaccinated / worldLiveDatas.value.France.All.population));
                    return vaccinationCoverage + "%";

                });
                franceFormattedVaccSecShot = computed(() => datasCalculator.numberFunctionalities.formatNumber(worldLiveDatas.value.France.All.people_vaccinated));

            }

        }, {immediate: true, deep: true});
    
        return {
            worldLiveDatas,
            franceInfectionRate,
            franceVaccinationCoverageFirstShot,
            franceVaccinationCoverageSecShot,
            worldConfirmedCasesDifference,
            worldConfirmedCasesTrend,
            worldWeekTotalConfirmedCasesPercentage,
            worldMortalityRate,
            franceFormattedConfirmed,
            franceFormattedHospitalizations,
            franceFormattedIntensiveCare,
            franceFormattedDeaths,
            franceFormattedVaccFirstShot,
            franceFormattedVaccSecShot,
            worldFormattedConfirmed,
            worldFormattedDeaths,
            areDatasLoaded,
        }

    },
}
</script>

<style lang="scss">
html {
    font-family: sans-serif;
}

.locationSummary {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    @media (min-width: 1024px) {
        min-height: 400px;
        padding: 0 3rem;
    }
    &--france {
        background-color: #fbfcfd;
    }
    &--world {
        background-color: #457b9d;
        color: white;
    }
    &__container {
        display: flex;
        justify-content: center;
        position: relative;
        @media (min-width: 1024px) {
            width: 90%;
        }
    }
    &__locationContainer {
        display: none;
        @media (min-width: 1024px) {
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
        @media (min-width: 768px) {
            display: grid;
            position: relative;
            right: 12%;
            grid-template-columns: 43% 70%;
        }
        @media (min-width: 1024px) {
            right: 20%;
            width: 94%;
        }
        &--france {
            background: url("../../assets/img/pandemySummary/triumphalArcFullTest.png") no-repeat center;
            background-size: contain;
            @media (min-width: 768px) {
                background: none;
            }
        }
        &--world {
            background: url("../../assets/img/pandemySummary/worldGlobeFullTest.png") no-repeat center;
            background-size: contain;
            @media (min-width: 768px) {
                background: none;
            }
        }
    }
    &__imgContainer {
        overflow: hidden;
    }
    &__img {
        display: none;
        @media (min-width: 768px) {
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
        @media (min-width: 768px) {
            margin-left: 5%;
        }
    }
    &__header {
        margin: 0;
        margin-bottom: 1.5rem;
    }
    &__content {
        margin: 0;
        line-height: 1.5;
        text-align: justify;
    }
    &__highlightedData {
        color: #EB4647;
    }
}
</style>