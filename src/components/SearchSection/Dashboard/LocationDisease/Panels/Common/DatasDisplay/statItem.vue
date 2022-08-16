<template>

    <div class="container">

		<font-awesome-icon v-if="logo !== null" :icon="logo" class="statusLogo"/>

        <div class="statPart">

			<div class="numberContainer">

				<p class="number">{{ formattedNumber }}</p>
				<font-awesome-icon v-if="trendLogo !== null" :icon="trendLogo" class="evolutionLogo"/>

			</div>

			<p 
				v-if="splittedName.secPart !== null" 
				class="title"
			>
				{{ splittedName.firstPart }}
				<br/>
				{{ splittedName.secPart }}
			</p>

			<p 
				v-else 
				class="title"
			>
				{{ splittedName.firstPart }}
			</p>

        </div>
    </div>

</template>

<script>
import { faAngleDoubleUp, faChevronDown, faGripLines } from "@fortawesome/free-solid-svg-icons";
import { computed, inject } from "vue";
import { useStore } from "vuex";

import NumberCustomMethods from "../../../../../../../assets/JSClasses/CustomMethods/Number.js";
import StringCustomMethods from "../../../../../../../assets/JSClasses/CustomMethods/String.js";

export default {
	props: {
        name: {
            type: String,
            required: false
        },
        number: {
            type: [String, Number],
			required: false,
			default: "N/A"
        },
		type: {
			type: String,
			required: false,
			default: "STATUS",
			validator(value) {
				return ["STATUS", "RELATIVE", "EVOLUTION"].includes(value)
			}
		}
    },
	setup(props) {

		const store = useStore();
		const DASHBOARD_ASSETS = computed(() => store.state.DashboardAssets);
		const DATATYPES = {
			STATUS: "STATUS",
			EVOLUTION: "EVOLUTION",
			RELATIVE: "RELATIVE"
		};
		const KEYS_TRANSLATIONS = inject("KEYS_TRANSLATIONS");

		const logo = computed(() => {

			try {
const path = props.type === DATATYPES.RELATIVE ? `${DATATYPES.RELATIVE}_DATAS` : DATATYPES.STATUS;
			let key = props.type === DATATYPES.RELATIVE ? props.name.split("/")[1] : props.name;
			key = StringCustomMethods.getConstantNameFromVariable(key);
			return DASHBOARD_ASSETS.value.ICONS[path][key];
			} catch (error) {
				console.error(error);
				console.log(props.name, props.type, props.number)
				throw "Error";
			}

			

		});

		const formattedNumber = computed(() => NumberCustomMethods.formatNumber(props.number));

		const splittedName = computed(() => {

			return {
				firstPart: `${KEYS_TRANSLATIONS[props.name.split("/")[0]]}${props.name.split("/")[1] ? "/" : ""}`, 
				secPart: KEYS_TRANSLATIONS[props.name.split("/")[1]] || null
			};

		});

		let trendLogo = computed(() => {

			if (props.type === DATATYPES.EVOLUTION) {

				const dataNumber = typeof props.number === "string" ? parseInt(props.number, 10) : props.number;

				if (dataNumber === 0) {
					return faGripLines;
				} else {
					return Math.sign(dataNumber) === -1 ? faChevronDown : faAngleDoubleUp;
				}

			} else {
				return null;
			}

		});

		return {
			logo,
			formattedNumber,
			trendLogo,
			splittedName
		}

	}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 1.5rem 0;
	@media (min-width: 768px) {
		margin: 1.5rem;
	}
}
.evolutionLogo {
	display: block;
	position: relative;
	top: -11px;
	left: 6%;
	font-size: 1.2rem;
}
.statusLogo {
	font-size: clamp(2rem, 2.8vw, 3.5rem);
	margin-right: 0.6rem;
}
.statPart {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.title {
	margin: 0;
	font-size: clamp(1rem, 1vw, 3.5rem);
}
.numberContainer {
	display: flex;
	justify-content: flex-start;
	align-items: baseline;
}
.number {
	margin: 0;
	font-size: clamp(2rem, 2.7vw, 4.5rem);
}
</style>