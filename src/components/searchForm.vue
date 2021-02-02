<template>
    <form action="https://coronavirusapi-france.now.sh/FranceLiveGlobalData" method="GET" class="form">

                <div class="form__inputsContainer">
                    <div class="form__textInputsContainer">
                        <div class="inputContainer">
                            <i class="fas fa-map-marker-alt inputContainer__logo"></i>
                            <div class="inputContainer__inputPart">
                                <p class="inputContainer__title">Département</p>
                                <input type="search" v-model.trim="location" placeholder="Ex: Var, France" class="inputContainer__input" id="searchLocationInput"/>
                            </div>
                        </div>
                        <div class="inputContainer">
                            <i class="far fa-calendar-alt inputContainer__logo"></i>
                            <div class="inputContainer__inputPart">
                                <p class="inputContainer__title">Date</p>
                                <input type="date" v-model.trim="date" placeholder="Ex: 05/06/2020" class="inputContainer__input" id="searchDateInput"/>
                            </div>
                        </div>
                    </div>
                    <div class="form__checkboxContainer">
                        <input type="checkbox" v-model="includeOnlyThisDay"><label>Include only datas of that day</label>
                    </div>
                    
                </div>               
                
                <input type="submit" @click.prevent="transmitDatas" value="Search" title="Search" class="form__submitBtn" id="searchFormSubmitBtn"/>
            </form>
</template>

<script>
export default {
    data() {
        return {
            location: "",
            date: "",
            includeOnlyThisDay: ""
        }
    },
    methods: {
        transmitDatas: function() {

            let searchCriteria = {};
            searchCriteria.location = this.location;
            searchCriteria.date = this.date;
            searchCriteria.includeOnlyThisDay = this.includeOnlyThisDay;
            this.$emit("form-submitted", searchCriteria);

        }
    }
}
</script>

<style lang="scss">
.form {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 5rem 2rem;
	background-color: lightgrey;
	&__inputsContainer {
		display: flex;
		flex-direction: column;
	}
	&__textInputsContainer {
		display: flex;
	}
	&__checkboxContainer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	&__submitBtn {
		color: white;
		background-color: orange;
		border: none;
		cursor: pointer;
		padding: 0.5rem 1rem;
	}
}

</style>