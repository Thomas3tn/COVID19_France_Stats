<template>
    
    <div class="container">

        <font-awesome-icon :icon="assets.logo" class="logo" aria-hidden="true"/>

        <div class="inputPart">

            <label :for="`search-form-${locationType}-input`" class="title">{{ assets.frName }}</label>

            <template v-if="locationType === countryType">

                <template v-for="(contDatas, contName) in names" :key="contName">
                    <template v-if="selectedContinent === contName">
                        <select-input 
                            :datas="contDatas" 
                            :title="assets.frName"
                            :HTMLFor="`search-form-${locationType}-input`" 
                            :isRequired="isRequired"
                            class="input"
                            :locationType="locationType"
                        >
                        </select-input>
                    </template>
                </template>

            </template>

            <select-input 
                v-else 
                :datas="names" 
                :title="assets.frName" 
                :HTMLFor="`search-form-${locationType}-input`"
                :isRequired="isRequired"
                class="input"
                :locationType="locationType"
            >
            </select-input>
        </div>

    </div>

</template>

<script>
import { useStore } from "vuex";
import { computed, inject } from "vue";
import SelectInput from "./SelectionInput/SelectInput.vue";
import Continent from "../../../assets/JSClasses/Models/Location/Locations/Continent.js";
import Country from "../../../assets/JSClasses/Models/Location/Locations/Country.js";
import Departement from "../../../assets/JSClasses/Models/Location/Locations/Departement.js";

export default {
    props: {
        names: {
            type: [Array, Object],
            required: true
        },
        locationType: {
            type: String,
            required: true,
            validator(value) {
                return [Continent.type, Country.type, Departement.type].includes(value);
            }
        },
        selectedContinent: {
            type: String,
            required: false,
        },
        isRequired: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props) {

        const store = useStore();
        console.log(store)
        const dashboardAssets = computed(() => store.state.DashboardAssets);
        const LOC_TYPES = inject("LOCATION_TYPES");

        const INPUTS_TITLES = {
            [LOC_TYPES.CONTINENT]: "Continent",
            [LOC_TYPES.COUNTRY]: "Pays",
            [LOC_TYPES.DEPARTEMENT]: "Département"
        }

        const INPUTS_LOGOS = {
            [LOC_TYPES.CONTINENT]: dashboardAssets.value.ICONS.LOCATION.EUROPE,
            [LOC_TYPES.COUNTRY]: dashboardAssets.value.ICONS.LOCATION.COUNTRY,
            [LOC_TYPES.DEPARTEMENT]: dashboardAssets.value.ICONS.LOCATION.DEPARTEMENT
        }

        const assets = computed(() => ({
            frName: INPUTS_TITLES[props.locationType], 
            logo: INPUTS_LOGOS[props.locationType]
        }));

        return {
            assets,
            countryType: LOC_TYPES.COUNTRY
        }

    },
    components: {
        SelectInput
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    margin: 0.4rem auto;
    width: 90%;
    @media (min-width: 768px) {
        width: auto;
        margin-left: 1.5rem;
    }
}
.logo {
    display: none;
    font-size: clamp(1.5rem, 2vw, 3rem);
    margin-right: 1rem;
    @media (min-width: 768px) {
        display: block;
    }
}
.inputPart {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 768px) {
        width: auto;
    }
}
.title {
    margin: 0;
}
.input {
    border-radius: 3px;
    font-size: clamp(1rem, 1.1vw, 2.5rem);
    &:hover {
        cursor: pointer;
    }
}
</style>