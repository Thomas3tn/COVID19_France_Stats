<template>

    <panel>

        <template v-slot:header>

            <div class="selectableHeadersContainer">

                <h3 class="datasPanel__header headerAbbreviation">Tend.</h3>

                <selectable-header 
                    @selectable-header-clicked="onSelectableHeaderClick" 
                    :content="'quotidienne'" 
                    :title="'Tendance quotidienne'"
                    :position="'left'" 
                    :dataType="PERIOD_TYPES.DAILY"
                    :isSelected="displayedDatas.periodStates[PERIOD_TYPES.DAILY]"
                ></selectable-header>

                <p class="datasPanel__header">/</p>

                <selectable-header 
                    @selectable-header-clicked="onSelectableHeaderClick" 
                    :content="'hebdomadaire'" 
                    :title="'Tendance hebdomadaire'"
                    :position="'right'" 
                    :dataType="PERIOD_TYPES.WEEKLY"
                    :isSelected="displayedDatas.periodStates[PERIOD_TYPES.WEEKLY]"
                ></selectable-header>

                <template v-if="hasCustomPeriodBeenSubmitted === true">

                    <p class="datasPanel__header">/</p>

                    <selectable-header 
                        @selectable-header-clicked="onSelectableHeaderClick" 
                        :content="'personnalisée'" 
                        :dataType="PERIOD_TYPES.CUSTOM"
                        :title="`Tendance personnalisée (${customPeriodBtnContent})`"
                        :isSelected="displayedDatas.periodStates[PERIOD_TYPES.CUSTOM]"
                    ></selectable-header>

                </template>

            </div>

        </template>

        <template v-slot:formToggleBtn>
            <toggle-button 
                :isFormDisplayed="isFormDisplayed"
                @form-toggle-btn-clicked="isFormDisplayed = !isFormDisplayed"
            >
            </toggle-button>
        </template>

        <template v-slot:content>

            <template 
                v-for="(value, key) in displayedDatas.datas" 
                :key="key"
            >
                <stat-item 
                    v-if="value !== null" 
                    :number="value" 
                    :name="key" 
                    :type="'EVOLUTION'"
                ></stat-item>
            </template>

            <custom-period-form 
                v-if="isFormDisplayed === true"
                :componentName="'WeeklDailyEvolutionPanel'"
                :datesLimits="dates.limits" 
                class="customPeriodForm"
                @custom-period-submitted="onCustomPeriodSubmission"
                :dates="dates.custom"
            ></custom-period-form>

        </template>

    </panel>

</template>

<script>
import StatItem from "./Common/DatasDisplay/statItem.vue";
import CustomPeriodForm from "./Common/Forms/CustomPeriodForm.vue";
import Panel from "./Common/Panel/Panel.vue";
import ToggleButton from "./Common/Forms/Others/ToggleButton.vue";
import SelectableHeader from "./Common/Forms/Others/SelectableHeader.vue";
import { ref, reactive, computed, onMounted } from "vue";

import DateCustomMethods from "../../../../../assets/JSClasses/CustomMethods/Date.js";

export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const PERIOD_TYPES = {
            DAILY: 1,
            WEEKLY: 2,
            CUSTOM: 3
        };

        const isFormDisplayed = ref(false);
        const hasCustomPeriodBeenSubmitted = ref(false);

        let customPeriodBtnContent = computed(() => {

            if (dates.custom.start !== null && dates.custom.end !== null) {

                let start = DateCustomMethods.switchDateFormat({date: dates.custom.start, newSeparator: "/"}).split("/");
                let end = DateCustomMethods.switchDateFormat({date: dates.custom.end, newSeparator: "/"}).split("/");

                const startYear = start[2].split("").splice(2,4).join("");
                const endYear = end[2].split("").splice(2,4).join("");

                start.splice(2, 1, startYear);
                end.splice(2, 1, endYear);

                start = start.join("/");
                end = end.join("/");

                return `${start}-${end}`;

            } else {
                return null;
            }


        });

        const displayedDatas = reactive({
            periodType: null,
            periodStates: {
                [PERIOD_TYPES.DAILY]: false,
                [PERIOD_TYPES.WEEKLY]: false,
                [PERIOD_TYPES.CUSTOM]: false,
            },
            datas: {
                //List of status and data
            }
        });

        console.log(displayedDatas.datas);

        const dates = reactive({
            custom: {
                start: null,
                end: null
            },
            limits: {
                start: props.location.historical[0].date,
                end: props.location.historical[props.location.historical.length - 1].date
            }
        });

        const periodDatas = reactive({
            1: computed(() => props.location.historical[props.location.historical.length - 1].daily),
            2: computed(() => {

                //Check if length -7 is a week ago
                return DateCustomMethods.getDaysEvolution({
                    start: props.location.historical[props.location.historical.length - 7].cumulative,
                    end:props.location.historical[props.location.historical.length - 1].cumulative
                });

            }),
            3: {}
        });

        function onSelectableHeaderClick(periodTypeSelected) {

            displayedDatas.periodType = periodTypeSelected;
            Object.keys(displayedDatas.periodStates).forEach(key => displayedDatas.periodStates[key] = false);
            displayedDatas.periodStates[periodTypeSelected] = true;
            displayedDatas.datas = periodDatas[periodTypeSelected];

        }

        function setCustomPeriodDatas() {

            const start = props.location.historical.find(currDate => Date.parse(currDate.date) === Date.parse(dates.custom.start));
            const end = props.location.historical.find(currDate => Date.parse(currDate.date) === Date.parse(dates.custom.end));
            console.log(start, end)
            periodDatas[PERIOD_TYPES.CUSTOM] = DateCustomMethods.getDaysEvolution({start: start.cumulative, end: end.cumulative});

        }

        function onCustomPeriodSubmission(customDates) {

            try {

                dates.custom.start = customDates.start;
                dates.custom.end = customDates.end;

                setCustomPeriodDatas();
                hasCustomPeriodBeenSubmitted.value = true;
                displayedDatas.periodStates[displayedDatas.periodType] = false;
                displayedDatas.periodType = PERIOD_TYPES.CUSTOM;
                displayedDatas.periodStates[displayedDatas.periodType] = true;
                displayedDatas.datas = periodDatas[displayedDatas.periodType];
                isFormDisplayed.value = false;

            } catch (error) {
                alert("An error has occured while getting custom period dates");
            }
        
        }

        onMounted(() => {
            onSelectableHeaderClick(PERIOD_TYPES.DAILY);
        });

        return {
            PERIOD_TYPES,
            isFormDisplayed,
            hasCustomPeriodBeenSubmitted,
            customPeriodBtnContent,
            displayedDatas,
            dates,
            periodDatas,
            onCustomPeriodSubmission,
            onSelectableHeaderClick
        }

    },
    components: {
        StatItem,
        CustomPeriodForm,
        Panel,
        ToggleButton,
        SelectableHeader
    }
}
</script>

<style lang="scss" scoped>
.selectableHeadersContainer {
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
.customPeriodForm {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: $white;
}
.headerAbbreviation {
    margin-right: .5rem;
}
</style>