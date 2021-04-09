<template>
  <template v-if="areWorldDatasReceived === true && areWorldLocationEvolutionDatasReceived === true && areFranceLocationEvolutionDatasReceived === true">
    <hero></hero>
    <pandemy-summary></pandemy-summary>
    <search-section></search-section>
    <page-footer></page-footer>
  </template>
  <template v-else>
    <app-loader></app-loader>
  </template>
  

</template>

<script>
//Vue Elements
import { ref, computed } from "vue";
import { useStore } from "vuex";
//import { useGetters, useActions } from 'vuex-composition-helpers';

//Components
import AppLoader from "./components/AppSections/AppLoader.vue";
import Hero from "./components/AppSections/Hero.vue";
import searchSection from "./components/AppSections/SearchSection.vue";
import pageFooter from "./components/AppSections/Footer.vue";
import PandemySummary from "./components/AppSections/PandemySummary.vue";

export default {
  name: "App",
  setup() {

    const store = useStore();
    let worldDatas = computed(() => store.state.worldDatas);
    let areWorldDatasReceived = ref(false);
    let areWorldLocationEvolutionDatasReceived = ref(false);
    let areFranceLocationEvolutionDatasReceived = ref(false);
    let areDepartementsDatasReceived = ref(false);

    store.dispatch("setWorldDatas")
    .then(response => {
      areWorldDatasReceived.value = response;
    })
    .catch(response => {
      areWorldDatasReceived.value = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", "Global")
    .then(response => {
      areWorldLocationEvolutionDatasReceived.value = response;
    })
    .catch(response => {
      areWorldLocationEvolutionDatasReceived.value = response;
    });

    store.dispatch("setWorldLocationEvolutionDatas", "France")
    .then(response => {
      areFranceLocationEvolutionDatasReceived.value = response;
    })
    .catch(response => {
      areFranceLocationEvolutionDatasReceived.value = response;
    });

    store.dispatch("setDepartementsDatas")
    .then(response => {
      areDepartementsDatasReceived.value = response;
    })
    .catch(response => {
      areDepartementsDatasReceived.value = response;
    });

    return {
      areWorldDatasReceived,
      areWorldLocationEvolutionDatasReceived,
      areFranceLocationEvolutionDatasReceived,
      worldDatas,
    }

  },
  components: {
    AppLoader,
    Hero,
    PandemySummary,
    searchSection,
    pageFooter
  }
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  line-height: 1.4;
}
</style>
