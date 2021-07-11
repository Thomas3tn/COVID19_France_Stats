<template>
    <div class="datasPanel weeklyDailyDatasPanel">
        <div class="datasPanel__headerContainer weeklyDailyDatasPanel__headerContainer">
            <div class="weeklyDailyDatasPanel__btnsPart">
                <button @click="displayedDatatype = 'dailyDatas'" id="dailyDatasEvoBtn" title="Tendance quotidienne" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--left"><h3>Tendance quotidienne</h3></button>
                <p>/</p>
                <button @click="displayedDatatype = 'weeklyDatas'" id="weeklyDatasEvoBtn" title="Tendance hebdomadaire" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--right"><h3>hebdomadaire</h3></button>
                <template v-if="hasCustomPeriodBeenSubmitted === true">
                    <p>/</p>
                    <button @click="displayedDatatype = 'customPeriodDatas'" id="customPeriodDatasEvoBtn" class="weeklyDailyDatasPanel__btn" :title="customPeriodBtnContent"><h3>{{ customPeriodBtnContent }}</h3></button>
                </template>
            </div>
            <button id="customPeriodFormToggleBtn" title="Ajouter période personnalisée" class="weeklyDailyDatasPanel__toggleFormBtn" @click="isCustomPeriodFormDisplayed = !isCustomPeriodFormDisplayed"><i class="far fa-calendar-plus"></i></button>
        </div>
        <div class="datasPanel__contentContainer weeklyDailyDatasPanel__contentContainer">
            <template v-for="item in displayedDatas" :key="item.dataName">
                <stat-item v-if="item.dataNumber !== null" :statNumber="item.dataNumber" :statName="item.dataName"></stat-item>
            </template>
            <form @submit.prevent="customPeriodSubmission" id="customPeriodForm" class="weeklyDailyDatasPanel__customPeriodForm weeklyDailyDatasPanel__customPeriodForm--hidden">
                <div class="weeklyDailyDatasPanel__dateInputContainer">
                    <i class="fas fa-hourglass-start"></i>
                    <div class="weeklyDailyDatasPanel__inputPart">
                        <label for="wdpStartDate" class="weeklyDailyDatasPanel__inputLabel">Date de début <abbr title="Si non renseignée, cette date est fixée au 22/01/2020">?</abbr></label>
                        <input type="date" placeholder="Ex: 24/05/2021" class="weeklyDailyDatasPanel__dateInput" id="wdpStartDate" v-model="customPeriodDates.startDate" min="2020-01-22" :max="endDateLimit"/>
                    </div>
                </div>
                <div class="weeklyDailyDatasPanel__dateInputContainer">
                    <i class="fas fa-hourglass-end"></i>
                    <div class="weeklyDailyDatasPanel__inputPart">
                        <label for="wdpEndDate" class="weeklyDailyDatasPanel__inputLabel">Date de fin <abbr title="Si non renseignée, cette date est fixée au jour actuel">?</abbr></label>
                        <input type="date" placeholder="Ex: 05/09/2020" class="weeklyDailyDatasPanel__dateInput" id="wdpEndDate" v-model="customPeriodDates.endDate" min="2020-01-22" :max="endDateLimit"/>
                    </div>
                </div>
                <button type="submit" title="Entrer période" class="weeklyDailyDatasPanel__submitBtn"><i class="fas fa-search"></i></button>
            </form>
        </div>
    </div>
</template>

<script>
import StatItem from "./SharedComponents/statItem.vue";
import { ref, reactive, watch, computed, onMounted } from "vue";

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

        let isCustomPeriodFormDisplayed = ref(false);
        let hasCustomPeriodBeenSubmitted = ref(false);

        //Indicates which type of datas is displayed
        let displayedDatatype = ref("dailyDatas");

        //Store datas that have to be displayed
        let displayedDatas = reactive({});

        //Calculate custom period form end date limit
        const endDateLimit = computed(() => {

            let currentDate = new Date();
            let month = datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getMonth() + 1);
            let monthDay = datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getDate() - 1);
            return currentDate.getFullYear() + "-" + month + "-" + monthDay;

        });
        

        let customPeriodDates = reactive({
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

            for (const [key, value] of Object.entries(props.locationEvolutionDatas.datas.cumulativeDatas)) {

                displayedDatas[key] = {
                    dataName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key),
                    dataNumber: value[0]
                }

                for (const keyValue of Object.entries(datas)) {
                    datas[keyValue[0]][key] = null;
                }

            }

        } else {

            for (const evolutionDatasKeyValue of Object.entries(props.locationEvolutionDatas)) {

                displayedDatas[evolutionDatasKeyValue[0]] = {
                    dataName: datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(evolutionDatasKeyValue[0]),
                    dataNumber: 0
                }

                for (const datasKeyValue of Object.entries(datas)) {
                    datas[datasKeyValue[0]][evolutionDatasKeyValue[0]] = null;
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
                            datas.dailyDatas[key] = results.dailyEvolution;
                            datas.weeklyDatas[key] = results.weeklyEvolution;

                        } else if (action === "customPeriodEvolution") {

                            let result = datasCalculator.datasListFunctionalities.getCustomPeriodEvolution(value, customPeriodDates);
                            datas.customPeriodDatas[key] = result;

                        }

                    }
                
                }

            } else if (props.locationType === "departement") {

                if (action === false || action === "weeklyDailyEvolution") {

                    let results = datasCalculator.datasListFunctionalities.getDepartementWeeklyDailyEvolution(props.locationEvolutionDatas.datas);
                    console.log(results);
                    for (const [datasKey, datasValue] of Object.entries(results)) {
                        console.log(datasKey)
                        for (const [key, value] of Object.entries(datasValue)) {
                            datas[datasKey][key] = value;
                        }

                    }
                
                } else if (action === "customPeriodEvolution") {

                    let results = datasCalculator.datasListFunctionalities.getDepartementCustomPeriodEvolution(props.locationEvolutionDatas.datas, customPeriodDates);
                    for (const [key, value] of Object.entries(results)) {
                        datas.customPeriodDatas[key] = value;
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
            document.getElementById(displayedDatatype.value + "EvoBtn").className += " selectedBtn";
        });

        watch(displayedDatatype, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                for (const [key, value] of Object.entries(displayedDatas)) {
                    value.dataNumber = datas[displayedDatatype.value][key];
                }

                //Update classnames
                if (document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button").length > 0) {

                    let btns = document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button");

                    for (let i = 0; i < btns.length; i++) {

                        let currentElementClasses = btns[i].className.split(" ");

                        if (currentElementClasses.includes("selectedBtn")) {

                            for (let c = 0; c < currentElementClasses.length; c++) {

                                if (currentElementClasses[c] === "selectedBtn") {
                                    currentElementClasses.splice(c, 1);
                                    break;
                                }

                            }

                            btns[i].className = currentElementClasses.join(" ");

                        }

                    }

                    //document.getElementById(newValue.value + "EvoBtn").className += " selectedBtn";

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
                document.getElementById("customPeriodFormToggleBtn").className += " selectedBtn";

            } else if (newValue === false) {

                document.getElementById("customPeriodForm").className += " weeklyDailyDatasPanel__customPeriodForm--hidden";

                let formToggleBtnClasses = document.getElementById("customPeriodFormToggleBtn").className.split(" ");

                for (let i = 0; i < formToggleBtnClasses.length; i++) {

                    if (formToggleBtnClasses[i] === "selectedBtn") {
                        formToggleBtnClasses.splice(i, 1);
                        break;
                    }

                }

                document.getElementById("customPeriodFormToggleBtn").className = formToggleBtnClasses.join(" ");

            }

        });

        return {
            endDateLimit,
            displayedDatatype,
            displayedDatas,
            datas,
            customPeriodDates,
            customPeriodSubmission,
            customPeriodBtnContent,
            hasCustomPeriodBeenSubmitted,
            isCustomPeriodFormDisplayed
        }

    },
    components: {
        StatItem
    }
}
</script>

<style lang="scss">
.selectedBtn {
    color: lightblue;
}

.weeklyDailyDatasPanel {
    &__headerContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        flex-direction: column;
        padding-bottom: 1rem;
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
            color: lightblue;
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
    &__toggleFormBtn {
        border: 1px solid black;
        border-radius: 3px;
        background-color: inherit;
        padding: 0.2rem 0.5rem;
        transition: all 300ms;
        width: 100%;
        @media (min-width: 1024px) {
            width: auto;
        }
        &:hover {
            cursor: pointer;
            border-color: lightblue;
            color: lightblue;
        }
    }
    &__customPeriodForm {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-color: white;
        &--hidden {
            display: none;
        }
    }
    &__dateInputContainer {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        i {
            font-size: 2rem;
        }
    }
    &__inputPart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 1.5rem;
    }
    &__inputLabel {
        margin-bottom: 0.3rem;
    }
    &__dateInput {
        background-color: rgb(250, 250, 250);
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        border: 1px solid black;
        &:hover {
            cursor: pointer;
        }
    }
    &__submitBtn {
        font-size: 1.3rem;
        padding: 0.5rem 1rem;
        margin-left: 1.5rem;
        border: 1px solid black;
        border-radius: 3px;
        background-color: inherit;
        transition: all 300ms;
        &:hover {
            border-color: lightblue;
            color: lightblue;
            cursor: pointer;
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