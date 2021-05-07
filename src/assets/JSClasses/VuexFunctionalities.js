export default {
    isCurrentStatusValid(worldLocationEvolutionDatas, location, status, counter) {

        let currentStatus = status[counter].split("=")[0];

        //If location is equal to world (list of all countries)
        if (location === "") {

            if (typeof worldLocationEvolutionDatas.global_request_creation_date["currentStatus"] !== "undefined") {

                if ((Date.now() - 21600000) < worldLocationEvolutionDatas.global_request_creation_date[status]["creation_date"]) {
                    return {
                        isRequestNecessary: false,
                        counter: counter++
                    }
                } else {
                    return {
                        isRequestNecessary: true,
                        counter: counter++
                    }
                }

            } else {
                return {
                    isRequestNecessary: true,
                    counter: counter++
                }
            }

            //If we are looking for a specific country
        } else {

            if (counter < Object.entries(worldLocationEvolutionDatas[location]).length - 1) {

                //Check if country object exists
                if (typeof worldLocationEvolutionDatas[location] !== "undefined") {

                    //Check if status exists and not outdated
                    if (typeof worldLocationEvolutionDatas[location][currentStatus] !== "undefined") {

                        if ((Date.now() - 21600000) < worldLocationEvolutionDatas[location]["creation_date"]) {
                            return {
                                isRequestNecessary: false,
                                counter: counter++
                            }
                        } else {
                            return {
                                isRequestNecessary: true,
                                counter: counter++
                            }
                        }

                    } else {
                        counter++;
                        isCurrentStatusValid(worldLocationEvolutionDatas, location, status, counter);
                    }

                } else {
                    return {
                        isRequestNecessary: true,
                        counter: counter++
                    };
                }

            } else {
                return {
                    isRequestNecessary: false,
                    counter: counter++
                };
            }

        }

    },
    computeEvolutionDatasResponse()

}