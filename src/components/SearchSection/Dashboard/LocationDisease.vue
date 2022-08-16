<template>

    <div class="locationDisease">
        
        <warning 
            v-if="isCountryControversial"
            :alertType="'CONTROVERSIAL_SOURCES'"
        >
            <template v-slot:content>
                Certaines sources affirment que les données à propos du pays sont en réalité sous-estimées et 
                que les chiffres réels pourraient être en réalité plus élevés. Les chiffres présentées ci-dessous 
                sont ceux communiqués par le gouvernement.
            </template>
        </warning>

        <warning 
            v-if="areAdditionalRequestsMissing"
            :alertType="'INCOMPLETE_SOURCES'"
        >
            <template v-slot:content>
                Une partie plus ou moins importante des données présentés ci-dessous sont incomplètes du à une indisponiblités des sources.
            </template>
        </warning>

        <component :is="currentComponent" v-bind="props"></component>

    </div>

</template>

<script>
import Warning from "./LocationDisease/Warning.vue";
import CountryPanels from "./LocationDisease/Country.vue";
import DepartementPanels from "./LocationDisease/Departement.vue";
import ContinentPanels from "./LocationDisease/Continent.vue";
import { computed, inject } from "vue";
import { useStore } from "vuex";

export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const store = useStore();

        const LOC_TYPES = inject("LOCATION_TYPES");
        const DISEASE_PANELS = {
            [LOC_TYPES.CONTINENT]: ContinentPanels,
            [LOC_TYPES.COUNTRY]: CountryPanels,
            [LOC_TYPES.DEPARTEMENT]: DepartementPanels
        };

        const CONTROVERSIAL_COUNTRIES = ["CN"];

        const isCountryControversial = computed(() => CONTROVERSIAL_COUNTRIES.includes(props.location.infos.abbreviation));
        //Should change APIRequest objects location properties
        //to be arrays containing all location types the request handles
        //Should also contain list of specific countries that this requests handles
        //ex: France live datas API
        const areAdditionalRequestsMissing = computed(() => {

            let areAdditionalRequestsMissing = false;
            store.getters["APIsStatus/forEachBreadthFirst"](APIRequest => {

                const isAdditionalReq = ["root", "live"].includes(APIRequest.data.type) === false;
                const isCurrLocReq = APIRequest.data.location === props.location.type;

                if (isAdditionalReq && isCurrLocReq) {

                    if (APIRequest.data.status === false) {
                        areAdditionalRequestsMissing = true;
                    }

                }

            });

            return areAdditionalRequestsMissing;

        });

        return {
            isCountryControversial,
            areAdditionalRequestsMissing,
            currentComponent: DISEASE_PANELS[props.location.type],
            props: {
                [props.location.type]: props.location
            }
        }

    },
    components: {
        Warning,
        ContinentPanels,
        CountryPanels,
        DepartementPanels,
    }
}
</script>

<style lang="scss">
.locationDisease {
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    flex: 3;
    width: 100%;
    > div {
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
    &__horizontalDisplay {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-direction: column;
        @media (min-width: 1024px) {
            min-height: clamp(23rem, 33vw, 45rem);
            flex-direction: row;
            > div {
                flex: 1;
            }
            > div:first-child {
                margin-right: 1.5vw;
            }
            > div:last-child {
                margin-left: 1.5vw;
            }
        }
    }
}
</style>