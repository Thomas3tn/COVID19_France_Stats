<template>

    <div 
        class="container"
        :class="containerClasses" 
        tabindex="0" 
        @focus="isMapKeyDisplayed = true" 
        @blur="isMapKeyDisplayed = false"
    >

        <h4 class="title">
            <span 
                v-for="letter of ['L', 'É', 'G', 'E', 'N', 'D', 'E']" 
                :key="letter"
            >
                {{ letter }}
            </span>
        </h4>

        <table>
            <tr>
                <th scope="col">Valeurs</th>
                <th scope="col">Couleur</th>
            </tr>
            <tr 
                v-for="item in formattedMapKeys" 
                :key="item.color" 
                @mouseenter="toggleRegionsHighlight" 
                @mouseout="toggleRegionsHighlight"
            >
                <td scope="row">{{ item.values }}</td>
                <td :style="`background: ${item.color}`"></td>
            </tr>
        </table>
    </div>

</template>

<script>
import { computed } from "vue";
import NumberCustomMethods from "../../../../../../assets/JSClasses/DatasCalculator/NumberFunctionalities.js";

export default {
    props: {
        mapKeys: {
            type: Object,
            required: true
        },
        datatype: {
            type: String,
            required: true,
        },
        DATATYPES: {
            type: Object,
            required: true
        }
    },
    setup(props, context) {

        const isMapKeyDisplayed = ref(false);

        const formattedMapKeys = computed(() => {

            let mapKey = [];
            const mark = props.datasType === 2 ? "%" : "";

            Object.values(props.mapKeys[props.datatype]).forEach(DATAS => {

                mapKey.push({
                    values: `${NumberCustomMethods.formatNumber(DATAS.MIN)}${mark}-${NumberCustomMethods.formatNumber(DATAS.MAX)}${mark}`,
                    color: DATAS.COLOR
                })

            });

            return mapKey;

        });

        const containerClasses = computed(() => ({
            [`mapKey--focused`]: isMapKeyDisplayed === true
        }))

        function toggleRegionsHighlight(event) {
            
            const eventName = event.type === "mouseenter" ? "map-key-color-enter" : "map-key-color-leave";
            context.emit(eventName, event.currentTarget.lastElementChild.style.background);

        }

        return {
            formattedMapKeys,
            containerClasses,
            toggleRegionsHighlight,
            isMapKeyDisplayed
        }

    }
}
</script>

<style lang="scss" scoped>
.container {
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
}
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    margin-right: 0.5rem;
    font-weight: bold;
}
</style>