import UtilitaryFunctions from "./UtilitaryFunctions.js";

export default class CountryStatsManager extends UtilitaryFunctions {
    constructor() {

        super();

        this.requestURL = {
            baseURL: "https://covid-api.mmediagroup.fr/v1",
            paths: {
                cases: {
                    path: "/cases",
                    parameters: ["country=:locationName:"]
                },
                history: {
                    path: "/history",
                    parameters: ["country=:locationName:", "status=:status:"]
                }
            }
        }

        this.authorizedLocations = {
            worldNames: {
                locationType: "world",
                acceptedValues: ["Global"]
            },
            allCountriesNames: {
                locationType: "allCountries",
                acceptedValues: ["allCountries"]
            },
            continentsNames: {
                locationType: "continent",
                acceptedValues: ["Europe", "Asia", "Africa", "Oceania", "North America", "South America", "America"]
            },
            countriesNames: {
                locationType: "country",
                acceptedValues: [
                    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia",
                    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
                    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
                    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
                    "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Costa Rica", "Cote d'Ivoire", "Croatia",
                    "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
                    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
                    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
                    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
                    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
                    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
                    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
                    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
                    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
                    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
                    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
                    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
                    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
                    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
                    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
                    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
                ]
            }
        }

        this.requestInfos = {
            locationType: "",
            locationName: "",
            requestedDatasType: ""
        }

    }
    requestManager = (params) => {

        return new Promise((resolve, reject) => {

            this.CSMUtilitaryFunctions.setRequestInfos(params);
            this.requestRouter()
                .then((response) => {

                    console.log(response);

                    let formattedDatas = this.datasRetriever.datasRetrieverManager(response);

                    if (formattedDatas) {
                        console.log(formattedDatas);
                        resolve(formattedDatas);
                    } else {
                        reject(formattedDatas);
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        });

    }
    datasRetriever = {
        datasRetrieverManager: (datas) => {

            console.log("datasRetrieverManager");
            console.log(this.requestInfos);
            console.log(datas);

            let retrievedDatas = {};
            let liveRawDatas = {};
            let periodEvolutionDatas = {};

            //If user asked for liveRawDatas
            if (this.requestInfos.requestedDatasType === "allDatas" || this.requestInfos.requestedDatasType === "liveDatas") {

                //If user asked countries list, data object is directly returned
                if (this.requestInfos.locationType === "allCountries") {
                    liveRawDatas = datas;
                } else {
                    liveRawDatas = this.datasRetriever.datasRetrieverFunctions.locationDatasRetriever(datas.liveRawDatas);
                }

            }

            //If user asked for perioDatas
            if (this.requestInfos.requestedDatasType === "allDatas" || this.requestInfos.requestedDatasType === "periodDatas") {
                    
                for (const [key, value] of Object.entries(datas.periodEvolutionDatas)) {
                    periodEvolutionDatas[key] = this.datasRetriever.datasRetrieverFunctions.locationDatasListRetriever(value);
                }

            }
            
            //If both sub objects have been filled
            if (Object.entries(liveRawDatas).length > 0 && Object.entries(periodEvolutionDatas).length > 0) {
                retrievedDatas = Object.assign(liveRawDatas, periodEvolutionDatas);
            } else {
                if (Object.entries(liveRawDatas).length > 0) {
                    retrievedDatas = liveRawDatas;
                } else {
                    retrievedDatas = periodEvolutionDatas;
                }
            }

            return retrievedDatas;

        },
        datasRetrieverFunctions: {
            locationDatasRetriever: (datas) => {

                datas = datas[this.requestInfos.locationName].All;

                let returnedDatas = {};
                returnedDatas.liveRawDatas = {};
                returnedDatas.locationDetails = {};

                returnedDatas.liveRawDatas.confirmedCases = datas.confirmed;
                returnedDatas.liveRawDatas.deaths = datas.deaths;
                returnedDatas.liveRawDatas.recovered = datas.recovered;

                returnedDatas.locationDetails.population = datas.locationPopulation;
                returnedDatas.locationDetails.locationType = this.requestInfos.locationType;

                if (this.requestInfos.locationType === "country") {

                    returnedDatas.locationDetails.locationAbbreviation = datas.abbreviation;
                    returnedDatas.locationDetails.locationName = datas.country;
                    returnedDatas.locationDetails.locationContinent = datas.continent;
                    returnedDatas.locationDetails.continentPreciseLocation = datas.location;
                    returnedDatas.locationDetails.locationSurfaceArea = datas.sq_km_area;
                    returnedDatas.locationDetails.locationCapitalCity = datas.capital_city;
                    returnedDatas.locationDetails.locationLifeExpectancy = datas.life_expectancy;
                    returnedDatas.locationDetails.locationLastUpdate = datas.updated;
                    returnedDatas.locationDetails.locationLatitude = datas.lat;
                    returnedDatas.locationDetails.locationLongitude = datas.long;

                } else if (this.requestInfos.locationType === "world") {

                    returnedDatas.locationDetails.locationName = "Monde";

                }

                return returnedDatas;

            },
            locationDatasListRetriever: (datas) => {

                if (this.requestInfos.locationType === "country") {
                    datas = datas.All.dates;
                } else if (this.requestInfos.locationType === "world") {
                    datas = datas.Global.All.dates;
                }

                console.log(datas);

                //Stocker chaque objet date/datas dans un tableau pour ensuite inverser l'order
                let returnedDatas = {};

                for (const [key, value] of Object.entries(datas)) {
                    returnedDatas[key] = value;
                }

                return returnedDatas;

            }
        }
    }
    CSMUtilitaryFunctions = {
        locationFunctionalities: {
            setLocationType: (locationUserInput) => {

                for (const [key, value] of Object.entries(this.authorizedLocations)) {

                    console.log(key);
                    if (value.acceptedValues.includes(locationUserInput)) {

                        this.requestInfos.locationType = value.locationType;
                        return true;

                    }

                }

                return false;

            }
        },
        dateFunctionalities: {
            getRequestFormattedDate: (date) => {

                return date + "T00:00:00Z";

            },
            setDateType: () => {

                if ((this.requestInfos.startDate === "undefined" && this.requestInfos.endDate === "undefined") || (this.requestInfos.startDate === false && this.requestInfos.endDate === false)) {

                    this.requestInfos.dateType = "liveDatas";

                } else {

                    this.requestInfos.dateType = "givenPeriodDatas";

                    if (this.requestInfos.startDate === "undefined" || this.requestInfos.startDate === false) {
                        this.requestInfos.startDate = this.dateFunctionalities.getFormattedCurrentDate();
                    }
                    if (this.requestInfos.endDate === "undefined" || this.requestInfos.endDate === false) {
                        this.requestInfos.endDate = "22-01-2020";
                    }

                }

            },
            getDatasFromDatesList: (datesList, startDate, endDate) => {

                //Return only the value corresponding to the startDate and the endDate

                if (typeof datesList !== "object") {
                    console.error("The getDatasFromDatesList frist argument has to be an object.");
                    return;
                }

                let startDateDatas;
                let endDateDatas;

                for (const [key, value] of Object.entries(datesList)) {

                    if (startDateDatas !== "" && endDateDatas !== "") {
                        //Stop the loop if the necessary datas have been retrieved
                        break;
                    }

                    if (this.utilitaryFunctions.dateFunctionalities.compareDate1ToDate2(key, startDate, "equal")) {
                        startDateDatas = value;
                    }

                    if (this.utilitaryFunctions.dateFunctionalities.compareDate1ToDate2(key, endDate, "equal")) {
                        endDateDatas = value;
                    }

                }

                return endDateDatas - startDateDatas;

            }
        },
        setRequestInfos: (params) => {

            if (typeof params !== "object") {

                console.error("The requestManager function parameter has to be an object.");
                return;

            } else {

                console.log(params);

                if (params.locationName === "undefined") {
                    console.error("You have to provide the location name of your search");
                    return;
                }
                if (params.requestedDatasType === "undefined") {
                    console.error("You have to provide the requestedDatasType of your search");
                    return;
                }
                this.requestInfos.locationName = params.locationName;
                this.requestInfos.requestedDatasType = params.requestedDatasType;
                this.CSMUtilitaryFunctions.locationFunctionalities.setLocationType(params.locationName);
                console.log(this.requestInfos);

            }

        },
        requestURLCreator: (baseURL, urlInfos) => {

            //Format base URL

            if (urlInfos.path) {

                let pathArray = urlInfos.path.split("/");

                for (let i = 0; i < pathArray.length; i++) {

                    if (/^:[a-zA-Z]{1,}:$/.test(pathArray[i])) {

                        const requestInfosKey = pathArray[i].split(":")[1];

                        pathArray[i] = this.requestInfos[requestInfosKey];

                    }

                }

                baseURL += pathArray.join("/");

            }

            //Add parameters
            //Params have to be filled manually considering they're not mandatory

            if (urlInfos.params) {

                baseURL += "?";
                let requestParameters = "";

                console.log(urlInfos.params);

                for (let i = 0; i < urlInfos.params.paramsList.length; i++) {

                    if (i !== 0) {
                        requestParameters += "&";
                    }

                    let currentParam = urlInfos.params.paramsList[i].split("=");
                    let currentParamValue = currentParam[1].split(":")[1];
                    urlInfos.params.manualValueInput && urlInfos.params.manualValueInput[currentParamValue] ? currentParamValue = encodeURIComponent(urlInfos.params.manualValueInput[currentParamValue]) : currentParamValue = encodeURIComponent(this.requestInfos[currentParamValue]);
                    currentParam[1] = currentParamValue;
                    currentParam = currentParam.join("=");

                    requestParameters += currentParam;

                }

                baseURL += requestParameters;

            }

            return baseURL;

        }
    }
    requestRouter = () => {

        return new Promise((resolve, reject) => {

            let requestResults = {};
            console.log(this.requestInfos);

            if (this.requestInfos.requestedDatasType === "allDatas" || this.requestInfos.requestedDatasType === "liveDatas") {

                requestResults.liveRawDatas = {};

                this.requestSender(this.requestURL.baseURL, {path: this.requestURL.paths.cases.path})
                .then(response => {
                    requestResults.liveRawDatas = response;
                })
                .catch(() => {
                    reject(false);
                });

            }

            if (this.requestInfos.requestedDatasType === "periodDatas" || this.requestInfos.requestedDatasType === "allDatas") {

                requestResults.periodEvolutionDatas = {};

                this.requestSender(this.requestURL.baseURL, {path: this.requestURL.paths.history.path, params: {paramsList: this.requestURL.paths.history.parameters, manualValueInput: {status: "confirmed"}}})
                    .then(response => {
                        requestResults.periodEvolutionDatas.confirmed = response;
                        this.requestSender(this.requestURL.baseURL, {path: this.requestURL.paths.history.path, params: {paramsList: this.requestURL.paths.history.parameters, manualValueInput: {status: "deaths"}}})
                        .then(response => {
                            requestResults.periodEvolutionDatas.deaths = response;
                            this.requestSender(this.requestURL.baseURL, {path: this.requestURL.paths.history.path, params: {paramsList: this.requestURL.paths.history.parameters, manualValueInput: {status: "recovered"}}})
                            .then(response => {
                                requestResults.periodEvolutionDatas.recovered = response;
                                resolve(requestResults);
                            })
                        })
                    })
                    .catch(() => {
                        reject(false);
                    })

            }

            console.log(this.requestInfos);

            resolve(requestResults);

        });

    }
    requestSender = (url, urlInfos = false) => {

        //Expected input: url, {path: urlPath, params: {paramsList: ["country=:country:"], manualInputValue: {country: France}}}
        //The manualInputValue keys object have to be the same as the paramsList placeholders (in this example manualInputValue.country
        //is the same as :country: contained the paramsList array)

        return new Promise((resolve, reject) => {

            if (urlInfos !== false) {
                url = this.CSMUtilitaryFunctions.requestURLCreator(url, urlInfos);
            }
            console.log(url);

            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.addEventListener("readystatechange", () => {

                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

                    let response = JSON.parse(xhr.responseText);
                    console.log(response);

                    if (response) {
                        resolve(response);
                    } else {
                        reject(false);
                    }

                }

            });
            xhr.send();

        });

    }
}