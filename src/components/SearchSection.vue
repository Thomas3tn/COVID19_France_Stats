<template>
    <section 
        id="search-section"
        :class="loadingClasses"
    >

        <selection-maps></selection-maps>
        <selection-form></selection-form>

        <div class="resultsContainer" id="results">

            <template v-if="hasInitialQueryBeenReceived === true">

                <dashboard 
                    id="dashboard"
                    v-if="isDashboardFetchingDatas === false"
                    :datas="requestedLocation"
                ></dashboard>

                <loading-animation v-else></loading-animation>

            </template>

            <default-placeholder v-else></default-placeholder>

        </div>

    </section>
</template>

<script>
import SelectionForm from "./SearchSection/SelectionForm.vue";
import Dashboard from "./SearchSection/Dashboard.vue";
import SelectionMaps from "./SearchSection/SelectionMaps.vue";
import DefaultPlaceholder from "./SearchSection/DefaultPlaceholder.vue";
import ProxyTypeFactory from "../assets/JSClasses/Factories/ProxyTypeFactory.js";
import LoadingAnimation from "./SearchSection/LoadingAnimation.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import _ from "lodash";

export default {
    setup() {

        const store = useStore();
        const router = useRouter();

        const isDashboardFetchingDatas = ref(false);
        let requestedLocation = ref(null);

        const formQuery = computed(() => store.state.UserSelections.query);
        const hasInitialQueryBeenReceived = computed(() => Object.values(formQuery.value).every(value => value === null) ? false : true);
        const loadingClasses = computed(() => ({
            loading: isDashboardFetchingDatas.value
        }));

        watch(() => formQuery.value, async (newQuery, oldQuery) => {

            if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {

                router.push({path: "/", hash: "#results"});
                const proxy = new ProxyTypeFactory({type: newQuery.type, store});
                isDashboardFetchingDatas.value = true;

                requestedLocation.value = _.cloneDeep(await proxy.get({name: newQuery.name}));
                isDashboardFetchingDatas.value = false;

            }

        }, {deep: true});

        return {
            hasInitialQueryBeenReceived,
            isDashboardFetchingDatas,
            requestedLocation,
            loadingClasses
        }

    },
    components: {
        LoadingAnimation,
        SelectionForm,
        Dashboard,
        SelectionMaps,
        DefaultPlaceholder
    }
}
</script>

<style lang="scss" scoped>
.loading {
    cursor: progress;
}
.resultsContainer {
    margin: 0 auto;
    padding: 6vw 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 25vw;
    background: $secondary-light;
}
</style>