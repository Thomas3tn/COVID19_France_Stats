<template>

    <details 
        class="dropdown" 
        ref="dropdown"
        @toggle="isContentDisplayed = !isContentDisplayed"
        :open="isOpenByDefault"
    >

        <summary 
            class="summaryContainer" 
            :class="summaryClasses"
            title="Inverser l'affichage" 
        >

            <slot name="header"></slot>
            <i 
                class="fas fa-chevron-down chevron" 
                :class="chevronClasses"
            >
            </i>

        </summary>

        <slot name="content"></slot>

    </details>

</template>

<script>
import { ref, computed } from "vue";

export default {
    props: {
        isOpenByDefault: {
            type: Boolean,
            required: false,
            default: false
        },
        activeClassName: {
            type: String,
            required: false,
            default: ""
        },
        inactiveClassName: {
            type: String,
            required: false,
            default: ""
        }
    },
    setup(props) {

        let isContentDisplayed = ref(false);
        const dropdown = ref(null);

        const chevronClasses = computed(() => ({
            chevronNormalPosition: isContentDisplayed.value === false,
            chevronUpsideDown: isContentDisplayed.value
        }));

        const summaryClasses = computed(() => ({
            [props.activeClassName]: isContentDisplayed.value === true,
            [props.inactiveClassName]: isContentDisplayed.value === false
        }));

        return {
            dropdown,
            isContentDisplayed,
            chevronClasses,
            summaryClasses
        }

    }
}
</script>

<style lang="scss" scoped>
@keyframes chevronUpsideDown {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
}

@keyframes chevronNormalPosition {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);

    }
}

.chevronUpsideDown {
    animation: chevronUpsideDown 300ms both ease-in-out;
}

.chevronNormalPosition {
    animation: chevronNormalPosition 300ms both ease-in-out;
}

.dropdown {
    background-color: inherit;
    margin-top: 2rem;
}

.headerContainer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.displayToggleBtn {
    border: 1px solid black;
    border-radius: 3px;
    background-color: inherit;
    margin-bottom: 0.5rem;
}

.summaryContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    padding-bottom: calc(max(1rem, 1vw));
    list-style: none;
    &::-webkit-details-marker {
        display: none;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &:hover {
        cursor: pointer;
    }
    h3 {
        margin: 0;
        margin-left: 0.5rem;
    }
    &--colored {
        background-color: red;
    }
}

.chevron {
    /*margin-right: 0.5rem;
    border: 2px solid black;
    border-radius: 5px;
    padding: 0.3rem;*/
}

.feedContainer {
    overflow: auto;
    height: 400px;
    &--opening {
        animation: twitterFeedOpening 300ms both ease-in-out;
        transform-origin: top;
    }
    &--closing {
        animation: twitterFeedClosing 300ms both ease-in-out;
        transform-origin: top;
    }
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>