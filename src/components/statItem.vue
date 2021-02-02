<template>
    <div class="statContainer">
        <i class="fas fa-male statContainer__logo"></i>
        <div class="statContainer__statPart">
            <p class="statContainer__title">statName{{ statName }}</p>
            <p class="statContainer__number" id="confCasesStat">17.000 {{ statNumber }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        statName: {
            type: String,
            required: false
        },
        statNumber: {
            type: Number,
			required: false,
			default: 0
        }
    }
}
</script>

<style lang="scss">
.statContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 2rem 0;
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
	}
	&__number {
		margin: 0;
		font-size: 2.3rem;
	}
}

</style>