import FranceCovidDatas from "../../staticDatas/FranceCovidDatas";
import DatasCalculator from "../../JSClasses/DatasCalculator.js";

export default {
    setWorldLiveDatas: {
        requestsManager() {

            return new Promise((resolve, reject) => {

                let worldLiveDatas = {};

                fetch("https://covid-api.mmediagroup.fr/v1/cases")
                .then(response => response.json())
                .then(response => {

                    const datasCalculator = new DatasCalculator();

                    for (const [key, value] of Object.entries(response)) {

                        //Remove special character(s) at beginning/end of the current country name (ex: "Taïwan*")
                        worldLiveDatas[datasCalculator.textFunctionalities.removeCountryNameSpecialCharacters(key)] = value;

                    }

                    let furtherRequestURLs = {
                        setVaccinationDatas: "https://covid-api.mmediagroup.fr/v1/vaccines",
                        setFranceLiveDatas: "https://coronavirusapi-france.now.sh/FranceLiveGlobalData",
                        setCountriesInfos: "https://restcountries.eu/rest/v2/all"
                    }

                    let [requestsNumber, successfulRequests, failedRequests] = [0, 0, 0];

                    for (const [key, value] of Object.entries(furtherRequestURLs)) {

                        (() => {

                            fetch(value)
                            .then(response => response.json())
                            .then(response => {

                                worldLiveDatas = this[key](worldLiveDatas, response, FranceCovidDatas);
                                successfulRequests++;

                            })
                            .catch(error => {

                                console.warn(error);
                                failedRequests++;

                            })
                            .finally(() => {

                                requestsNumber++;

                                if (requestsNumber === Object.entries(furtherRequestURLs).length) {

                                    if (successfulRequests >= 1) {
                                        resolve(worldLiveDatas);
                                    } else if (failedRequests === Object.entries(furtherRequestURLs).length) {
                                        reject(false);
                                    }

                                }

                            });

                        })();

                    }

                })
                .catch(error => {

                    console.error(error);
                    reject(false);

                });

            });

        },
        setVaccinationDatas(worldLiveDatas, response) {

            //Add vaccines datas for each country
            for (const [vaccKey, vaccValue] of Object.entries(response)) {

                //Test if the both vaccines country and cases country have the same country name
                if (typeof worldLiveDatas[vaccKey] !== "undefined") {

                    worldLiveDatas[vaccKey]["All"]["administered"] = vaccValue.All.administered;
                    worldLiveDatas[vaccKey]["All"]["people_vaccinated"] = vaccValue.All.people_vaccinated;
                    worldLiveDatas[vaccKey]["All"]["people_partially_vaccinated"] = vaccValue.All.people_partially_vaccinated;

                }

            }

            return worldLiveDatas;

        },
        setFranceLiveDatas(worldLiveDatas, response, FranceCovidDatas) {

            let datas = response.FranceGlobalLiveData[0];

            if (typeof datas === "undefined") {
                datas = FranceCovidDatas.worldLiveDatas;
            }

            worldLiveDatas["France"]["All"]["hospitalizations"] = datas.hospitalises + datas.nouvellesHospitalisations;
            worldLiveDatas["France"]["All"]["intensive_care"] = datas.reanimation + datas.nouvellesReanimations;

            return worldLiveDatas;

        },
        setCountriesInfos(worldLiveDatas, response) {

            const restCountriesKeys = ["latlng", "demonym", "gini", "currencies", "languages", "regionalBlocs", "translations", "region"];

            //In case if keys from APIs reponse and the worldLiveDatas object don't have the same key names
            const manualInputRestCountriesKeys = {
                translations: {
                    path: "fr",
                    keyName: "fr_name"
                },
                region: {
                    path: null,
                    keyName: "continent"
                }
            }

            for (let i = 0; i < response.length; i++) {

                const currentCountry = response[i];

                //Trying to match worldLiveDatas country and restCountries country by name
                if (typeof worldLiveDatas[currentCountry.name] !== "undefined") {

                    for (const [key, value] of Object.entries(currentCountry)) {

                        if (restCountriesKeys.includes(key)) {

                            if (key === "latlng" && (typeof worldLiveDatas[currentCountry.name]["All"]["lat"] === "undefined" && typeof worldLiveDatas[currentCountry.name]["All"]["long"] === "undefined")) {

                                worldLiveDatas[currentCountry.name]["All"]["lat"] = currentCountry.latlng[0];
                                worldLiveDatas[currentCountry.name]["All"]["long"] = currentCountry.latlng[1];

                            } else if (Object.prototype.hasOwnProperty.call(manualInputRestCountriesKeys, key) && typeof worldLiveDatas[currentCountry.name]["All"][manualInputRestCountriesKeys[key]["keyName"]] === "undefined") {

                                manualInputRestCountriesKeys[key]["path"] === null ? worldLiveDatas[currentCountry.name]["All"][manualInputRestCountriesKeys[key]["keyName"]] = value : worldLiveDatas[currentCountry.name]["All"][manualInputRestCountriesKeys[key]["keyName"]] = value[manualInputRestCountriesKeys[key]["path"]];

                            } else {

                                worldLiveDatas[currentCountry.name]["All"][key] = value;

                            }

                        }

                    }
            
                } else {

                    //Trying to match worldLiveDatas country and restCountries country by abbreviation or by alternative spellings
                    for (const keyValue of Object.entries(worldLiveDatas)) {

                        if (keyValue[1].All.abbreviation === currentCountry.alpha2Code || currentCountry.altSpellings.includes(keyValue[0])) {

                            for (const [subKey, subValue] of Object.entries(currentCountry)) {

                                if (restCountriesKeys.includes(subKey)) {

                                    if (subKey === "latlng" && (typeof keyValue[1]["All"]["lat"] === "undefined" && typeof keyValue[1]["All"]["long"] === "undefined")) {

                                        keyValue[1]["All"]["lat"] = subValue[0];
                                        keyValue[1]["All"]["long"] = subValue[1];

                                    } else if (Object.prototype.hasOwnProperty.call(manualInputRestCountriesKeys, subKey) && typeof keyValue[1]["All"][manualInputRestCountriesKeys[subKey]["keyName"]] === "undefined") {

                                        manualInputRestCountriesKeys[subKey]["path"] === null ? keyValue[1]["All"][manualInputRestCountriesKeys[subKey]["keyName"]] = subValue : keyValue[1]["All"][manualInputRestCountriesKeys[subKey]["keyName"]] = subValue[manualInputRestCountriesKeys[subKey]["path"]];

                                    } else {

                                        keyValue[1]["All"][subKey] = subValue;

                                    }

                                }

                            }

                            break;

                        }

                    }

                }

            }

            return worldLiveDatas;

        }
    }
}