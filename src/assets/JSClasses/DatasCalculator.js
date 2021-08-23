//Contain all methods that convert, transform or create news datas from existing ones

export default class DatasCalculator {
    translationFunctionalities = {
        getTranslatedKeyFromEng(key) {

            let currentKey = "";
            switch (key) {
                case "confirmed":
                    currentKey = "Cas confirmés";
                    break;
            
                case "deaths":
                    currentKey = "Décès";
                    break;
                
                case "recovered":
                    currentKey = "Guéris";
                    break;
                
                case "administered":
                    currentKey = "Doses administrées";
                    break;
                
                case "people_vaccinated":
                    currentKey = "Personnes vaccinées";
                    break;
                
                case "people_partially_vaccinated":
                    currentKey = "Personnes partiellement vaccinées";
                    break;

                case "population":
                    currentKey = "Population non vaccinée";
                    break;

                case "hospitalizations":
                    currentKey = "Hospitalisations";
                    break;

                case "new_hospitalizations":
                    currentKey = "Nouvelles hospitalisations";
                    break;

                case "intensive_care":
                    currentKey = "Réanimations";
                    break;

                case "new_intensive_care":
                    currentKey = "Nouvelles réanimations";
                    break;
            
                default:
                    currentKey = key;
                    break;
            }

            return currentKey;

        },
        getTranslatedKeyFromFra(key) {

            let currentKey = "";
            switch (key) {
                case "deces":
                    currentKey = "deaths";
                    break;
            
                case "gueris":
                    currentKey = "recovered";
                    break;
                
                case "hospitalises":
                    currentKey = "hospitalizations";
                    break;
                
                case "reanimation":
                    currentKey = "intensive_care";
                    break;
                
                case "nouvellesHospitalisations":
                    currentKey = "new_hospitalizations";
                    break;
                
                case "nouvellesReanimations":
                    currentKey = "new_intensive_care";
                    break;
            
                default:
                    currentKey = key;
                    break;
            }

            return currentKey;

        }
    }
    datasListFunctionalities = {
        getWeeklyDailyEvolution(dataset, dateTypeToReturn = false) {

            const dateTypeToReturnAuthKeys = ["weeklyEvolution", "dailyEvolution"];

            if (dateTypeToReturn !== false && dateTypeToReturnAuthKeys.includes(dateTypeToReturn) === false) {
                console.error("The getWeeklyDailyEvolution function second optional parameter accept only three value: false (default), 'weeklyEvolution' or 'dailyEvolution'");
                return;
            }

            let counter = 1;
            let todayDatas, yesterdayDatas, weekAgoData, dailyDatas, weeklyDatas;

            for (const keyValue of Object.entries(dataset)) {

                if (counter === 1) {
                    todayDatas = keyValue[1];
                }

                if (counter === 2 && (dateTypeToReturn === false || dateTypeToReturn === "dailyEvolution")) {
                    yesterdayDatas = keyValue[1];
                    dailyDatas = todayDatas - yesterdayDatas;
                }

                if (counter === 7 && (dateTypeToReturn === false || dateTypeToReturn === "weeklyEvolution")) {
                    weekAgoData = keyValue[1];
                    weeklyDatas = todayDatas - weekAgoData;
                    break;
                }

                counter++;

            }

            if (typeof dailyDatas !== "undefined" && typeof weeklyDatas !== "undefined") {
                return { dailyDatas, weeklyDatas };
            } else {
                if (typeof dailyDatas !== "undefined" && typeof weeklyDatas === "undefined") {
                    return dailyDatas;
                } else if (typeof weeklyDatas !== "undefined" && typeof dailyDatas === "undefined") {
                    return weeklyDatas;
                } else {
                    console.error("The getWeeklyDailyEvolution function has nothing to return");
                    return;
                }
            }
        
        },
        getCustomPeriodEvolution(dataset, customPeriodDates) {

            let startDateData, endDateData;
            const customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime();
            const customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime();

            for (const [key, value] of Object.entries(dataset)) {

                const currentDate = new Date(key.split("-")[0], key.split("-")[1] - 1, key.split("-")[2]).getTime();

                if (currentDate === customEndDate || currentDate === customStartDate) {

                    if (currentDate === customEndDate) {
                        endDateData = value;
                    } else if (currentDate === customStartDate) {
                        startDateData = value;
                    }

                    if (typeof startDateData !== "undefined" && typeof endDateData !== "undefined") {
                        break;
                    }

                }

            }

            return endDateData - startDateData;

        },
        getDepartementWeeklyDailyEvolution(dataset, dateTypeToReturn = false) {

            let todayDatas = {};
            let yesterdayDatas = {};
            let weekAgoData = {};
            let dailyDatas = {};
            let weeklyDatas = {};
            /*let datasRecorder = {
                new_hospitalizations: 0,
                new_intensive_care: 0
            }*/
            console.log(dataset);
            dataset = dataset.cumulativeDatas;
            const authKeys = ["hospitalizations", "intensive_care", "deaths", "recovered"];
            for (const [statusKey, statusValues] of Object.entries(dataset)) {

                if (authKeys.includes(statusKey)) {

                    let dayIndex = 1;
                    for (let i = statusValues.length - 1; i > 0; i--) {

                        if (dayIndex === 1) {

                            todayDatas[statusKey] = statusValues[i];

                        } else if (dayIndex === 2 && (dateTypeToReturn === false || dateTypeToReturn === "dailyEvolution")) {

                            yesterdayDatas[statusKey] = statusValues[i];
                            dailyDatas[statusKey] = todayDatas[statusKey] - yesterdayDatas[statusKey];

                            /*if (typeof datasRecorder[statusKey] !== "undefined") {
                                dailyDatas[statusKey] = yesterdayDatas[statusKey] + todayDatas[statusKey];
                            } else {
                                dailyDatas[statusKey] = todayDatas[statusKey] - yesterdayDatas[statusKey];
                            }*/

                        } else if (dayIndex === 7 && (dateTypeToReturn === false || dateTypeToReturn === "weeklyEvolution")) {

                            weekAgoData[statusKey] = statusValues[i];
                            weeklyDatas[statusKey] = todayDatas[statusKey] - weekAgoData[statusKey];

                            /*if (typeof datasRecorder[statusKey] !== "undefined") {
                                weeklyDatas[statusKey] = datasRecorder[statusKey] + statusValues[i];
                            } else {
                                weeklyDatas[statusKey] = todayDatas[statusKey] - weekAgoData[statusKey];
                            }*/
                            break;

                        }

                        //Sum datas that are not cumulative by nature (hospitalizations, intensive care)
                        /*if (typeof datasRecorder[statusKey] !== "undefined") {
                            datasRecorder[statusKey] += statusValues[i];
                        }*/
                        dayIndex++;

                    }

                }
            
            }

            console.log(dailyDatas, weeklyDatas);

            if (typeof dailyDatas !== "undefined" && typeof weeklyDatas !== "undefined") {
                return { dailyDatas, weeklyDatas };
            } else {
                if (typeof dailyDatas !== "undefined" && typeof weeklyDatas === "undefined") {
                    return dailyDatas;
                } else if (typeof weeklyDatas !== "undefined" && typeof dailyDatas === "undefined") {
                    return weeklyDatas;
                } else {
                    console.error("The getWeeklyDailyEvolution function has nothing to return");
                    return;
                }
            }

        },
        getDepartementCustomPeriodEvolution(dataset, customPeriodDates) {

            console.log(dataset);

            let startDateData = {};
            let endDateData = {};
            const customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime();
            const customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime();

            console.log(new Date(customStartDate), new Date(customEndDate));

            for (let i = dataset.dates.length - 1; i > 0; i--) {

                const currentDate = new Date(dataset.dates[i].split("-")[0], dataset.dates[i].split("-")[1] - 1, dataset.dates[i].split("-")[2]).getTime();

                if (currentDate === customStartDate || currentDate === customEndDate) {

                    let currentDateDatasObject;
                    currentDate === customStartDate ? currentDateDatasObject = startDateData : currentDateDatasObject = endDateData;

                    for (const [key, value] of Object.entries(dataset.cumulativeDatas)) {
                        currentDateDatasObject[key] = value[i];
                    }

                    if (Object.entries(startDateData).length > 0 && typeof Object.entries(endDateData).length > 0) {
                        break;
                    }

                } 

            }

            let customPeriodDatas = {};

            for (const [key, value] of Object.entries(endDateData)) {
                customPeriodDatas[key] = value - startDateData[key];
            }

            return customPeriodDatas;

        }
    }
    numberFunctionalities = {
        formatNumber(number) {

            //Test if number is already a float number or not
            if (number.toString().split("").includes(".") === false) {
                return String(number).replace(/(.)(?=(\d{3})+$)/g,'$1.');
            } else {
                return number.toString();
            }

        },
        getPercentageOfPartFromTotal: (part, total) => {

            return 100 * part / total;

        },
        roundFloatNumber(number) {

            if (typeof number !== "number") {
                console.error("The roudNumber function first parameter has to be a number");
                return;
            }
            
            return parseFloat(number.toString().split("").splice(0,5).join(""));

        },
        convertNumberToStatString: (number, addSign = false) => {

            if (typeof number === "number") {

                if (addSign === true && number > 0) {

                    number = number.toString();
                    return "+" + number

                } else {

                    return number.toString();

                }

            }

        },
        addNumberPointSeparator: (number) => {

            if (typeof number === undefined || typeof number !== "number") {
                console.error("The formatNumber function accept only a parameter which a number");
                return;
            }

            number = number.toString().split("");
            let invertNumber = [];

            for (let i = number.length; i > 0; i--) {

                invertNumber.push(number[i - 1]);

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

                finalNumber.push(formatedInvertNumber[i - 1]);

            }


            finalNumber = finalNumber.join("");
            return finalNumber;

        },
    }
    dateFunctionalities = {
        getTwoDigitsDateElement(dateElement) {

            if (typeof dateElement !== "string") {
                dateElement = dateElement.toString();
            }

            if (dateElement.length === 1) {
                dateElement = "0" + dateElement;
            }

            return dateElement;

        }
    }
    arrayFunctionalities = {
        sortRegionsArray(array) {

            let newArray = [];

            for (let i = 0; i < array.length; i++) {

                if (newArray.length === 0) {

                    newArray.push(array[i]);

                } else {

                    for (let c = 0; c < newArray.length; c++) {

                        if (array[i].locationData < newArray[c].locationData) {

                            if (c === 0) {

                                newArray.unshift(array[i]);

                            } else if (array[i].locationData > newArray[c - 1].locationData) {

                                newArray.splice(c, 0, array[i]);

                            }

                            break;

                        } else if (array[i].locationData === newArray[c].locationData) {

                            newArray.splice(c, 0, array[i]);
                            break;

                        } else if (c === newArray.length - 1 && array[i].locationData > newArray[c].locationData) {

                            newArray.push(array[i]);
                            break;

                        }

                    }

                }

            }

            console.log(newArray);
            return newArray;

        }
    }
    textFunctionalities = {
        updateClassName(className, classNameInputs) {

            let classesArray = className.split(" ");

            if (classNameInputs.oldClassNames !== "undefined") {

                let oldClassNames;
                typeof classNameInputs.oldClassNames === "string" ? oldClassNames = [classNameInputs.oldClassNames] : oldClassNames = classNameInputs.oldClassNames;

                for (let i = 0; i < classesArray.length; i++) {

                    if (oldClassNames.includes(classesArray[i])) {
                        classesArray.splice(i, 1);
                        i -= 1;
                    }
    
                }

            }

            if (typeof classNameInputs.newClassNames !== "undefined") {

                let newClassNames;
                typeof classNameInputs.newClassNames === "string" ? newClassNames = [classNameInputs.newClassNames] : newClassNames = classNameInputs.newClassNames;

                for (let i = 0; i < newClassNames.length; i++) {
                    classesArray.push(newClassNames[i]);
                }

            }

            return classesArray.join(" ");

        }
    }
}