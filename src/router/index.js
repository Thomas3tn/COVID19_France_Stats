import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import DatasBackup from "../views/DatasBackup.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/datas-backup",
    name: "Datas Backup",
    component: DatasBackup
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {

    if (to.hash) {
      return {
        el: to.hash
      }
    }

  }
});

export default router;