import { createStore } from 'vuex';

import DatasCalculator from "../assets/JSClasses/DatasCalculator.js";
import VuexFunctionalities from "../assets/JSClasses/VuexFunctionalities.js";

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

        console.log("Country saved in vuex");
        console.log(state.worldLocationEvolutionDatas.datas);

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
      console.log("Datas saved to local Storage");
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

              console.log(worldLiveDatas);
              console.log("vaccines response: ", response);

              //Add vaccines datas for each country
              for (const [vaccKey, vaccValue] of Object.entries(response)) {

                //Test if the both vaccines country and cases country have the same country name
                if (typeof worldLiveDatas[vaccKey] !== "undefined") {

                  console.log("worldName and VaccName have the same name");
                  console.log(worldLiveDatas[vaccKey]["All"]);

                  worldLiveDatas[vaccKey]["All"]["administered"] = vaccValue.All.administered;
                  worldLiveDatas[vaccKey]["All"]["people_vaccinated"] = vaccValue.All.people_vaccinated;
                  worldLiveDatas[vaccKey]["All"]["people_partially_vaccinated"] = vaccValue.All.people_partially_vaccinated;

                  console.log(worldLiveDatas[vaccKey]["All"]);

                //If not we use country abbreviations to match both datasets
                } else {

                  for (const [worldKey, worldValue] of Object.entries(worldLiveDatas)) {

                    if (worldValue.abbreviation === vaccValue.abbreviation) {

                      console.log("worldName and VaccName don't have the same name");
                      console.log(worldLiveDatas[worldKey]["All"]);

                      worldLiveDatas[worldKey]["All"]["administered"] = vaccValue.All.administered;
                      worldLiveDatas[worldKey]["All"]["people_vaccinated"] = vaccValue.All.people_vaccinated;
                      worldLiveDatas[worldKey]["All"]["people_partially_vaccinated"] = vaccValue.All.people_partially_vaccinated;

                      console.log(worldLiveDatas[worldKey]["All"]);

                    }

                  }

                }

              }

              console.log(worldLiveDatas);

              fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
              .then(response => response.json())
              .then(response => {

                let datas = response.FranceGlobalLiveData[0];

                let hospitalizations = datas.hospitalises + datas.nouvellesHospitalisations;
                let intensiveCare = datas.reanimation + datas.nouvellesReanimations;

                worldLiveDatas["France"]["All"]["hospitalizations"] = hospitalizations;
                worldLiveDatas["France"]["All"]["intensive_care"] = intensiveCare;

                console.log(worldLiveDatas);

                fetch("https://restcountries.eu/rest/v2/all")
                .then(response => response.json())
                .then(response => {

                  const restCountriesKeys = ["latlng", "demonym", "gini", "currencies", "languages", "regionalBlocs"];

                  for (let i = 0; i < response.length; i++) {

                    const currentCountry = response[i];

                    if (typeof worldLiveDatas[currentCountry.name] !== "undefined") {

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
                    
                    } else {

                      console.log("Missing country datas for: " + currentCountry.name);

                      for (const keyValue of Object.entries(worldLiveDatas)) {

                        if (keyValue[1].All.abbreviation === currentCountry.alpha2Code) {
                          console.log(keyValue[1].All.abbreviation, currentCountry.alpha2Code);
                          console.log(keyValue[1].All.country, currentCountry.name);

                          for (const [subKey, subValue] of Object.entries(currentCountry)) {

                            if (restCountriesKeys.includes(subKey)) {

                              if (subKey === "latlng" && (typeof keyValue[1]["All"]["lat"] === "undefined" && typeof keyValue[1]["All"]["long"] === "undefined")) {

                                keyValue[1]["All"]["lat"] = subValue[0];
                                keyValue[1]["All"]["long"] = subValue[1];

                              } else {

                                keyValue[1]["All"][subKey] = subValue;

                              }

                            }

                          }

                        }

                      }

                    }

                  }

                  console.log(worldLiveDatas);

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

        console.log("Vuex worldLocationEvolutionDatas function called");

        //If the action is called for the first time
        //Insert all in date datas in the worldLocationEvolutionDatas object
        commit("COPY_LOCAL_STORAGE_WORLD_LOCATION_EVOLUTION_DATAS");
        //Vérifier si intègre copie global request creation date

        console.log("pass copy local storage");

        let requestParameters = VuexFunctionalities.worldLocationEvolutionDatas.setRequestParameters(params);
        console.log(requestParameters);
        requestParameters = VuexFunctionalities.worldLocationEvolutionDatas.filterNecessaryRequest(state.worldLocationEvolutionDatas, state.areWorldEvolutionDatasRequestsReceived, requestParameters);

        if (requestParameters.urlStatusKeysValues.length === 0) {
          console.log("No requests need to be made");
          resolve(true);
        }

        VuexFunctionalities.worldLocationEvolutionDatas.requestsManager(requestParameters)
        .then(locationEvolutionDatas => {

          console.log("Requests were made");
          console.log(locationEvolutionDatas);

          if (locationEvolutionDatas.isRequestSuccessful === true) {

            commit("SET_WORLD_LOCATION_EVOLUTION_DATAS", locationEvolutionDatas);
            commit("SAVE_WORLD_LOCATION_EVOLUTION_DATAS_TO_LOCAL_STORAGE");

            if (requestParameters.locationType === "countriesList") {

              let statusToConfirmed = [];
              for (let i = 0; i < requestParameters.urlStatusKeysValues.length; i++) {
                statusToConfirmed.push(requestParameters.urlStatusKeysValues[i].split("=")[1]);
              }

              commit("SET_WORLD_EVOLUTION_DATAS_REQUESTS_RECEIVED_CONFIRMATION", {status: statusToConfirmed});

            }

            resolve(true);

          } else if (locationEvolutionDatas.isRequestSuccessful === false) {

            console.error("Unable to retrieve evolution datas");
            reject(false);

          }

        })
        .catch((error) => {
          console.error(error);
        })

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
              let datasCalculator = new DatasCalculator();
              for (let i = 0; i < datasArray.length; i++) {

                //We only want datas related to France departements (not France) that are created by Santé publique France Data
                if (datasArray[i].sourceType !== "opencovid19-fr" || datasArray[i].code !== "FRA") {

                  departementsLiveDatas[datasArray[i].code] = {};

                  for (const [key, value] of Object.entries(datasArray[i])) {
                    departementsLiveDatas[datasArray[i].code][datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(key)] = value;
                  }

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
    setFranceDepartementsEvolutionDatas({ commit, state }, departementCodeName) {

      return new Promise((resolve, reject) => {

        console.log("setDeps called");

        commit("COPY_LOCAL_STORAGE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS");

        try {

          if (Object.entries(state.franceDepartementsEvolutionDatas).length > 0) {

            if (typeof state.franceDepartementsEvolutionDatas[departementCodeName.code] !== "undefined") {

              const datasCreationDate = state.franceDepartementsEvolutionDatas[departementCodeName.code]["creation_date"];

              if ((Date.now() - 21600000) < datasCreationDate) {

                resolve(true);

              }

            } else {
              throw "departementNotFound";
            }

          } else {
            throw "noLocalStorageDatas";
          }

        } catch (e) {
  
          console.log("https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=" + encodeURIComponent(departementCodeName.name))
          fetch("https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=" + encodeURIComponent(departementCodeName.name))
          .then(response => {
            return response.json();
          })
          .then(response => {
  
            response = response.allDataByDepartement;
            let departementEvolutionDatas = {};
            departementEvolutionDatas.creation_date = Date.now();
            departementEvolutionDatas.datas = [];

            for (let i = 0; i < response.length; i++) {

              let currentDayDatas = {
                date: response[i].date,
                cumulativeDatas: {},
                dailyDatas: {}
              }

              //Will be used to fill absence of datas
              let lastKnownDatas = {
                hospitalizations: 0,
                intensiveCare: 0,
                deaths: 0,
                recovered: 0
              };

              //Will be used to store previous datas to get cumulative datas
              let cumulativeDatasRecorder = {
                hospitalizations: 0,
                intensiveCare: 0,
                deaths: 0,
                recovered: 0
              };

              //Response array is composed of two datas sources, agences-regionales-sante and sante-publique-france-data
              //If both are available for the same date, we favour the sante-publique-france-data one
              if ((response[i].sourceType === "agences-regionales-sante" && response[i + 1].sourceType === "sante-publique-france-data") && (response[i].date === response[i + 1].date)) {
                i = i + 1;
              }

              //Hospitalizations
              //In case if hospitalises datas suddenly appear without any nouvellesHospitalisations data (different datas sources issue)
              if (typeof response[i].hospitalises !== "undefined" && typeof response[i].nouvellesHospitalisations === "undefined" && cumulativeDatasRecorder.hospitalizations === 0) {

                currentDayDatas.dailyDatas.newHospitalizations = response[i].hospitalises;
                currentDayDatas.cumulativeDatas.hospitalizations = response[i].hospitalises;
                cumulativeDatasRecorder.hospitalizations = response[i].hospitalises;

              } else {

                typeof response[i].nouvellesHospitalisations !== "undefined" ? currentDayDatas.dailyDatas.newHospitalizations = response[i].nouvellesHospitalisations : currentDayDatas.dailyDatas.newHospitalizations = 0;
                typeof response[i].nouvellesHospitalisations !== "undefined" ? currentDayDatas.cumulativeDatas.hospitalizations = response[i].nouvellesHospitalisations + cumulativeDatasRecorder.hospitalizations : currentDayDatas.cumulativeDatas.hospitalizations = 0 + cumulativeDatasRecorder.hospitalizations;
                cumulativeDatasRecorder.hospitalizations = response[i].nouvellesHospitalisations;

              }
              typeof response[i].hospitalises !== "undefined" ? currentDayDatas.dailyDatas.hospitalizations = response[i].hospitalises : currentDayDatas.dailyDatas.hospitalizations = lastKnownDatas.hospitalizations;
              if (typeof response[i].hospitalises !== "undefined") {
                lastKnownDatas.hospitalizations = response[i].hospitalises;
              }


              //Intensive Care
              //In case if reanimations datas suddenly appear without any nouvellesReanimaitons data (different datas sources issue)
              if (typeof response[i].reanimation !== "undefined" && typeof response[i].nouvellesReanimations === "undefined" && cumulativeDatasRecorder.intensive_care === 0) {

                currentDayDatas.dailyDatas.newIntensiveCare = response[i].reanimation;
                currentDayDatas.cumulativeDatas.intensiveCare = response[i].reanimation;
                cumulativeDatasRecorder.intensiveCare = response[i].reanimation;

              } else {

                typeof response[i].nouvellesReanimations !== "undefined" ? currentDayDatas.dailyDatas.newIntensiveCare = response[i].nouvellesReanimations : currentDayDatas.dailyDatas.newIntensiveCare = 0;
                typeof response[i].nouvellesHospitalisations !== "undefined" ? currentDayDatas.cumulativeDatas.intensiveCare = response[i].nouvellesReanimations + cumulativeDatasRecorder.intensiveCare : currentDayDatas.cumulativeDatas.intensiveCare = 0 + cumulativeDatasRecorder.intensiveCare;
                cumulativeDatasRecorder.intensiveCare = response[i].nouvellesReanimations;

              }
              typeof response[i].reanimation !== "undefined" ? currentDayDatas.dailyDatas.intensiveCare = response[i].reanimation : currentDayDatas.dailyDatas.intensiveCare = lastKnownDatas.intensiveCare;
              if (typeof response[i].reanimation !== "undefined") {
                lastKnownDatas.intensiveCare = response[i].reanimation;
              }


              //Deaths
              typeof response[i].deces !== "undefined" ? currentDayDatas.dailyDatas.deaths = response[i].deces - lastKnownDatas.deaths : currentDayDatas.dailyDatas.deaths = lastKnownDatas.deaths;
              typeof response[i].deces !== "undefined" ? currentDayDatas.cumulativeDatas.deaths = response[i].deces : currentDayDatas.cumulativeDatas.deaths = lastKnownDatas.deaths + 0;
              typeof response[i].deces !== "undefined" ? cumulativeDatasRecorder.deaths = response[i].deces : cumulativeDatasRecorder.deaths += 0;
              typeof response[i].deces !== "undefined" ? lastKnownDatas.deaths = response[i].deces : lastKnownDatas.deaths += 0;

              //Recovered
              typeof response[i].gueris !== "undefined" ? currentDayDatas.dailyDatas.recovered = response[i].gueris - lastKnownDatas.recovered : currentDayDatas.dailyDatas.recovered = lastKnownDatas.recovered;
              typeof response[i].gueris !== "undefined" ? currentDayDatas.cumulativeDatas.recovered = response[i].gueris : currentDayDatas.cumulativeDatas.recovered = lastKnownDatas.recovered + 0;
              typeof response[i].gueris !== "undefined" ? cumulativeDatasRecorder.recovered = response[i].gueris : cumulativeDatasRecorder.recovered += 0;
              typeof response[i].gueris !== "undefined" ? lastKnownDatas.recovered = response[i].gueris : lastKnownDatas.recovered = lastKnownDatas.recovered + 0;


              //Check if next datas object cover the same date but from the wrong sourceType. If yes we skip it.
              if (i !== response.length - 1) {
                if ((response[i].date === response[i+1].date) && (response[i].sourceType === "sante-publique-france-data" && response[i].sourceType === "agences-regionales-sante")) {
                  i += 1;
                }
              }
              
              departementEvolutionDatas.datas.push(currentDayDatas);

            }

            commit("SET_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS", { datas: departementEvolutionDatas, departementName: departementCodeName.code });
            commit("SAVE_FRANCE_DEPARTEMENTS_EVOLUTION_DATAS_TO_LOCAL_STORAGE");
            resolve(true);

          })
          .catch((error) => {
            console.error("An error has occured while retrieving departement evolution datas.");
            console.log(error);
            reject(false);
          });
  
        }

      });

    },
  },
  modules: {
  }
})
