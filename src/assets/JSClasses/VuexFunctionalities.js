import setWorldLocationEvolutionDatas from "./VuexFunctionalities/setWorldLocationEvolutionDatas";
import setDepartementsLiveDatas from "./VuexFunctionalities/setDepartementsLiveDatas";
import setWeeklyEvolutionDatas from "./VuexFunctionalities/setWeeklyEvolutionDatas";
import setFranceDepartementsEvolutionDatas from "./VuexFunctionalities/setFranceDepartementsEvolutionDatas";
import setWorldLiveDatas from "./VuexFunctionalities/setWorldLiveDatas";

export default class VuexFunctionalities {
    doesLocalStorageDatasExists(localStorageDatasName) {

        if (localStorage.getItem(localStorageDatasName) !== null) {

            const localStorageDatas = JSON.parse(localStorage.getItem(localStorageDatasName));
            const localStorageDatasCreationDate = localStorageDatas.creation_date;

            if ((Date.now() - 21600000) < localStorageDatasCreationDate) {
                return { datas: localStorageDatas.datas };
            } else {
                throw "localStorageDatasOutaded";
            }

        } else {
            throw "noLocalStorageDatas";
        }

    }
}

Object.assign(VuexFunctionalities.prototype, setWorldLocationEvolutionDatas);
Object.assign(VuexFunctionalities.prototype, setDepartementsLiveDatas);
Object.assign(VuexFunctionalities.prototype, setWeeklyEvolutionDatas);
Object.assign(VuexFunctionalities.prototype, setFranceDepartementsEvolutionDatas);
Object.assign(VuexFunctionalities.prototype, setWorldLiveDatas);