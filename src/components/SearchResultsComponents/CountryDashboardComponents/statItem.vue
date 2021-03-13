<template>
    <div class="statContainer">
        <i class="fas fa-male statContainer__logo"></i>
        <div class="statContainer__statPart">
			<p class="statContainer__number" id="confCasesStat">{{ statNumber }}</p>
            <p class="statContainer__title">{{ statName }}</p>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			statLogo: "",
		}
	},
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