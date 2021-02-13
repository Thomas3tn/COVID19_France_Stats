<template>
    <form action="https://coronavirusapi-france.now.sh/FranceLiveGlobalData" method="GET" class="form">

                <div class="form__inputsContainer">
                    <div class="form__textInputsContainer">
                        <div class="inputContainer">
                            <i class="fas fa-map-marker-alt inputContainer__logo"></i>
                            <div class="inputContainer__inputPart">
                                <p class="inputContainer__title">Département</p>
                                <select name="locationName" v-model="location" placeholder="Choisir Localisation" class="inputContainer__input" id="searchLocationInput">
                                    <option value="france">FRA - France</option>
                                    <option value="departementsList">LD - Liste départements</option>
                                    <option value="ain">01 - Ain</option>
                                    <option value="aisne">02 - Aisne</option>
                                    <option value="allier">03 - Allier</option>
                                    <option value="alpes-de-hautes-provence">04 - Alpes-de-Haute-Provence</option>
                                    <option value="hautes-alpes">05 - Hautes-Alpes</option>
                                    <option value="alpes-maritimes">06 - Alpes-Maritimes</option>
                                    <option value="ardeche">07 - Ardèche</option>
                                    <option value="ardennes">08 - Ardennes</option>
                                    <option value="ariege">09 - Ariège</option>
                                    <option value="aube">10 - Aube</option>
                                    <option value="aude">11 - Aude</option>
                                    <option value="aveyron">12 - Aveyron</option>
                                    <option value="bouches-du-rhone">13 - Bouches-du-Rhône</option>
                                    <option value="calvados">14 - Calvados</option>
                                    <option value="cantal">15 - Cantal</option>
                                    <option value="charente">16 - Charente</option>
                                    <option value="charente-maritime">17 - Charente-Maritime</option>
                                    <option value="cher">18 - Cher</option>
                                    <option value="correze">19 - Corrèze</option>
                                    <option value="corse-du-sud">2A - Corse-du-Sud</option>
                                    <option value="haute-corse">2B - Haute-Corse</option>
                                    <option value="cote-d-or">21 - Côte-d'Or</option>
                                    <option value="cotes-d-armor">22 - Côtes d'Armor</option>
                                    <option value="creuse">23 - Creuse</option>
                                    <option value="dordogne">24 - Dordogne</option>
                                    <option value="doubs">25 - Doubs</option>
                                    <option value="drome">26 - Drôme</option>
                                    <option value="eure">27 - Eure</option>
                                    <option value="eure-et-loir">28 - Eure-et-Loir</option>
                                    <option value="finistere">29 - Finistère</option>
                                    <option value="gard">30 - Gard</option>
                                    <option value="haute-garonne">31 - Haute-Garonne</option>
                                    <option value="gers">32 - Gers</option>
                                    <option value="gironde">33 - Gironde</option>
                                    <option value="herault">34 - Hérault</option>
                                    <option value="ille-et-vilaine">35 - Ille-et-Vilaine</option>
                                    <option value="indre">36 - Indre</option>
                                    <option value="indre-et-loire">37 - Indre-et-Loire</option>
                                    <option value="isere">38 - Isère</option>
                                    <option value="jura">39 - Jura</option>
                                    <option value="landes">40 - Landes</option>
                                    <option value="loir-et-cher">41 - Loir-et-Cher</option>
                                    <option value="loire">42 - Loire</option>
                                    <option value="haute-loire">43 - Haute-Loire</option>
                                    <option value="loire-atlantique">44 - Loire-Atlantique</option>
                                    <option value="loiret">45 - Loiret</option>
                                    <option value="lot">46 - Lot</option>
                                    <option value="lot-et-garonne">47 - Lot-et-Garonne</option>
                                    <option value="lozere">48 - Lozère</option>
                                    <option value="maine-et-loire">49 - Maine-et-Loire</option>
                                    <option value="manche">50 - Manche</option>
                                    <option value="marne">51 - Marne</option>
                                    <option value="haute-marne">52 - Haute-Marne</option>
                                    <option value="mayenne">53 - Mayenne</option>
                                    <option value="meurthe-et-moselle">54 - Meurthe-et-Moselle</option>
                                    <option value="meuse">55 - Meuse</option>
                                    <option value="morbihan">56 - Morbihan</option>
                                    <option value="moselle">57 - Moselle</option>
                                    <option value="nievre">58 - Nièvre</option>
                                    <option value="nord">59 - Nord</option>
                                    <option value="oise">60 - Oise</option>
                                    <option value="orne">61 - Orne</option>
                                    <option value="pas-de-calais">62 - Pas-de-Calais</option>
                                    <option value="puy-de-dome">63 - Puy-de-Dôme</option>
                                    <option value="pyrenees-atlantiques">64 - Pyrénées-Atlantiques</option>
                                    <option value="hautes-pyrenees">65 - Hautes-Pyrénées</option>
                                    <option value="pyrenees-orientales">66 - Pyrénées-Orientales</option>
                                    <option value="bas-rhin">67 - Bas-Rhin</option>
                                    <option value="haute-rhin">68 - Haut-Rhin</option>
                                    <option value="rhone">69 - Rhône</option>
                                    <option value="haute-saone">70 - Haute-Saône</option>
                                    <option value="saone-et-loire">71 - Saône-et-Loire</option>
                                    <option value="sarthe">72 - Sarthe</option>
                                    <option value="savoie">73 - Savoie</option>
                                    <option value="haute-savoie">74 - Haute-Savoie</option>
                                    <option value="paris">75 - Paris</option>
                                    <option value="seine-maritime">76 - Seine-Maritime</option>
                                    <option value="seine-et-marne">77 - Seine-et-Marne</option>
                                    <option value="yvelines">78 - Yvelines</option>
                                    <option value="deux-sevres">79 - Deux-Sèvres</option>
                                    <option value="somme">80 - Somme</option>
                                    <option value="tarn">81 - Tarn</option>
                                    <option value="tarn-et-garonne">82 - Tarn-et-Garonne</option>
                                    <option value="var">83 - Var</option>
                                    <option value="vaucluse">84 - Vaucluse</option>
                                    <option value="vendee">85 - Vendée</option>
                                    <option value="vienne">86 - Vienne</option>
                                    <option value="haute-vienne">87 - Haute-Vienne</option>
                                    <option value="vosges">88 - Vosges</option>
                                    <option value="yonne">89 - Yonne</option>
                                    <option value="territoire-de-belfort">90 - Territoire de Belfort</option>
                                    <option value="essonne">91 - Essonne</option>
                                    <option value="hauts-de-seine">92 - Hauts-de-Seine</option>
                                    <option value="seine-st-denis">93 - Seine-St-Denis</option>
                                    <option value="val-de-marne">94 - Val-de-Marne</option>
                                    <option value="val-d-oise">95 - Val-d'Oise</option>
                                    <option value="guadeloupe">971 - Guadeloupe</option>
                                    <option value="martinique">972 - Martinique</option>
                                    <option value="guyane">973 - Guyane</option>
                                    <option value="la-reunion">974 - La Réunion</option>
                                    <option value="mayotte">976 - Mayotte</option>
                                </select>
                            </div>
                        </div>
                        <div class="inputContainer">
                            <i class="far fa-calendar-alt inputContainer__logo"></i>
                            <div class="inputContainer__inputPart">
                                <p class="inputContainer__title">Date</p>
                                <input type="date" v-model.trim="date" placeholder="Ex: 05/06/2020" class="inputContainer__input" id="searchDateInput"/>
                            </div>
                        </div>
                        <div class="form__checkboxContainer">
                            <input type="checkbox" v-model="includeOnlyThisDay" id="includeOnlyThisDayInput"><label for="includeOnlyThisDayInput" class="inputContainer__title">Inclure les données de ce jour uniquement</label>
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