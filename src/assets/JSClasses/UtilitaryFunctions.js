export default class UtilitaryFunctions {
    dateFunctionalities = {
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
            let currentDate = today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate();
            currentDate = this.utilitaryFunctions.dateFunctionalities.formatDateToTwoDigits(currentDate);
            return currentDate;

        },
        compareDate1ToDate2: (date1, date2, comparator) => {

            if (["superior", "equal", "inferior"].includes(comparator)) {

                console.error("The compareDate1ToDate2 third argument has be a string containing either: superior, equal, inferior");
                return;

            }

            let date1Year = date1.split("-")[0];
            let date1Month = date1.split("-")[1];
            let date1Day = date1.split("-")[2];

            let date2Year = date2.split("-")[0];
            let date2Month = date2.split("-")[1];
            let date2Day = date2.split("-")[2];

            let dateOne = new Date(date1Year, date1Month, date1Day);
            let dateTwo = new Date(date2Year, date2Month, date2Day);

            if (comparator === "superior") {

                if (dateOne > dateTwo) {
                    return true;
                } else {
                    return false;
                }

            } else if (comparator === "equal") {

                if (dateOne === dateTwo) {
                    return true;
                } else {
                    return false;
                }

            } else if (comparator === "inferior") {

                if (dateOne < dateTwo) {
                    return true;
                } else {
                    return false;
                }

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
            let finalDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
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
    }
    numberFunctionalities = {
        formatNumber: (number) => {

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
    }
    locationFunctionalities = {
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
    }
}