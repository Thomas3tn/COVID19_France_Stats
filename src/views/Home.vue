<template>
  <template v-if="areDatasReceived === true">
    <hero></hero>
    <pandemy-summary></pandemy-summary>
    <search-section></search-section>
    <page-footer></page-footer>
    <datas-save-agreement-popup v-if="isDatasSaveAgreementPopupDisplayed === true" @close-dsa-popup="unmountDSAPopup"></datas-save-agreement-popup>
  </template>
  <template v-else>
    <app-loader></app-loader>
  </template>
</template>

<script>
//Vue Elements
import { ref, computed } from "vue";
import { useStore } from "vuex";

//Components
import AppLoader from "../components/AppLoader.vue";
import Hero from "../components/Hero.vue";
import searchSection from "../components/SearchSection.vue";
import pageFooter from "../components/Footer.vue";
import PandemySummary from "../components/PandemySummary.vue";
import DatasSaveAgreementPopup from "../components/DatasSaveAgreementPopup.vue";

export default {
  name: "App",
  setup() {

    //Vuex
    const store = useStore();

    const areDatasReceived = computed(() => store.state.haveInitialRequestsBeenCompleted);
    
    let isDatasSaveAgreementPopupDisplayed = ref(true);

    function unmountDSAPopup() {
      isDatasSaveAgreementPopupDisplayed.value = false;
    }

    return {
      areDatasReceived,
      isDatasSaveAgreementPopupDisplayed,
      unmountDSAPopup
    }

  },
  components: {
    AppLoader,
    Hero,
    PandemySummary,
    searchSection,
    pageFooter,
    DatasSaveAgreementPopup
  }
};
</script>

<style lang="scss">
$blue: #5F9EA0;
</style>

