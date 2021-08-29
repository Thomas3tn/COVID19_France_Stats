

export default {
    datasListFunctionalities: {
        getWeeklyDailyEvolution(dataset, dateTypeToReturn = false) {

            const dateTypeToReturnAuthKeys = ["weeklyEvolution", "dailyEvolution"];

            if (dateTypeToReturn !== false && dateTypeToReturnAuthKeys.includes(dateTypeToReturn) === false) {
                console.error("The getWeeklyDailyEvolution function second optional parameter accept only three value: false (default), 'weeklyEvolution' or 'dailyEvolution'");
                return;
            }

            let counter = 1;
            let todayDatas, yesterdayDatas, weekAgoData, dailyDatas, weeklyDatas;

            for (const keyValue of Object.entries(dataset)) {

                if (counter === 1) {
                    todayDatas = keyValue[1];
                }

                if (counter === 2 && (dateTypeToReturn === false || dateTypeToReturn === "dailyEvolution")) {
                    yesterdayDatas = keyValue[1];
                    dailyDatas = todayDatas - yesterdayDatas;
                }

                if (counter === 7 && (dateTypeToReturn === false || dateTypeToReturn === "weeklyEvolution")) {
                    weekAgoData = keyValue[1];
                    weeklyDatas = todayDatas - weekAgoData;
                    break;
                }

                counter++;

            }

            if (typeof dailyDatas !== "undefined" && typeof weeklyDatas !== "undefined") {
                return { dailyDatas, weeklyDatas };
            } else {
                if (typeof dailyDatas !== "undefined" && typeof weeklyDatas === "undefined") {
                    return dailyDatas;
                } else if (typeof weeklyDatas !== "undefined" && typeof dailyDatas === "undefined") {
                    return weeklyDatas;
                } else {
                    console.error("The getWeeklyDailyEvolution function has nothing to return");
                    return;
                }
            }
        
        },
        getCustomPeriodEvolution(dataset, customPeriodDates) {

            let startDateData, endDateData;
            const customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime();
            const customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime();

            for (const [key, value] of Object.entries(dataset)) {

                const currentDate = new Date(key.split("-")[0], key.split("-")[1] - 1, key.split("-")[2]).getTime();

                if (currentDate === customEndDate || currentDate === customStartDate) {

                    if (currentDate === customEndDate) {
                        endDateData = value;
                    } else if (currentDate === customStartDate) {
                        startDateData = value;
                    }

                    if (typeof startDateData !== "undefined" && typeof endDateData !== "undefined") {
                        break;
                    }

                }

            }

            return endDateData - startDateData;

        },
        getDepartementWeeklyDailyEvolution(dataset, dateTypeToReturn = false) {

            let todayDatas = {};
            let yesterdayDatas = {};
            let weekAgoData = {};
            let dailyDatas = {};
            let weeklyDatas = {};
            /*let datasRecorder = {
                new_hospitalizations: 0,
                new_intensive_care: 0
            }*/
            console.log(dataset);
            dataset = dataset.cumulativeDatas;
            const authKeys = ["hospitalizations", "intensive_care", "deaths", "recovered"];
            for (const [statusKey, statusValues] of Object.entries(dataset)) {

                if (authKeys.includes(statusKey)) {

                    let dayIndex = 1;
                    for (let i = statusValues.length - 1; i > 0; i--) {

                        if (dayIndex === 1) {

                            todayDatas[statusKey] = statusValues[i];

                        } else if (dayIndex === 2 && (dateTypeToReturn === false || dateTypeToReturn === "dailyEvolution")) {

                            yesterdayDatas[statusKey] = statusValues[i];
                            dailyDatas[statusKey] = todayDatas[statusKey] - yesterdayDatas[statusKey];

                            /*if (typeof datasRecorder[statusKey] !== "undefined") {
                                dailyDatas[statusKey] = yesterdayDatas[statusKey] + todayDatas[statusKey];
                            } else {
                                dailyDatas[statusKey] = todayDatas[statusKey] - yesterdayDatas[statusKey];
                            }*/

                        } else if (dayIndex === 7 && (dateTypeToReturn === false || dateTypeToReturn === "weeklyEvolution")) {

                            weekAgoData[statusKey] = statusValues[i];
                            weeklyDatas[statusKey] = todayDatas[statusKey] - weekAgoData[statusKey];

                            /*if (typeof datasRecorder[statusKey] !== "undefined") {
                                weeklyDatas[statusKey] = datasRecorder[statusKey] + statusValues[i];
                            } else {
                                weeklyDatas[statusKey] = todayDatas[statusKey] - weekAgoData[statusKey];
                            }*/
                            break;

                        }

                        //Sum datas that are not cumulative by nature (hospitalizations, intensive care)
                        /*if (typeof datasRecorder[statusKey] !== "undefined") {
                            datasRecorder[statusKey] += statusValues[i];
                        }*/
                        dayIndex++;

                    }

                }
            
            }

            console.log(dailyDatas, weeklyDatas);

            if (typeof dailyDatas !== "undefined" && typeof weeklyDatas !== "undefined") {
                return { dailyDatas, weeklyDatas };
            } else {
                if (typeof dailyDatas !== "undefined" && typeof weeklyDatas === "undefined") {
                    return dailyDatas;
                } else if (typeof weeklyDatas !== "undefined" && typeof dailyDatas === "undefined") {
                    return weeklyDatas;
                } else {
                    console.error("The getWeeklyDailyEvolution function has nothing to return");
                    return;
                }
            }

        },
        getDepartementCustomPeriodEvolution(dataset, customPeriodDates) {

            console.log(dataset);

            let startDateData = {};
            let endDateData = {};
            const customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime();
            const customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime();

            console.log(new Date(customStartDate), new Date(customEndDate));

            for (let i = dataset.dates.length - 1; i > 0; i--) {

                const currentDate = new Date(dataset.dates[i].split("-")[0], dataset.dates[i].split("-")[1] - 1, dataset.dates[i].split("-")[2]).getTime();

                if (currentDate === customStartDate || currentDate === customEndDate) {

                    let currentDateDatasObject;
                    currentDate === customStartDate ? currentDateDatasObject = startDateData : currentDateDatasObject = endDateData;

                    for (const [key, value] of Object.entries(dataset.cumulativeDatas)) {
                        currentDateDatasObject[key] = value[i];
                    }

                    if (Object.entries(startDateData).length > 0 && typeof Object.entries(endDateData).length > 0) {
                        break;
                    }

                } 

            }

            let customPeriodDatas = {};

            for (const [key, value] of Object.entries(endDateData)) {
                customPeriodDatas[key] = value - startDateData[key];
            }

            return customPeriodDatas;

        }
    }
}