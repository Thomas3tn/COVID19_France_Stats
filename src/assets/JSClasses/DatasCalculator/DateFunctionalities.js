

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

        }
    }
}