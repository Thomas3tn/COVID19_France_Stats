export default class APIRequest {
    constructor({infos, idKeysValues, parentKeysValues}) {

        this._infos = {
            type: infos.type,
            status: infos.status,
            location: infos.location || null
        };
        this._idKeysValues = idKeysValues || [];
        this._parentKeysValues = parentKeysValues || [];

    }
    get infos() {
        return this._infos;
    }
    get idKeysValues() {
        return this._idKeysValues;
    }
    get parentKeysValues() {
        return this._parentKeysValues;
    }
    updateStatus(newStatus) {
        this._infos.status = newStatus;
    }
}