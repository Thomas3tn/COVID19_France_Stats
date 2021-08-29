

export default {
    numberFunctionalities: {
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
}