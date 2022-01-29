<template>
    <div class="mapKey" tabindex="0" @focus="manuallyDisplayMapKey" @blur="manuallyHideMapKey">
        <h4 class="mapKey__title"><span>L</span><span>É</span><span>G</span><span>E</span><span>N</span><span>D</span><span>E</span></h4>
        <table class="mapKey__table">
            <tr>
                <th scope="col">Valeurs</th>
                <th scope="col">Couleur</th>
            </tr>
            <tr v-for="item in currentMapKeys" :key="item.color" @mouseenter="toggleRegionsHighlight" @mouseout="toggleRegionsHighlight">
                <td scope="row">{{ item.values }}</td>
                <td :style="'background: ' + item.color"></td>
            </tr>
        </table>
    </div>
</template>

<script>
import { computed, inject } from "vue";

import DatasCalculator from "../../../../../assets/JSClasses/DatasCalculator.js";

export default {
    props: {
        mapKeys: {
            type: Object,
            required: true
        },
        displayedStatus: {
            type: String,
            required: true
        },
        displayedDatastype: {
            type: String,
            required: false,
            default: "relativeDatas"
        }
    },
    setup(props, context) {

        const datasCalculator = new DatasCalculator();

        console.log(props.mapKeys);
        const chartStatusKey = inject("chartStatusKey", {});

        //Object transmitted to the MapKey component
        let currentMapKeys = computed(() => {

            //If formCriteria.displayedDatastype equal to relativeDatas, add % sign to numbers
            let mapKey = [];

            for (const keyValue of Object.entries(props.mapKeys[props.displayedDatastype])) {

                let formattedValues = {};
                props.displayedDatastype === "relativeDatas" ? formattedValues.min = keyValue[1].min + "%" : formattedValues.min = datasCalculator.numberFunctionalities.formatNumber(keyValue[1].min);
                props.displayedDatastype === "relativeDatas" ? formattedValues.max = keyValue[1].max + "%" : formattedValues.max = datasCalculator.numberFunctionalities.formatNumber(keyValue[1].max);

                mapKey.push({values: formattedValues.min + " - " + formattedValues.max, color: chartStatusKey.statusGradient[props.displayedStatus][keyValue[0].split("")[keyValue[0].split("").length - 1]]});
            }

            return mapKey;

        });

        function manuallyDisplayMapKey(event) {
            event.target.className += " mapKey--focused";
        }

        function manuallyHideMapKey(event) {
            event.target.className = "mapKey";
        }

        function toggleRegionsHighlight(event) {
            
            let eventName;
            if (event.type === "mouseenter") {
                eventName = "map-key-color-enter";
            } else if (event.type === "mouseout") {
                eventName = "map-key-color-leave";
            }

            context.emit(eventName, event.currentTarget.lastElementChild.style.background);
        }

        return {
            currentMapKeys,
            toggleRegionsHighlight,
            manuallyDisplayMapKey,
            manuallyHideMapKey
        }

    }
}
</script>

<style lang="scss">
.mapKey {
    display: flex;
    justify-content: center;
    background-color: #fdfdfd;
    margin: 1rem 0;
    &:hover {
        transform: translate(0%, -50%);
        cursor: help;
    }
    @media (min-width: 768px) {
        margin: 0;
        padding: 0.5rem;
        position: absolute;
        transform: translate(86%, -50%);
        transition: all 300ms ease-in-out;
        top: 50%;
        right: 0%;
        border: 1px solid black;
        border-radius: 3px;
    }
    &--focused {
        transform: translate(0%, -50%);
    }
    &__title {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        margin-right: 0.5rem;
        font-weight: bold;
    }
}
</style>