

export default {
    arrayFunctionalities: {
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
}