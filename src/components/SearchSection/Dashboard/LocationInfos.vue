<template>

    <aside 
        class="asidePanel"
    >

        <toggle-button 
            class="toggleBtn"
            @toggle-location-panel-display="onTogglePanelDisplay"
        ></toggle-button>
        
        <aside-header
            :locationInfos="locationInfos"
            :locationType="locationType"
        ></aside-header>

        <aside-map
            :sqKmArea="locationInfos.sqKmArea"
            :coordinates="locationInfos.coordinates"
        ></aside-map>

        <overview-dropdown
            :locationInfos="locationInfos"
            :locationType="locationType"
        >
        </overview-dropdown>

        <twitter-dropdown
            :abbreviation="locationInfos.abbreviation"
        ></twitter-dropdown>
        
    </aside>

</template>

<script>
import ToggleButton from "./LocationInfos/ToggleButton.vue";
import AsideHeader from "./LocationInfos/Header.vue";
import AsideMap from "./LocationInfos/Map.vue";
import OverviewDropdown from "./LocationInfos/OverviewDropdown.vue";
import TwitterDropdown from "./LocationInfos/TwitterDropdown.vue";
import { inject } from "vue";

export default {
    props: {
        locationInfos: {
            type: Object,
            required: true
        },
        currentlyDisplayed: {
            type: Boolean,
            required: true,
        },
        locationType: {
            type: String,
            required: true
        }
    },
    setup(props, context) {

        return {
            LOC_TYPES: inject("LOCATION_TYPES"),
            onTogglePanelDisplay: () => context.emit("toggle-location-panel-display")
        }

    },
    components: {
        ToggleButton,
        AsideHeader,
        AsideMap,
        OverviewDropdown,
        TwitterDropdown
    }
}
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
$padding: calc(max(1rem, 1vw));
.asidePanel {
    background-color: $white;
    padding-top: $padding;
    padding-bottom: $padding;
    padding-left: $padding;
    padding-right: $padding;
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
        .toggleBtn {
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
}
</style>