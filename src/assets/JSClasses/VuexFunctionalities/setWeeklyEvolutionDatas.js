

export default {
    setWeeklyEvolutionDatas: {
        sortOutWeeklyEvolutionDatas(response, FranceCovidDatas) {

            response = response.allFranceDataByDate;
            let franceWeekAgoDatas;

            if (response.length === 0) {
                franceWeekAgoDatas = FranceCovidDatas.weeklyEvolutionDatas;
            } else {
            
                for (let i = 0; i < response.length; i++) {

                    if (response[i].nom === "France") {
                        franceWeekAgoDatas = response[i];
                        break;
                    }

                }

            }

            return franceWeekAgoDatas;

        }
    }
}