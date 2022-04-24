import { createApp } from "vue";
import VueApp from "./App.vue";
import store from "./store";
import AppIgniter from "./assets/JSClasses/App.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from './router';

createApp(VueApp).use(router).component("font-awesome-icon", FontAwesomeIcon).use(store).mount("#app");

const appIgniter = new AppIgniter(store);
appIgniter.ignit();