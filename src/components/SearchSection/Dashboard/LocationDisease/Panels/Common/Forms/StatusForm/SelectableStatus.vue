<template>

    <input
        :type="inputType"
        :value="datas.status"
        :id="HTMLFor"
        class="input"
        @click.prevent="onStatusChange"
    />
    <label
        v-bind="$attrs"
        :for="HTMLFor"
        class="selectableStatus"
        :class="classes"
        :title="datas.frStatus"
        tabindex="0"
        role="button"
        aria-pressed="true"
    >
        <font-awesome-icon :icon="datas.icon" aria-hidden="true"/>
        <span class="screenreaderText">
            {{ datas.frStatus }}
        </span>
    </label>

</template>

<script>
import { reactive, computed, inject } from "vue";
import { useStore } from "vuex";
import StringCustomMethods from "../../../../../../../../assets/JSClasses/CustomMethods/String.js";

export default {
    props: {
        inputType: {
            type: String,
            required: true,
            default: "checkox",
            validator(value) {
                return ["radio", "checkbox"].includes(value);
            }
        },
        status: {
            type: String,
            required: true
        },
        isChecked: {
            type: Boolean,
            required: true
        },
        componentName: {
            type: String,
            required: true
        }
    },
    emits: ["selectable-status-change"],
    setup(props, context) {

        const store = useStore();
        const DASHBOARD_ASSETS = computed(() => store.state.DashboardAssets);
        const KEYS_TRANSLATIONS = inject("KEYS_TRANSLATIONS");

        const datas = reactive({
            status: props.status,
            frStatus: KEYS_TRANSLATIONS[props.status],
            icon: DASHBOARD_ASSETS.value.ICONS.STATUS[StringCustomMethods.getConstantNameFromVariable(props.status)]
        });

        const classes = computed(() => ({
            [`selectableStatus--${props.status}Active`]: props.isChecked === true,
            [`inactive selectableStatus--${props.status}InactiveHover`]: props.isChecked === false
        }));

        const HTMLFor = computed(() => `${props.componentName}${props.status}input`);

        const onStatusChange = () => context.emit("selectable-status-change", {status: props.status, state: !props.isChecked});

        return {
            datas,
            classes,
            HTMLFor,
            onStatusChange
        }

    }
}
</script>

<style lang="scss" scoped>
$selectableStatusVerticalPadding: calc(max(0.2rem, 0.2vw));
$selectableStatusHorizontalPadding: calc(max(0.5rem, 0.5vw));
.input {
    display: none;
}
.selectableStatus {
    background-color: inherit;
    border: 2px solid $inactive;
    font-size: clamp(1.5rem, 1.6vw, 3.5rem);
    padding-top: $selectableStatusVerticalPadding;
    padding-bottom: $selectableStatusVerticalPadding;
    padding-left: $selectableStatusHorizontalPadding;
    padding-right: $selectableStatusHorizontalPadding;
    border-radius: 3px;
    transition: all 300ms;
    &:hover {
        cursor: pointer;
    }
    &--dashedBorder {
        border-style: dashed;
    }
    &--confirmedActive {
        border-color: $confirmed;
        color: $confirmed;
    }
    &--confirmedInactiveHover:hover {
        border-color: lighten($confirmed, 10%);
        color: lighten($confirmed, 10%);
    }
    &--deathsActive {
        border-color: $deaths;
        color: $deaths;
    }
    &--deathsInactiveHover:hover {
        border-color: lighten($deaths, 10%);
        color: lighten($deaths, 10%);
    }
    &--recoveredActive {
        border-color: $recovered;
        color: $recovered;
    }
    &--recoveredInactiveHover:hover {
        border-color: lighten($recovered, 10%);
        color: lighten($recovered, 10%);
    }
    &--unvaccinatedActive {
        border-color: $unvaccinated;
        color: $unvaccinated;
    }
    &--unvaccinatedInactiveHover:hover {
        border-color: lighten($unvaccinated, 10%);
        color: lighten($unvaccinated, 10%);
    }
    &--partiallyVaccinatedActive {
        border-color: $partiallyVaccinated;
        color: $partiallyVaccinated;
    }
    &--partiallyVaccinatedInactiveHover:hover {
        border-color: lighten($partiallyVaccinated, 10%);
        color: lighten($partiallyVaccinated, 10%);
    }
    &--vaccinatedActive {
        border-color: $vaccinated;
        color: $vaccinated;
    }
    &--vaccinatedInactiveHover:hover {
        border-color: lighten($vaccinated, 10%);
        color: lighten($vaccinated, 10%);
    }
    &--hospitalizationsActive {
        border-color: $hospitalizations;
        color: $hospitalizations;
    }
    &--new_hospitalizationsActive {
        border-color: $hospitalizations;
        color: $hospitalizations;
    }
    &--hospitalizationsInactiveHover:hover, &--new_hospitalizationsInactiveHover:hover {
        border-color: lighten($hospitalizations, 10%);
        color: lighten($hospitalizations, 10%);
    }
    &--intensiveCareActive {
        border-color: $intensiveCare;
        color: $intensiveCare;
    }
    &--new_intensiveCareActive {
        border-color: $intensiveCare;
        color: $intensiveCare;
    }
    &--intensiveCareInactiveHover:hover, &--new_intensive_careInactiveHover:hover {
        border-color: lighten($intensiveCare, 10%);
        color: lighten($intensiveCare, 10%);
    }
    &--inactive {
        border-color: $inactive;
        color: $inactive;
    }
}
</style>