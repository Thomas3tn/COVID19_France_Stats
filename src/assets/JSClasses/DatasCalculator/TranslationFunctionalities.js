//Contain functions that are used to translate status name from english to french and vice versa

export default {
    translationFunctionalities: {
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
                case "personnes_vaccinees":
                    currentKey = "people_vaccinated";
                    break;

                case "cas_confirmes":
                    currentKey = "confirmed";
                    break;

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

                case "milliers_d_habs":
                    currentKey = "thousands_of_habs";
                    break;

                case "km2":
                    currentKey = "km2";
                    break;
            
                default:
                    currentKey = key;
                    break;
            }

            return currentKey;

        }
    }
}