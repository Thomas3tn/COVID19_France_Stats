<template>
  <hero></hero>
  <search-results></search-results>
  <page-footer></page-footer>
</template>

<script>
import hero from './components/hero.vue';
import searchResults from "./components/searchResults.vue";
import pageFooter from "./components/footer.vue";

export default {
  name: 'App',
  components: {
    hero,
    searchResults,
    pageFooter
  }
}
</script>

<style lang="scss">
body {
	font-family: sans-serif;
	margin: 0;
	padding: 0;
	scroll-behavior: smooth;
}
</style>
