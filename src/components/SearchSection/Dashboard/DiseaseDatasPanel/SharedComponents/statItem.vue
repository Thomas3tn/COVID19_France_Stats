<template>
    <div class="statContainer">
		<font-awesome-icon :icon="logo" class="statContainer__logo"/>
        <div class="statContainer__statPart">
			<p class="statContainer__number" id="confCasesStat">{{ number }}</p>
            <p class="statContainer__title">{{ statName }}</p>
        </div>
    </div>
</template>

<script>
import { faCross, faHospitalUser, faMale, faMapMarkedAlt, faProcedures, faSyringe, faUsers, faWalking } from "@fortawesome/free-solid-svg-icons";
import DatasCalculator from "../../../../../assets/JSClasses/DatasCalculator.js";
import { computed } from "vue";

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
        }
    },
	setup(props) {

		const datasCalculator = new DatasCalculator();

		let logo;
		switch (props.statName) {
			case "Cas confirmés":
				logo = faMale;
				break;

			case "Guéris":
				logo = faWalking;
				break;

			case "Décès":
				logo = faCross;
				break;

			case "Personnes vaccinées":
				logo = faSyringe;
				break;

			case "Hospitalisations":
				logo = faHospitalUser;
				break;

			case "Réanimations":
				logo = faProcedures;
				break;

			case "Infections/milliers d'habs":
				logo = faUsers;
				break;

			case "Infections/km²":
				logo = faMapMarkedAlt;
				break;

			default:
				logo = faMale;
				break;
		}

		let number = computed(() => datasCalculator.numberFunctionalities.formatNumber(props.statNumber));

		return {
			logo,
			number
		}

	}
}
</script>

<style lang="scss">
.statContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem 1.5rem 1.5rem 0;
	&__logo {
		font-size: 2.5rem;
		margin-right: 0.5rem;
	}
	&__statPart {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	&__title {
		margin: 0;
		font-size: 0.8rem;
	}
	&__number {
		margin: 0;
		font-size: 2.3rem;
	}
}

</style>