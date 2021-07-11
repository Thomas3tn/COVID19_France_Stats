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
import { ref, reactive, provide, watch } from "vue";
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
      areDepartementsLiveDatasReceived: false
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

    //Charts status colors
    const chartStatusKey = reactive({
      statusColor: {
        confirmed: "#FF6866",
        deaths: "#3A3A3A",
        recovered: "#3CF525",
        hospitalizations: "#FFC042",
        intensive_care: "#FF6866",
        people_vaccinated: "#334455",
        people_partially_vaccinated: "#457b9d",
        administered: "#2DFF90",
        population: "#5caddf",
        new_hospitalizations: "#FFC042",
        new_intensive_care: "#FF6866"
      },
      statusGradient: {
        confirmed: {
          1: "#FFF5C7",
          2: "#FECCA7",
          3: "#FDA38B",
          4: "#ff8581",
          5: "#eb4a5f",
          6: "#e73a51"
        },
        deaths: {
          1: "#D6D6D6",
          2: "#BDBDBD",
          3: "#9C9C9C",
          4: "#7F7E7E",
          5: "#5D5D5D",
          6: "#3A3A3A"
        },
        recovered: {
          1: "#B5F0AD",
          2: "#9EF093",
          3: "#87EF79",
          4: "#71EF61",
          5: "#59F146",
          6: "#3CF525"
        }
      }
      
    });

    provide("chartStatusKey", chartStatusKey);

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

html {
  scroll-behavior: smooth;
}

body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.4;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Open Sans", sans-serif;
}

p, button, input, a {
  font-family: "Roboto", sans-serif;
}

</style>

