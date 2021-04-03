<template>
  <hero></hero>
  <pandemy-summary v-if="worldDatas.Global && worldDatas.Global.All && worldDatas.Global.All.confirmed"></pandemy-summary>
  <search-section></search-section>
  <page-footer></page-footer>
</template>

<script>
//Vue Elements
import { ref, computed } from "vue";
import { useStore } from "vuex";
//import { useGetters, useActions } from 'vuex-composition-helpers';

//Components
import Hero from "./components/AppSections/Hero.vue";
import searchSection from "./components/AppSections/SearchSection.vue";
import pageFooter from "./components/AppSections/Footer.vue";
import PandemySummary from "./components/AppSections/PandemySummary.vue";

//JS Files
import CountryDatasManager from "./assets/JSClasses/CountryStatsManager.js";

export default {
  name: "App",
  setup() {

    let isDatasReceived = ref(false);
    const store = useStore();
    let worldDatas = computed(() => store.state.worldDatas);

    fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then(response => response.json())
    .then(response => {
      console.log(response);
      //setWorldDatas(response);
      store.dispatch("setWorldDatas", { datas: response });
      console.log(worldDatas);
      isDatasReceived.value = true;
    })
    .catch(() => {
      console.error("An error has occured.");
    })

    console.log(worldDatas);

    /*let countryDatasManager = new CountryDatasManager();
    countryDatasManager.requestManager({locationName: "allCountries", requestedDatasType: "liveDatas"})
    .then(response => {

      console.log(response);
      provide("liveRawDatas", response);
      isDatasReceived.value = true;
      liveRawDatas.value = response.liveRawDatas;

    })
    .catch(() => {

      console.error("Failed to retrieved worldDatas");

    });*/

    return {
      worldDatas,
      isDatasReceived,
      //setWorldDatas
    }

  },
  data() {
    return {
      test: "1.111.111",
      country: ""
    }
  },
  components: {
    Hero,
    PandemySummary,
    searchSection,
    pageFooter
  },
  methods: {
    getCountryPeriodDatas(searchCriteria) {
      
      let countryDatasManager = new CountryDatasManager();
      countryDatasManager.requestManager({locationName: searchCriteria.country, requestedDatasType: "periodDatas"})
      .then((response) => {
        this.requestResults.periodDatas = response;
        this.country = searchCriteria.country
      })
      .catch(error => {
          console.log(error);
      });

    }
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
