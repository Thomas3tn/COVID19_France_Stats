

export default {
    dateFunctionalities: {
        getTwoDigitsDateElement(dateElement) {

            if (typeof dateElement !== "string") {
                dateElement = dateElement.toString();
            }

            if (dateElement.length === 1) {
                dateElement = "0" + dateElement;
            }

            return dateElement;

        },
        isDateValid(customDates, datesLimit) {

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
    }
}