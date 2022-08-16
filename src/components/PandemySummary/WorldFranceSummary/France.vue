<template>

    <location-summary :spelling="['F', 'R', 'A', 'N', 'C', 'E']">

        <template v-slot:header>
            La France enregistre une hausse hebdomadaire de <span class="locationSummary__titleHighlight">{{ franceContent.confirmed.weeklyPerc }}</span> des cas de COVID-19
        </template>

        <template v-slot:content>
            <p class="locationSummary__contentPara">C'est à dire {{ franceContent.confirmed.rawEvo }} cas supplémentaires, faisant s'élever le nombre total de contaminations à {{ franceContent.confirmed.rawLive }}, soit {{ franceContent.confirmed.infectionRate }} de la population et {{ franceContent.deaths.rawLive }} sont décèdés des suites du COVID-19.</p>
            <p v-if="franceContent.hospitalizations !== false && franceContent.intensiveCare !== false" class="locationSummary__contentPara">Sur la même période les hospitalisations sont en hausse de {{ franceContent.hospitalizations.weeklyPerc }} ({{ franceContent.hospitalizations.weeklyRaw }} hosp.) avec {{ franceContent.hospitalizations.rawLive }} personnes hospitalisées 
            tandis que les admissions en réanimations sont en hausse de {{ franceContent.intensiveCare.weeklyPerc }} ({{ franceContent.intensiveCare.weeklyRaw }} pers.), soit un total de {{ franceContent.intensiveCare.rawLive }} individus en réanimation.</p>
            <p class="locationSummary__contentPara locationSummary__contentPara--last">Enfin la couverture vaccinale progresse puisque {{ franceContent.vaccination.firstShotPerc }} de la population ({{ franceContent.vaccination.firstShotRaw }}) a reçu une première dose et {{ franceContent.vaccination.secShotPerc }} ({{ franceContent.vaccination.secShotRaw }}) une seconde.</p>
        </template>

    </location-summary>

</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import NumberCustomMethods from "../../../assets/JSClasses/CustomMethods/Number.js";
import LocationSummary from "./Template/LocationSummary.vue";

export default {
    props: {
        computeWeeklyEvo: {
            type: Function,
            required: true
        }
    },
    setup(props) {

        const store = useStore();
        const weekAgoTimestamp = store.state.weekAgoTimestamp;

        const france = store.getters["APIsDatas/find"]({keysValues: [{key: "name", value: "France"}]}).children.find(country => country.data.name === "France").data;

        const franceContent = reactive({
            confirmed: computed(() => {

                const weeklyEvo = props.computeWeeklyEvo({location: france, status: "confirmed", weekAgoTimestamp, types: ["perc", "raw"]});

                return {
                    weeklyPerc: `${NumberCustomMethods.roundFloatNumber(weeklyEvo.perc)}%`,
                    rawEvo: NumberCustomMethods.formatNumber(weeklyEvo.raw),
                    rawLive: NumberCustomMethods.formatNumber(france.live.confirmed),
                    infectionRate: `${NumberCustomMethods.roundFloatNumber(100 * (france.live.confirmed / france.infos.population))}%`
                }

            }),
            hospitalizations: computed(() => {

                const weeklyEvo = props.computeWeeklyEvo({location: france, status: "hospitalizations", weekAgoTimestamp, types: ["perc", "raw"]});

                return france.live.hospitalizations === null ? false : {
                    weeklyPerc: weeklyEvo.perc,
                    weeklyRaw: weeklyEvo.raw,
                    rawLive: NumberCustomMethods.formatNumber(france.live.hospitalizations)
                }

            }),
            intensiveCare: computed(() => {

                const weeklyEvo = props.computeWeeklyEvo({location: france, status: "intensiveCare", weekAgoTimestamp, types: ["raw", "perc"]});

                return france.live.intensiveCare === null ? false : {
                    weeklyPerc: weeklyEvo.perc,
                    weeklyRaw: weeklyEvo.raw,
                    rawLive: NumberCustomMethods.formatNumber(france.live.intensiveCare)
                }

            }),
            deaths: computed(() => {

                return {
                    rawLive: NumberCustomMethods.formatNumber(france.live.deaths)
                }

            }),
            vaccination: computed(() => {

                return {
                    firstShotPerc: `${NumberCustomMethods.roundFloatNumber(100 * (france.live.partiallyVaccinated / france.infos.population))}%`,
                    firstShotRaw: NumberCustomMethods.formatNumber(france.live.partiallyVaccinated),
                    secShotPerc: `${NumberCustomMethods.roundFloatNumber(100 * (france.live.vaccinated / france.infos.population))}%`,
                    secShotRaw: NumberCustomMethods.formatNumber(france.live.vaccinated)
                }

            })
        });

        return {
            franceContent,
        }

    },
    components: {
        LocationSummary
    }
}
</script>