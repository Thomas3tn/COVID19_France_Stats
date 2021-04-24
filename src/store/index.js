import { createStore } from 'vuex';

export default createStore({
  state: {
    worldLiveDatas: {},
    departementsLiveDatas: {},
    worldLocationEvolutionDatas: {},
    areWorldLiveDatasReceived: false,
    areDepartementsLiveDatasReceived: false
  },
  getters: {},
  mutations: {
    //WorldLiveDatas
    SET_WORLD_LIVE_DATAS(state, payload) {
      state.worldLiveDatas = payload;
    },
    SAVE_WORLD_LIVE_DATAS_TO_LOCAL_STORAGE(state) {
      localStorage.setItem("worldLiveDatas", JSON.stringify({creation_date: Date.now(), datas: state.worldLiveDatas}));
    },
    SET_WORLD_LIVE_DATAS_RECEIVED_CONFIRMATION(state) {
      state.areWorldLiveDatasReceived = true;
    },
    //DepartementsLiveDatas
    SET_DEPARTEMENTS_LIVE_DATAS(state, payload) {
      state.departementsLiveDatas = payload.datas;
    },
    SAVE_DEPARTEMENTS_LIVE_DATAS_TO_LOCAL_STORAGE(state,) {
      localStorage.setItem("departementsLiveDatas", JSON.stringify({creation_date: Date.now(), datas: state.departementsLiveDatas}));
    },
    SET_DEPARTEMENTS_LIVE_DATAS_RECEIVED_CONFIRMATION(state) {
      state.areDepartementsLiveDatasReceived = true;
    },
    //WorldLocationEvolutionDatas
    SET_WORLD_LOCATION_EVOLUTION_DATAS(state, payload) {
      state.worldLocationEvolutionDatas[payload.countryName] = payload.datas;
    },
    COPY_LOCAL_STORAGE_WORLD_LOCATION_EVOLUTION_DATAS(state) {

      //If worldLocationEvolutionDatas local storage data exists and current object is empty
      if (localStorage.getItem("worldLocationEvolutionDatas") !== null && Object.entries(state.worldLocationEvolutionDatas).length === 0) {

        const localStorageDatas = JSON.parse(localStorage.getItem("worldLocationEvolutionDatas"));
        let worldLocationEvolutionDatas = {};

        for (const [key, value] of Object.entries(localStorageDatas)) {

          //If current world evolution datas has been created less than 6 hours
          if ((Date.now() - 21600000) < value.creation_date) {

            worldLocationEvolutionDatas[key] = value;

          }

        }

        state.worldLocationEvolutionDatas = worldLocationEvolutionDatas;

      }

    },
    SAVE_WORLD_LOCATION_EVOLUTION_DATAS_TO_LOCAL_STORAGE(state) {
      localStorage.setItem("worldLocationEvolutionDatas", JSON.stringify(state.worldLocationEvolutionDatas));
    }
  },
  actions: {
    setWorldLiveDatas({ commit }) {

      return new Promise((resolve, reject) => {

        try {

          //If datas exist in local storage
          if (localStorage.getItem("worldLiveDatas") !== null) {
            
            const worldLiveDatas = JSON.parse(localStorage.getItem("worldLiveDatas"));
            const wldCreationDate = worldLiveDatas.creation_date;
  
            //If local storage datas are not older than 6 hours
            if ((Date.now() - 21600000) < wldCreationDate) {

              //Copy local storage datas in Vuex store
              commit("SET_WORLD_LIVE_DATAS", worldLiveDatas);
              commit("SET_WORLD_LIVE_DATAS_RECEIVED_CONFIRMATION");
              resolve(true);
  
            } else {
              throw "localStorageDatasOutaded";
            }

          } else {
            throw "noLocalStorageDatas";
          }

        } catch (e) {

          let worldLiveDatas = {};

          fetch("https://covid-api.mmediagroup.fr/v1/cases")
          .then(response => response.json())
          .then(response => {

            worldLiveDatas = response;
            fetch("https://covid-api.mmediagroup.fr/v1/vaccines")
            .then(response => response.json())
            .then(response => {

              //Add vaccines datas for each country
              for (const [key, value] of Object.entries(response)) {

                //Test if the current country exists in the worldLiveDatas object
                if (typeof worldLiveDatas[key] !== "undefined") {

                  worldLiveDatas[key]["All"]["vaccine_injections_administered"] = value.All.administered;
                  worldLiveDatas[key]["All"]["people_vaccinated"] = value.All.people_vaccinated;
                  worldLiveDatas[key]["All"]["people_partially_vaccinated"] = value.All.people_partially_vaccinated;

                }

              }

              commit("SET_WORLD_LIVE_DATAS", worldLiveDatas);
              commit("SET_WORLD_LIVE_DATAS_RECEIVED_CONFIRMATION");
              commit("SAVE_WORLD_LIVE_DATAS_TO_LOCAL_STORAGE");
              resolve(true);

            })
          })
          .catch(() => {
            console.error("An error has occured while retrieving world datas.");
            reject(false);
          });

        }
      
      });

    },
    setWorldLocationEvolutionDatas({ commit }, countryName) {

      return new Promise((resolve, reject) => {

        //If the action is called for the first time
        //Insert all in date datas in the worldLocationEvolutionDatas object
        commit("COPY_LOCAL_STORAGE_WORLD_LOCATION_EVOLUTION_DATAS");

        try {

          if (localStorage.getItem("worldLocationEvolutionDatas") !== null) {

            const worldLocationEvolutionDatas = JSON.parse(localStorage.getItem("worldLocationEvolutionDatas"));
            
            if (worldLocationEvolutionDatas[countryName] !== "undefined") {

              const datasCreationDate = worldLocationEvolutionDatas[countryName]["creation_date"];

              if ((Date.now() - 21600000) < datasCreationDate) {

                commit("SET_WORLD_LOCATION_EVOLUTION_DATAS", { datas: worldLocationEvolutionDatas[countryName], countryName: countryName });
                resolve(true);

              } else {
                throw "localStorageDatasOutaded";
              }

            } else {
              throw "countryNotFound";
            }

          } else {
            throw "noLocalStorageDatas";
          }

        } catch (e) {

          let countryEvolutionDatas = {};

          fetch("https://covid-api.mmediagroup.fr/v1/history?status=confirmed&country=" + encodeURIComponent(countryName))
          .then(response => response.json())
          .then(response => {
            countryEvolutionDatas.confirmed = response.All.dates;
            fetch("https://covid-api.mmediagroup.fr/v1/history?status=deaths&country=" + encodeURIComponent(countryName))
            .then(response => response.json())
            .then(response => {
              countryEvolutionDatas.deaths = response.All.dates;
              fetch("https://covid-api.mmediagroup.fr/v1/history?status=recovered&country=" + encodeURIComponent(countryName))
              .then(response => response.json())
              .then(response => {
                countryEvolutionDatas.recovered = response.All.dates;
                countryEvolutionDatas.creation_date = Date.now();
                commit("SET_WORLD_LOCATION_EVOLUTION_DATAS", { datas: countryEvolutionDatas, countryName: countryName });
                commit("SAVE_WORLD_LOCATION_EVOLUTION_DATAS_TO_LOCAL_STORAGE");
                resolve(true);
              })
            })
          })
          .catch(() => {
              console.error("An error has occured while retrieving world datas.");
              reject(false);
          });

        }

      });

    },
    setDepartementsLiveDatas({ commit }) {

      return new Promise((resolve, reject) => {

        try {

          if (localStorage.getItem("departementsLiveDatas") !== null) {

            const departementsLiveDatas = JSON.parse(localStorage.getItem("departementsLiveDatas"));
            const dldCreationDate = departementsLiveDatas.creation_date;

            if ((Date.now() - 21600000) < dldCreationDate) {
  
              //Copy local storage datas in Vuex store
              commit("SET_DEPARTEMENTS_LIVE_DATAS", { datas: departementsLiveDatas });
              commit("SET_DEPARTEMENTS_LIVE_DATAS_RECEIVED_CONFIRMATION");
              resolve(true);
  
            } else {
              throw "localStorageDatasOutaded";
            }

          } else {
            throw "noLocalStorageDatas";
          }

        } catch (e) {

          fetch("https://coronavirusapi-france.now.sh/AllLiveData")
          .then(response => response.json())
          .then(response => {

              let departementsLiveDatas = {};
              let datasArray = response.allLiveFranceData;
              for (let i = 0; i < datasArray.length; i++) {

                //We only want datas related to France departements (not France) that are created by Santé publique France Data
                if (datasArray[i].sourceType !== "opencovid19-fr" || datasArray[i].code !== "FRA") {
                  departementsLiveDatas[datasArray[i].code] = datasArray[i];
                }

              }

              commit("SET_DEPARTEMENTS_LIVE_DATAS", { creation_date: Date.now(), datas: departementsLiveDatas });
              commit("SAVE_DEPARTEMENTS_LIVE_DATAS_TO_LOCAL_STORAGE");
              resolve(true);

          })
          .catch(() => {
            console.error("An error has occured while retrieving departements live datas.");
            reject(false);
          });

        }

      });

    }
  },
  modules: {
  }
})
