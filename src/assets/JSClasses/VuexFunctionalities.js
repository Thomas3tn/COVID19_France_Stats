export default {
    worldLocationEvolutionDatas: {
        setRequestParameters(params) {

            let requestParameters = {};

            requestParameters.locationName = params.location;
            typeof params.location === "undefined" || params.location === "" ? requestParameters.locationType = "countriesList" : requestParameters.locationType = "country";
            requestParameters.locationType === "country" ? requestParameters.urlLocationKeyValue = "country=" + encodeURIComponent(params.location) : requestParameters.urlLocationKeyValue = "";

            if (typeof params.status !== "undefined") {

                requestParameters.urlStatusKeysValues = [];
                if (typeof params.status === "string") {
                    requestParameters.urlStatusKeysValues.push("status=" + encodeURIComponent(params.status));
                } else if (Array.isArray(params.status)) {
                
                    for (let i = 0; i < params.status.length; i++) {
                        requestParameters.urlStatusKeysValues.push("status=" + encodeURIComponent(params.status[i]));
                    }
            
                }

            } else {

                //If no status have been filled, we assumed a request need to be done for each of them
                requestParameters.urlStatusKeysValues = [];
                requestParameters.urlStatusKeysValues.push("status=" + encodeURIComponent("confirmed"), "status=" + encodeURIComponent("deaths"), "status=" + encodeURIComponent("recovered"));
            
            }

            return requestParameters;

        },
        filterNecessaryRequest(worldLocationEvolutionDatas, areWorldEvolutionDatasRequestsReceived, requestParameters) {

            //Inspect if existing datas that are not outdated are already store in vuex
            //Check if worldLocationEvolutionDatas object contain some datas
            if (Object.entries(worldLocationEvolutionDatas.datas).length > 0) {

                if (Object.entries(worldLocationEvolutionDatas.global_request_creation_date).length > 0) {

                    for (let i = 0; i < requestParameters.urlStatusKeysValues.length; i++) {

                        let currentStatus = requestParameters.urlStatusKeysValues[i].split("=")[1];
    
                        //We remove the current status if a global request that is not outdated has already been made
                        if ((typeof worldLocationEvolutionDatas.global_request_creation_date[currentStatus]) !== "undefined" && ((Date.now() - 21600000) < worldLocationEvolutionDatas.global_request_creation_date[currentStatus])) {

                            requestParameters.urlStatusKeysValues.splice(i, 1);
                            i = i - 1;
                            areWorldEvolutionDatasRequestsReceived[currentStatus] = true;
    
                        }
    
                    }

                }

                if (requestParameters.urlStatusKeysValues.length !== 0 && requestParameters.locationType === "country") {

                    if (typeof worldLocationEvolutionDatas.datas[requestParameters.locationName] !== "undefined") {

                        if ((Date.now() - 21600000) < worldLocationEvolutionDatas.datas[requestParameters.locationName]["creation_date"]) {

                            for (let i = 0; i < requestParameters.urlStatusKeysValues.length; i++) {

                                if (typeof worldLocationEvolutionDatas.datas[requestParameters.locationName][requestParameters.urlStatusKeysValues[i].split("=")[1]] !== "undefined") {

                                    requestParameters.urlStatusKeysValues.splice(i, 1);
                                    i = i - 1;

                                }

                            }
    
                        }

                    }

                }

            }

            return requestParameters;

        },
        requestsManager(requestParameters) {

            return new Promise((resolve, reject) => {

                //If all requested datas exist and are not outdated, we stopped the execution immediately
                if (requestParameters.urlStatusKeysValues.length === 0) {

                    return true;
        
                } else {

                    //Response object
                    let locationEvolutionDatas = {
                        locationName: requestParameters.locationName,
                        datas: {},
                        creation_date: null,
                        isRequestSuccessful: false
                    };

                    let retrievedStatusDatas = {
                        success: 0,
                        failure: 0
                    };


                    for (let statusIndex = 0; statusIndex < requestParameters.urlStatusKeysValues.length; statusIndex++) {

                        (function() {

                            const currentStatusIndex = statusIndex;

                            fetch("https://covid-api.mmediagroup.fr/v1/history?" + requestParameters.urlStatusKeysValues[currentStatusIndex] + "&" + requestParameters.urlLocationKeyValue)
                            .then(response => response.json())
                            .then(response => {

                                if (requestParameters.locationType === "countriesList") {

                                    for (const [key, value] of Object.entries(response)) {
                                        if (typeof locationEvolutionDatas.datas[key] === "undefined") {
                                            locationEvolutionDatas.datas[key] = {};
                                        }
                                        //If we retrieve a list of countries, we create an object that will store creation timestamp for each status request
                                        if (locationEvolutionDatas.creation_date === null && requestParameters.locationType === "countriesList") {
                                            locationEvolutionDatas.creation_date = {};
                                        }
                                        locationEvolutionDatas.creation_date[requestParameters.urlStatusKeysValues[currentStatusIndex].split("=")[1]] = Date.now();
                                        locationEvolutionDatas.datas[key][requestParameters.urlStatusKeysValues[currentStatusIndex].split("=")[1]] = value.All.dates;
                                    }

                                } else {

                                    if (typeof locationEvolutionDatas.datas[requestParameters.locationName] === "undefined") {
                                        locationEvolutionDatas.datas[requestParameters.locationName] = {};
                                    }
                                    locationEvolutionDatas.creation_date = Date.now();
                                    locationEvolutionDatas.datas[requestParameters.locationName][requestParameters.urlStatusKeysValues[currentStatusIndex].split("=")[1]] = response.All.dates;

                                }

                                retrievedStatusDatas.success += 1;

                            })
                            .catch((error) => {

                                console.error("Unable to retrieve " + requestParameters.urlStatusKeysValues[currentStatusIndex].split("=")[1] + " evolution datas");
                                console.error("Error: " + error);
                                retrievedStatusDatas.failure += 1;

                            })
                            .finally(() => {

                                if (retrievedStatusDatas.success === requestParameters.urlStatusKeysValues.length) {

                                    locationEvolutionDatas.locationType = requestParameters.locationType;
                                    locationEvolutionDatas.isRequestSuccessful = true;
                                    resolve(locationEvolutionDatas);

                                } else if (retrievedStatusDatas.failure === requestParameters.urlStatusKeysValues.length) {

                                    locationEvolutionDatas.isRequestSuccessful = false;
                                    reject(locationEvolutionDatas);

                                }

                            });

                        })();

                    }

                }

            });

        }
    }
}