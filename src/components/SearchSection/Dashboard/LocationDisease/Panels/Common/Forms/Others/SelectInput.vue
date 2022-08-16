<template>

    <div class="container">

        <label for="locationEvolutionGraphDatasTypeInput" class="label">
            <font-awesome-icon 
                :icon="DATATYPE_ICON" 
                aria-hidden="true" 
            />
            <span class="screenreaderText">
                {{ title }}
            </span>
        </label>

        <select 
            v-model="selection" 
            class="input" 
            id="locationEvolutionGraphDatasTypeInput" 
            title="Sélectionner un type de données"
        >
            <template v-for="(option, index) in options" :key="option.id">
                <option v-if="index === 0" :value="option.id" selected="true">{{ option.frName }}</option>
                <option v-else :value="option.id">{{ option.frName }}</option>
            </template>
        </select>

    </div>

</template>

<script>
import { useStore } from "vuex";
import { ref, watch, computed, onMounted } from "vue";

export default {
    props: {
        title: {
            type: String,
            required: false,
            default: "Type de données"
        },
        options: {
            type: Array,
            required: true
        },
        defaultSelection: {
            type: String,
            required: false,
            default: null
        }
    },
    setup(props, context) {
        
        const store = useStore();
        const DATATYPE_ICON = computed(() => store.state.DashboardAssets.ICONS.FORM.DATATYPE);
        const selection = ref(null);

        onMounted(() => {

            if (props.defaultSelection !== null) {
                selection.value = props.defaultSelection;
            }

        });

        watch(() => selection.value, newValue => context.emit("new-selection", newValue));

        return {
            DATATYPE_ICON,
            selection
        }

    },
}
</script>

<style lang="scss" scoped>
.container {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        margin-bottom: 0;
        margin-right: 2vw;
    }
}
.label {
    font-size: 1.5rem;
}
.input {
    padding: 0.25rem 0.5rem;
    margin-left: 1rem;
    &:hover {
        cursor: pointer;
    }
}
</style>