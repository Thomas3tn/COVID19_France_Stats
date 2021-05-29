import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from './router'

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).use(store).mount("#app");