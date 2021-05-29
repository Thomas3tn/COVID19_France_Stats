import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import DatasSaveAgreement from "../views/DatasSaveAgreement.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/datas_save_agreement",
    name: "Datas Save Agreement",
    component: DatasSaveAgreement
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
