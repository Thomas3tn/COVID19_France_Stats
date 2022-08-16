<template>

  <template v-if="areDatasReceived === true">

    <hero></hero>
    <covid-summary></covid-summary>
    <search-section></search-section>
    <app-footer></app-footer>
    <datas-backup-popup></datas-backup-popup>
    
  </template>

  <template v-else>

    <app-loader></app-loader>

  </template>

</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import AppLoader from "../components/AppLoader.vue";
import Hero from "../components/Hero.vue";
import SearchSection from "../components/SearchSection.vue";
import AppFooter from "../components/Footer.vue";
import CovidSummary from "../components/Summary.vue";
import DatasBackupPopup from "../components/DatasBackupPopup.vue";

export default {
  name: "App",
  setup() {

    const store = useStore();

    return {
      areDatasReceived: computed(() => store.state.haveInitialRequestsBeenCompleted),
    }

  },
  components: {
    AppLoader,
    Hero,
    CovidSummary,
    SearchSection,
    AppFooter,
    DatasBackupPopup
  }
};
</script>

<style lang="scss">
$blue: #5F9EA0;

.dashboardSelectedElement {
  color: $dashboard-selection;
  border-color: $dashboard-selection;
}
</style>

