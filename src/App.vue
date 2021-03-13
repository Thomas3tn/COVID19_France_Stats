<template>
  <hero></hero>
  <search-section></search-section>
  <page-footer></page-footer>
</template>

<script>
import Hero from "./components/AppSections/Hero.vue";
import searchSection from "./components/AppSections/SearchSection.vue";
import pageFooter from "./components/AppSections/Footer.vue";

export default {
  name: "App",
  components: {
    Hero,
    searchSection,
    pageFooter
  },
};
</script>

<style lang="scss">
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}
</style>
