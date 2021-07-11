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

              //Add vaccines datas for each country
              for (const [vaccKey, vaccValue] of Object.entries(response)) {

                //Test if the both vaccines country and cases country have the same country name
                if (typeof worldLiveDatas[vaccKey] !== "undefined") {

                  console.log(vaccKey + " found by its name");

                  worldLiveDatas[vaccKey]["All"]["administered"] = vaccValue.All.administered;
                  worldLiveDatas[vaccKey]["All"]["people_vaccinated"] = vaccValue.All.people_vaccinated;
                  worldLiveDatas[vaccKey]["All"]["people_partially_vaccinated"] = vaccValue.All.people_partially_vaccinated;

                //If not we use country abbreviations to match both datasets
                } else {

                  for (const [worldKey, worldValue] of Object.entries(worldLiveDatas)) {

                    if (worldValue.abbreviation === vaccValue.abbreviation) {

                      console.log(vaccKey + " found by its abbreviation");

                      worldLiveDatas[worldKey]["All"]["administered"] = vaccValue.All.administered;
                      worldLiveDatas[worldKey]["All"]["people_vaccinated"] = vaccValue.All.people_vaccinated;
                      worldLiveDatas[worldKey]["All"]["people_partially_vaccinated"] = vaccValue.All.people_partially_vaccinated;

                    }

                  }

                }

              }

              fetch("https://coronavirusapi-france.now.sh/FranceLiveGlobalData")
              .then(response => response.json())
              .then(response => {

                let datas = response.FranceGlobalLiveData[0];
                worldLiveDatas["France"]["All"]["hospitalizations"] = datas.hospitalises + datas.nouvellesHospitalisations;
                worldLiveDatas["France"]["All"]["intensive_care"] = datas.reanimation + datas.nouvellesReanimations;

                fetch("https://restcountries.eu/rest/v2/all")
                .then(response => response.json())
                .then(response => {

                  const restCountriesKeys = ["latlng", "demonym", "gini", "currencies", "languages", "regionalBlocs", "translations"];

                  for (let i = 0; i < response.length; i++) {

                    const currentCountry = response[i];

                    //Trying to match worldLiveDatas country and restCountries country by name
                    if (typeof worldLiveDatas[currentCountry.name] !== "undefined") {

                      for (const [key, value] of Object.entries(currentCountry)) {

                        if (restCountriesKeys.includes(key)) {

                          if (key === "latlng" && (typeof worldLiveDatas[currentCountry.name]["All"]["lat"] === "undefined" && typeof worldLiveDatas[currentCountry.name]["All"]["long"] === "undefined")) {

                            worldLiveDatas[currentCountry.name]["All"]["lat"] = currentCountry.latlng[0];
                            worldLiveDatas[currentCountry.name]["All"]["long"] = currentCountry.latlng[1];

                          } else if (key === "translations") {

                            worldLiveDatas[currentCountry.name]["All"]["fr_name"] = value.fr;

                          } else {

                            worldLiveDatas[currentCountry.name]["All"][key] = value;

                          }

                        }

                      }
                    
                    } else {

                      //Trying to match worldLiveDatas country and restCountries country by abbreviation
                      for (const keyValue of Object.entries(worldLiveDatas)) {

                        if (keyValue[1].All.abbreviation === currentCountry.alpha2Code) {
                          console.log(keyValue[1].All.abbreviation, currentCountry.alpha2Code);
                          console.log(keyValue[1].All.country, currentCountry.name);

                          for (const [subKey, subValue] of Object.entries(currentCountry)) {

                            if (restCountriesKeys.includes(subKey)) {

                              if (subKey === "latlng" && (typeof keyValue[1]["All"]["lat"] === "undefined" && typeof keyValue[1]["All"]["long"] === "undefined")) {

                                keyValue[1]["All"]["lat"] = subValue[0];
                                keyValue[1]["All"]["long"] = subValue[1];

                              } else if (subKey === "translations") {

                                keyValue[1]["All"]["fr_name"] = subValue.fr;
    
                              } else {

                                keyValue[1]["All"][subKey] = subValue;

                              }

                            }

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

          fetch("https://coronavirusapi-france.now.sh/AllDataByDepartement?Departement=" + encodeURIComponent(departementCodeName.name))
          .then(response => response.json())
          .then(response => {
  
            response = response.allDataByDepartement;

            let departementEvolutionDatas = {
              creation_date: Date.now(),
              datas: {
                dates: [],
                dailyDatas: {
                  new_hospitalizations: [],
                  new_intensive_care: []
                },
                cumulativeDatas: {}
              }
              
            };

            const authStatusKeys = ["hospitalizations", "intensive_care", "deaths", "recovered"];
            for (let i = 0; i < authStatusKeys.length; i++) {

              departementEvolutionDatas.datas.dailyDatas[authStatusKeys[i]] = [];
              departementEvolutionDatas.datas.cumulativeDatas[authStatusKeys[i]] = [];

            }

            //Will be used to store previous datas to get cumulative datas by substraction
            let cumulativeDatasRecorder = {
              hospitalizations: 0,
              intensive_care: 0,
              deaths: 0,
              recovered: 0
            };

            for (let i = 0; i < response.length; i++) {

              //Response array is composed of two datas sources, agences-regionales-sante and sante-publique-france-data
              //If both are available for the same date, we favour the sante-publique-france-data one
              if ((response[i].sourceType === "agences-regionales-sante" && response[i + 1].sourceType === "sante-publique-france-data") && (response[i].date === response[i + 1].date)) {
                i = i + 1;
              }

              //Will be used to fill absence of datas
              let lastKnownDatas = {
                hospitalizations: 0,
                intensive_care: 0,
                deaths: 0,
                recovered: 0
              };

              departementEvolutionDatas.datas.dates.push(response[i].date);

              //Hospitalizations
              //In case if hospitalises datas suddenly appear without any nouvellesHospitalisations data (different datas sources issue)
              if (typeof response[i].hospitalises !== "undefined" && typeof response[i].nouvellesHospitalisations === "undefined" && cumulativeDatasRecorder.hospitalizations === 0) {

                departementEvolutionDatas.datas.dailyDatas.new_hospitalizations.push(response[i].hospitalises);
                departementEvolutionDatas.datas.cumulativeDatas.hospitalizations.push(response[i].hospitalises);
                cumulativeDatasRecorder.hospitalizations = response[i].hospitalises;

              } else {

                typeof response[i].nouvellesHospitalisations !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.new_hospitalizations.push(response[i].nouvellesHospitalisations) : departementEvolutionDatas.datas.dailyDatas.new_hospitalizations.push(0);
                typeof response[i].nouvellesHospitalisations !== "undefined" ? departementEvolutionDatas.datas.cumulativeDatas.hospitalizations.push(response[i].nouvellesHospitalisations + cumulativeDatasRecorder.hospitalizations) : departementEvolutionDatas.datas.cumulativeDatas.hospitalizations.push(cumulativeDatasRecorder.hospitalizations);
                typeof response[i].nouvellesHospitalisations !== "undefined" ? cumulativeDatasRecorder.hospitalizations += response[i].nouvellesHospitalisations : cumulativeDatasRecorder.hospitalizations += 0;

              }
              typeof response[i].hospitalises !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.hospitalizations.push(response[i].hospitalises) : departementEvolutionDatas.datas.dailyDatas.hospitalizations.push(lastKnownDatas.hospitalizations);
              typeof response[i].hospitalises !== "undefined" ? lastKnownDatas.hospitalizations = (response[i].hospitalises) : lastKnownDatas.hospitalizations += 0;


              //Intensive Care
              //In case if reanimations datas suddenly appear without any nouvellesReanimaitons data (different datas sources issue)
              if (typeof response[i].reanimation !== "undefined" && typeof response[i].nouvellesReanimations === "undefined" && cumulativeDatasRecorder.intensive_care === 0) {

                departementEvolutionDatas.datas.dailyDatas.new_intensive_care.push(response[i].reanimation);
                departementEvolutionDatas.datas.cumulativeDatas.intensive_care.push(response[i].reanimation);
                cumulativeDatasRecorder.intensive_care = response[i].reanimation;

              } else {

                typeof response[i].nouvellesReanimations !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.new_intensive_care.push(response[i].nouvellesReanimations) : departementEvolutionDatas.datas.dailyDatas.new_intensive_care.push(0);
                typeof response[i].nouvellesHospitalisations !== "undefined" ? departementEvolutionDatas.datas.cumulativeDatas.intensive_care.push(response[i].nouvellesReanimations + cumulativeDatasRecorder.intensive_care) : departementEvolutionDatas.datas.cumulativeDatas.intensive_care.push(0 + cumulativeDatasRecorder.intensive_care);
                typeof response[i].nouvellesReanimations !== "undefined" ? cumulativeDatasRecorder.intensive_care += response[i].nouvellesReanimations : cumulativeDatasRecorder.intensive_care += 0;

              }
              typeof response[i].reanimation !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.intensive_care.push(response[i].reanimation) : departementEvolutionDatas.datas.dailyDatas.intensive_care.push(lastKnownDatas.intensive_care);
              if (typeof response[i].reanimation !== "undefined") {
                lastKnownDatas.intensive_care = response[i].reanimation;
              }


              //Deaths
              typeof response[i].deces !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.deaths.push(response[i].deces - lastKnownDatas.deaths) : departementEvolutionDatas.datas.dailyDatas.deaths.push(lastKnownDatas.deaths);
              typeof response[i].deces !== "undefined" ? departementEvolutionDatas.datas.cumulativeDatas.deaths.push(response[i].deces) : departementEvolutionDatas.datas.cumulativeDatas.deaths.push(lastKnownDatas.deaths + 0);
              typeof response[i].deces !== "undefined" ? cumulativeDatasRecorder.deaths = response[i].deces : cumulativeDatasRecorder.deaths += 0;
              typeof response[i].deces !== "undefined" ? lastKnownDatas.deaths = response[i].deces : lastKnownDatas.deaths += 0;

              //Recovered
              typeof response[i].gueris !== "undefined" ? departementEvolutionDatas.datas.dailyDatas.recovered.push(response[i].gueris - lastKnownDatas.recovered) : departementEvolutionDatas.datas.dailyDatas.recovered.push(lastKnownDatas.recovered);
              typeof response[i].gueris !== "undefined" ? departementEvolutionDatas.datas.cumulativeDatas.recovered.push(response[i].gueris) : departementEvolutionDatas.datas.cumulativeDatas.recovered.push(lastKnownDatas.recovered + 0);
              typeof response[i].gueris !== "undefined" ? cumulativeDatasRecorder.recovered = response[i].gueris : cumulativeDatasRecorder.recovered += 0;
              typeof response[i].gueris !== "undefined" ? lastKnownDatas.recovered = response[i].gueris : lastKnownDatas.recovered = lastKnownDatas.recovered + 0;


              //Check if next datas object cover the same date but from the wrong sourceType. If yes we skip it.
              if (i !== response.length - 1) {
                if ((response[i].date === response[i+1].date) && (response[i].sourceType === "sante-publique-france-data" && response[i].sourceType === "agences-regionales-sante")) {
                  i += 1;
                }
              }

            }

            console.log(departementEvolutionDatas);

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
