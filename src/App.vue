<template>
  <template v-if="areWorldLiveDatasReceived === true && areWorldLocationEvolutionConfirmedReceived === true && areFranceLocationEvolutionDatasReceived === true && areGlobalLocationEvolutionDatasReceived === true && areDepartementsLiveDatasReceived === true">
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
import { ref } from "vue";
import { useStore } from "vuex";

//Components
import AppLoader from "./components/AppSections/AppLoader.vue";
import Hero from "./components/AppSections/Hero.vue";
import searchSection from "./components/AppSections/SearchSection.vue";
import pageFooter from "./components/AppSections/Footer.vue";
import PandemySummary from "./components/AppSections/PandemySummary.vue";
import DatasSaveAgreementPopup from "./components/AppSections/DatasSaveAgreementPopup.vue";

export default {
  name: "App",
  setup() {

    //Vuex
    const store = useStore();

    //Datas checkers
    let areWorldLiveDatasReceived = ref(false);
    let areWorldLocationEvolutionConfirmedReceived = ref(false);
    let areFranceLocationEvolutionDatasReceived = ref(false);
    let areGlobalLocationEvolutionDatasReceived = ref(false);
    let areDepartementsLiveDatasReceived = ref(false);
    let isDatasSaveAgreementPopupDisplayed = ref(true);

    function unmountDSAPopup() {
      isDatasSaveAgreementPopupDisplayed.value = false;
    }

    //APIs Calls
    store.dispatch("setWorldLiveDatas")
    .then(response => {
      areWorldLiveDatasReceived.value = response;
    })
    .catch(response => {
      areWorldLiveDatasReceived.value = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {status: "confirmed"})
    .then(response => {
      areWorldLocationEvolutionConfirmedReceived.value = response;
    })
    .catch(response => {
      areWorldLocationEvolutionConfirmedReceived.value = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {location: "France", status: ["confirmed", "deaths"]})
    .then(response => {
      areFranceLocationEvolutionDatasReceived.value = response;
    })
    .catch(response => {
      areFranceLocationEvolutionDatasReceived.value = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", {location: "Global", status: ["confirmed", "deaths"]})
    .then(response => {
      areGlobalLocationEvolutionDatasReceived.value = response;
    })
    .catch(response => {
      areGlobalLocationEvolutionDatasReceived.value = response;
    });

    store.dispatch("setDepartementsLiveDatas")
    .then(response => {
      areDepartementsLiveDatasReceived.value = response;
    })
    .catch(response => {
      areDepartementsLiveDatasReceived.value = response;
    });

    return {
      areWorldLiveDatasReceived,
      areWorldLocationEvolutionConfirmedReceived,
      areFranceLocationEvolutionDatasReceived,
      areGlobalLocationEvolutionDatasReceived,
      areDepartementsLiveDatasReceived,
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
html {
  scroll-behavior: smooth;
}
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}
</style>
