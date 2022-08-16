<template>

    <div class="mainContainer">
        <font-awesome-icon :icon="icon" aria-hidden="true" class="icon"/>
        <div class="inputContainer">
            <label 
                :for="`${componentName}${limitType}Date`" 
                class="label"
            >
                Date de {{ frLimitType }} <abbr :title="`Si non renseignée, cette date est fixée au ${formattedLimitDate}`">?</abbr>
            </label>
            <input 
                type="date" 
                placeholder="Ex: 24/05/2021" 
                class="input" 
                :id="`${componentName}${limitType}Date`" 
                :min="datesLimits.start" 
                :max="datesLimits.end" 
                :value="value"
                required 
                aria-required="true"
                :title="`Sélectionner la date de ${frLimitType} de votre sélection`"
                @change="onDateChange"
            />
        </div>
    </div>

</template>

<script>
import { computed } from "vue";
import DateCustomMethods from "../../../../../../../../assets/JSClasses/CustomMethods/Date.js";

export default {
    props: {
        componentName: {
            type: String,
            required: true
        },
        icon: {
            type: Object,
            required: true
        },
        datesLimits: {
            type: Object,
            required: true
        },
        limitType: {
            type: String,
            required: true,
            validator(value) {
                return ["start", "end"].includes(value)
            }
        },
        value: {
            type: String,
            required: false,
            default: null
        }
    },
    setup(props, context) {

        const LIMIT_TYPES_TRANSLATIONS = {
            START: "début",
            END: "fin"
        }

        const frLimitType = computed(() => LIMIT_TYPES_TRANSLATIONS[props.limitType.toUpperCase()] || "");
        const formattedLimitDate = computed(() => DateCustomMethods.switchDateFormat({date: props.datesLimits[props.limitType], newSeparator: "/"}))

        const onDateChange = event => context.emit("date-change", {type: props.limitType, date: event.currentTarget.value});

        return {
            frLimitType,
            formattedLimitDate,
            onDateChange
        }

    }
}
</script>

<style lang="scss" scoped>
.mainContainer {
    display: flex;
    align-items: center;
    margin: 0 1rem;
}
.icon {
    font-size: clamp(1.5rem, 2vw, 2.7rem);
}
.inputContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 1.1vw;
}
.input {
    background-color: rgb(250, 250, 250);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    border: 1px solid black;
    font-size: clamp(0.9rem, 1vw, 2.5rem);
    &:hover {
        cursor: pointer;
    }
}
.label {
    margin-bottom: 0.3rem;
    font-size: clamp(1rem, 1vw, 1.3rem);
    abbr {
        cursor: help;
    }
}
</style>