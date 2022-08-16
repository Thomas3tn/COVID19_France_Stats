

export default class DateCustomMethods {
    static monthsTranslation = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre"
    }
    static switchDateFormat({date, separator = "-", newSeparator = "-"}) {

        return date.split(separator).reverse().join(newSeparator);

    }
    static dateFromTimestamp({date, separator = "-"}) {

        date = new Date(date);
        return `${date.getFullYear()}${separator}${DateCustomMethods.getTwoDigitsDateElement(date.getMonth() + 1)}${separator}${DateCustomMethods.getTwoDigitsDateElement(date.getDate())}`;

    }
    static timeFromTimestamp({date, hourAbbr = "h", minuteAbbr = ""}) {

        date = new Date(date);
        return `${DateCustomMethods.getTwoDigitsDateElement(date.getHours())}${hourAbbr}${DateCustomMethods.getTwoDigitsDateElement(date.getMinutes())}${minuteAbbr}`;

    }
    static getTwoDigitsDateElement(dateElement) {

        if (typeof dateElement !== "string") {
            dateElement = dateElement.toString();
        }

        if (dateElement.length === 1) {
            dateElement = "0" + dateElement;
        }

        return dateElement;

    }
    static isDateValid({date, startLimit, endLimit}) {

        [date, startLimit, endLimit] = [Date.parse(date), Date.parse(startLimit), Date.parse(endLimit)];
        console.log([date, startLimit, endLimit], startLimit < date && date < endLimit)
        return startLimit <= date && date <= endLimit;

    }
    static getPeriod({datas, startDate = null, endDate = null}) {

        try {

            if (startDate === null && endDate === null) {
                return datas;
            }
    
            [startDate, endDate] = [Date.parse(startDate) || 0, Date.parse(endDate) || 99999999999999];
    
            const startIndex = datas.findIndex(data => Date.parse(data.date) >= startDate);
            const endIndex = datas.findIndex((data, index) => Date.parse(data.date) >= endDate || index === datas.length - 1);
    
            return datas.slice(startIndex, endIndex + 1);

        } catch (error) {

            console.error(error);
            return false;

        }

    }
    static getDay({datas, date}) {

        if (Number.isNaN(date)) {
            date = Date.parse(date);
        }

        const dateStr = new Date(date).toDateString();
        return datas.find(currentDate => new Date(Date.parse(currentDate.date)).toDateString() === dateStr) || null;

    }
    static getDaysEvolution({start, end}) {

        const datas = {};
        Object.entries(end).forEach(([status, data]) => datas[status] = data - start[status]);
        return datas;

    }
    static getLiveHistEvo({hist = false, live = false}) {

        if ([hist, live].includes(false)) {

            console.error("The getLiveHistEvo parameters must be objects");
            return null;

        } else {

            const datas = {};

            Object.entries(hist).forEach(([status, data]) => {

                if (typeof live[status] !== "undefined") {
                    datas[status] = live[status] - data;
                }

            });

            return datas;

        }

    }
}