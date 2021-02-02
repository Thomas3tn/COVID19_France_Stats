<template>
    <div class="searchCriteria">
        <div class="searchCriteria__container">
            <i class="far fa-calendar-alt searchCriteria__logo"></i>
            <p class="searchCriteria__element" id="searchDate">Date: {{ date }}</p>
        </div>
        <div class="searchCriteria__container">
            <i class="far fa-calendar-alt searchCriteria__logo"></i>
            <p class="searchCriteria__element" id="searchLocation">Département: {{ location }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        date: {
            required: false,
            type: String
        },
        location: {
            required: false,
            type: String
        }
    }
}
</script>

<style lang="scss">
.searchCriteria {
	margin-left: 2rem;
	&__container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	&__logo {
		margin-right: 0.5rem;
	}
}
</style>