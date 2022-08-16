<template>    
    <form @submit.prevent="onFormSubmission" class="form">

        <div class="inputsContainer">

            <template v-if="APIsStatus.country === true">

                <search-input
                    @search-input-change="onSearchInputChange" 
                    :names="content.continent" 
                    :locationType="LOC_TYPES.CONTINENT"
                    :selectedContinent="query[LOC_TYPES.CONTINENT]"
                    :isRequired="true"
                >
                </search-input>

                <search-input 
                    v-if="query.continent !== null"
                    @search-input-change="onSearchInputChange" 
                    :names="content.country" 
                    :locationType="LOC_TYPES.COUNTRY"
                    :selectedContinent="query.continent"
                    :isRequired="false"
                >
                </search-input>

            </template>

            <template v-if="APIsStatus.departement === true || APIsStatus.departement === true && APIsStatus.country === true && query.country === fraId">

                <search-input 
                    @search-input-change="onSearchInputChange"
                    :names="content.departement" 
                    :locationType="LOC_TYPES.DEPARTEMENT"
                    :isRequired="false"
                >
                </search-input>

            </template>

        </div>               
        
        <input 
            type="submit" 
            value="Rechercher" 
            title="Rechercher" 
            class="submitBtn" 
        />
    </form>
</template>

<script>
import { useStore } from "vuex";
import { reactive, watch, ref, computed, inject } from "vue";
import SearchInput from "./SelectionForm/SelectionInput.vue";

export default {
    setup() {

        const store = useStore();
        const LOC_TYPES = inject("LOCATION_TYPES");

        const fraId = ref("");
        const query = computed(() => store.state.UserSelections.content);
        const content = reactive({
            [LOC_TYPES.CONTINENT]: [],
            //Store continents countries arrays
            [LOC_TYPES.COUNTRY]: {},
            [LOC_TYPES.DEPARTEMENT]: []
        });

        const APIsStatus = reactive({
            country: computed(() => store.getters["APIsStatus/find"]({
                keysValues: [
                    {key: "type", value: "live"},
                    {key: "location", value: LOC_TYPES.COUNTRY}
                ]
            })?.data?.status || false),
            departement: computed(() => store.getters["APIsStatus/find"]({
                keysValues: [
                    {key: "type", value: "live"},
                    {key: "location", value: LOC_TYPES.DEPARTEMENT}
                ]
            })?.data?.status || false)
        });

        const onFormSubmission = () => store.commit("UserSelections/SUBMIT_CONTENT");
        const onSearchInputChange = selection => query.value[selection.type] = selection.name;

        store.commit("UserSelections/CREATE_CONTENT_OBJECT", [LOC_TYPES.CONTINENT, LOC_TYPES.COUNTRY, LOC_TYPES.DEPARTEMENT]);

        store.getters["APIsDatas/forEachBreadthFirst"](location => {

            if (Object.keys(content).includes(location.data.type)) {

                if (location.data.infos.abbreviation === "FR") {
                    fraId.value = location.data.name;
                }

                let formContentPath = content[location.data.type];
                let region = location.data.infos.region;

                if (location.data.type === LOC_TYPES.COUNTRY && typeof formContentPath[region] === "undefined") {
                    formContentPath[region] = [];
                }

                formContentPath = location.data.type === LOC_TYPES.COUNTRY ? formContentPath[region] : formContentPath;
                formContentPath.push({name: location.data.infos.name, frName: location.data.infos.frName});

            }

        });

        watch(() => { return { ...query}}, (newQuery, oldQuery) => {

            //If user select a continent and a country and then change continent, we delete the selected country
            if (oldQuery[LOC_TYPES.CONTINENT] !== newQuery[LOC_TYPES.CONTINENT] && (oldQuery[LOC_TYPES.COUNTRY] !== "" && oldQuery[LOC_TYPES.COUNTRY] === newQuery[LOC_TYPES.COUNTRY])) {
                query[LOC_TYPES.COUNTRY] = null;
            }

            //If user select a country and a departement and then change country, we delete the selected departement
            if (oldQuery[LOC_TYPES.COUNTRY] !== newQuery[LOC_TYPES.COUNTRY] && (oldQuery[LOC_TYPES.DEPARTEMENT] !== "" && oldQuery[LOC_TYPES.DEPARTEMENT] === newQuery[LOC_TYPES.DEPARTEMENT])) {
                query[LOC_TYPES.DEPARTEMENT] = null;
            }
            
        }, {deep: true});

        return {
            LOC_TYPES,
            content,
            query,
            fraId,
            APIsStatus,
            onFormSubmission,
            onSearchInputChange
        }

    },
    components: {
        SearchInput
    }
}
</script>

<style lang="scss" scoped>
.form {
    position: static;
	display: flex;
    flex-direction: column;
	justify-content: space-between;
	align-items: center;
    flex-wrap: wrap;
    background-color: $secondary-dark;
    color: $white;
    padding: 0.7% 1.4%;
    @media (min-width: 1024px) {
        flex-direction: row;
        width: 90%;
        margin: 0 auto;
        position: relative;
        top: 2.4vw;
        border-radius: 3px;
    }
}
.inputsContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 768px) {
        flex-direction: row;
        width: auto;
        margin: 0 auto;
        position: relative;
        right: 2%;
    }
    @media (min-width: 1024px) {
        right: 0%;
        margin: 0;
    }
}
.submitBtn {
    font-size: clamp(1rem, 1.1vw, 2.5rem);
    border-radius: 3px;
    color: inherit;
    background-color: #ffa600;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    width: 90%;
    margin: 1rem auto;
    @media (min-width: 1024px) {
        padding: 0.5% 1%;
        width: auto;
        margin: 0;
    }
}
</style>