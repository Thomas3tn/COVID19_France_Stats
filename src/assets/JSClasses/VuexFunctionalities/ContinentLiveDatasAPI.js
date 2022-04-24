export default class ContinentLiveDatasAPI {
    constructor(datas) {

        this.datas = datas;

    }
    requestsManager(continentName) {

        const continentDatas = {
            name: continentName,
            countries: 0
        };
        const CUMULATIVE_KEYS = this.datas[0].cumulativeKeys;
        continentDatas = this.setContinentDatasKeys(continentDatas, CUMULATIVE_KEYS);

        for (let i = 0; i < this.datas.length; i++) {

            if (this.datas[i].continent === continentName) {

                continentDatas.countries++;

                for (const [key, value] of Object.entries(this.datas[i])) {
                    
                    if (CUMULATIVE_KEYS.CUMULATIVE_NON_NUMBER_KEYS.includes(key)) {
                        continentDatas[key] += value;
                    } else if (CUMULATIVE_KEYS.CUMULATIVE_NUMBER_KEYS.includes(key)) {
                        continentDatas[key].push(value);
                    }

                }

            }

        }

        return continentDatas;

    }
    setContinentDatasKeys(continentDatas, continentKeys) {

        for (const keyValue of Object.entries(continentKeys)) {

            keyValue[1].forEach(key => {

                keyValue[0] === "CUMULATIVE_NON_NUMBER_KEYS" ? continentDatas[key] = [] : continentDatas[key] = 0;

            });

        }

    }
}