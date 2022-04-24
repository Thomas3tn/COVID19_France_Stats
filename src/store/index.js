import { createStore } from 'vuex';

import APIsDatas from './modules/APIsDatas';
import APIsStatus from './modules/APIsStatus';
import LocalStorageDatas from './modules/LocalStorageDatas';

export default createStore({
  state: {
    requestDate: 0,
    //6 Hours
    REQUEST_DATE_LIMIT: 21600000,
    LOCAL_STORAGE_DATAS_NAME: "covid19Datas",
    haveInitialRequestsBeenCompleted: false
  },
  getters: {},
  mutations: {
    CONFIRM_REQUESTS(state) {
      console.log("confirming requests");
      state.haveInitialRequestsBeenCompleted = true;
      console.log(state.haveInitialRequestsBeenCompleted);
    },
    SET_REQUEST_DATE(state, payload) {
      state.requestDate = payload.requestDate;
    }
  },
  actions: {},
  modules: {
    APIsDatas,
    APIsStatus,
    LocalStorageDatas
  }
});