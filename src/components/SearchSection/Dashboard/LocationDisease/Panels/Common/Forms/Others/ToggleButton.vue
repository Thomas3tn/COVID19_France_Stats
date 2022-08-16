<template>

    <button 
        :title="buttonTitle" 
        class="button" 
        :class="buttonClasses"
        @click="onFormToggleBtnClick"
    >
        <font-awesome-icon 
            :icon="checkedIcon" 
            aria-hidden="true"
        />
        <span 
            class="screenreaderText"
        >
            {{ buttonTitle }}
        </span>
    </button>

</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    props: {
        isFormDisplayed: {
            type: Boolean,
            required: true
        },
        icon: {
            type: Object,
            required: false,
            default: null
        },
        activeTitle: {
            type: String,
            required: false,
            default: "Annuler le choix d'une période personnalisée"
        },
        inactiveTitle: {
            type: String,
            required: false,
            default: "Ajouter une période personnalisée"
        }
    },
    setup(props, context) {
        
        const store = useStore();
        const checkedIcon = computed(() => props.icon || store.state.DashboardAssets.ICONS.FORM.ADD_CUSTOM_PERIOD);

        const buttonClasses = computed(() => ({
            dashboardSelection: props.isFormDisplayed === true
        }));
        const buttonTitle = computed(() => props.isFormDisplayed ? props.activeTitle : props.inactiveTitle);

        const onFormToggleBtnClick = () => context.emit("form-toggle-btn-clicked", !props.isFormDisplayed);

        return {
            checkedIcon,
            onFormToggleBtnClick,
            buttonClasses,
            buttonTitle
        }

    },
}
</script>

<style lang="scss" scoped>
.button {
    border: 2px solid;
    border-radius: 3px;
    background-color: inherit;
    padding: 0.2rem 0.5rem;
    transition: all 300ms;
    margin-bottom: 1rem;
    width: 100%;
    @media (min-width: 1024px) {
        width: auto;
        margin-bottom: 0;
    }
    &:hover {
        cursor: pointer;
        border-color: $dashboard-selection;
        color: $dashboard-selection;
    }
}
</style>