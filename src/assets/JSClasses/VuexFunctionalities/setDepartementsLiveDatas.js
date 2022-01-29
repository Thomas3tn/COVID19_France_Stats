import DatasCalculator from "../DatasCalculator";

export default {
    setDepartementsLiveDatas: {
        sortOutDepartementsLiveDatas(response, FranceCovidDatas) {

            let departementsLiveDatas = {};
            let datasArray = response.allLiveFranceData;
            let datasCalculator = new DatasCalculator();

            if (datasArray.length === 0) {
                datasArray = FranceCovidDatas.departementsLiveDatas.allLiveFranceData;
            }

            for (let i = 0; i < datasArray.length; i++) {

                //We only want datas related to France departements (not France or 2015 new regions) that are created by Santé publique France Data
                if (datasArray[i].sourceType !== "opencovid19-fr" && (datasArray[i].code !== "FRA" || datasArray[i].code.split("-")[0] !== "REG")) {

                    departementsLiveDatas[datasArray[i].code] = {};

                    for (const [key, value] of Object.entries(datasArray[i])) {
                        departementsLiveDatas[datasArray[i].code][datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(key)] = value;
                    }

                }

            }

            return departementsLiveDatas;

        }
    }
}