<template>
    
    <button 
        type="submit" 
        :title="title" 
        class="submitBtn"
    >
        <font-awesome-icon v-if="icon !== null" :icon="icon" aria-hidden="true"/>
        <span class="screenreaderText">{{ title }}</span>
    </button>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: "Valider"
        },
        icon: {
            type: Object,
            required: false,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
$selectableStatusVerticalPadding: calc(max(0.2rem, 0.2vw));
$selectableStatusHorizontalPadding: calc(max(0.5rem, 0.5vw));
.submitBtn {
    background-color: inherit;
    border: 2px solid $inactive;
    font-size: clamp(1.5rem, 1.6vw, 3.5rem);
    padding-top: $selectableStatusVerticalPadding;
    padding-bottom: $selectableStatusVerticalPadding;
    padding-left: $selectableStatusHorizontalPadding;
    padding-right: $selectableStatusHorizontalPadding;
    border-radius: 3px;
    transition: all 300ms;
    &:hover {
        cursor: pointer;
        border-color: $dashboard-selection;
        color: $dashboard-selection;
    }
}
</style>