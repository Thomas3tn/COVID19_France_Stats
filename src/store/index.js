import { createStore } from 'vuex';

import APIsDatas from './modules/APIsDatas';
import APIsStatus from './modules/APIsStatus';
import LocalStorageDatas from './modules/LocalStorage';
import UserSelections from "./modules/UserSelections.js";
import DashboardAssets from './modules/DashboardAssets.js';

export default createStore({
  state: {
    REQUEST_DATE_LIMIT: 21600000 /* 6 Hours */,
    LOCAL_STORAGE_DATAS_NAME: "covid19Datas",
    requestDate: 0,
    weekAgoTimestamp: Date.now() - 604800000,
    haveInitialRequestsBeenCompleted: false
  },
  getters: {},
  mutations: {
    CONFIRM_REQUESTS(state) {
      state.haveInitialRequestsBeenCompleted = true;
    },
    SET_REQUEST_DATE(state, payload) {
      state.requestDate = payload.requestDate;
    }
  },
  actions: {},
  modules: {
    APIsDatas,
    APIsStatus,
    LocalStorageDatas,
    UserSelections,
    DashboardAssets
  }
});