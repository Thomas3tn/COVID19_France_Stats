export default class DatasManager {
    constructor() {

        //Données échell France pour durée entière
        this.franceLiveData = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";
        //Données pour un département depuis début
        this.departementLiveData = "https://coronavirusapi-france.now.sh/LiveDataByDepartement";
        //Liste tout départements avec données depuis début
        this.departementsListLiveData = "https://coronavirusapi-france.now.sh/AllLiveData";
        //Liste tout département pour donnée jusqu'à un certain jour (données comprennent tout les jour précéndets)
        this.departementsListByDate = "https://coronavirusapi-france.now.sh/AllDataByDate";
        //Envoi toutes données disponibles (tout sources de données) pour un département (Permet de suivre une évolution)
        this.departementAllDataList = "https://coronavirusapi-france.now.sh/AllDataByDepartement";

        this.departementsList = ["Ain", "Aisne", "Allier", "Alpes-de-Haute-Provence", "Hautes-Alpes", "Alpes-Maritimes", "Ardèche", "Ardennes",
        "Ariège", "Aube", "Aude", "Aveyron", "Bouches-du-Rhône", "Calvados", "Cantal", "Charente", "Charente-Maritime", "Cher", "Corrèze",
        "Corse-du-Sud", "Haute-Corse", "Côte-d'Or", "Côtes d'Armor" ,"Creuse" ,"Dordogne", "Doubs", "Drôme", "Eure", "Eure-et-Loir",
        "Finistère", "Gard", "Haute-Garonne", "Gers", "Gironde", "Hérault", "Ille-et-Vilaine", "Indre", "Indre-et-Loire", "Isère", "Jura" ,
        "Landes", "Loir-et-Cher", "Loire", "Haute-Loire", "Loire-Atlantique", "Loiret", "Lot", "Lot-et-Garonne", "Lozère", "Maine-et-Loire",
        "Manche", "Marne", "Haute-Marne", "Mayenne", "Meurthe-et-Moselle", "Meuse", "Morbihan", "Moselle", "Nièvre", "Nord", "Oise", "Orne",
        "Pas-de-Calais", "Puy-de-Dôme", "Pyrénées-Atlantiques", "Hautes-Pyrénées", "Pyrénées-Orientales", "Bas-Rhin", "Haut-Rhin", "Rhône",
        "Haute-Saône", "Saône-et-Loire", "Sarthe", "Savoie", "Haute-Savoie", "Paris", "Seine-Maritime", "Seine-et-Marne", "Yvelines",
        "Deux-Sèvres", "Somme", "Tarn", "Tarn-et-Garonne", "Var", "Vaucluse", "Vendée", "Vienne", "Haute-Vienne", "Vosges", "Yonne",
        "Territoire de Belfort", "Essonne","Hauts-de-Seine","Seine-St-Denis","Val-de-Marne","Val-D'Oise","Guadeloupe","Martinique",
        "Guyane", "La Réunion", "Mayotte"];

    }
    utilitaryFunctions = {
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
            currentDate = this.utilitaryFunctions.formatDateToTwoDigits(currentDate);
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

        },
        isDateisToday: (date) => {

            let currentDate = this.utilitaryFunctions.getFormattedCurrentDate();
            if (currentDate === date) {
                return true;
            } else {
                return false;
            }

        },
        convertStatNumberToStatString: (number, addSign = false) => {

            if (addSign === true && number >= 0) {

                number = number.toString();
                return "+" + number

            } else {

                return number.toString();

            }

        },
        getDayBeforeDate: (date) => {

            date = new Date(date);
            let newDate = new Date(date.setDate(date.getDate() - 1));
            let finalDate =  newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
            finalDate = this.utilitaryFunctions.formatDateToTwoDigits(finalDate);
            return finalDate;
        }
    }
    datasProcessing = {
        getLiveDatas: (location, datas) => {
            
            //Renvoi données début-aujourd'hui

            if (location === "France") {

                var newDatas = {};
                datas = datas.FranceGlobalLiveData[0];

                newDatas.nom = datas.nom;
                newDatas.date = datas.date;
                newDatas.source = datas.source.nom;
                newDatas.confirmedCases = datas.casConfirmes;
                newDatas.deaths = datas.deces;
                newDatas.retirementHomeDeaths = datas.decesEhpad;
                newDatas.hospitalizations = datas.hospitalises;
                newDatas.hospitalizations += datas.nouvellesHospitalisations;
                newDatas.intensiveCare = datas.reanimation;
                newDatas.intensiveCare = datas.nouvellesReanimations;
                newDatas.retirementHomeConfirmedCases = datas.casConfirmesEhpad;
                return newDatas;

            } else if (location === "Tous départements") {

                let newDatas = [];
                datas = datas.allLiveFranceData;
                console.log(datas);

                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].sourceType === "sante-publique-france-data") {

                        let currentDepartement = {};

                        currentDepartement.departementCode = datas[i].code.split("-")[1];
                        currentDepartement.nom = datas[i].nom;
                        currentDepartement.hospitalizations = datas[i].hospitalises;
                        currentDepartement.intensiveCare = datas[i].reanimation;
                        currentDepartement.deaths = datas[i].deces;
                        currentDepartement.cured = datas[i].gueris;

                        newDatas.push(currentDepartement);

                    }

                }

                return newDatas;

            } else if (location === "Vosges") {

                let newDatas = {};
                datas = datas.LiveDataByDepartement[0];

                newDatas.departementCode = datas.code;
                newDatas.nom = datas.nom;
                newDatas.date = datas.date;
                newDatas.hospitalizations = datas.hospitalises;
                newDatas.intensiveCare = datas.reanimation;
                newDatas.deaths = datas.deces;
                newDatas.cured = datas.gueris;
                newDatas.source = datas.source.nom;
                return newDatas;

                //Ou parcourir liste dep pour trouver dep à date donnée

            }

        },
        //Addtionner nouvelles rea/hosp
        getOneDayDatas: (location, datas1, datas2, sourceType) => {

            if (location === "France") {

                datas1 = datas1.allFranceDataByDate;

                for (let i = 0; i < datas1.length; i++) {

                    if (datas1[i].sourceType === sourceType && datas1[i].nom === location) {

                        datas1 = datas1[i];
                        break;

                    }

                }


                datas2 = datas2.allFranceDataByDate;

                for (let a = 0; a < datas2.length; a++) {

                    if (datas2[a].sourceType === sourceType && datas2[a].nom === location) {

                        datas2 = datas2[a];
                        break;

                    }

                }

                let newDatas = {};
                newDatas.confirmedCases = datas2.casConfirmes - datas1.casConfirmes;
                newDatas.deaths = datas2.deces - datas1.deces;
                newDatas.cured = datas2.gueris - datas1.gueris;
                newDatas.hospitalizations = (datas2.hospitalises + datas2.nouvellesHospitalisations) - (datas1.hospitalises + datas1.nouvellesHospitalisations);
                newDatas.intensiveCare = (datas2.reanimation + datas2.nouvellesReanimations) - (datas1.reanimation + datas1.nouvellesReanimations);
                newDatas.ehpadConfirmedCases = datas2.casConfirmesEhpad - datas1.casConfirmesEhpad;
                newDatas.ehpadDeaths = datas2.decesEhpad - datas1.decesEhpad;
                return newDatas;

            } else if (location === "Tous départements") {

                datas1 = datas1.allFranceDataByDate;
                datas2 = datas2.allFranceDataByDate;
                let newDatas = [];

                for (let i = 0; i < datas1.length; i++) {

                    if (datas1[i].sourceType === sourceType) {

                        let currentDepartement = {};

                        for (let a = 0; a < datas2.length; a++) {

                            //If it's the same departement
                            if (datas2[a].sourceType === sourceType && datas2[a].nom === datas1[i].nom) {

                                currentDepartement.name = datas1[i].nom;
                                currentDepartement.code = datas1[i].code.split("-")[1];
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

            } else if (location === "Vosges") {

                datas1 = datas1.allFranceDataByDate;

                for (let i = 0; i < datas1.length; i++) {

                    if (datas1[i].sourceType === sourceType && datas1[i].nom === location) {

                        datas1 = datas1[i];
                        break;

                    }

                }

                console.log(datas1);

                datas2 = datas2.allFranceDataByDate;

                for (let a = 0; a < datas2.length; a++) {

                    if (datas2[a].sourceType === sourceType && datas2[a].nom === location) {

                        datas2 = datas2[a];
                        break;

                    }

                }

                console.log(datas2);

                let newDatas = {};
                newDatas.deaths = datas2.deces - datas1.deces;
                newDatas.cured = datas2.gueris - datas1.gueris;
                newDatas.hospitalizations = (datas2.hospitalises + datas2.nouvellesHospitalisations) - (datas1.hospitalises + datas1.nouvellesHospitalisations);
                newDatas.intensiveCare = (datas2.reanimation + datas2.nouvellesReanimations) - (datas1.reanimation + datas1.nouvellesReanimations);
                return newDatas;

            }

        },
        getGivenPeriodDatas: (location, datas, sourceType) => {
            //Retourne données début-date donnée

            if (location === "France") {

                datas = datas.allFranceDataByDate;
                let newDatas = {};

                //Loop over all departements in the list
                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].nom === location && datas[i].sourceType === sourceType) {

                        newDatas.confirmedCases = datas[i].casConfirmes;
                        newDatas.hospitalizations = datas[i].hospitalises;
                        newDatas.hospitalizations += datas[i].nouvellesHospitalisations;
                        newDatas.intensiveCare = datas[i].reanimation;
                        newDatas.intensiveCare += datas[i].nouvellesReanimations;               
                        newDatas.deaths = datas[i].deces;
                        newDatas.cured = datas[i].gueris;
                        newDatas.retirementHomeConfirmedCases = datas[i].casConfirmesEhpad;
                        newDatas.retirementHomeDeaths = datas[i].decesEhpad;
                        break;

                    }

                }

                return newDatas;

            } else if (location === "Tous départements") {
                
                let newDatas = [];
                datas = datas.allFranceDataByDate;

                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].sourceType === sourceType && datas[i].nom !== "France") {

                        let currentDepartement = {};
                        currentDepartement.departementCode = datas[i].code.split("-")[1];
                        currentDepartement.nom = datas[i].nom;
                        currentDepartement.hospitalizations = datas[i].hospitalises;
                        currentDepartement.hospitalizations += datas[i].nouvellesHospitalisations;
                        currentDepartement.intensiveCare = datas[i].reanimation;
                        currentDepartement.intensiveCare += datas[i].nouvellesReanimations;
                        currentDepartement.deaths = datas[i].deces;
                        currentDepartement.cured = datas[i].gueris;

                        newDatas.push(currentDepartement);

                    }

                }

                return newDatas;

            } else if (location === "Vosges") {

                datas = datas.allFranceDataByDate;
                let newDatas = {};

                //Loop over all departements in the list
                for (let i = 0; i < datas.length; i++) {

                    if (datas[i].nom === location && datas[i].sourceType === sourceType) {

                        newDatas.confirmedCases = datas[i].casConfirmes;
                        newDatas.hospitalizations = datas[i].hospitalises;
                        newDatas.hospitalizations += datas[i].nouvellesHospitalisations;
                        newDatas.intensiveCare = datas[i].reanimation;
                        newDatas.intensiveCare += datas[i].nouvellesReanimations;               
                        newDatas.deaths = datas[i].deces;
                        newDatas.cured = datas[i].gueris;
                        newDatas.retirementHomeConfirmedCases = datas[i].casConfirmesEhpad;
                        newDatas.retirementHomeDeaths = datas[i].decesEhpad;
                        break;

                    }

                }

                return newDatas;

            }

        }
    }
    userRequestRouter = (params = false) => {

        return new Promise((resolve, reject) => {

            console.log("Parameters: " + params);
            let location = "";
            let date = "";
            let incOnlyThisDayData = "";

            if (params !== false) {

                if (params.location) {
                    location = params.location;
                } else {
                    console.error("No location has been provided");
                }
                if (params.date) {
                    date = params.date;
                } else {
                    date = false;
                }
                if (params.includeOnlyThisDay) {
                    incOnlyThisDayData = params.includeOnlyThisDay;
                } else {
                    incOnlyThisDayData = false;
                }

            }

            let currentDate = this.utilitaryFunctions.getFormattedCurrentDate();
            let isDateToday = this.utilitaryFunctions.isDateisToday(date);
            console.log("Form date: " + date + " | currentDate: " + currentDate);
            console.log("Location: " + location + " | Date: " + date + " | isToday: " + isDateToday + " | includeOnlyThisDay: " + incOnlyThisDayData);
            let result;

            if (location === "France") {

                if ((date !== undefined && incOnlyThisDayData === true)) {
                    //Renvoi l'évolution sur un jour

                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((chosenDayDatas) => {

                        if (chosenDayDatas) {

                            date = this.utilitaryFunctions.getDayBeforeDate(date);
                            this.requestHandler(this.departementsListByDate, {date: date})
                            .then((previousDayDatas) => {

                                result = this.datasProcessing.getOneDayDatas(location, previousDayDatas, chosenDayDatas, "ministere-sante");
                                console.log(result);
                                resolve(result);

                            });

                        } else {                           
                            reject(false);
                        }

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if ((date === false) || (date !== undefined && isDateToday === true && incOnlyThisDayData === false)) {
                    //Situation de la France début-aujourd'hui
                    console.log("Entrée");
                    this.requestHandler(this.franceLiveData)
                    .then((response) => {

                        if (response) {
                            console.log(response);
                            result = this.datasProcessing.getLiveDatas(location, response);
                            console.log(result);
                            resolve(result);

                        } else {                       
                            reject(false);
                        }

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (date !== undefined && isDateToday === false && incOnlyThisDayData === false) {
                    //Situation de la France début-date

                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((response) => {

                        if (response) {

                            result = this.datasProcessing.getGivenPeriodDatas(location, response, "ministere-sante");
                            console.log(result);
                            resolve(result);

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                }

            } else if (location === "Tous départements") {

                if ((date === false) || (date !== undefined && isDateToday === true && incOnlyThisDayData === false)) {
                    //Situation pour liste départements depuis début

                    this.requestHandler(this.departementsListLiveData)
                    .then((response) => {

                        if (response) {

                            result = this.datasProcessing.getLiveDatas(location, response);
                            console.log(result);
                            resolve(result);

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if ((date !== undefined && isDateToday === true && incOnlyThisDayData === true) ||(date !== undefined && isDateToday === false && incOnlyThisDayData === true)) {
                    //Situation pour tous départements pour jour unique
                
                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((chosenDayDatas) => {

                        if (chosenDayDatas) {

                            date = this.utilitaryFunctions.getDayBeforeDate(date);
                            this.requestHandler(this.departementsListByDate, {date: date})
                            .then((previousDayDatas) => {

                                result = this.datasProcessing.getOneDayDatas(location, previousDayDatas, chosenDayDatas, "sante-publique-france-data");
                                console.log(result);
                                resolve(result);

                            });

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if ((date !== undefined && isDateToday === false && incOnlyThisDayData === false) || (date !== undefined && isDateToday === true && incOnlyThisDayData === false)) {
                    //Situation pour tous les départements jusqu'à date donnée

                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((response) => {

                        if (response) {

                            result = this.datasProcessing.getGivenPeriodDatas(location, response, "sante-publique-france-data");
                            console.log(result);
                            resolve(result);

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                }

            } else if (location === "Vosges") {

                if ((date === false) || (date !== false && isDateToday === true && incOnlyThisDayData === false)) {
                    //Situation pour un département depuis début

                    this.requestHandler(this.departementLiveData, {location: location})
                    .then((response) => {

                        if (response) {

                            result = this.datasProcessing.getLiveDatas(location, response);
                            console.log(result);
                            resolve(result);

                        } else {                       
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if ((date !== undefined && isDateToday === true && incOnlyThisDayData === true) || (date !== undefined && isDateToday === false && incOnlyThisDayData === true)) {
                    //Situation pour un seul département pour un jour uniquement

                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((response) => {

                        if (response) {

                            let dayChosenDatas = response;
                            date = this.utilitaryFunctions.getDayBeforeDate(date);
                            this.requestHandler(this.departementsListByDate, {date: date})
                            .then((datasDayBefore) => {

                                result = this.datasProcessing.getOneDayDatas(location, datasDayBefore, dayChosenDatas, "sante-publique-france-data");
                                console.log(result);
                                resolve(result);

                            });

                        } else {                           
                            reject(false);
                        }
                        

                    })
                    .catch((response) => {
                        console.log(response);
                    });

                } else if (date !== undefined && isDateToday === false && incOnlyThisDayData === false) {
                    //Situation pour un seul département depuis le début jusqu'à une date donnée

                    this.requestHandler(this.departementsListByDate, {date: date})
                    .then((response) => {

                        if (response) {

                            result = this.datasProcessing.getGivenPeriodDatas(location, response, "sante-publique-france-data");
                            console.log(result);
                            resolve(result);

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

        //To check if it's the currentDay compare the date input to javascript current date system (Delete checkbox)

    }
    requestHandler = (url, datas = false) => {

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