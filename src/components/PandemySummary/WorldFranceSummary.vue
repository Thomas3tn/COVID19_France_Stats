<template>
    <section class="worldFranceSummary">
        <article class="locationSummary">
            <div class="locationSummary__container">
                <div class="locationSummary__locationContainer">
                    <p class="locationSummary__locationPara"><span class="locationSummary__locationLetter">F</span><span class="locationSummary__locationLetter">R</span><span class="locationSummary__locationLetter">A</span><span class="locationSummary__locationLetter">N</span><span class="locationSummary__locationLetter">C</span><span class="locationSummary__locationLetter">E</span></p>
                </div>
                <div class="locationSummary__grid locationSummary__grid--france">
                    <div class="locationSummary__img locationSummary__img--france">
                    </div>
                    <div class="locationSummary__contentContainer">
                        <h2 class="locationSummary__header">La France a enregistré <span class="locationSummary__highlightedData">{{ worldLiveDatas.France.All.confirmed }}</span> cas confirmés de coronavirus</h2>
                        <p class="locationSummary__content">Par conséquent {{ franceInfectionRate }} de la population est ou a été infectée par le COVID-19, toutefois ce chiffre ne concerne que les test en laboratoires, le chiffre réel est très probablement plus élevé. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                        <h2 class="locationSummary__header">Il y a <span class="locationSummary__highlightedData">{{ worldLiveDatas.Global.All.confirmed }}</span> cas confirmés de COVID-19 à travers le monde</h2>
                        <p class="locationSummary__content">Depuis la semaine dernière c'est une {{ worldConfirmedCasesTrend }} de {{ worldConfirmedCasesDifference }} cas, soit {{ worldWeekTotalConfirmedCasesPercentage }} des cas totaux.</p>
                        <p class="locationSummary__content">Depuis le début de la pandémie, {{ worldLiveDatas.Global.All.deaths }} personnes sont mortes du COVID-19, faisant s'élevé le taux de mortalité à {{ worldMortalityRate }} alors qu'en comparaison le taux de mortalité de la grippe saisonnière est de 0.1% aux U.S (New York Times).</p>
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
        
        //Vuex
        const store = useStore();
        let worldLiveDatas = computed(() => store.state.worldLiveDatas.datas);
        let worldLocationEvolutionDatas = computed(() => store.state.worldLocationEvolutionDatas.datas.Global);

        //Computed variables
        const datasCalculator = new DatasCalculator();
        let franceInfectionRate = computed(() => {
            
            let infectionRate = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.France.All.confirmed / worldLiveDatas.value.France.All.population));
            return infectionRate + "%";

        });
        let worldConfirmedCasesDifference = computed(() => {

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

            return mostRecentDayData - weekAgoData;

        });
        let worldConfirmedCasesTrend = computed(() => {

            if (worldConfirmedCasesDifference.value > 0) {
                return "augmentation";
            } else if (worldConfirmedCasesDifference.value < 0) {
                return "diminution"
            } else {
                return "erreur";
            }

        });
        let worldWeekTotalConfirmedCasesPercentage = computed(() => {

            let data = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldConfirmedCasesDifference.value / worldLiveDatas.value.Global.All.confirmed));
            return data + "%";

        });
        let worldMortalityRate = computed(() => {

            let data = datasCalculator.numberFunctionalities.roundFloatNumber(100 * (worldLiveDatas.value.Global.All.deaths / worldLiveDatas.value.Global.All.population));
            return data + "%";

        });
    
        return {
            worldLiveDatas,
            franceInfectionRate,
            worldConfirmedCasesDifference,
            worldConfirmedCasesTrend,
            worldWeekTotalConfirmedCasesPercentage,
            worldMortalityRate
        }

    },
}
</script>

<style lang="scss">
html {
    font-family: sans-serif;
}

.locationSummary {
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    &--world {
        background-color: #93B1A7;
        color: white;
    }
    @media (min-width: 1024px) {
        width: 100%;
        margin: 0;
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
            grid-template-columns: 43% 57%;
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