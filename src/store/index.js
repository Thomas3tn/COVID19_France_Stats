import { createStore } from 'vuex';

export default createStore({
  state: {
    worldLiveDatas: {},
    departementsLiveDatas: {},
    worldLocationEvolutionDatas: {
      global_request_creation_date: {},
      datas: {}
    },
    franceDepartementsEvolutionDatas: {},
    areWorldLiveDatasReceived: false,
    areDepartementsLiveDatasReceived: false,
    areWorldEvolutionDatasRequestsReceived: {
      confirmed: false
    }
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

      //If payload is a list of countries
      if (payload.locationType === "countriesList") {

        if (Object.entries(state.worldLocationEvolutionDatas.datas).length > 0) {

          for (const [key, value] of Object.entries(payload.datas)) {

            if (typeof state.worldLocationEvolutionDatas.datas[key] === "undefined") {
              state.worldLocationEvolutionDatas.datas[key] = {};
            }
            state.worldLocationEvolutionDatas.datas[key] = Object.assign(state.worldLocationEvolutionDatas.datas[key], value);

          }
          state.worldLocationEvolutionDatas.global_request_creation_date = Object.assign(state.worldLocationEvolutionDatas.global_request_creation_date, payload.creation_date);

        } else {
          
          state.worldLocationEvolutionDatas.datas = payload.datas;
          state.worldLocationEvolutionDatas.global_request_creation_date = Object.assign(state.worldLocationEvolutionDatas.global_request_creation_date, payload.creation_date);
        
        }

      } else {

        if (typeof state.worldLocationEvolutionDatas.datas[Object.keys(payload.datas)[0]] === "undefined") {
          state.worldLocationEvolutionDatas.datas[Object.keys(payload.datas)[0]] = {};
        }

        state.worldLocationEvolutionDatas.datas[Object.keys(payload.datas)[0]] = Object.assign(state.worldLocationEvolutionDatas.datas[Object.keys(payload.datas)[0]], payload.datas[Object.keys(payload.datas)[0]])
        state.worldLocationEvolutionDatas.datas[Object.keys(payload.datas)[0]]["creation_date"] = payload.creation_date;

      }

    },
    COPY_LOCAL_STORAGE_WORLD_LOCATION_EVOLUTION_DATAS(state) {

      //If worldLocationEvolutionDatas local storage data exists and state object is empty
      if (localStorage.getItem("worldLocationEvolutionDatas") !== null && Object.entries(state.worldLocationEvolutionDatas.datas).length === 0) {
        state.worldLocationEvolutionDatas = JSON.parse(localStorage.getItem("worldLocationEvolutionDatas"));
      }

    },
    SAVE_WORLD_LOCATION_EVOLUTION_DATAS_TO_LOCAL_STORAGE(state) {
      localStorage.setItem("worldLocationEvolutionDatas", JSON.stringify(state.worldLocationEvolutionDatas));
    },
    SET_WORLD_EVOLUTION_DATAS_REQUESTS_RECEIVED_CONFIRMATION(state, payload) {

      for (let i = 0; i < payload.status.length; i++) {
        state.areWorldEvolutionDatasRequestsReceived[payload.status] = true;
      }
    },
    //FranceDepartementEvolutionDatas
    SET_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS(state, payload) {
      state.franceDepartementsEvolutionDatas[payload.departementName] = payload.datas;
    },
    COPY_LOCAL_STORAGE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS(state) {

      if (localStorage.getItem("franceDepartementsEvolutionDatas") !== null && Object.entries(state.franceDepartementsEvolutionDatas).length === 0) {

        const localStorageDatas = JSON.parse(localStorage.getItem("franceDepartementsEvolutionDatas"));
        let franceDepartementsEvolutionDatas = {};

        for (const [key, value] of Object.entries(localStorageDatas)) {

          if ((Date.now() - 21600000) < value.creation_date) {

            franceDepartementsEvolutionDatas[key] = value;

          }

        }

        state.franceDepartementsEvolutionDatas = franceDepartementsEvolutionDatas;

      }


    },
    SAVE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS_TO_LOCAL_STORAGE(state) {
      localStorage.setItem("franceDepartementsEvolutionDatas", JSON.stringify(state.franceDepartementsEvolutionDatas));
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

              fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
              .then(response => response.json())
              .then(response => {

                let datas = response.FranceGlobalLiveData[0];

                let hospitalizations = datas.hospitalises + datas.nouvellesHospitalisations;
                let intensiveCare = datas.reanimation + datas.nouvellesReanimations;

                worldLiveDatas["France"]["All"]["hospitalizations"] = hospitalizations;
                worldLiveDatas["France"]["All"]["intensive_care"] = intensiveCare;

                fetch("https://restcountries.eu/rest/v2/all")
                .then(response => response.json())
                .then(response => {

                  for (let i = 0; i < response.length; i++) {

                    if (typeof worldLiveDatas[response[i].name] !== "undefined") {

                      const restCountriesKeys = ["latlng", "demonym", "gini", "currencies", "languages", "regionalBlocs"];
                      const currentCountry = response[i];
                      for (const [key, value] of Object.entries(currentCountry)) {

                        if (restCountriesKeys.includes(key)) {

                          if (key === "latlng" && (typeof worldLiveDatas[currentCountry.name]["All"]["lat"] === "undefined" && typeof worldLiveDatas[currentCountry.name]["All"]["long"] === "undefined")) {

                            worldLiveDatas[currentCountry.name]["All"]["lat"] = currentCountry.latlng[0];
                            worldLiveDatas[currentCountry.name]["All"]["long"] = currentCountry.latlng[1];

                          } else {

                            worldLiveDatas[currentCountry.name]["All"][key] = value;

                          }

                        }

                      }
                    
                    }

                  }

                  commit("SET_WORLD_LIVE_DATAS", worldLiveDatas);
                  commit("SET_WORLD_LIVE_DATAS_RECEIVED_CONFIRMATION");
                  commit("SAVE_WORLD_LIVE_DATAS_TO_LOCAL_STORAGE");
                  resolve(true);

                })

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
    setWorldLocationEvolutionDatas({ commit, state }, params) {

      return new Promise((resolve, reject) => {

        //If the action is called for the first time
        //Insert all in date datas in the worldLocationEvolutionDatas object
        commit("COPY_LOCAL_STORAGE_WORLD_LOCATION_EVOLUTION_DATAS");
        //Vérifier si intègre copie global request creation date

        let locationType;
        let urlLocationKeyValue;
        let urlStatusKeysValues = [];

        typeof params.location === "undefined" || params.location === "" ? locationType = "countriesList" : locationType = "country";
        locationType === "country" ? urlLocationKeyValue = "country=" + encodeURIComponent(params.location) : urlLocationKeyValue = "";
        if (typeof params.status !== "undefined") {

          if (typeof params.status === "string") {
            urlStatusKeysValues.push("status=" + encodeURIComponent(params.status));
          } else if (Array.isArray(params.status)) {
          
            for (let i = 0; i < params.status.length; i++) {
              urlStatusKeysValues.push("status=" + encodeURIComponent(params.status[i]));
            }
    
          }

        } else {
          //If no status have been filled, we assumed a request need to be done for each of them
          urlStatusKeysValues.push("status=" + encodeURIComponent("confirmed"), "status=" + encodeURIComponent("deaths"), "status=" + encodeURIComponent("recovered"));
        }

        //Inspect if existing datas that are not outdated are already store in vuex
        //Check if worldLocationEvolutionDatas object contain some datas
        if (Object.entries(state.worldLocationEvolutionDatas.datas).length > 0) {

          if (Object.entries(state.worldLocationEvolutionDatas.global_request_creation_date).length > 0) {

            for (let i = 0; i < urlStatusKeysValues.length; i++) {

              let currentStatus = urlStatusKeysValues[i].split("=")[1];
  
              //We remove the current status if a global request that is not outdated has already been made
              if ((typeof state.worldLocationEvolutionDatas.global_request_creation_date[currentStatus]) !== "undefined" && ((Date.now() - 21600000) < state.worldLocationEvolutionDatas.global_request_creation_date[currentStatus])) {
                
                urlStatusKeysValues.splice(i, 1);
                i = i - 1;
                state.areWorldEvolutionDatasRequestsReceived[currentStatus] = true;
  
              }
  
            }

          }

          if (locationType === "country") {

            if (typeof state.worldLocationEvolutionDatas.datas[params.location] !== "undefined") {

              if ((Date.now() - 21600000) < state.worldLocationEvolutionDatas.datas[params.location]["creation_date"]) {

                for (let i = 0; i < urlStatusKeysValues.length; i++) {
                  if (urlStatusKeysValues[i] !== "creation_date") {
                    urlStatusKeysValues.splice(i, 1);
                  }
                }
  
              }

            }

          }

        }

        //If all requested datas exist and are not outdated, we stopped the execution immediately
        if (urlStatusKeysValues.length === 0) {
          resolve(true);
        }

        //Response object
        let locationEvolutionDatas = {
          locationName: params.location,
          datas: {},
          creation_date: null
        };

        let retrievedStatusDatas = {
          success: 0,
          failure: 0
        };

          for (let statusIndex = 0; statusIndex < urlStatusKeysValues.length; statusIndex++) {

            (function() {

              const currentStatusIndex = statusIndex;

              fetch("https://covid-api.mmediagroup.fr/v1/history?" + urlStatusKeysValues[currentStatusIndex] + "&" + urlLocationKeyValue)
              .then(response => response.json())
              .then(response => {

                if (locationType === "countriesList") {

                  for (const [key, value] of Object.entries(response)) {
                    if (typeof locationEvolutionDatas.datas[key] === "undefined") {
                      locationEvolutionDatas.datas[key] = {};
                    }
                    //If we retrieve list of countries, a create an object that will store creation timestamp for each status request
                    if (typeof locationEvolutionDatas.creation_date !== "undefined" && locationType === "countriesList") {
                      locationEvolutionDatas.creation_date = {};
                    }
                    locationEvolutionDatas.creation_date[urlStatusKeysValues[currentStatusIndex].split("=")[1]] = Date.now();
                    locationEvolutionDatas.datas[key][urlStatusKeysValues[currentStatusIndex].split("=")[1]] = value.All.dates;
                  }
  
                } else {
  
                  if (typeof locationEvolutionDatas.datas[params.location] === "undefined") {
                    locationEvolutionDatas.datas[params.location] = {};
                  }
                  if (typeof locationEvolutionDatas.creation_date !== "undefined") {
                    locationEvolutionDatas.creation_date = Date.now();
                  }
                  locationEvolutionDatas.datas[params.location][urlStatusKeysValues[currentStatusIndex].split("=")[1]] = response.All.dates;
  
                }

                retrievedStatusDatas.success = retrievedStatusDatas.success + 1;

              })
              .catch(() => {
                console.error("Unable to retrieve evolution datas");
                retrievedStatusDatas.failure = retrievedStatusDatas.failure + 1;
              })
              .finally(() => {

                if (retrievedStatusDatas.success === urlStatusKeysValues.length) {

                  locationEvolutionDatas.locationType = locationType;
                  commit("SET_WORLD_LOCATION_EVOLUTION_DATAS", locationEvolutionDatas);
                  commit("SAVE_WORLD_LOCATION_EVOLUTION_DATAS_TO_LOCAL_STORAGE");
                  resolve(true);

                  if (locationType === "countriesList") {

                    let statusToConfirmed = [];
                    for (let i = 0; i < urlStatusKeysValues.length; i++) {
                      statusToConfirmed.push(urlStatusKeysValues.split("=")[1]);
                    }

                    commit("SET_WORLD_EVOLUTION_DATAS_REQUESTS_RECEIVED_CONFIRMATION", {status: statusToConfirmed});
                  }
      
                } else if (retrievedStatusDatas.failure === urlStatusKeysValues.length) {
      
                  console.error("Unable to retrieve evolution datas");
                  reject(false);
      
                }

              });

            })();

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

    },
    setFranceDepartementsEvolutionDatas({ commit }, departementName) {

      return new Promise((resolve, reject) => {

        console.log("setDeps called");

        commit("COPY_LOCAL_STORAGE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS");

        try {

          if (localStorage.getItem("franceDepartementsEvolutionDatas") !== null) {

            const franceDepartementsEvolutionDatas = JSON.parse(localStorage.getItem("franceDepartementsEvolutionDatas"));

            if (franceDepartementsEvolutionDatas[departementName] !== "undefined") {

              const datasCreationDate = franceDepartementsEvolutionDatas[departementName]["creation_date"];

              if ((Date.now() - 21600000) < datasCreationDate) {

                commit("SET_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS", { datas: franceDepartementsEvolutionDatas[departementName], departementName: departementName });
                resolve(true);

              }

            } else {
              throw "departementNotFound";
            }

          } else {
            throw "noLocalStorageDatas";
          }

        } catch (e) {
  
          console.log("https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=" + encodeURIComponent(departementName))
          fetch("https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=" + encodeURIComponent(departementName))
          .then(response => {
            return response.json();
          })
          .then(response => {
  
            response = response.allDataByDepartement;
            console.log(response);
            let departementCode = "";
            let departementEvolutionDatas = {};
            departementEvolutionDatas.cumulativeDatas = [];
            departementEvolutionDatas.dailyDatas = [];

            for (let i = 0; i < response.length; i++) {

              let cumulativeDatas = {
                date: response[i].date
              };
              let dailyDatas = {
                date: response[i].date
              };
              let storedLoopDatas = {
                hospitalizations: 0,
                intensive_care: 0,
                deaths: 0,
                recovered: 0
              };

              if (departementCode === "" && typeof response[i].code !== "undefined") {
                departementCode = response[i].code;
              }

              //Check if it's not the first day
              //Previous day datas will be used to calculate daily datas by susbstraction
              if (typeof departementEvolutionDatas.cumulativeDatas[departementEvolutionDatas.cumulativeDatas.length-1] !== "undefined") {
                storedLoopDatas = departementEvolutionDatas.cumulativeDatas[departementEvolutionDatas.cumulativeDatas.length-1];
              }

              if ((response[i].sourceType !== "sante-publique-france-data" && response[i + 1].sourceType === "sante-publique-france-data") && (response[i].date === response[i + 1].date)) {
                i = i + 1;
              }

              if (typeof response[i].hospitalises !== "undefined") {

                typeof response[i].nouvellesHospitalisations === "undefined" ? dailyDatas.hospitalizations = response[i].hospitalises : dailyDatas.hospitalizations = response[i].hospitalises + response[i].nouvellesHospitalisations;
                storedLoopDatas.hospitalizations += dailyDatas.hospitalizations;
                cumulativeDatas.hospitalizations = dailyDatas.hospitalizations + storedLoopDatas.hospitalizations;

              } else {
                cumulativeDatas.hospitalizations = 0;
                dailyDatas.hospitalizations = 0;
              }

              if (typeof response[i].reanimation !== "undefined") {

                typeof response[i].nouvellesReanimations === "undefined" ? dailyDatas.intensive_care = response[i].reanimation : dailyDatas.intensive_care = response[i].reanimation + response[i].nouvellesReanimations;
                storedLoopDatas.intensive_care += dailyDatas.intensive_care;
                cumulativeDatas.intensive_care = dailyDatas.intensive_care - storedLoopDatas.intensive_care;

              } else {
                cumulativeDatas.intensive_care = 0;
                dailyDatas.intensive_care = 0;
              }

              if (typeof response[i].deces !== "undefined") {

                cumulativeDatas.deaths = response[i].deces;
                dailyDatas.deaths = response[i].deces - storedLoopDatas.deaths;
                storedLoopDatas.deaths = response[i].deces;

              } else {
                cumulativeDatas.deaths = 0;
                dailyDatas.deaths = 0;
              }

              if (typeof response[i].gueris !== "undefined") {

                cumulativeDatas.recovered = response[i].gueris;
                dailyDatas.recovered = response[i].gueris - storedLoopDatas.recovered;
                storedLoopDatas.recovered = response[i].gueris;

              }

              console.log(cumulativeDatas);
              console.log(dailyDatas);
              departementEvolutionDatas.cumulativeDatas.push(cumulativeDatas);
              departementEvolutionDatas.dailyDatas.push(dailyDatas);

            }

            departementEvolutionDatas.creation_date = Date.now();
            commit("SET_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS", { datas: departementEvolutionDatas, departementName: departementCode });
            commit("SAVE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS_TO_LOCAL_STORAGE");
            resolve(true);

          })
          .catch(() => {
            console.error("An error has occured while retrieving departement evolution datas.");
            reject(false);
          });
  
        }

      });

    },
  },
  modules: {
  }
})
