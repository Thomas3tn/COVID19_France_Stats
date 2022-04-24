export default class LocalStorageManager {
    static save(datasName, datas) {
        localStorage.setItem(datasName, JSON.stringify(datas));
    }
    static get(datasName) {
        return JSON.parse(localStorage.getItem(datasName));
    }
    static delete(datasName) {
        localStorage.removeItem(datasName);
    }
}