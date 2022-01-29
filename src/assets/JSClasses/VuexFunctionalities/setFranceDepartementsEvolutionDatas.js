import DatasCalculator from "../DatasCalculator";

export default {
    setFranceDepartementsEvolutionDatas: {
        getDepartementEvolutionDatas(response) {

            let departementEvolutionDatas = {
                creation_date: Date.now(),
                datas: {
                    dates: [],
                    dailyDatas: {
                        new_hospitalizations: [],
                        new_intensive_care: []
                    },
                    cumulativeDatas: {}
                }
            };

            departementEvolutionDatas = this.setStatus(departementEvolutionDatas);

            //Will be used to store previous datas to get cumulative datas by substraction
            let cumulativeDatasRecorder = {
                hospitalizations: 0,
                intensive_care: 0,
                deaths: 0,
                recovered: 0
            };

            //Will be used to fill absence of datas
            let lastKnownDatas = {
                hospitalizations: 0,
                intensive_care: 0,
                deaths: 0,
                recovered: 0
            };

            departementEvolutionDatas = this.sortOutDepartementEvolution(response, departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder);

            console.log(departementEvolutionDatas);
            return departementEvolutionDatas;

        },
        setStatus(departementEvolutionDatas) {

            const authStatusKeys = ["hospitalizations", "intensive_care", "deaths", "recovered"];
            for (let i = 0; i < authStatusKeys.length; i++) {

                departementEvolutionDatas.datas.dailyDatas[authStatusKeys[i]] = [];
                departementEvolutionDatas.datas.cumulativeDatas[authStatusKeys[i]] = [];

            }

            return departementEvolutionDatas;

        },
        sortOutDepartementEvolution(response, departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder) {

            response = response.allDataByDepartement;

            for (let i = 0; i < response.length; i++) {

                //Response array is composed of two datas sources, agences-regionales-sante and sante-publique-france-data
                //If both are available for the same date, we favour the sante-publique-france-data one
                if ((response[i].sourceType === "agences-regionales-sante" && response[i + 1].sourceType === "sante-publique-france-data") && (response[i].date === response[i + 1].date)) {
                    i = i + 1;
                }

                departementEvolutionDatas.datas.dates.push(response[i].date);
                console.log(response[i]);
                const statusList = ["deces", "hospitalises", "gueris", "reanimation"];
                const nonCumulativeDatas = ["hospitalises, reanimation"];
                const cumulativeDatas = ["deces", "gueris"];
                for (let c = 0; c < statusList.length; i++) {

                    let returnedDatas = {};

                    if (cumulativeDatas.includes(statusList[c])) {
                        returnedDatas = this.sortOutCumulativeDatasFromCurrentDate(statusList[c], response[i], departementEvolutionDatas.datas, lastKnownDatas, cumulativeDatasRecorder);
                    } else if (nonCumulativeDatas.includes(statusList[c])) {
                        returnedDatas = this.sortOutNonCumulativeDatasFromCurrentDate(statusList[c], response[i], departementEvolutionDatas.datas, lastKnownDatas, cumulativeDatasRecorder)
                    }

                    console.log(returnedDatas);
                    departementEvolutionDatas.datas = returnedDatas.departementEvolutionDatas;
                    cumulativeDatasRecorder = returnedDatas.cumulativeDatasRecorder;
                    lastKnownDatas = returnedDatas.lastKnownDatas;

                }

                //Check if next datas object cover the same date but from the wrong sourceType. If yes we skip it.
                if (i !== response.length - 1) {
                    if ((response[i].date === response[i+1].date) && (response[i].sourceType === "sante-publique-france-data" && response[i].sourceType === "agences-regionales-sante")) {
                    i += 1;
                    }
                }

            }

            return departementEvolutionDatas;

        },
        sortOutCumulativeDatasFromCurrentDate(status, currentDayDatasStatus, departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder) {

            //CurrentDayStatus is corresponding to the object path of the current status
            //departementEvolutionDatas is corresponding to departementEvolutionDatas.datas

            const datasCalculator = new DatasCalculator();

            const frStatus = status;
            const enStatus = datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(frStatus);
            console.log(currentDayDatasStatus, departementEvolutionDatas);

            typeof currentDayDatasStatus[frStatus] !== "undefined" ? departementEvolutionDatas.dailyDatas[enStatus].push(currentDayDatasStatus[frStatus] - lastKnownDatas[enStatus]) : departementEvolutionDatas.dailyDatas[enStatus].push(0);
            typeof currentDayDatasStatus[frStatus] !== "undefined" ? departementEvolutionDatas.cumulativeDatas[enStatus].push(currentDayDatasStatus[frStatus]) : departementEvolutionDatas.cumulativeDatas[enStatus].push(lastKnownDatas[enStatus]);
            typeof currentDayDatasStatus[frStatus] !== "undefined" ? cumulativeDatasRecorder[enStatus] = currentDayDatasStatus[frStatus] : cumulativeDatasRecorder[enStatus] += 0;
            typeof currentDayDatasStatus[frStatus] !== "undefined" ? lastKnownDatas[enStatus] = currentDayDatasStatus[frStatus] : lastKnownDatas[enStatus] += 0;

            console.log(departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder);

            return {departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder};

        },
        sortOutNonCumulativeDatasFromCurrentDate(status, currentDayDatasStatus, departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder) {

            const datasCalculator = new DatasCalculator();
            const frStatus = status;
            const enStatus = datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(status);
            const frDailyStatusName = "nouvelles" + datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(frStatus);
            const enDailyStatusName = datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(frDailyStatusName); 

            //Hospitalizations
            //In case if hospitalises datas suddenly appear without any nouvellesHospitalisations data (different datas sources issue)
            if (typeof currentDayDatasStatus[frStatus] !== "undefined" && typeof currentDayDatasStatus[frDailyStatusName] === "undefined" && cumulativeDatasRecorder[enStatus] === 0) {

                departementEvolutionDatas.dailyDatas[enDailyStatusName].push(currentDayDatasStatus[frStatus]);
                departementEvolutionDatas.cumulativeDatas.hospitalizations.push(currentDayDatasStatus[frStatus]);
                cumulativeDatasRecorder[enStatus] = currentDayDatasStatus[frStatus];

            } else {

                typeof currentDayDatasStatus[frDailyStatusName] !== "undefined" ? departementEvolutionDatas.dailyDatas[enDailyStatusName].push(currentDayDatasStatus[frDailyStatusName]) : departementEvolutionDatas.dailyDatas[enDailyStatusName].push(0);
                typeof currentDayDatasStatus[frDailyStatusName] !== "undefined" ? departementEvolutionDatas.cumulativeDatas[enStatus].push(currentDayDatasStatus[frDailyStatusName] + cumulativeDatasRecorder[enStatus]) : departementEvolutionDatas.cumulativeDatas[enStatus].push(cumulativeDatasRecorder[enStatus]);
                typeof currentDayDatasStatus[frDailyStatusName] !== "undefined" ? cumulativeDatasRecorder[enStatus] += currentDayDatasStatus[frDailyStatusName] : cumulativeDatasRecorder[enStatus] += 0;

            }
            typeof currentDayDatasStatus[frStatus] !== "undefined" ? departementEvolutionDatas.dailyDatas[enStatus].push(currentDayDatasStatus[frStatus]) : departementEvolutionDatas.dailyDatas[enStatus].push(lastKnownDatas[enStatus]);
            typeof currentDayDatasStatus[frStatus] !== "undefined" ? lastKnownDatas[enStatus] = (currentDayDatasStatus[frStatus]) : lastKnownDatas[enStatus] += 0;

            return {departementEvolutionDatas, lastKnownDatas, cumulativeDatasRecorder};

        },
    }
}