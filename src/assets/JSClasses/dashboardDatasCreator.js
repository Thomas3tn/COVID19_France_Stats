import DatasCalculator from "./DatasCalculator.js";

export default class DashboardDatasCreator {
    setCountryDatas(datas, locationDatas, locationDatasAuthKeys) {

        //Iterate over location datas
        for (const [locationDatasKey, locationDatasValue] of Object.entries(locationDatas)) {

            //Translate object key when we need to display which kind of data it is
            let currentKey = "";
            switch (locationDatasKey) {
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
            
                default:
                    currentKey = locationDatasKey;
                    break;
            }

            //Iterate over each authKeys array object
            for (const [validValuesArrayName, validValuesArray] of Object.entries(locationDatasAuthKeys)) {

                if (validValuesArray.includes(locationDatasKey)) {

                    //If value is about location Infos
                    if (typeof datas[validValuesArrayName] !== "undefined") {
                        datas[validValuesArrayName][locationDatasKey] = locationDatasValue;
                    //If value has to be insert in a nested object inside disease datas
                    } else {

                        if (validValuesArrayName === "currentSituation" || validValuesArrayName === "vaccinationDatas") {
                            datas.diseaseDatas[validValuesArrayName][locationDatasKey] = {
                                dataName: currentKey,
                                dataNumber: locationDatasValue
                            }
                        } else {
                            datas.diseaseDatas[validValuesArrayName][locationDatasKey] = locationDatasValue;
                        }
                        
                    }

                }

            }

        }

        return datas;

    }
    getCountryDatas(country, datas, worldLiveDatas, departementsLiveDatas = false) {

        const locationDatas = worldLiveDatas[country]["All"];

        //Fill array with to indicate which datas retrieve for each dashboard component

        const locationDatasAuthKeys = {
            locationInfos: ["country", "demonym", "gini", "population", "sq_km_area", "life_expectancy", "continent", "abbreviation", "location", "capital_city", "lat", "long", "updated"],
            currentSituation: ["confirmed", "deaths", "recovered", "people_vaccinated", "hospitalizations", "intensive_care"],
            vaccinationDatas: ["population", "administered", "people_vaccinated", "people_partially_vaccinated"],
            relativeDatas: ["population", "sq_km_area", "confirmed", "deaths", "recovered"]
        }

        datas = this.setCountryDatas(datas, locationDatas, locationDatasAuthKeys);

        //Set regional datas
        let regionsDatas = {};
        country === "France" ? regionsDatas = departementsLiveDatas : regionsDatas = worldLiveDatas[country];

        if (country === "France") {

            for (const [key, value] of Object.entries(regionsDatas.datas)) {
                datas.diseaseDatas.regionsDatas[key] = value;
            }
            
            //Add national datas
            const franceRegionsDatasKeys = ["hospitalizations", "intensive_care", "recovered"];
            datas.diseaseDatas.regionsDatas.All = {};

            for (let i = 0; i < locationDatasAuthKeys.currentSituation.length; i++) {

                if (franceRegionsDatasKeys.includes(locationDatasAuthKeys.currentSituation[i])) {
                    datas.diseaseDatas.regionsDatas.All[locationDatasAuthKeys.currentSituation[i]] = datas.diseaseDatas.currentSituation[locationDatasAuthKeys.currentSituation[i]]["dataNumber"];
                }
                
            }

        } else {

            for (const [key, value] of Object.entries(regionsDatas)) {

                if (key === "All") {
    
                    datas.diseaseDatas.regionsDatas[key] = {};
                    for (let i = 0; i < locationDatasAuthKeys.currentSituation.length; i++) {
                        datas.diseaseDatas.regionsDatas[key][locationDatasAuthKeys.currentSituation[i]] = value[locationDatasAuthKeys.currentSituation[i]];
                    }
    
                } else {
                    datas.diseaseDatas.regionsDatas[key] = value;
                }
    
            }

        }
        

        return datas;

    }
    getDepartementDatas(departement, datas, departementsLiveDatas, departementsStaticDatas) {

        let staticDatasKey = departement.split("-")[0] + departement.split("-")[1];
        const locationDatas = Object.assign(departementsLiveDatas.datas[departement], departementsStaticDatas[staticDatasKey]);
        console.log(locationDatas);
        const locationDatasAuthKeys = {
            locationInfos: ["location", "sq_km_area", "capital_city", "population", "life_expectancy", "lat", "long", "code", "nom", "date", "source", "sourceType"],
            relativeDatas: ["population", "sq_km_area", "hospitalises"],
            currentSituation: ["hospitalises", "reanimation", "deces", "gueris"]
        }

        datas = this.setCountryDatas(datas, locationDatas, locationDatasAuthKeys);

        return datas;

    }
    getContinentDatas(continent, datas, worldLiveDatas, continentsStaticDatas) {

        console.log(continent, datas, worldLiveDatas, continentsStaticDatas);

        const locationDatasAuthKeys = {
            locationInfos: ["country", "population", "sq_km_area", "gini"],
            currentSituation: ["confirmed", "deaths", "recovered", "people_vaccinated"],
            vaccinationDatas: ["population", "administered", "people_vaccinated", "people_partially_vaccinated"],
            relativeDatas: ["confirmed", "deaths", "recovered", "population", "sq_km_area"]
        }

        datas.locationInfos = continentsStaticDatas[continent.toLowerCase().split(" ").join("_")];
        datas.diseaseDatas.country = continent;

        //Iterate over each country in world live datas
        for (const worldLiveDatasKeyValue of Object.entries(worldLiveDatas)) {

            if (worldLiveDatasKeyValue[1].All.continent === continent) {

                datas.diseaseDatas.regionsDatas[worldLiveDatasKeyValue[0]] = worldLiveDatasKeyValue[1].All;

                //Iterate over each country property
                for (const [currentCountryKey, currentCountryValue] of Object.entries(worldLiveDatasKeyValue[1].All)) {

                    //Iterate over each locationDatasAuthKeys property
                    for (const [key, value] of Object.entries(locationDatasAuthKeys)) {

                        //Translate object key when we need to display which kind of data it is
                        let currentKey = "";
                        switch (currentCountryKey) {
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
                        
                            default:
                                currentKey = currentCountryKey;
                                break;
                        }

                        if (value.includes(currentCountryKey)) {

                            //If current data is about locationInfos
                            if (typeof datas[key] !== "undefined") {

                                //If current property has to be into an array
                                if (currentCountryKey === "country" || currentCountryKey === "gini") {

                                    if (currentCountryKey === "country") {
                                        typeof datas.locationInfos.countriesList === "undefined" ? datas.locationInfos.countriesList = [currentCountryValue] : datas.locationInfos.countriesList.push(currentCountryValue);
                                    } else {
                                        typeof datas[key][currentCountryKey] === "undefined" ? datas[key][currentCountryKey] = [currentCountryValue] : datas[key][currentCountryKey].push(currentCountryValue);
                                    }
                                    

                                } else {
                                    typeof datas.locationInfos[currentCountryKey] === "undefined" ? datas.locationInfos[currentCountryKey] = currentCountryValue : datas.locationInfos[currentCountryKey] += currentCountryValue;
                                }

                            //If current data is about locationInfos
                            } else {

                                //For these specifics elements, we have to indicate a french data name
                                if (key === "currentSituation" || key === "vaccinationDatas") {
                                    
                                    if (typeof datas.diseaseDatas[key][currentCountryKey] === "undefined") {
                                        datas.diseaseDatas[key][currentCountryKey] = {
                                            dataName: currentKey,
                                            dataNumber: currentCountryValue
                                        }
                                    } else {
                                        datas.diseaseDatas[key][currentCountryKey].dataNumber += currentCountryValue;
                                    }

                                } else {
                                    typeof datas.diseaseDatas[key][currentCountryKey] === "undefined" ? datas.diseaseDatas[key][currentCountryKey] = currentCountryValue : datas.diseaseDatas[key][currentCountryKey] += currentCountryValue;
                                }

                            }

                        }

                    }

                }

            }

        }

        //Add total datas to regions datas to be able to get relative datas
        datas.diseaseDatas.regionsDatas.All = {};
        for (const [key, value] of Object.entries(datas.diseaseDatas.currentSituation)) {
            datas.diseaseDatas.regionsDatas.All[key] = value.dataNumber;
        }

        //Get gini index average
        if (typeof datas.locationInfos.gini !== "undefined") {

            let giniTotal = 0;
            for (let i = 0; i < datas.locationInfos.gini.length; i++) {
                giniTotal += datas.locationInfos.gini[i];
            }
            datas.locationInfos.gini = giniTotal / datas.locationInfos.gini.length;
        }

        console.log(datas);
        return datas;

    }
    getGlobalDatas(datas, worldLiveDatas) {

        const locationInfos = ["country", "population", "sq_km_area", "gini"];
        let datasCalculator = new DatasCalculator();

        datas.diseaseDatas.country = "Global";

        for (const worldLiveDatasKeyValue of Object.entries(worldLiveDatas)) {

            datas.diseaseDatas.regionsDatas[worldLiveDatasKeyValue[0]] = worldLiveDatasKeyValue[1].All;

            if (worldLiveDatasKeyValue[0] !== "Global") {

                for (const [countryKey, countryValue] of Object.entries(worldLiveDatasKeyValue[1].All)) {

                    if (locationInfos.includes(countryKey)) {

                        //If current property has to be into an array
                        if (countryKey === "country" || countryKey === "gini") {
    
                            if (countryKey === "country") {
                                typeof datas.locationInfos.countriesList === "undefined" ? datas.locationInfos.countriesList = [countryValue] : datas.locationInfos.countriesList.push(countryValue);
                            } else {
                                typeof datas.locationInfos[countryKey] === "undefined" ? datas.locationInfos[countryKey] = [countryValue] : datas.locationInfos[countryKey].push(countryValue);
                            }
                            
    
                        } else {
                            typeof datas.locationInfos[countryKey] === "undefined" ? datas.locationInfos[countryKey] = countryValue : datas.locationInfos[countryKey] += countryValue;
                        }

                    }

                }

            }

        }

        //add world surface area to relative datas object
        datas.diseaseDatas.relativeDatas.sq_km_area = datas.locationInfos.sq_km_area;

        const locationDatasAuthKeys = {
            currentSituation: ["confirmed", "deaths", "recovered", "people_vaccinated"],
            vaccinationDatas: ["administered", "people_vaccinated", "people_partially_vaccinated", "population"],
            relativeDatas: ["confirmed", "deaths", "recovered", "population"]
        }

        for (const [globalKey, globalValue] of Object.entries(worldLiveDatas.Global.All)) {

            for (const [key, value] of Object.entries(locationDatasAuthKeys)) {

                if (value.includes(globalKey)) {

                    if (key === "relativeDatas") {

                        datas.diseaseDatas[key][globalKey] = globalValue;

                    } else {

                        datas.diseaseDatas[key][globalKey] = {
                            dataName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(globalKey),
                            dataNumber: globalValue
                        }

                    }

                }

            }

        }

        console.log(datas);

        return datas;

    }
}