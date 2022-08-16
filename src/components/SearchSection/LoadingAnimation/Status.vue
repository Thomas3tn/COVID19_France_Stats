<template>

    <div :class="`status status--${currentStatus} status--spinningOut`" ref="status">
        <font-awesome-icon :icon="icon" aria-hidden="true"/>
    </div>

</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import _ from "lodash";
import StringCustomMethods from "../../../assets/JSClasses/CustomMethods/String.js";

export default {
    props: {
        changeAlert: {
            type: Number,
            required: true
        }
    },
    setup(props) {

        const store = useStore();
        const ANIMATION_DURATION = 500;
        const DASHBOARD_ASSETS = computed(() => store.state.DashboardAssets.ICONS.STATUS);

        const statusList = ["confirmed", "deaths", "recovered", "hospitalizations", "intensiveCare", "partiallyVaccinated"];

        let currentStatus = ref(statusList[_.random(statusList.length - 1)]);
        const status = ref(null);

        const icon = computed(() => DASHBOARD_ASSETS.value[StringCustomMethods.getConstantNameFromVariable(currentStatus.value)]);

        watch(() => props.changeAlert, () => {

            if (status.value !== null) {

                status.value.className = `status status--${currentStatus.value} status--spinningIn`;

                setTimeout(() => {
                    currentStatus.value = statusList[_.random(statusList.length - 1)]
                    status.value.className = `status status--${currentStatus.value} status--spinningOut`;
                }, ANIMATION_DURATION);

            }

        }, {immediate: true});

        return {
            status,
            currentStatus,
            icon
        };

    },
}
</script>

<style lang="scss" scoped>
$animation-duration: 700ms;
@keyframes spinningOut {
    0% {
        transform: scale(0) rotate(0deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}

@keyframes spinningIn {
    0% {
        transform: scale(1) rotate(-360deg)
    }
    100% {
        transform: scale(0) rotate(0deg);
    }
}

.status {
    border: 2px solid;
    margin: 0 1rem;
    border-radius: 3px;
    height: 3.5vw;
    width: 3.5vw;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    &--spinningOut {
        animation: spinningOut $animation-duration both ease-in-out;
    }
    &--spinningIn {
        animation: spinningIn $animation-duration both ease-in-out;
    }
    &--hidden {
        display: none;
    }
    &--confirmed {
        border-color: $confirmed;
        color: $confirmed;
    }
    &--deaths {
        border-color: $deaths;
        color: $deaths;
    }
    &--recovered {
        border-color: $recovered;
        color: $recovered;
    }
    &--hospitalizations {
        border-color: $hospitalizations;
        color: $hospitalizations;
    }
    &--intensiveCare {
        border-color: $intensiveCare;
        color: $intensiveCare;
    }
    &--partiallyVaccinated {
        border-color: $partiallyVaccinated;
        color: $partiallyVaccinated;
    }
}
</style>