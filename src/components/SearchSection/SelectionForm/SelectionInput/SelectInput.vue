<template>
    
    <select 
        :title="`Sélectionner le ${title.toLowerCase()} de votre choix`"
        :required="isRequired"
        :aria-required="isRequired"
        :id="HTMLFor"
        v-model="model[locationType]"
    >
        <option value="" disabled selected hidden>{{ title }}</option>
        <option 
            v-for="(data, id) in datas" 
            :key="id" 
            :value="data.name"
        >
            {{ data.frName }}
        </option>
    </select>

</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
    props: {
        datas: {
            type: Array,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            required: false,
            default: false
        },
        HTMLFor: {
            type: String,
            required: true
        },
        locationType: {
            type: String,
            required: true
        }
    },
    setup() {

        const store = useStore();

        return {
            model: computed(() => store.state.UserSelections.content)
        }


    }
}

</script>