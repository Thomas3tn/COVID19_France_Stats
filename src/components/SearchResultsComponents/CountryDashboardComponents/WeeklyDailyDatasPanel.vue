<template>
    <div class="datasPanel weeklyDailyDatasPanel">
        <div class="datasPanel__headerContainer weeklyDailyDatasPanel__headerContainer">
            <div class="weeklyDailyDatasPanel__btnsPart">
                <button @click="displayedDatatype = 'dailyDatas'" id="dailyDatasEvoBtn" title="Tendance quotidienne" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--left"><h3>Tendance quotidienne</h3></button>
                <p>/</p>
                <button @click="displayedDatatype = 'weeklyDatas'" id="weeklyDatasEvoBtn" title="Tendance hebdomadaire" class="weeklyDailyDatasPanel__btn weeklyDailyDatasPanel__btn--right"><h3>Tendance hebdomadaire</h3></button>
                <template v-if="datas.customPeriodDatas.confirmed !== null">
                    <p>/</p>
                    <button @click="displayedDatatype = 'customPeriodDatas'" class="weeklyDailyDatasPanel__btn" :title="customPeriodBtnContent">{{ customPeriodBtnContent }}</button>
                </template>
            </div>
            <form @submit.prevent="customPeriodSubmission" class="weeklyDailyDatasPanel__customPeriodForm">
                <i class="far fa-calendar-alt"></i>
                <div class="weeklyDailyDatasPanel__dateInputContainer">
                    <i class="far fa-calendar-alt"></i>
                    <div class="weeklyDailyDatasPanel__inputPart">
                        <label for="wdpStartDate">Date de début <abbr title="Si non renseignée, cette date est fixée au 22/01/2020">?</abbr></label>
                        <input type="date" placeholder="Ex: 24/05/2021" id="wdpStartDate" v-model="customPeriodDates.startDate" min="2020-01-22" :max="endDateLimit"/>
                    </div>
                </div>
                <div class="weeklyDailyDatasPanel__dateInputContainer">
                    <i class="far fa-calendar-alt"></i>
                    <div class="weeklyDailyDatasPanel__inputPart">
                        <label for="wdpEndDate">Date de fin <abbr title="Si non renseignée, cette date est fixée au jour actuel">?</abbr></label>
                        <input type="date" placeholder="Ex: 05/09/2020" id="wdpEndDate" v-model="customPeriodDates.endDate" min="2020-01-22" :max="endDateLimit"/>
                    </div>
                </div>
                <button type="submit" title="Entrer période"><i class="fas fa-search"></i></button>
            </form>
        </div>
        <div class="datasPanel__contentContainer weeklyDailyDatasPanel__contentContainer">
            <template v-for="item in displayedDatas" :key="item.dataName">
                <stat-item v-if="item.dataNumber !== null" :statNumber="item.dataNumber" :statName="item.dataName"></stat-item>
            </template>
        </div>
    </div>
</template>

<script>
import StatItem from "./statItem.vue";
import { ref, reactive, watch, computed, onMounted } from "vue";

import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

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

        let currentDate = new Date();
        let month = datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getMonth() + 1);
        let monthDay = datasCalculator.dateFunctionalities.getTwoDigitsDateElement(currentDate.getDate() - 1);
        const endDateLimit = currentDate.getFullYear() + "-" + month + "-" + monthDay;
        let customPeriodDates = reactive({
            startDate: "",
            endDate: ""
        });
        let customPeriodBtnContent = computed(() => "Du " + customPeriodDates.startDate.split("-")[2] + "-" + customPeriodDates.startDate.split("-")[1] + "-" + customPeriodDates.startDate.split("-")[0] + " au " + customPeriodDates.endDate.split("-")[2] + "-" + customPeriodDates.endDate.split("-")[1] + "-" + customPeriodDates.endDate.split("-")[0]);

        //Store all period types datas
        let datas = reactive({
            dailyDatas: {
                confirmed: null,
                deaths: null,
                recovered: null,
                hospitalizations: null,
                intensiveCare: null
            },
            weeklyDatas: {
                confirmed: null,
                deaths: null,
                recovered: null,
                hospitalizations: null,
                intensiveCare: null
            },
            customPeriodDatas: {
                confirmed: null,
                deaths: null,
                recovered: null,
                hospitalizations: null,
                intensiveCare: null
            }
        });

        //Indicates which type of datas is displayed
        let displayedDatatype = ref("dailyDatas");

        //Store datas that have to be displayed
        let displayedDatas = reactive({
            confirmed: {
                dataName: "Cas confirmés",
                dataNumber: datas.dailyDatas.confirmed
            },
            deaths: {
                dataName: "Décès",
                dataNumber: datas.dailyDatas.deaths
            },
            recovered: {
                dataName: "Guéris",
                dataNumber: datas.dailyDatas.recovered
            },
            hospitalizations: {
                dataName: "Hospitalisations",
                dataNumber: datas.dailyDatas.hospitalizations
            },
            intensiveCare: {
                dataName: "Réanimations",
                dataNumber: datas.dailyDatas.intensiveCare
            }
        });

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
                displayedDatatype.value = "customPeriodDatas";

            } else {
                alert("Votre saisie ne correspond pas aux critères requis");
            }
        
        }

        getPeriodEvolutionDatas();

        onMounted(() => {
            document.getElementById(displayedDatatype.value + "EvoBtn").className = " selectedBtn";
        });

        watch(displayedDatatype, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                displayedDatas.confirmed.dataNumber = datas[newValue]["confirmed"];
                displayedDatas.deaths.dataNumber = datas[newValue]["deaths"];
                displayedDatas.recovered.dataNumber = datas[newValue]["recovered"];

                /*if (typeof document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button") !== "undefined") {

                    let btns = document.querySelectorAll(".weeklyDailyDatasPanel__btnsPart > button");
                    console.log(btns.length);

                    for (let i = 0; i < btns.length; i++) {

                        if (btns[i].className !== "") {

                            let currentElementClasses = btns[i].split(" ");

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

                    }

                    document.getElementById(displayedDatatype.value + "EvoBtn").className === "" ? document.getElementById(displayedDatatype.value + "EvoBtn").className = "selectedBtn" : document.getElementById(displayedDatatype.value + "EvoBtn").className += " selectedBtn";

                }*/

            }

        }, {immediate: true});
        
        return {
            endDateLimit,
            displayedDatatype,
            displayedDatas,
            datas,
            customPeriodDates,
            customPeriodSubmission,
            customPeriodBtnContent
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
    }
    &__btn {
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
        transition: all 300ms;
        &:hover {
            color: #93B1A7;
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
        font-weight: bold;
    }
    &__customPeriodForm {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 100%;
        transform: translateX(0%);
        transition: all 300ms;
        &:hover {
            transform: translateX(-95%);
        }
    }
    &__dateInputContainer {
        display: flex;
        align-items: center;
    }
    &__inputPart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    &__contentContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>