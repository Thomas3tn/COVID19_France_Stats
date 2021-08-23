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
import { ref, reactive, watch } from "vue";
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

    const datasCheckers = reactive({
      areWorldLiveDatasReceived: false,
      areWorldEvolutionDatasReceived: false,
      areFranceEvolutionDatasReceived: false,
      areGlobalEvolutionDatasReceived: false,
      areDepartementsLiveDatasReceived: false,
      areWeeklyEvolutionDatasReceived: false
    });

    const areDatasReceived = ref(false);
    
    let isDatasSaveAgreementPopupDisplayed = ref(true);

    function unmountDSAPopup() {
      isDatasSaveAgreementPopupDisplayed.value = false;
    }

    //APIs Calls
    store.dispatch("setWorldLiveDatas")
    .then(response => {
      datasCheckers.areWorldLiveDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areWorldLiveDatasReceived = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {status: "confirmed"})
    .then(response => {
      datasCheckers.areWorldEvolutionDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areWorldEvolutionDatasReceived = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {location: "France", status: ["confirmed", "deaths"]})
    .then(response => {
      datasCheckers.areFranceEvolutionDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areFranceEvolutionDatasReceived = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {location: "Global", status: ["confirmed", "deaths"]})
    .then(response => {
      datasCheckers.areGlobalEvolutionDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areGlobalEvolutionDatasReceived = response;
    });

    store.dispatch("setDepartementsLiveDatas")
    .then(response => {
      datasCheckers.areDepartementsLiveDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areDepartementsLiveDatasReceived = response;
    });

    store.dispatch("setWeeklyEvolutionDatas")
    .then(response => {
      datasCheckers.areWeeklyEvolutionDatasReceived = response;
    })
    .catch(response => {
      datasCheckers.areWeeklyEvolutionDatasReceived = response;
    })

    watch(() => { return { ...datasCheckers }}, newValue => {

      const datasCheckersRequestsAmount = Object.entries(newValue).length;
      let successfulRequests = 0;

      for (const keyValue of Object.entries(newValue)) {
        
        if (keyValue[1] === true) {
          successfulRequests++;
        }

      }

      datasCheckersRequestsAmount === successfulRequests ? areDatasReceived.value = true : areDatasReceived.value = false;

    }, {deep: true});

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

