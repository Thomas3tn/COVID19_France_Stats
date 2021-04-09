import { createStore } from 'vuex';

export default createStore({
  state: {
    worldDatas: {},
    departementsDatas: {},
    worldEvolutionDatas: {},
    areWorldDatasReceived: false,
    areDepartementsDatasReceived: false
  },
  getters: {},
  mutations: {
    SET_WORLD_DATAS(state, payload) {

      state.worldDatas = payload;
      console.log(state.worldDatas);

    },
    SET_WORLD_DATAS_RECEIVED_CONFIRMATION(state) {

      state.areWorldDatasReceived = true;

    },
    SET_DEPARTEMENTS_DATAS(state, payload) {

      state.departementsDatas = payload.datas;

    },
    SET_DEPARTEMENTS_DATAS_RECEIVED_CONFIRMATION(state) {

      state.areDepartementsDatasReceived = true;
      
    },
    SET_WORLD_LOCATION_EVOLUTION_DATAS(state, payload) {

      state.worldEvolutionDatas[payload.countryName] = payload.datas;
      console.log(state.worldEvolutionDatas);

    }
  },
  actions: {
    setWorldDatas({ commit }) {

      return new Promise((resolve, reject) => {

        fetch("https://covid-api.mmediagroup.fr/v1/cases")
        .then(response => response.json())
        .then(response => {
          commit("SET_WORLD_DATAS", response);
          commit("SET_WORLD_DATAS_RECEIVED_CONFIRMATION");
          resolve(true);
        })
        .catch(() => {
          console.error("An error has occured while retrieving world datas.");
          reject(false);
        });

      });

    },
    setWorldLocationEvolutionDatas({ commit }, countryName) {

      return new Promise((resolve, reject) => {

        let countryEvolutionDatas = {};

        fetch("https://covid-api.mmediagroup.fr/v1/history?status=confirmed&country=" + encodeURIComponent(countryName))
        .then(response => response.json())
        .then(response => {
            console.log(response);
            countryEvolutionDatas.confirmed = response.All.dates;
            fetch("https://covid-api.mmediagroup.fr/v1/history?status=deaths&country=" + encodeURIComponent(countryName))
            .then(response => response.json())
            .then(response => {
                console.log(response);
                countryEvolutionDatas.deaths = response.All.dates;
                fetch("https://covid-api.mmediagroup.fr/v1/history?status=recovered&country=" + encodeURIComponent(countryName))
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    countryEvolutionDatas.recovered = response.All.dates;
                    commit("SET_WORLD_LOCATION_EVOLUTION_DATAS", { datas: countryEvolutionDatas, countryName: countryName });
                    resolve(true);
                })
            })
        })
        .catch(() => {
            console.error("An error has occured while retrieving world datas.");
            reject(false);
        });

      });

      

    },
    setDepartementsDatas({ commit }) {

      return new Promise((resolve, reject) => {

        fetch("https://coronavirusapi-france.now.sh/AllLiveData")
        .then(response => response.json())
        .then(response => {

            console.log(response);
            let departementsDatas = {};
            let datasArray = response.allLiveFranceData;
            for (let i = 0; i < datasArray.length; i++) {

              //We only want datas related to France departements (not France) that are created by Santé publique France Data
              if (datasArray[i].sourceType !== "opencovid19-fr" || datasArray[i].code !== "FRA") {
                departementsDatas[datasArray[i].code] = datasArray[i];
              }

            }

            commit("SET_DEPARTEMENTS_DATAS", { datas: departementsDatas });
            console.log(departementsDatas);
            resolve(true);

        })
        .catch(() => {
          console.error("An error has occured while retrieving departements live datas.");
          reject(false);
        });

      });

    }
  },
  modules: {
  }
})
