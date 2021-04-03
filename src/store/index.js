import { createStore } from 'vuex';

export default createStore({
  state: {
    worldDatas: {},
    isWorldDatasReceived: false
  },
  getters: {},
  mutations: {
    SET_WORLD_DATAS(state, payload) {

      state.worldDatas = payload.datas;

    },
    SET_DATAS_RECEIVED_CONFIRMATION(state) {

      state.isWorldDatasReceived = true;
    }
  },
  actions: {
    setWorldDatas({ commit }, datas) {

      commit("SET_WORLD_DATAS", datas);
      commit("SET_DATAS_RECEIVED_CONFIRMATION");

    }
  },
  modules: {
  }
})
