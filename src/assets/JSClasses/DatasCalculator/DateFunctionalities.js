

export default class DateCustomMethods {
    static getTwoDigitsDateElement(dateElement) {

        if (typeof dateElement !== "string") {
            dateElement = dateElement.toString();
        }

        if (dateElement.length === 1) {
            dateElement = "0" + dateElement;
        }

        return dateElement;

    }
    static isDateValid(customDates, datesLimit) {

        const startDateLimit = datesLimit.startDateLimit = new Date(datesLimit.startDateLimit).getTime();
        let endDateLimit;
        datesLimit.endDateLimit === false || datesLimit.endDateLimit === "undefined" ? endDateLimit = new Date(Date.now()) : endDateLimit = new Date(datesLimit.endDateLimit);

        const customStartDate = new Date(customDates.customStartDate).getTime();
        let customEndDate;
        customDates.customEndDate === false || customDates.customStartDate === "undefined" ? customEndDate = new Date(Date.now()) : customEndDate = new Date(customDates.customEndDate);

        if ((customStartDate < startDateLimit || customEndDate > endDateLimit) && (customEndDate < customStartDate)) {
            return false;
        } else {
            return true;
        }

    }
    static sliceHistorical({datas, startDate = null, endDate = null}) {

        if (startDate === null && endDate === null) {
            return datas;
        }

        [startDate, endDate] = [Date.parse(startDate) || 0, Date.parse(endDate) || 99999999999999];

        const startIndex = datas.findIndex(data => Date.parse(data.date) >= startDate);
        const endIndex = datas.findIndex((data, index) => Date.parse(data.date) >= endDate || index === datas.length - 1);

        return datas.slice(startIndex, endIndex + 1);

    }
    /*static getDailyDatas({datas}) {

        datas.forEach(day => {
            
            Object.entries

        });

    }*/
    //Add get daily datas from cumulative
    //Get (sliced) historical array
    //Loop through it
    //Compute daily datas from non cumulative
}