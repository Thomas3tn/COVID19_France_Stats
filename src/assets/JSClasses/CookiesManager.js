export default {
    isDsaCookieValid() {

        let browserCookies = document.cookie.split(";");

        for (let i = 0; i < browserCookies.length; i++) {

            if (browserCookies[i].split("=")[0] === "dsa") {
                return true;
            }

        }

        return false;

    },
    createDsaCookie() {

        let currentDate = new Date(Date.now());
        currentDate = currentDate.setHours(currentDate.getHours() + 1, currentDate.getMinutes(), currentDate.getSeconds());
        currentDate = new Date(currentDate);

        document.cookie = "dsa=true; expires=" + currentDate.toString();

    }
}