export default class LocalStorageDelete {
    static delete({name}) {
        localStorage.removeItem(name);
    }
}