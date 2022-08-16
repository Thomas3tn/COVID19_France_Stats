<template>

    <dropdown
        :isOpenByDefault="true" 
        :activeClassName="'dashboardSelection'"
    >
        <template v-slot:header>

            <dropdown-header
                :title="'Aperçu'"
                :icon="faCompass"
            >
            </dropdown-header>

        </template>
        <template v-slot:content>

            <component :is="currentComponent" v-bind="computedProps"></component>

        </template>
    </dropdown>

</template>

<script>
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { inject, computed } from "vue";
import NumberCustomMethods from "../../../../assets/JSClasses/CustomMethods/Number.js";
import Dropdown from "../../../Common/Dropdown.vue";
import DropdownHeader from "./Common/DropdownHeader.vue";
import ContinentOverview from "./OverviewDropdown/Continent.vue";
import CountryOverview from "./OverviewDropdown/Country.vue";
import DepartementOverview from "./OverviewDropdown/Departement.vue";

export default {
    props: {
        locationInfos: {
            type: Object,
            required: true
        },
        locationType: {
            type: String, 
            required: true
        }
    },
    setup(props) {

        const LOC_TYPES = inject("LOCATION_TYPES");

        const components = {
            [LOC_TYPES.CONTINENT]: ContinentOverview,
            [LOC_TYPES.COUNTRY]: CountryOverview,
            [LOC_TYPES.DEPARTEMENT]: DepartementOverview
        }

        const computedProps = {
            locationInfos: props.locationInfos,
            locationType: props.locationType,
            commonFormattedKeys: {
                sqKmArea: computed(() => NumberCustomMethods.formatNumber(props.locationInfos.sqKmArea)),
                population: computed(() => NumberCustomMethods.formatNumber(props.locationInfos.population)),
            }
        }

        return {
            faCompass,
            currentComponent: computed(() => components[props.locationType]),
            computedProps
        }

    },
    components: {
        Dropdown,
        DropdownHeader,
        ContinentOverview,
        CountryOverview,
        DepartementOverview
    }
}
</script>