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
import { ref, reactive, provide } from "vue";
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

    //Charts status colors
    const chartStatusKey = reactive({
      confirmed: "#FF6866",
      deaths: "#3A3A3A",
      recovered: "#4BFF35",
      hospitalizations: "#FFC042",
      intensive_care: "#FF6866",
      people_vaccinated: "#2D6AFF",
      people_partially_vaccinated: "#2DF2FF",
      administered: "#2DFF90",
      population: "#F9FF40"
    });

    provide("chartStatusKey", chartStatusKey);

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

