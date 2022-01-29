<template>
    <div class="datasPanel weeklyDailyDatasPanel">
        <div class="datasPanel__headerContainer weeklyDailyDatasPanel__headerContainer">
            <header class="weeklyDailyDatasPanel__btnsPart">
                <button @click="displayedDatatype = 'dailyDatas'" id="dailyDatasEvoBtn" ref="dailyDatasEvoBtn" title="Tendance quotidienne" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--left"><h3 class="datasPanel__header">Tendance quotidienne</h3></button>
                <p class="datasPanel__header">/</p>
                <button @click="displayedDatatype = 'weeklyDatas'" id="weeklyDatasEvoBtn" title="Tendance hebdomadaire" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--right"><h3 class="datasPanel__header">{{ secondButtonContent }}</h3></button>
                <template v-if="hasCustomPeriodBeenSubmitted === true">
                    <p class="datasPanel__header">/</p>
                    <button @click="displayedDatatype = 'customPeriodDatas'" id="customPeriodDatasEvoBtn" class="weeklyDailyDatasPanel__btn" :title="customPeriodBtnContent"><h3 class="datasPanel__header">{{ customPeriodBtnContent }}</h3></button>
                </template>
            </header>
            <button id="customPeriodFormToggleBtn" title="Ajouter période personnalisée" class="datasPanel__toggleFormBtn" @click="isCustomPeriodFormDisplayed = !isCustomPeriodFormDisplayed"><font-awesome-icon :icon="dashboardIcons.form.add_custom_period" aria-hidden="true"/><span class="screenreaderText">Ajouter une période personnalisée</span></button>
        </div>
        <div class="datasPanel__contentContainer weeklyDailyDatasPanel__contentContainer">
            <template v-for="item in datas[displayedDatatype]" :key="item.dataName">
                <stat-item v-if="item.dataNumber !== null" :statNumber="item.dataNumber" :statName="item.dataName" :dataType="'evolutionDatas'"></stat-item>
            </template>
            <form @submit.prevent="customPeriodSubmission" id="customPeriodForm" class="weeklyDailyDatasPanel__customPeriodForm weeklyDailyDatasPanel__customPeriodForm--hidden" aria-hidden="true">
                <div class="datasPanelForm__inputContainer">
                    <font-awesome-icon :icon="dashboardIcons.form.start_date" aria-hidden="true" class="datasPanelForm__logoLabel"/>
                    <div class="datasPanelForm__inputPart">
                        <label for="wdpStartDate" class="datasPanelForm__label">Date de début <abbr :title="'Si non renseignée, cette date est fixée au ' + customPeriodDatesLimit.startDate">?</abbr></label>
                        <input type="date" placeholder="Ex: 24/05/2021" class="datasPanelForm__input" id="wdpStartDate" v-model="customPeriodDates.startDate" :min="customPeriodDatesLimit.startDate" :max="customPeriodDatesLimit.endDate" required aria-required="true"/>
                    </div>
                </div>
                <div class="datasPanelForm__inputContainer">
                    <font-awesome-icon :icon="dashboardIcons.form.end_date" aria-hidden="true" class="datasPanelForm__logoLabel"/>
                    <div class="datasPanelForm__inputPart">
                        <label for="wdpEndDate" class="datasPanelForm__label">Date de fin <abbr :title="'Si non renseignée, cette date est fixée au ' + customPeriodDatesLimit.endDate">?</abbr></label>
                        <input type="date" placeholder="Ex: 05/09/2020" class="datasPanelForm__input" id="wdpEndDate" v-model="customPeriodDates.endDate" :min="customPeriodDatesLimit.startDate" :max="customPeriodDatesLimit.endDate" required aria-required="true"/>
                    </div>
                </div>
                <button type="submit" title="Valider la période personnalisée" class="selectableStatus"><font-awesome-icon :icon="dashboardIcons.form.search" aria-hidden="true"/><span class="screenreaderText">Valider la période personnalisée</span></button>
            </form>
        </div>
    </div>
</template>

<script>
import StatItem from "./SharedComponents/statItem.vue";
import { ref, reactive, watch, computed, onMounted, inject } from "vue";

import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator.js";

export default {
    props: {
        locationType: {
            type: String,
            required: true
        },
        locationEvolutionDatas: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        console.log(props.locationEvolutionDatas, props.locationType);

        let datasCalculator = new DatasCalculator();
        const dashboardIcons = inject("dashboardIcons", {});

        let isCustomPeriodFormDisplayed = ref(false);
        let hasCustomPeriodBeenSubmitted = ref(false);

        let secondButtonContent = computed(() => {

            if (window.innerWidth < 1024) {
                return "Tendance hebdomadaire";
            } else {
                return "hebdomadaire";
            }

        });

        //Indicates which type of datas is displayed
        let displayedDatatype = ref("dailyDatas");

        //Store datas that have to be displayed
        let displayedDatas = reactive({});

        let customPeriodDates = reactive({
            startDate: "",
            endDate: ""
        });

        let customPeriodDatesLimit = reactive({
            startDate: "",
            endDate: ""
        });

        let customPeriodBtnContent = computed(() => customPeriodDates.startDate.split("-")[2] + "/" + customPeriodDates.startDate.split("-")[1] + "/" + customPeriodDates.startDate.split("-")[0] + " - " + customPeriodDates.endDate.split("-")[2] + "/" + customPeriodDates.endDate.split("-")[1] + "/" + customPeriodDates.endDate.split("-")[0]);

        //Store all period types datas
        let datas = reactive({
            dailyDatas: {
            },
            weeklyDatas: {
            },
            customPeriodDatas: {
            }
        });

        //Dynamically create datas and displayed datas properties
        if (props.locationType === "departement") {

            for (const keyValue of Object.entries(props.locationEvolutionDatas.datas.cumulativeDatas)) {

                for (const datasKeyValue of Object.entries(datas)) {

                    datas[datasKeyValue[0]][keyValue[0]] = {
                        dataName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(keyValue[0]),
                        dataNumber: 0
                    }

                }

            }

            for (let i = 0; i < props.locationEvolutionDatas.datas.dates.length; i++) {

                if (i === 0 || i === props.locationEvolutionDatas.datas.dates.length - 1) {

                    let currentDate = new Date(props.locationEvolutionDatas.datas.dates[i]);
                    currentDate = currentDate.getFullYear() + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getMonth() + 1) + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getDate());
                    i === 0 ? customPeriodDatesLimit.startDate = currentDate : customPeriodDatesLimit.endDate = currentDate;

                }

            }

        } else {

            let hasCustomDatesLimitBeenFilled = false;

            for (const [key, value] of Object.entries(props.locationEvolutionDatas)) {

                if (key !== "creation_date") {

                    for (const datasKeyValue of Object.entries(datas)) {

                        datas[datasKeyValue[0]][key] = {
                            dataName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key),
                            dataNumber: 0
                        }

                    }

                    if (hasCustomDatesLimitBeenFilled === false) {

                        let [earliestDate, latestDate] = [0, 0];

                        for (const dateKeyValue of Object.entries(value)) {

                            const currentDate = new Date(dateKeyValue[0]).getTime();

                            if (currentDate > latestDate || latestDate === 0) {
                                latestDate = new Date(dateKeyValue[0]).getTime();
                            }
                            if (currentDate < earliestDate || earliestDate === 0) {
                                earliestDate = new Date(dateKeyValue[0]).getTime();
                            }

                        }

                        earliestDate = new Date(earliestDate);
                        latestDate = new Date(latestDate);

                        customPeriodDatesLimit.startDate = earliestDate.getFullYear() + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(earliestDate.getMonth() + 1) + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(earliestDate.getDate());
                        customPeriodDatesLimit.endDate = latestDate.getFullYear() + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(latestDate.getMonth() + 1) + "-" + datasCalculator.dateFunctionalities.getTwoDigitsDateElement(latestDate.getDate());

                        hasCustomDatesLimitBeenFilled = true;

                    }

                }

            }

        }

        //Functions
        function checkCustomDatesInput() {

            const startDateLimit = new Date("2020", "00", "22").getTime();
            const endDateLimit = new Date(Date.now());
            //Split date inside constructor params
            const startDate = new Date(customPeriodDates.startDate.split("-")[2], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[0]).getTime();
            const endDate = new Date(customPeriodDates.startDate.split("-")[2], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[0]).getTime();

            if ((startDate < startDateLimit || endDate > endDateLimit) && (endDate < startDate)) {
                return false;
            } else {
                return true;
            }

        }

        function getPeriodEvolutionDatas(action = false) {

            if (props.locationType === "country" || props.locationType === "global") {

                const keysToIgnore = ["creation_date"];

                for (const [key, value] of Object.entries(props.locationEvolutionDatas)) {

                    if (keysToIgnore.includes(key) === false) {

                        if (action === false || action === "weeklyDailyEvolution") {

                            let results = datasCalculator.datasListFunctionalities.getWeeklyDailyEvolution(value);
                            for (const keyValue of Object.entries(results)) {

                                datas[keyValue[0]][key]["dataNumber"] = keyValue[1];

                            }

                        } else if (action === "customPeriodEvolution") {

                            let results = datasCalculator.datasListFunctionalities.getCustomPeriodEvolution(value, customPeriodDates);
                            datas.customPeriodDatas[key]["dataNumber"] = results;

                        }

                    }
                
                }

            } else if (props.locationType === "departement") {

                if (action === false || action === "weeklyDailyEvolution") {

                    let results = datasCalculator.datasListFunctionalities.getDepartementWeeklyDailyEvolution(props.locationEvolutionDatas.datas);
                    console.log(results);

                    for (const [datasKey, datasValue] of Object.entries(results)) {

                        for (const [key, value] of Object.entries(datasValue)) {
                            datas[datasKey][key]["dataNumber"] = value;
                        }

                    }
                
                } else if (action === "customPeriodEvolution") {

                    let results = datasCalculator.datasListFunctionalities.getDepartementCustomPeriodEvolution(props.locationEvolutionDatas.datas, customPeriodDates);
                    for (const [key, value] of Object.entries(results)) {
                        datas.customPeriodDatas[key]["dataNumber"] = value;
                    }

                }

            }

        }

        function customPeriodSubmission() {

            if (checkCustomDatesInput() === true) {

                getPeriodEvolutionDatas("customPeriodEvolution");
                hasCustomPeriodBeenSubmitted.value = true;
                displayedDatatype.value = "customPeriodDatas";
                isCustomPeriodFormDisplayed.value = false;

            } else {
                alert("Votre saisie ne correspond pas aux critères requis");
            }
        
        }

        getPeriodEvolutionDatas();

        onMounted(() => {
            document.getElementById(displayedDatatype.value + "EvoBtn").className += " dashboardSelectedElement";
        });

        watch(displayedDatatype, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                //Update classnames
                if (document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button").length > 0) {

                    let btns = document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button");

                    for (let i = 0; i < btns.length; i++) {

                        let currentElementClasses = btns[i].className.split(" ");

                        if (currentElementClasses.includes("dashboardSelectedElement")) {

                            for (let c = 0; c < currentElementClasses.length; c++) {

                                if (currentElementClasses[c] === "dashboardSelectedElement") {
                                    currentElementClasses.splice(c, 1);
                                    break;
                                }

                            }

                            btns[i].className = currentElementClasses.join(" ");

                        }

                    }

                    //document.getElementById(newValue.value + "EvoBtn").className += " dashboardSelectedElement";

                }

            }

        }, {immediate: true});
        
        watch(isCustomPeriodFormDisplayed, (newValue) => {
            
            if (newValue === true) {

                let customPeriodFormClasses = document.getElementById("customPeriodForm").className.split(" ");

                for (let i = 0; i < customPeriodFormClasses.length; i++) {

                    if (customPeriodFormClasses[i] === "weeklyDailyDatasPanel__customPeriodForm--hidden") {
                        customPeriodFormClasses.splice(i, 1);
                        break;
                    }

                }

                document.getElementById("customPeriodForm").className = customPeriodFormClasses.join(" ");
                document.getElementById("customPeriodFormToggleBtn").className += " dashboardSelectedElement";
                document.getElementById("customPeriodFormToggleBtn").setAttribute("arai-hidden", "false");

            } else if (newValue === false) {

                document.getElementById("customPeriodForm").className += " weeklyDailyDatasPanel__customPeriodForm--hidden";

                let formToggleBtnClasses = document.getElementById("customPeriodFormToggleBtn").className.split(" ");

                for (let i = 0; i < formToggleBtnClasses.length; i++) {

                    if (formToggleBtnClasses[i] === "dashboardSelectedElement") {
                        formToggleBtnClasses.splice(i, 1);
                        break;
                    }

                }

                document.getElementById("customPeriodFormToggleBtn").className = formToggleBtnClasses.join(" ");
                document.getElementById("customPeriodFormToggleBtn").setAttribute("arai-hidden", "true");

            }

        });

        return {
            secondButtonContent,
            displayedDatatype,
            displayedDatas,
            datas,
            customPeriodDates,
            customPeriodSubmission,
            customPeriodBtnContent,
            hasCustomPeriodBeenSubmitted,
            isCustomPeriodFormDisplayed,
            customPeriodDatesLimit,
            dashboardIcons
        }

    },
    components: {
        StatItem
    }
}
</script>

<style lang="scss">
.weeklyDailyDatasPanel {
    &__headerContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        flex-direction: column;
        @media (min-width: 1024px) {
            flex-direction: row;
            padding-bottom: 0;
        }
    }
    &__btn {
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        transition: all 300ms;
        &:hover {
            color: $dashboard-selection;
        }
        &--left {
            margin-right: 0.25rem;
        }
        &--right {
            margin-left: 0.25rem;
        }
    }
    &__btnsPart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
        p {
            display: none;
            @media (min-width: 1024px) {
                display: block;
            }
        }
    }
    &__customPeriodForm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: $white;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
        &--hidden {
            display: none;
        }
    }
    &__contentContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        position: relative;
        @media (min-width: 1024px) {
            flex-direction: row;
        }
    }
}
</style>