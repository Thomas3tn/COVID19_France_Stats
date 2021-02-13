export default class DatasManager {
    constructor() {

        //Liste tout département pour donnée jusqu'à un certain jour (données comprennent tout les jour précéndets)
        this.departementsListByDate = "https://coronavirusapi-france.now.sh/AllDataByDate";

        this.authorizedLocations = {
            countryNames: {
                locationName: "France",
                locationType: "country",
                acceptedValue: "france",
                sourceType: "ministere-sante"
            },
            departementsListNames: {
                locationName: "Tous départements",
                locationType: "departementsList",
                acceptedValue: "departementsList",
                sourceType: "sante-publique-france-data"
            },
            departementsNames: {
                locationType: "departement",
                sourceType: "sante-publique-france-data",
                acceptedValues: [
                    {locationName: "Ain", acceptedValues: "ain"},
                    {locationName: "Aisne", acceptedValues: "aisne"},
                    {locationName: "Allier", acceptedValues: "allier"},
                    {locationName: "Alpes-de-Haute-Provence", acceptedValues: "alpes-de-haute-provence"},
                    {locationName: "Hautes-Alpes", acceptedValues: "hautes-alpes"},
                    {locationName: "Alpes-Maritimes", acceptedValues: "alpes-maritimes"},
                    {locationName: "Ardèche", acceptedValues: "ardeche"},
                    {locationName: "Ardennes", acceptedValues: "ardennes"},
                    {locationName: "Ariège", acceptedValues: "ariege"},
                    {locationName: "Aube", acceptedValues: "aube"},
                    {locationName: "Aude", acceptedValues: "aude"},
                    {locationName: "Aveyron", acceptedValues: "aveyron"},
                    {locationName: "Bouches-du-Rhône", acceptedValues: "bouches-du-rhone"},
                    {locationName: "Calvados", acceptedValues: "calvados"},
                    {locationName: "Cantal", acceptedValues: "cantal"},
                    {locationName: "Charente", acceptedValues: "charente"},
                    {locationName: "Charente-Maritime", acceptedValues: "charente-maritime"},
                    {locationName: "Cher", acceptedValues: "cher"},
                    {locationName: "Corrèze", acceptedValues: "correze"},
                    {locationName: "Corse-du-Sud", acceptedValues: "corse-du-sud"},
                    {locationName: "Haute-Corse", acceptedValues: "haute-corse"},
                    {locationName: "Côte-d'Or", acceptedValues: "cote-d-or"},
                    {locationName: "Côtes d'Armor", acceptedValues: "cotes-d-armor"},
                    {locationName: "Creuse", acceptedValues: "creuse"},
                    {locationName: "Dordogne", acceptedValues: "dordogne"},
                    {locationName: "Doubs", acceptedValues: "doubs"},
                    {locationName: "Drôme", acceptedValues: "drome"},
                    {locationName: "Eure", acceptedValues: "eure"},
                    {locationName: "Eure-et-Loir", acceptedValues: "eure-et-loir"},
                    {locationName: "Finistère", acceptedValues: "finistere"},
                    {locationName: "Gard", acceptedValues: "gard"},
                    {locationName: "Haute-Garonne", acceptedValues: "haute-garonne"},
                    {locationName: "Gers", acceptedValues: "gers"},
                    {locationName: "Gironde", acceptedValues: "gironde"},
                    {locationName: "Hérault", acceptedValues: "herault"},
                    {locationName: "Ille-et-Vilaine", acceptedValues: "ille-et-vilaine"},
                    {locationName: "Indre", acceptedValues: "indre"},
                    {locationName: "Indre-et-Loire", acceptedValues: "indre-et-loire"},
                    {locationName: "Isère", acceptedValues: "isere"},
                    {locationName: "Jura", acceptedValues: "jura"},
                    {locationName: "Landes", acceptedValues: "landres"},
                    {locationName: "Loir-et-Cher", acceptedValues: "loir-et-cher"},
                    {locationName: "Loire", acceptedValues: "loire"},
                    {locationName: "Haute-Loire", acceptedValues: "haute-loire"},
                    {locationName: "Loire-Atlantique", acceptedValues: "loire-atlantique"},
                    {locationName: "Loiret", acceptedValues: "loiret"},
                    {locationName: "Lot", acceptedValues: "lot"},
                    {locationName: "Lot-et-Garonne", acceptedValues: "lot-et-garonne"},
                    {locationName: "Lozère", acceptedValues: "lozere"},
                    {locationName: "Maine-et-Loire", acceptedValues: "maine-et-loire"},
                    {locationName: "Manche", acceptedValues: "manche"},
                    {locationName: "Marne", acceptedValues: "marne"},
                    {locationName: "Haute-Marne", acceptedValues: "haute-marne"},
                    {locationName: "Mayenne", acceptedValues: "mayenne"},
                    {locationName: "Meurthe-et-Moselle", acceptedValues: "meurthe-et-moselle"},
                    {locationName: "Meuse", acceptedValues: "meuse"},
                    {locationName: "Morbihan", acceptedValues: "morbihan"},
                    {locationName: "Moselle", acceptedValues: "moselle"},
                    {locationName: "Nièvre", acceptedValues: "nievre"},
                    {locationName: "Nord", acceptedValues: "nord"},
                    {locationName: "Oise", acceptedValues: "oise"},
                    {locationName: "Orne", acceptedValues: "orne"},
                    {locationName: "Pas-de-Calais", acceptedValues: "pas-de-calais"},
                    {locationName: "Puy-de-Dôme", acceptedValues: "puy-de-dome"},
                    {locationName: "Pyrénées-Atlantiques", acceptedValues: "pyrenees-atlantiques"},
                    {locationName: "Hautes-Pyrénées", acceptedValues: "hautes-pyrenees"},
                    {locationName: "Pyrénées-Orientales", acceptedValues: "pyrenees-orientales"},
                    {locationName: "Bas-Rhin", acceptedValues: "bas-rhin"},
                    {locationName: "Haut-Rhin", acceptedValues: "haut-rhin"},
                    {locationName: "Rhône", acceptedValues: "rhone"},
                    {locationName: "Haute-Saône", acceptedValues: "haute-saone"},
                    {locationName: "Saône-et-Loire", acceptedValues: "saone-et-loire"},
                    {locationName: "Sarthe", acceptedValues: "sarthe"},
                    {locationName: "Savoie", acceptedValues: "savoie"},
                    {locationName: "Haute-Savoie", acceptedValues: "haute-savoie"},
                    {locationName: "Paris", acceptedValues: "paris"},
                    {locationName: "Seine-Maritime", acceptedValues: "seine-et-maritime"},
                    {locationName: "Seine-et-Marne", acceptedValues: "seine-et-marne"},
                    {locationName: "Yvelines", acceptedValues: "yvelines"},
                    {locationName: "Deux-Sèvres", acceptedValues: "deux-sevres"},
                    {locationName: "Somme", acceptedValues: "somme"},
                    {locationName: "Tarn", acceptedValues: "tarn"},
                    {locationName: "Tarn-et-Garonne", acceptedValues: "tarn-et-garonne"},
                    {locationName: "Var", acceptedValues: "var"},
                    {locationName: "Vaucluse", acceptedValues: "vaucluse"},
                    {locationName: "Vendée", acceptedValues: "vendee"},
                    {locationName: "Vienne", acceptedValues: "vienne"},
                    {locationName: "Haute-Vienne", acceptedValues: "haute-vienne"},
                    {locationName: "Vosges", acceptedValues: "vosges"},
                    {locationName: "Yonne", acceptedValues: "yonne"},
                    {locationName: "Territoire de Belfort", acceptedValues: "territoire de belfort"},
                    {locationName: "Essonne", acceptedValues: "essonne"},
                    {locationName: "Hauts-de-Seine", acceptedValues: "hautes-de-seine"},
                    {locationName: "Seine-St-Denis", acceptedValues: "seine-st-denis"},
                    {locationName: "Val-de-Marne", acceptedValues: "val-de-marne"},
                    {locationName: "Val-D'Oise", acceptedValues: "val-d-oise"},
                    {locationName: "Guadeloupe", acceptedValues: "guadeloupe"},
                    {locationName: "Martinique", acceptedValues: "martinique"},
                    {locationName: "Guyane", acceptedValues: "guyane"},
                    {locationName: "La Réunion", acceptedValues: "la-reunion"},
                    {locationName: "Mayotte", acceptedValues: "mayotte"}
                ]
            }
            
        }

        this.requestInfos = {
            locationName: "",
            locationType: "",
            date: "",
            dateType: "",
            sourceType: ""
        }

    }
    requestManager = (params) => {

        return new Promise((resolve, reject) => {

            const requestInfosOutcome = this.setRequestInfos(params);
            if (requestInfosOutcome === false) {

                console.error("You have to provide the necessary request informations (location).");
                return;

            } else {

                this.requestRouter()
                .then((response) => {

                    //If user tried to access current datas of the day that are not available yet
                    //A request is send again requesting the day before
                    if (response.datas1.allFranceDataByDate.length === 0) {
                        this.requestInfos.date = this.utilitaryFunctions.dateFunctionalities.getDayBeforeDate(this.requestInfos.date);
                        console.log("New Request !");
                        this.requestRouter()
                        .then((response) => {
                            console.log(response);
                            let formattedDatas = this.datasProcessings.datasProcessingRouter(response);
                            console.log(formattedDatas);
                            if (formattedDatas) {
                                resolve(formattedDatas);
                            } else {
                                reject(false);
                            }

                        })
                        .catch((error) => {
                            reject(error);
                        });
                    }

                    let formattedDatas = this.datasProcessing.datasProcessingRouter(response);

                    console.log(formattedDatas)
                    if (formattedDatas) {
                        resolve(formattedDatas);
                    } else {
                        reject(false);
                    }
                    

                })
                .catch((error) => {

                    reject(error);

                });

            }

        });

        

    }
    datasFormatting = {
        datasFormattingRouter: (datas) => {

            let formattedDatas;

            if (this.requestInfos.locationType === "departementsList") {
                formattedDatas = this.datasFormatting.datasFormattingFunctions.locationsListFormattedDatas(datas);
            } else {
                formattedDatas = this.datasFormatting.datasFormattingFunctions.oneLocationFormattedDatas(datas);
            }

            return formattedDatas;

        },
        datasFormattingFunctions: {
            oneLocationFormattedDatas: (datas) => {

                let returnedDatas = {};
                returnedDatas.requestInfos = {};
                returnedDatas.stats = {};
                returnedDatas.stats.statsHeader = {};
                returnedDatas.stats.statsBody = [];
    
                returnedDatas.requestInfos = this.requestInfos;
                returnedDatas.requestInfos.date = this.utilitaryFunctions.dateFunctionalities.addDateType(this.utilitaryFunctions.dateFunctionalities.enDateToFrDate(this.requestInfos.date));
                if (datas.code) {
                    returnedDatas.requestInfos.locationCode = datas.code;
                }
                if (datas.confirmedCases) {
                    returnedDatas.stats.statsHeader.statName = "Cas confirmés";
                    returnedDatas.stats.statsHeader.statNumber = this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.confirmedCases);
                }
    
                if (datas.hospitalizations && datas.intensiveCare) {
    
                    let currentSection = {
                        statSectionTitle: "Hôpital", 
                        stat1: {
                            statName: "Hospitalisations",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.hospitalizations)
                        },
                        stat2: {
                            statName: "Réanimations",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.intensiveCare)
                        }
                    }
                    returnedDatas.stats.statsBody.push(currentSection);
    
                }
                if (datas.ehpadConfirmedCases && datas.ehpadDeaths) {
    
                    let currentSection = {
                        statSectionTitle: "EHPAD", 
                        stat1: {
                            statName: "Cas Confirmés",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.ehpadConfirmedCases)
                        },
                        stat2: {
                            statName: "Décès",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.ehpadDeaths)
                        }
                    }
                    returnedDatas.stats.statsBody.push(currentSection);
    
                }
                if (datas.cured && datas.deaths) {
    
                    let currentSection = {
                        statSectionTitle: "Issue", 
                        stat1: {
                            statName: "Guéris",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.cured)
                        },
                        stat2: {
                            statName: "Décès",
                            statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(datas.deaths)
                        }
                    }
                    returnedDatas.stats.statsBody.push(currentSection);
    
                }
    
                return returnedDatas;

            },
            locationsListFormattedDatas: (datas) => {

                let returnedDatas = {};
                returnedDatas.requestInfos = {};
                returnedDatas.departementsList = [];
    
                returnedDatas.requestInfos = this.requestInfos;
                returnedDatas.requestInfos.date = this.utilitaryFunctions.dateFunctionalities.addDateType(this.utilitaryFunctions.dateFunctionalities.enDateToFrDate(this.requestInfos.date));

                for (const [key, value] of Object.entries(datas)) {

                    console.log(key);
                    let currentLocation = {};

                    currentLocation.departementName = value.departementName;
                    currentLocation.sections = [];

                    if (value.hospitalizations && value.intensiveCare) {
                        let hospitalStats = {
                            statSectionTitle: "Hôpital",
                            stat1: {
                                statName: "Hospitalisations",
                                statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(value.hospitalizations)
                            },
                            stat2: {
                                statName: "Réanimations",
                                statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(value.intensiveCare)
                            }
                        }
                        currentLocation.sections.push(hospitalStats);
                    }

                    if (value.cured && value.deaths) {
                        let outcomeStats = {
                            statSectionTitle: "Issue",
                            stat1: {
                                statName: "Guéris",
                                statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(value.cured)
                            },
                            stat2: {
                                statName: "Décès",
                                statNumber: this.utilitaryFunctions.numberFunctionalities.convertStatNumberToStatString(value.deaths)
                            }
                        }
                        currentLocation.sections.push(outcomeStats);
                    }

                    returnedDatas.departementsList.push(currentLocation);

                }

                console.log(returnedDatas);
                return returnedDatas;

            }
        }
    }
    utilitaryFunctions = {
        dateFunctionalities: {
            formatDateToTwoDigits: (date) => {

                let newDate = new Date(date);
                let year = newDate.getFullYear();
                let month = newDate.getMonth() + 1;
                let day = newDate.getDate();
                if (month >= 0 && month <= 9) {
                month = "0" + month;
                }
                if (day >= 0 && day <= 9) {
                day = "0" + day;
                }
                let dateString = year + "-" + month + "-" + day;
                return dateString;
    
            },
            getFormattedCurrentDate: () => {
    
                let today = new Date();
                let currentDate = today.getFullYear() + "-" + today.getMonth()+1 + "-" + today.getDate();
                currentDate = this.utilitaryFunctions.dateFunctionalities.formatDateToTwoDigits(currentDate);
                return currentDate;
    
            },
            isDate1SupDate2: (date1, date2) => {
    
                let date1Year = date1.split("-")[0];
                let date1Month = date1.split("-")[1];
                let date1Day = date1.split("-")[2];
    
                let date2Year = date2.split("-")[0];
                let date2Month = date2.split("-")[1];
                let date2Day = date2.split("-")[2];
    
                let dateOne = new Date(date1Year, date1Month, date1Day);
                let dateTwo = new Date(date2Year, date2Month, date2Day);
    
                if (dateOne > dateTwo) {
    
                    return true
    
                } else {
    
                    return false;
    
                }
    
            },
            isDateisToday: (date) => {

                let currentDate = this.utilitaryFunctions.dateFunctionalities.getFormattedCurrentDate();
                if (currentDate === date) {
                    return true;
                } else {
                    return false;
                }
    
            },
            getDayBeforeDate: (date) => {

                date = new Date(date);
                let newDate = new Date(date.setDate(date.getDate() - 1));
                let finalDate =  newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                finalDate = this.utilitaryFunctions.dateFunctionalities.formatDateToTwoDigits(finalDate);
                return finalDate;
            },
            addDateType: (date) => {

                let text;

                if (this.requestInfos.dateType === "oneDayDatas") {
                    text = "Situation le ";
                } else if (this.requestInfos.dateType === "givenPeriodDatas") {
                    text = "Situation jusqu'au ";
                } else if (this.requestInfos.dateType === "liveDatas") {
                    text = "Situation actuelle";
                    return text;
                }

                let newDate = text + date;
                return newDate;

            },
            enDateToFrDate: (date) => {

                return date.split("-").reverse().join("-");

            }
        },
        numberFunctionalities: {
            formatNumber: (number) => {

                if (typeof number === undefined || typeof number !== "number") {
                    console.error("The formatNumber function accept only a parameter which a number");
                    return;
                }
    
                number = number.toString().split("");
                let invertNumber = [];
                
                for (let i = number.length; i > 0; i--) {
                
                    invertNumber.push(number[i-1]);
                
                }
    
                let formatedInvertNumber = [];
                let b = 1;
                invertNumber.forEach((currentElement) => {
                
                    formatedInvertNumber.push(currentElement);
                
                    if (b % 3 === 0) {
                        formatedInvertNumber.push(".");
                    }
                    b = b + 1;
    
                });
    
                let finalNumber = [];
                
                for (let i = formatedInvertNumber.length; i > 0; i--) {
                
                    finalNumber.push(formatedInvertNumber[i-1]);
                
                }
    
                
                finalNumber = finalNumber.join("");
                return finalNumber;
    
            },
            convertStatNumberToStatString: (number, addSign = false) => {

                if (typeof number === "number") {

                    if (addSign === true && number > 0) {
    
                        number = number.toString();
                        return "+" + number
        
                    } else {
        
                        return number.toString();
        
                    }

                }
    
            }
        },
        locationFunctionalities: {
            isLocationAuthorized: (locationUserInput) => {

                for (const [key, value] of Object.entries(this.authorizedLocations)) {
    
                    if (key === "departementsNames") {
                        
                        let acceptedValues = value.acceptedValues;
    
                        for (let i = 0; i < acceptedValues.length; i++) {
    
                            if (acceptedValues[i].acceptedValues === locationUserInput) {
    
                                return {
                                    locationType: value.locationType,
                                    locationName: acceptedValues[i].locationName,
                                    sourceType: value.sourceType
                                };
    
                            }
    
                        }
    
                    } else {

                        if (value.acceptedValue === locationUserInput) {

                            return {
                                locationType: value.locationType,
                                locationName: value.locationName,
                                sourceType: value.sourceType
                            }

                        }
    
                    }
    
                }
    
                //If nothing has been found
                return false;
    
            },
            formatLocationInput: (value) => {
    
                let valueArray = value.trim().toLowerCase().split("");
                for (let i = 0; i < valueArray.length; i++) {
    
                    if (valueArray[i] === "à" || valueArray[i] === "â" || valueArray[i] === "ä") {
    
                        valueArray[i] === "a";
    
                    } else if (valueArray[i] === "é" || valueArray[i] === "è" | valueArray[i] === "ê" || valueArray[i] === "ë") {
    
                        valueArray[i] === "e";
    
                    } else if (valueArray[i] === "ï" || valueArray[i] === "î") {
    
                        valueArray[i] === "i";
    
                    } else if (valueArray[i] === "ô" || valueArray[i] === "ö") {
    
                        valueArray[i] === "o";
    
                    } else if (valueArray[i] === "ù" || valueArray[i] === "û" || valueArray[i] === "ü") {
    
                        valueArray[i] === "u";
    
                    } else if (valueArray[i] === "ÿ") {
    
                        valueArray[i] === "y";
    
                    } else if (valueArray[i] === "ç") {
    
                        valueArray[i] === "c";
    
                    } else if (valueArray[i] === " " || valueArray[i] === "'" || valueArray[i] === "\"") {
    
                        valueArray[i] === "-";
    
                    }
    
                }
    
                let newValue = valueArray.join("");
                return newValue;
    
            },
            addDepartementCode: (departementCode, departement = false) => {

                departementCode = "(" + departementCode.split("-")[1] + ")";

                if (departement === false) {
                    this.requestInfos.locationName = this.requestInfos.locationName + " " + departementCode;
                } else {
                    //If we need to do that for a departement list
                    departement = departement + " " + departementCode;
                    return departement;
                }

            }
        },        
        urlParamsCreater: (url, params = false) => {

            let location;
            let date;

            if (params !== false) {
                url = url + "?";
                if (params.location) {
                    location = encodeURIComponent(params.location);
                    location = "Departement=" + location;
                    url += location;
                }
                if (params.date) {
                    date = encodeURIComponent(params.date);
                    date = "date=" + date;
                    url += date;
                }
            }

            return url;

        }
    }
    datasProcessing = {
        datasProcessingRouter: (datasObject) => {

            let result;

            if (this.requestInfos.locationType === "country") {

                if (this.requestInfos.dateType === "oneDayDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getLocationDailyEvolution(datasObject.datas1, datasObject.datas2);
                } else if (this.requestInfos.dateType === "liveDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getOneLocationFromList(datasObject.datas1);
                } else if (this.requestInfos.dateType === "givenPeriodDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getOneLocationFromList(datasObject.datas1);
                }

            } else if (this.requestInfos.locationType === "departementsList") {

                if (this.requestInfos.dateType === "oneDayDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getLocationsListDailyEvolution(datasObject.datas1, datasObject.datas2);
                } else if (this.requestInfos.dateType === "liveDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getLocationsList(datasObject.datas1);
                } else if (this.requestInfos.dateType === "givenPeriodDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getLocationsList(datasObject.datas1);
                }

            } else if (this.requestInfos.locationType === "departement") {

                if (this.requestInfos.dateType === "oneDayDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getLocationDailyEvolution(datasObject.datas1, datasObject.datas2);
                } else if (this.requestInfos.dateType === "liveDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getOneLocationFromList(datasObject.datas1);
                } else if (this.requestInfos.dateType === "givenPeriodDatas") {
                    result = this.datasProcessing.datasProcessingFunctions.getOneLocationFromList(datasObject.datas1);
                }

            }

            return this.datasFormatting.datasFormattingRouter(result);

        },
        datasProcessingFunctions: {
            getOneLocationFromList: (datas) => {

                datas = datas.allFranceDataByDate;
                let newDatas = {};

                //Loop over all departements in the list
                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].nom === this.requestInfos.locationName && datas[i].sourceType === this.requestInfos.sourceType) {

                        if (datas[i].code) {
                            this.utilitaryFunctions.locationFunctionalities.addDepartementCode(datas[i].code);
                        }
                        this.requestInfos.sourceName = datas[i].source.nom;
                        if (datas[i].casConfirmes) {
                            newDatas.confirmedCases = datas[i].casConfirmes;
                        }
                        if (datas[i].casConfirmesEhpad && datas[i].decesEhpad) {
                            newDatas.retirementHomeConfirmedCases = datas[i].casConfirmesEhpad;
                            newDatas.retirementHomeDeaths = datas[i].decesEhpad;
                        }

                        newDatas.hospitalizations = datas[i].hospitalises;
                        newDatas.hospitalizations += datas[i].nouvellesHospitalisations;
                        newDatas.intensiveCare = datas[i].reanimation;
                        newDatas.intensiveCare += datas[i].nouvellesReanimations;               
                        newDatas.deaths = datas[i].deces;
                        newDatas.cured = datas[i].gueris;

                        break;

                    }

                }

                return newDatas;

            },
            getLocationDailyEvolution: (datas1, datas2) => {

                datas1 = datas1.allFranceDataByDate;

                for (let i = 0; i < datas1.length; i++) {

                    if (datas1[i].sourceType === this.requestInfos.sourceType && datas1[i].nom === this.requestInfos.locationName) {

                        datas1 = datas1[i];
                        break;

                    }

                }


                datas2 = datas2.allFranceDataByDate;

                for (let a = 0; a < datas2.length; a++) {

                    if (datas2[a].sourceType === this.requestInfos.sourceType && datas2[a].nom === this.requestInfos.locationName) {

                        datas2 = datas2[a];
                        break;

                    }

                }

                let newDatas = {};
                if (datas1.departementCode && datas2.departementCode) {
                    this.utilitaryFunctions.locationFunctionalities.addDepartementCode(datas1.departementCode);
                }
                this.requestInfos.sourceName = datas1.source.nom;
                if (datas2.casConfirmes && datas1.casConfirmes) {
                    newDatas.confirmedCases = datas2.casConfirmes - datas1.casConfirmes;
                }
                newDatas.deaths = datas2.deces - datas1.deces;
                newDatas.cured = datas2.gueris - datas1.gueris;
                newDatas.hospitalizations = (datas2.hospitalises + datas2.nouvellesHospitalisations) - (datas1.hospitalises + datas1.nouvellesHospitalisations);
                newDatas.intensiveCare = (datas2.reanimation + datas2.nouvellesReanimations) - (datas1.reanimation + datas1.nouvellesReanimations);
                if ((datas2.casConfirmesEhpad && datas1.casConfirmesEhpad) && (datas2.decesEhpad && datas1.Ehpad)) {
                    newDatas.ehpadConfirmedCases = datas2.casConfirmesEhpad - datas1.casConfirmesEhpad;
                    newDatas.ehpadDeaths = datas2.decesEhpad - datas1.decesEhpad;
                }
                return newDatas;

            },
            getLocationsList: (datas) => {
                console.log(datas);
                let newDatas = [];
                datas = datas.allFranceDataByDate;

                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].sourceType === this.requestInfos.sourceType && datas[i].nom !== this.authorizedLocations.countryNames.locationName) {

                        this.requestInfos.sourceName = datas[i].source.nom;
                        let currentDepartement = {};
                        currentDepartement.departementName = this.utilitaryFunctions.locationFunctionalities.addDepartementCode(datas[i].code, datas[i].nom);
                        currentDepartement.hospitalizations = datas[i].hospitalises;
                        currentDepartement.hospitalizations += datas[i].nouvellesHospitalisations;
                        currentDepartement.intensiveCare = datas[i].reanimation;
                        currentDepartement.intensiveCare += datas[i].nouvellesReanimations;
                        currentDepartement.deaths = datas[i].deces;
                        currentDepartement.cured = datas[i].gueris;

                        newDatas.push(currentDepartement);

                    }

                }

                console.log(newDatas)

                return newDatas;

            },
            getLocationsListDailyEvolution: (datas1, datas2) => {

                datas1 = datas1.allFranceDataByDate;
                datas2 = datas2.allFranceDataByDate;
                let newDatas = [];

                for (let i = 0; i < datas1.length; i++) {

                    if (datas1[i].sourceType === this.requestInfos.sourceType && datas1[i].nom !== this.authorizedLocations.countryNames.locationName) {

                        let currentDepartement = {};

                        for (let a = 0; a < datas2.length; a++) {

                            //If it's the same departement
                            if (datas2[a].sourceType === this.requestInfos.sourceType && datas2[a].nom === datas1[i].nom) {

                                currentDepartement.departementCode = datas1[i].code.split("-")[1];
                                currentDepartement.departementName = this.utilitaryFunctions.locationFunctionalities(datas1[i].code.split("-")[1], datas1[i].nom);//ERROR
                                currentDepartement.deaths = datas2[a].deces - datas1[i].deces;
                                currentDepartement.cured = datas2[a].gueris - datas1[i].gueris;
                                currentDepartement.hospitalizations = (datas2[a].hospitalises + datas2[a].nouvellesHospitalisations) - (datas1[i].hospitalises + datas1[i].nouvellesHospitalisations);
                                currentDepartement.intensiveCare = (datas2[a].reanimation + datas2[a].nouvellesReanimations) - (datas1[i].reanimation + datas1[i].nouvellesReanimations);

                                newDatas.push(currentDepartement);

                            }

                        }

                    }

                }

                return newDatas;

            }
        }
    }
    setRequestInfos = (params) => {

        console.log("Parameters: " + params);

        if (params !== false) {

            if (params.location) {

                //Find locationType, 
                let currentLocation = this.utilitaryFunctions.locationFunctionalities.isLocationAuthorized(params.location);

                if (currentLocation === false) {

                    console.error("The location provided hasn't been recognized.");
                    return false;

                } else {

                    this.requestInfos.locationName = currentLocation.locationName;
                    this.requestInfos.locationType = currentLocation.locationType;
                    this.requestInfos.sourceType = currentLocation.sourceType;

                }

                //Determine date request type

                if (params.date) {

                    this.requestInfos.date = params.date;
                    //let currentDate = this.utilitaryFunctions.dateFunctionalities.getFormattedCurrentDate();
                    this.requestInfos.isDateToday = this.utilitaryFunctions.dateFunctionalities.isDateisToday(this.requestInfos.date);
                    if (params.includeOnlyThisDay || params.includeOnlyThisDay) {
                        this.requestInfos.incOnlyThisDayData = true;
                    } else {
                        this.requestInfos.incOnlyThisDayData = false;
                    }
                    //isDateToday incOnlyThisDayData

                    if ((this.requestInfos.date !== undefined && this.requestInfos.isDateToday === true && this.requestInfos.incOnlyThisDayData === true) || (this.requestInfos.date !== undefined && this.requestInfos.isDateToday === false && this.requestInfos.incOnlyThisDayData === true)) {
                        //Données pour un jour uniquement
                        this.requestInfos.dateType = "oneDayDatas";
                    } else if ((this.requestInfos.date !== undefined && this.requestInfos.isDateToday === false && this.requestInfos.incOnlyThisDayData === false) || (this.requestInfos.date !== undefined && this.requestInfos.isDateToday === true && this.requestInfos.incOnlyThisDayData === false)) {
                        //Données pour une période données (début-date)
                        this.requestInfos.dateType = "givenPeriodDatas";
                    } else if ((this.requestInfos.date === false) || (this.requestInfos.date !== undefined && this.requestInfos.isDateToday === true && this.requestInfos.incOnlyThisDayData === false)) {
                        //Données depuis début
                        this.requestInfos.dateType = "liveDatas";
                    }

                } else {

                    this.requestInfos.date = false;

                }
            }

            console.log("Location: " + this.requestInfos.location + " | Date: " + this.requestInfos.date + " | isToday: " + this.requestInfos.isDateToday + " | includeOnlyThisDay: " + this.requestInfos.incOnlyThisDayData);
            console.log(this.requestInfos);

        } else {

            console.error("No parameters have been provided.");
            return;

        }

    }
    requestRouter = () => {

        return new Promise((resolve, reject) => {

            if (this.requestInfos.locationType === "country") {

                if (this.requestInfos.dateType === "oneDayDatas") {

                    //Renvoi l'évolution sur un jour

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((chosenDayDatas) => {

                        if (chosenDayDatas) {

                            let previousDay = this.utilitaryFunctions.dateFunctionalities.getDayBeforeDate(this.requestInfos.date);
                            this.requestSender(this.departementsListByDate, {date: previousDay})
                            .then((previousDayDatas) => {

                                resolve({datas1: chosenDayDatas, datas2: previousDayDatas});

                            });

                        } else {                           
                            reject(false);
                        }

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "liveDatas") {

                    //Situation de la France début-aujourd'hui

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {
                            
                            resolve({datas1: response});

                        } else {                       
                            reject(false);
                        }

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "givenPeriodDatas") {

                    //Situation de la France début-date

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {

                            resolve({datas1: response});

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                }

            } else if (this.requestInfos.locationType === "departementsList") {

                if (this.requestInfos.dateType === "oneDayDatas") {

                    //Situation pour tous départements pour jour unique
                
                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((chosenDayDatas) => {

                        if (chosenDayDatas) {

                            let previousDay = this.utilitaryFunctions.dateFunctionalities.getDayBeforeDate(this.requestInfos.date);
                            this.requestSender(this.departementsListByDate, {date: previousDay})
                            .then((previousDayDatas) => {

                                resolve({datas1: chosenDayDatas, datas2: previousDayDatas});

                            });

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "liveDatas") {

                    //Situation pour liste départements depuis début

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {

                            resolve({datas1: response});

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "givenPeriodDatas") {
                    //Situation pour tous les départements jusqu'à date donnée

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {

                            resolve({datas1: response});

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                }

            } else if (this.requestInfos.locationType === "departement") {

                if (this.requestInfos.dateType === "oneDayDatas") {

                    //Situation pour un seul département pour un jour uniquement

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((dayChosenDatas) => {

                        if (dayChosenDatas) {

                            let previousDay = this.utilitaryFunctions.dateFunctionalities.getDayBeforeDate(this.requestInfos.date);
                            this.requestSender(this.departementsListByDate, {date: previousDay})
                            .then((datasDayBefore) => {

                                resolve({datas1: dayChosenDatas, datas2: datasDayBefore});

                            });

                        } else {                           
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "liveDatas") {

                    //Situation pour un département depuis début

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {

                            resolve({datas1: response});

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (this.requestInfos.dateType === "givenPeriodDatas") {

                    //Situation pour un seul département depuis le début jusqu'à une date donnée

                    this.requestSender(this.departementsListByDate, {date: this.requestInfos.date})
                    .then((response) => {

                        if (response) {

                            resolve({datas1: response});

                        } else {                           
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                }

            } else {
                console.error("Wrong location.");
            }

        });

    }
    requestSender = (url, datas = false) => {

        return new Promise((resolve, reject) => {

            if (datas !== false) {
                url = this.utilitaryFunctions.urlParamsCreater(url, datas);
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