<template>    
    <form action="https://coronavirusapi-france.now.sh/FranceLiveGlobalData" method="GET" class="form">

        <div class="form__inputsContainer">
            <div class="form__textInputsContainer">
                <div class="inputContainer">
                    <i class="fas fa-flag"></i>
                    <div class="inputContainer__inputPart">
                        <p class="inputContainer__title">Pays</p>
                        <select v-model="country">
                            <optgroup label="Continent">
                                <option value="Monde">Monde</option>
                                <option value="France">France</option>
                                <option value="Germany">Allemagne</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div class="inputContainer" v-if="country === 'france'">
                    <i class="fas fa-map-marker-alt inputContainer__logo"></i>
                    <div class="inputContainer__inputPart">
                        <p class="inputContainer__title">Département</p>
                        <select name="locationName" v-model="departement" placeholder="Choisir Localisation" class="inputContainer__input" id="searchLocationInput">
                            <option value="france">Vosges</option>
                        </select>
                    </div>
                </div>
                <div class="inputContainer">
                    <i class="far fa-calendar-alt inputContainer__logo"></i>
                    <div class="inputContainer__inputPart">
                        <label for="startDateInput" class="inputContainer__title">Date de départ <abbr title="Date à laquelle commence votre sélection de données.">?</abbr></label>
                        <input type="date" v-model.trim="date" placeholder="Ex: 05/06/2020" class="inputContainer__input" id="startDateInput"/>
                    </div>
                </div>
                <div class="inputContainer">
                    <i class="far fa-calendar-alt inputContainer__logo"></i>
                    <div class="inputContainer__inputPart">
                        <label for="endDateInput" class="inputContainer__title">Date de fin <abbr title="Date à laquelle termine votre sélection de données.">?</abbr></label>
                        <input type="date" v-model.trim="date" placeholder="Ex: 05/06/2020" class="inputContainer__input" id="endDateInput"/>
                    </div>
                </div>
            </div>
            
        </div>               
        
        <input type="submit" @click.prevent="transmitDatas" value="Rechercher" title="Rechercher" class="form__submitBtn" id="searchFormSubmitBtn"/>
    </form>
</template>

<script>
export default {
    data() {
        return {
            country: "",
            departement: "",
            startDate: "",
            endDate: ""
        }
    },
    methods: {
        transmitDatas: function() {

            let searchCriteria = {};
            searchCriteria.country = this.country;
            searchCriteria.departement = this.departement;
            searchCriteria.startDate = this.startDate;
            searchCriteria.endDate = this.endDate;
            this.$emit("form-submitted", searchCriteria);

        }
    }
}
</script>

<style lang="scss">
.form {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin: 5rem 2rem;
	background-color: lightgrey;
    padding: 0.5rem 1rem;
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

.inputContainer {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    &__logo {
        font-size: 1.4rem;
        margin: 0.5rem;
    }
    &__inputPart {
        display: flex;
        flex-direction: column;
    }
    &__title {
        margin: 0;
        font-size: 0.8rem;
    }
}

</style>