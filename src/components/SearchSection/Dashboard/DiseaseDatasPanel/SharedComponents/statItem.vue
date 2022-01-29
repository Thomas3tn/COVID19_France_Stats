<template>
    <div class="statContainer">
		<font-awesome-icon v-if="logo !== ''" :icon="logo" class="statContainer__statusLogo"/>
        <div class="statContainer__statPart">
			<div class="statContainer__numberContainer">
				<p class="statContainer__number" id="confCasesStat">{{ number }}</p>
				<font-awesome-icon v-if="evolutionLogo !== ''" :icon="evolutionLogo" class="statContainer__evolutionLogo"/>
			</div>
			<p v-if="formattedDataName.dataNameSecondPart !== 'undefined'" class="statContainer__title">{{ formattedDataName.dataNameFirstPart }}<br/>{{ formattedDataName.dataNameSecondPart }}</p>
			<p v-else class="statContainer__title">{{ formattedDataName.dataNameFirstPart }}</p>
        </div>
    </div>
</template>

<script>
import { faAngleDoubleUp, faChevronDown, faGripLines } from "@fortawesome/free-solid-svg-icons";
import DatasCalculator from "../../../../../assets/JSClasses/DatasCalculator.js";
import { computed, inject } from "vue";

export default {
	props: {
        statName: {
            type: String,
            required: false
        },
        statNumber: {
            type: [String, Number],
			required: false,
			default: "N/A"
        },
		//dataType can be status (rawDatas), evolutionDatas or relativeDatas
		dataType: {
			type: String,
			required: false,
			default: "status"
		}
    },
	setup(props) {

		const datasCalculator = new DatasCalculator();
		const dashboardIcons = inject("dashboardIcons", {});

		let logo = computed(() => {

			if (typeof dashboardIcons !== "undefined") {

				if (props.dataType === "relativeDatas") {
					return dashboardIcons[props.dataType][datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(datasCalculator.textFunctionalities.formatStatusLogosPropName(props.statName.split("/")[1]))];
				} else {
					return dashboardIcons.status[datasCalculator.translationFunctionalities.getTranslatedKeyFromFra(datasCalculator.textFunctionalities.formatStatusLogosPropName(props.statName))];
				}

			} else {
				return "";
			}

		});

		let number = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.statNumber));
		let formattedDataName = computed(() => {

			if (props.statName.split("/").length > 1) {

				return {
					dataNameFirstPart: props.statName.split("/")[0] + "/",
					dataNameSecondPart: props.statName.split("/")[1]
				}

			} else {
				return { dataNameFirstPart: props.statName };
			}

		});

		let evolutionLogo = computed(() => {

			if (props.dataType === "evolutionDatas") {

				let dataNumber;
				typeof props.statNumber === "string" ? dataNumber = parseInt(props.statNumber, 10) : dataNumber = props.statNumber;

				if (dataNumber > 0) {
					return faAngleDoubleUp;
				} else if (dataNumber < 0) {
					return faChevronDown
				} else {
					return faGripLines;
				}

			} else {
				return "";
			}

		});

		return {
			logo,
			number,
			evolutionLogo,
			formattedDataName
		}

	}
}
</script>

<style lang="scss">
.statContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1.5rem 0;
	@media (min-width: 768px) {
		margin: 1.5rem;
	}
	&__evolutionLogo {
		display: block;
		position: relative;
		top: -11px;
		left: 6%;
		font-size: 1.2rem;
	}
	&__statusLogo {
		font-size: clamp(2rem, 2.8vw, 3.5rem);
		margin-right: 0.6rem;
	}
	&__statPart {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	&__title {
		margin: 0;
		font-size: clamp(1rem, 1vw, 3.5rem);
	}
	&__numberContainer {
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
	}
	&__number {
		margin: 0;
		font-size: clamp(2rem, 2.7vw, 4.5rem);
	}
}

</style>