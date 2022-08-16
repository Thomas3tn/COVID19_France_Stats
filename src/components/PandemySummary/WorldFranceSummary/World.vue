<template>

    <location-summary :spelling="['M', 'O', 'N', 'D', 'E']">

        <template v-slot:header>
            À ce jour, <span class="locationSummary__titleHighlight">{{ worldContent.deaths.rawLive }}</span> personnes sont mortes du COVID-19 autour du globe
        </template>

        <template v-slot:content>
            <p class="locationSummary__contentPara">Ce qui correspond à un taux de mortalité de {{ worldContent.deaths.mortalityRate }}, en comparaison le taux mortalité de la grippe saisonnière s'élève à 2% (New York Times). À partir de cet indicateur les pays les plus endeuillés sont: <template v-for="(country, index) in worldContent.mostBereavedCountries.list" :key="country"><template v-if="(index + 1) === worldContent.mostBereavedCountries.list.length"> et {{ country }}</template><template v-else>{{ country }}, </template></template> et comptabilisent à eux seuls {{ worldContent.mostBereavedCountries.deathsWorldShare }} % des décès et {{ worldContent.mostBereavedCountries.confWorldShare }} % des cas confirmés.</p>
            <p class="locationSummary__contentPara">Il y a {{ worldContent.confirmed.rawLive }} cas confirmés de COVID dans le monde aujourd'hui et {{ worldContent.confirmed.weeklyRaw }} cas supplémentaires depuis la semaine dernière, soit une hausse de {{ worldContent.confirmed.weeklyPerc }} %.</p>
            <p class="location__Summary__contentPara locationSummary__contentPara--last">Pour finir, le monde a administré {{ worldContent.vaccination.administered }} doses de vaccins, rendant {{ worldContent.vaccination.secShot }} personnes pleinement vaccinées tandis que {{ worldContent.vaccination.firstShot }} personnes attendent leur deuxième dose.</p>
        </template>

    </location-summary>

</template>

<script>
import { computed, reactive, inject } from "vue";
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
        const LOC_TYPES = inject("LOCATION_TYPES");
        const weekAgoTimestamp = store.state.weekAgoTimestamp;

        const world = store.getters["APIsDatas/find"]({keysValues: [{key: "type", value: LOC_TYPES.WORLD}]}).data;

        const worldContent = reactive({
            deaths: computed(() => {

                return {
                    rawLive: NumberCustomMethods.formatNumber(world.live.deaths),
                    mortalityRate: NumberCustomMethods.roundFloatNumber(NumberCustomMethods.getPercentageOfPartFromTotal(world.live.deaths, world.live.confirmed)),
                }

            }),
            mostBereavedCountries: computed(() => {

                const mostBereavedCountries = {
                    list: [],
                    confWorldShare: 0,
                    deathsWorldShare: 0
                };
                const countries = [];
                let lowestDeaths = {
                    name: "",
                    deaths: 0
                };

                store.getters["APIsDatas/forEachBreadthFirst"](location => {

                    location = location.data;

                    if (location.type === LOC_TYPES.COUNTRY) {

                        if (location.live.deaths > lowestDeaths.deaths) {

                            if (countries.length > 5) {
                                countries.splice(countries.findIndex(country => country.name === lowestDeaths.name), 1);
                            }

                            countries.push({
                                name: location.infos.frName, 
                                deaths: location.live.deaths, 
                                confirmed: location.live.confirmed
                            });

                            if (countries.length > 5) {

                                lowestDeaths = {};
                                countries.forEach((country, index) => {

                                    if (index === 0) {
                                        lowestDeaths = country;
                                    } else {

                                        if (country.deaths < lowestDeaths.deaths) {
                                            lowestDeaths = country;
                                        }

                                    }

                                });

                            }

                        }

                    }

                });

                countries.forEach(country => {

                    mostBereavedCountries.confWorldShare += country.confirmed;
                    mostBereavedCountries.deathsWorldShare += country.deaths;

                });

                mostBereavedCountries.confWorldShare = NumberCustomMethods.roundFloatNumber(NumberCustomMethods.getPercentageOfPartFromTotal(mostBereavedCountries.confWorldShare, world.live.confirmed));
                mostBereavedCountries.deathsWorldShare = NumberCustomMethods.roundFloatNumber(NumberCustomMethods.getPercentageOfPartFromTotal(mostBereavedCountries.deathsWorldShare, world.live.deaths));
                countries.forEach(country => mostBereavedCountries.list.push(country.name));

                return mostBereavedCountries;

            }),
            confirmed: computed(() => {

                const weeklyEvo = props.computeWeeklyEvo({location: world, status: "confirmed", weekAgoTimestamp, types: ["perc", "raw"]});

                return {
                    rawLive: NumberCustomMethods.formatNumber(world.live.confirmed),
                    weeklyRaw: NumberCustomMethods.formatNumber(weeklyEvo.raw),
                    weeklyPerc: `${NumberCustomMethods.roundFloatNumber(weeklyEvo.perc)}%`
                }

            }),
            vaccination: computed(() => {

                return {
                    administered: NumberCustomMethods.formatNumber(world.live.administredVaccines),
                    firstShot: NumberCustomMethods.formatNumber(world.live.partiallyVaccinated),
                    secShot: NumberCustomMethods.formatNumber(world.live.vaccinated)
                }

            })
        });

        return {
            worldContent
        }

    },
    components: {
        LocationSummary
    }
}
</script>