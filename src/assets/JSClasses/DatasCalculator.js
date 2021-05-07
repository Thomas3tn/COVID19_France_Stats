//Contain all methods that convert, transform or create news datas from existing ones

export default class DatasCalculator {
    datasListFunctionalities = {
        getWeeklyDailyEvolution(dataset, dateTypeToReturn = false) {

            if (dateTypeToReturn !== false && (dateTypeToReturn !== "weeklyEvolution" || dateTypeToReturn !== "dailyEvolution")) {
                console.error("The getWeeklyDailyEvolution function second optional parameter accept only three value: false (default), 'weeklyEvolution' or 'dailyEvolution'");
                return;
            }

            let counter = 1;
            let todayDatas, yesterdayDatas, weekAgoData, dailyEvolution, weeklyEvolution;

            for (const keyValue of Object.entries(dataset)) {

                if (counter === 1) {
                    todayDatas = keyValue[1];
                }

                if (counter === 2 && (dateTypeToReturn === false || dateTypeToReturn === "dailyEvolution")) {
                    yesterdayDatas = keyValue[1];
                    dailyEvolution = todayDatas - yesterdayDatas;
                }

                if (counter === 7 && (dateTypeToReturn === false || dateTypeToReturn === "weeklyEvolution")) {
                    weekAgoData = keyValue[1];
                    weeklyEvolution = todayDatas - weekAgoData;
                    break;
                }

                counter++;

            }

            if (typeof dailyEvolution !== "undefined" && typeof weeklyEvolution !== "undefined") {
                return { dailyEvolution, weeklyEvolution };
            } else {
                if (typeof dailyEvolution !== "undefined" && typeof weeklyEvolution === "undefined") {
                    return dailyEvolution;
                } else if (typeof weeklyEvolution === "undefined" && typeof dailyEvolution === "undefined") {
                    return weeklyEvolution;
                } else {
                    console.error("The getWeeklyDailyEvolution function has nothing to return");
                    return;
                }
            }
        
        },
        getCustomPeriodEvolution(dataset, customPeriodDates) {

            let startDateData, endDateData;
            const customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime();
            console.log(customPeriodDates.startDate.split("-")[2], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[0]);
            const customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime();
            console.log(customStartDate, customEndDate);

            for (const [key, value] of Object.entries(dataset)) {

                const currentDate = new Date(key.split("-")[0], key.split("-")[1] - 1, key.split("-")[2]).getTime();
                console.log(new Date(key.split("-")[0], key.split("-")[1] - 1, key.split("-")[2]));

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

            console.log(endDateData, startDateData);

            return endDateData - startDateData;

        }
    }
    numberFunctionalities = {
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
}