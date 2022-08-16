<template>

    <form 
        @submit.prevent="onFormSubmission" 
        class="form" 
        aria-hidden="false"
    >
        <date-input 
            :componentName="componentName" 
            :icon="DASHBOARD_ASSETS.START_DATE" 
            :datesLimits="datesLimits" 
            :limitType="'start'"
            :value="datesInputs.start"
            @date-change="onDateChange"
        ></date-input>

        <date-input 
            :componentName="componentName" 
            :icon="DASHBOARD_ASSETS.START_DATE" 
            :datesLimits="datesLimits" 
            :limitType="'end'"
            :value="datesInputs.end"
            @date-change="onDateChange"
        ></date-input>

        <submit-button 
            :title="'Valider la période personnalisée'" 
            :icon="DASHBOARD_ASSETS.SEARCH"
        ></submit-button>
    
    </form>

</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import DateInput from "./CustomPeriodForm/DateInput.vue";
import SubmitButton from "./CustomPeriodForm/SubmitButton.vue";
import DateCustomMethods from "../../../../../../../assets/JSClasses/CustomMethods/Date.js";

export default {
    props: {
        componentName: {
            type: String,
            required: true
        },
        datesLimits: {
            type: Object,
            required: true
        },
        dates: {
            type: Object,
            required: false,
            default() {
                return {}
            }
        }
    },
    setup(props, context) {

        const store = useStore();
        const DASHBOARD_ASSETS = computed(() => store.state.DashboardAssets.ICONS.FORM);
        const datesInputs = reactive({
            start: props.dates.start || null,
            end: props.dates.end || null
        });

        const onDateChange = newDate => datesInputs[newDate.type] = newDate.date;

        function checkCustomDatesInput() {

            datesInputs.start  = datesInputs.start === null ? props.datesLimits.start : datesInputs.start;
            datesInputs.end  = datesInputs.end === null ? props.datesLimits.end : datesInputs.end;

            const isStartValid = DateCustomMethods.isDateValid({date: datesInputs.start, startLimit: props.datesLimits.start, endLimit: props.datesLimits.end});
            const isEndValid = DateCustomMethods.isDateValid({date: datesInputs.end, startLimit: props.datesLimits.start, endLimit: props.datesLimits.end});
            const isStartLowerThanEnd = Date.parse(datesInputs.start) < Date.parse(datesInputs.end);

            return [isStartValid, isEndValid, isStartLowerThanEnd].every(test => test === true);

        }

        function onFormSubmission() {

            if (checkCustomDatesInput()) {
                context.emit("custom-period-submitted", datesInputs);
            } else {

                datesInputs.start = datesInputs.end = null;
                alert("Votre saisie ne correspond pas aux critères requis");

            }

        }

        return {
            DASHBOARD_ASSETS,
            datesInputs,
            onFormSubmission,
            onDateChange
        }

    },
    components: {
        DateInput,
        SubmitButton
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
}
</style>