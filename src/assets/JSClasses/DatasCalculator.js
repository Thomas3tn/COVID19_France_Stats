//Contain all methods that convert, transform or create news datas from existing ones

export default class DatasCalculator {
    numberFunctionalities = {
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