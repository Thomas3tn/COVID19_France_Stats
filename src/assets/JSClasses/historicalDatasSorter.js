export default class HistoricalDatasSorter {
    static sortCountryHistoricalDatas(historicalDatas) {

        const formattedDatas = {
            dates: [],
            cumulativeDatas: {},
            dailyDatas: {}
        }

        formattedDatas = this.setStatusKeys(historicalDatas, formattedDatas);
        formattedDatas = this.setDatas(historicalDatas, formattedDatas);
        formattedDatas = this.reverseDatas(formattedDatas);

    }
    static setStatusKeys(historicalDatas, formattedDatas) {

        for (const keyValue of Object.entries(historicalDatas)) {
            formattedDatas.cumulativeDatas[keyValue[0]] = [];
            formattedDatas.dailyDatas[keyValue[0]] = [];
        }

        return formattedDatas;

    }
    static setDatas(historicalDatas, formattedDatas) {

        let hasDatesBeenFilled = false;

        for (const [status, datas] of Object.entries(historicalDatas)) {

            let previousDayData = 0;

            for (const [date, data] of Object.entries(datas)) {

                if (hasDatesBeenFilled === false) {
                    formattedDatas.dates.push(date);
                }

                formattedDatas.cumulativeDatas[status].push(data);
                formattedDatas.dailyDatas[status].push(data - previousDayData);
                
                previousDayData = data;

            }

            hasDatesBeenFilled = true;

        }

        return formattedDatas;

    }
    static reverseDatas(formattedDatas) {

        for (const keyValue of Object.entries(formattedDatas)) {

            if (Array.isArray(keyValue[1])) {
                keyValue[1].reverse();
            } else {

                for (const subKeyValue of Object.entries(keyValue[1])) {
                    subKeyValue[1].reverse();
                }

            }

        }

        return formattedDatas;

    }
}