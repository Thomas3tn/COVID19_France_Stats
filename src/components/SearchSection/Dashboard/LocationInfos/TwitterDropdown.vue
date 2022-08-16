<template>

    <dropdown
        :activeClassName="'dashboardSelection'"
    >

        <template v-slot:header>

            <dropdown-header
                :title="'Dernières actualités'"
                :icon="faNewspaper"
            >
            </dropdown-header>

        </template>

        <template v-slot:content>

            <twitter-panel :abbreviation="abbreviation"></twitter-panel>

        </template>

    </dropdown>

</template>

<script>
import Dropdown from "../../../Common/Dropdown.vue";
import TwitterPanel from "../Common/TwitterPanel.vue";
import DropdownHeader from "./Common/DropdownHeader.vue";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default {
    props: {
        abbreviation: {
            type: [String, Number],
            required: true
        }
    },
    setup() {

        return {
            faNewspaper
        }

    },
    components: {
        DropdownHeader,
        Dropdown,
        TwitterPanel
    }
}
</script>