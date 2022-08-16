<template>

    <button 
        @click="onSelectableHeaderClick" 
        :title="title" 
        class="selectableHeader"
        :class="[`selectableHeader--${position}`, selectableHeaderClasses]"
        ref="button"
    >
        <h3 class="datasPanel__header">{{ content }}</h3>
    </button>

</template>

<script>
import { computed, ref } from "vue";

export default {
    props: {
        content: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: (props) => props.content
        },
        position: {
            type: String,
            required: false,
            validator(value) {
                return ["left", "right", ""].includes(value);
            },
            default: ""
        },
        dataType: {
            type: [String, Number],
            required: true
        },
        isSelected: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    setup(props, context) {

        const button = ref(null);
        
        const onSelectableHeaderClick = () => context.emit("selectable-header-clicked", props.dataType);
        const selectableHeaderClasses = computed(() => ({
            dashboardSelection: props.isSelected === true
        }));

        return {
            button,
            selectableHeaderClasses,
            onSelectableHeaderClick
        }

    }
}
</script>

<style lang="scss" scoped>
.selectableHeader {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: all 300ms;
    &:hover {
        color: $dashboard-selection;
    }
    &--left {
        margin-right: 0.25rem;
    }
    &--right {
        margin-left: 0.25rem;
    }
}
</style>