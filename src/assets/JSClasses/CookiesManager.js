export default class CookiesManager {
    static DATAS_SAVE_AGREEMENT_COOKIE_NAME = "dsa";
    static EXPIRATION_DATE = 3600000;//= 1Hour
    static doesDSACookieExists() {

        const cookies = document.cookie.split(";");
        const isDSACookieExists = cookies.find(cookie => cookie.split("=")[0] === CookiesManager.DATAS_SAVE_AGREEMENT_COOKIE_NAME);
        return isDSACookieExists ? true : false;

    }
    static createDSACookie() {

        let expirationDate = new Date(Date.now() + CookiesManager.EXPIRATION_DATE).toString();
        document.cookie = `${CookiesManager.DATAS_SAVE_AGREEMENT_COOKIE_NAME}=true; expires${expirationDate}`;

    }
}