<template>

    <div class="test panel">

        <div class="headerContainer">

            <header class="header">
                <slot name="header"></slot>
            </header>

            <slot name="formToggleBtn"></slot>
            
        </div>

        <div class="content" :class="contentClasses">
            <slot name="content"></slot>
        </div>

    </div>

</template>

<script>
import { computed } from "vue";
export default {
    props: {
        isContentColumn: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props) {

        return {
            contentClasses: computed(() => ({
                [`content--column`]: props.isContentColumn === true
            }))
        }

    },
}
</script>

<style lang="scss" scoped>
$datasPanelPadding: calc(max(1rem, 1.3vw));
.panel {
    overflow: hidden;
    background-color: $white;
    margin: 3vw 0;
    padding-left: $datasPanelPadding;
    padding-right: $datasPanelPadding;
    padding-bottom: $datasPanelPadding;
    padding-top: $datasPanelPadding;
    color: #303030;
    border-radius: 3px;
    &--noVerticalMargin {
        margin-top: 0;
        margin-bottom: 0;
    }
}

.headerContainer {
    border-bottom: 1px solid #303030;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    flex-direction: column;
    padding-bottom: calc(max(1rem, 1vw));
    @media (min-width: 1024px) {
        flex-direction: row;
    }
}

.header {
    margin: 0;
    font-size: clamp(1.5rem, 1.5vw, 2.7rem);
    text-align: center;
    @media (min-width: 1024px) {
        text-align: left;
    }
}

.content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    position: relative;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
    &--column {
        flex-direction: column;
    }
}
</style>

<style lang="scss">
.datasPanel__header {
    margin: 0;
    font-size: clamp(1.5rem, 1.5vw, 2.7rem);
    text-align: center;
    @media (min-width: 1024px) {
        text-align: left;
    }
}
</style>