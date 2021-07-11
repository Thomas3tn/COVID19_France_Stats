<template>    
    <form @submit.prevent="transmitDatas" class="form" id="searchForm">

        <div class="form__inputsContainer">

            <div class="inputContainer">
                <i class="fas fa-globe-europe inputContainer__logo"></i>
                <div class="inputContainer__inputPart">
                    <label for="continentInput" class="inputContainer__title">Continent</label>
                    <select v-model="requestCriteria.continent" id="continentInput" class="inputContainer__input" title="Sélectionner le continent de votre choix">
                        <option value="Global">Monde</option>
                        <option value="Africa">Afrique</option>
                        <option value="North America">Amérique du Nord</option>
                        <option value="South America">Amérique du Sud</option>
                        <option value="Asia">Asie</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Océanie</option>
                        <option value="Other">Autre</option>
                    </select>
                </div>
            </div>
            
            <div class="inputContainer" v-if="requestCriteria.continent !== '' && requestCriteria.continent !== 'Global'">
                <i class="fas fa-flag inputContainer__logo"></i>
                <div class="inputContainer__inputPart">
                    <label class="inputContainer__title" for="countryInput">Pays</label>
                    <select v-model="requestCriteria.country" id="countryInput" class="inputContainer__input" title="Sélectionner le pays de votre choix">
                        <template v-if="requestCriteria.continent === 'Europe'">
                            <option value="Albania">Albanie</option>
                            <option value="Germany">Allemagne</option>
                            <option value="Andorra">Andorre</option>
                            <option value="Austria">Autriche</option>
                            <option value="Belgium">Belgique</option>
                            <option value="Belarus">Biélorussie</option>
                            <option value="Bosnia and Herzegovina">Bosnie-Herzégovine</option>
                            <option value="Bulgaria">Bulgarie</option>
                            <option value="Cyprus">Chypre</option>
                            <option value="Croatia">Croatie</option>
                            <option value="Denmark">Danemark</option>
                            <option value="Spain">Espagne</option>
                            <option value="Estonia">Estonie</option>
                            <option value="Finland">Finlande</option>
                            <option value="France">France</option>
                            <option value="Greece">Grèce</option>
                            <option value="Hungary">Hongrie</option>
                            <option value="Ireland">Irlande</option>
                            <option value="Iceland">Islande</option>
                            <option value="Italy">Italie</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Latvia">Lettonie</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lituanie</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="North Macedonia">Macédoine du Nord</option>
                            <option value="Malta">Malte</option>
                            <option value="Moldova">Moldavie</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Montenegro">Monténégro</option>
                            <option value="Norway">Norvège</option>
                            <option value="Netherlands">Pays-Bas</option>
                            <option value="Poland">Pologne</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Czechia">République tchèque</option>
                            <option value="Romania">Roumanie</option>
                            <option value="United Kingdom">Royaume-Uni</option>
                            <option value="Russia">Russie</option>
                            <option value="San Marino">Saint-Marin</option>
                            <option value="Serbia">Serbie</option>
                            <option value="Slovakia">Slovaquie</option>
                            <option value="Slovenia">Slovénie</option>
                            <option value="Sweden">Suède</option>
                            <option value="Switzerland">Suisse</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Holy See">Vatican</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'Africa'">
                            <option value="South Africa">Afrique du Sud</option>
                            <option value="Algeria">Algérie</option>
                            <option value="Angola">Angola</option>
                            <option value="Benin">Bénin</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Burkina Faso">Burkina Faso</option>              
                            <option value="Burundi">Burundi</option>
                            <option value="Cameroon">Cameroun</option>
                            <option value="Cabo Verde">Cap-Vert</option>
                            <option value="Central African Republic">République centrafricaine</option>
                            <option value="Comoros">Comores</option>
                            <option value="Congo (Brazzaville)">République du Congo</option>
                            <option value="Congo (Kinshasa)">République démocratique du Congo</option>
                            <option value="Cote d'Ivoire">Côte d'Ivoire</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Egypt">Égypte</option>
                            <option value="Eritrea">Érythrée</option>
                            <option value="Ethiopia">Éthiopie</option>
                            <option value="Eswatini">Eswatini</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambie</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Guinea">Guinée</option>
                            <option value="Guinea-Bissau">Guinée-Bissau</option>
                            <option value="Equatorial Guinea">Guinée équatoriale</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Libéria</option>
                            <option value="Libya">Libye</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Mali">Mali</option>
                            <option value="Morocco">Maroc</option>
                            <option value="Mauritius">Maurice</option>
                            <option value="Mauritania">Mauritanie</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Namibia">Namibie</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Uganda">Ouganda</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Sao Tome and Principe">Sao Tomé-et-Principe</option>
                            <option value="Senegal">Sénégal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Somalia">Somalie</option>
                            <option value="Sudan">Soudan</option>
                            <option value="South Sudan">Soudan du Sud</option>
                            <option value="Tanzania">Tanzanie</option>
                            <option value="Chad">Tchad</option>
                            <option value="Togo">Togo</option>
                            <option value="Tunisia">Tunisie</option>
                            <option value="Zambia">Zambie</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'South America'">
                            <option value="Argentina">Argentine</option>
                            <option value="Bolivia">Bolivie</option>
                            <option value="Brazil">Brésil</option>
                            <option value="Chile">Chili</option>
                            <option value="Colombia">Colombie</option>
                            <option value="Ecuador">Équateur</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Pérou</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Venezuela">Venezuela</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'North America'">
                            <option value="Antigua and Barbuda">Antigua-et-Barbuda</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Barbados">Barbade</option>
                            <option value="Belize">Bélize</option>
                            <option value="Canada">Canada</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Dominican Republic">République dominicaine</option>
                            <option value="Dominica">Dominique</option>
                            <option value="US">États-Unis</option>
                            <option value="Grenada">Grenade</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Haiti">Haïti</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Jamaica">Jamaïque</option>
                            <option value="Mexico">Mexique</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Panama">Panama</option>
                            <option value="Saint Kitts and Nevis">Saint-Christophe-et-Niévès</option>
                            <option value="Saint Lucia">Sainte-Lucie</option>
                            <option value="Saint Vincent and the Grenadines">Saint-Vincent-et-les-Grenadines</option>
                            <option value="El Salvador">Salvador</option>
                            <option value="Trinidad and Tobago">Trinité-et-Tobago</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'Asia'">
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Saudi Arabia">Arabie Saoudite</option>
                            <option value="Armenia">Arménie</option>
                            <option value="Azerbaijan">Azerbaïdjan</option>
                            <option value="Bahrain">Bahreïn</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Bhutan">Bhoutan</option>
                            <option value="Burma">Birmanie</option>
                            <option value="Brunei">Bruneï</option>
                            <option value="Cambodia">Cambodge</option>
                            <option value="China">Chine</option>
                            <option value="Korea, South">Corée du Sud</option>
                            <option value="United Arab Emirates">Emirats arabes unis</option>
                            <option value="Georgia">Géorgie</option>
                            <option value="India">Inde</option>
                            <option value="Indonesia">Indonésie</option>
                            <option value="Irak">Irak</option>
                            <option value="Iran">Iran</option>
                            <option value="Israel">Israël</option>
                            <option value="Japan">Japon</option>
                            <option value="Jordan">Jordanie</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kyrgyzstan">Kirghizistan</option>
                            <option value="Kuwait">Koweït</option>
                            <option value="Laos">Laos</option>
                            <option value="Lebanon">Liban</option>
                            <option value="Malaysia">Malaisie</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mongolia">Mongolie</option>
                            <option value="Nepal">Népal</option>
                            <option value="Oman">Oman</option>
                            <option value="Uzbekistan">Ouzbékistan</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="West Bank and Gaza">Palestine</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Singapore">Singapour</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Syria">Syrie</option>
                            <option value="Taiwan">Taïwan</option>
                            <option value="Tajikistan">Tadjikistan</option>
                            <option value="Thailand">Thaïlande</option>
                            <option value="Timor-Leste">Timor oriental</option>
                            <option value="Turkey">Turquie</option>
                            <option value="Vietnam">Viêt Nam</option>
                            <option value="Yemen">Yémen</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'Oceania'">
                            <option value="Australia">Australie</option>
                            <option value="Fiji">Fidjii</option>
                            <option value="Marshall Islands">Îles Marshall</option>
                            <option value="Micronesia">Etats fédérés de Micronésie</option>
                            <option value="New Zealand">Nouvelle-Zélande</option>
                            <option value="Papua New Guinea">Papouasie-Nouvelle-Guinée</option>
                            <option value="Solomon Islands">Salomon</option>
                            <option value="Samoa">Samoa</option>
                            <option value="Vanuatu">Vanuatu</option>
                        </template>
                        <template v-if="requestCriteria.continent === 'Other'">
                            <optgroup label="Navires de croisière">
                                <option value="Diamond Princess">Diamond Princess</option>
                                <option value="MS Zaandam">MS Zaandam</option>
                            </optgroup>
                        </template>
                        
                    </select>
                </div>
            </div>

            <div class="inputContainer" v-if="requestCriteria.country === 'France'">
                <i class="fas fa-map-marker-alt inputContainer__logo"></i>
                <div class="inputContainer__inputPart">
                    <label class="inputContainer__title" for="searchLocationInput">Département</label>
                    <select name="locationName" v-model="requestCriteria.departement" class="inputContainer__input" title="Sélectionner le département de votre choix" id="searchLocationInput">
                        <option value="departementsList">LD - Liste départements</option>
                        <option value="DEP-01">01 - Ain</option>
                        <option value="DEP-02">02 - Aisne</option>
                        <option value="DEP-03">03 - Allier</option>
                        <option value="DEP-04">04 - Alpes-de-Haute-Provence</option>
                        <option value="DEP-05">05 - Hautes-Alpes</option>
                        <option value="DEP-06">06 - Alpes-Maritimes</option>
                        <option value="DEP-07">07 - Ardèche</option>
                        <option value="DEP-08">08 - Ardennes</option>
                        <option value="DEP-09">09 - Ariège</option>
                        <option value="DEP-10">10 - Aube</option>
                        <option value="DEP-11">11 - Aude</option>
                        <option value="DEP-12">12 - Aveyron</option>
                        <option value="DEP-13">13 - Bouches-du-Rhône</option>
                        <option value="DEP-14">14 - Calvados</option>
                        <option value="DEP-15">15 - Cantal</option>
                        <option value="DEP-16">16 - Charente</option>
                        <option value="DEP-17">17 - Charente-Maritime</option>
                        <option value="DEP-18">18 - Cher</option>
                        <option value="DEP-19">19 - Corrèze</option>
                        <option value="DEP-2A">2A - Corse-du-Sud</option>
                        <option value="DEP-2B">2B - Haute-Corse</option>
                        <option value="DEP-21">21 - Côte-d'Or</option>
                        <option value="DEP-22">22 - Côtes d'Armor</option>
                        <option value="DEP-23">23 - Creuse</option>
                        <option value="DEP-24">24 - Dordogne</option>
                        <option value="DEP-25">25 - Doubs</option>
                        <option value="DEP-26">26 - Drôme</option>
                        <option value="DEP-27">27 - Eure</option>
                        <option value="DEP-28">28 - Eure-et-Loir</option>
                        <option value="DEP-29">29 - Finistère</option>
                        <option value="DEP-30">30 - Gard</option>
                        <option value="DEP-31">31 - Haute-Garonne</option>
                        <option value="DEP-32">32 - Gers</option>
                        <option value="DEP-33">33 - Gironde</option>
                        <option value="DEP-34">34 - Hérault</option>
                        <option value="DEP-35">35 - Ille-et-Vilaine</option>
                        <option value="DEP-36">36 - Indre</option>
                        <option value="DEP-37">37 - Indre-et-Loire</option>
                        <option value="DEP-38">38 - Isère</option>
                        <option value="DEP-39">39 - Jura</option>
                        <option value="DEP-40">40 - Landes</option>
                        <option value="DEP-41">41 - Loir-et-Cher</option>
                        <option value="DEP-42">42 - Loire</option>
                        <option value="DEP-43">43 - Haute-Loire</option>
                        <option value="DEP-44">44 - Loire-Atlantique</option>
                        <option value="DEP-45">45 - Loiret</option>
                        <option value="DEP-46">46 - Lot</option>
                        <option value="DEP-47">47 - Lot-et-Garonne</option>
                        <option value="DEP-48">48 - Lozère</option>
                        <option value="DEP-49">49 - Maine-et-Loire</option>
                        <option value="DEP-50">50 - Manche</option>
                        <option value="DEP-51">51 - Marne</option>
                        <option value="DEP-52">52 - Haute-Marne</option>
                        <option value="DEP-53">53 - Mayenne</option>
                        <option value="DEP-54">54 - Meurthe-et-Moselle</option>
                        <option value="DEP-55">55 - Meuse</option>
                        <option value="DEP-56">56 - Morbihan</option>
                        <option value="DEP-57">57 - Moselle</option>
                        <option value="DEP-58">58 - Nièvre</option>
                        <option value="DEP-59">59 - Nord</option>
                        <option value="DEP-60">60 - Oise</option>
                        <option value="DEP-61">61 - Orne</option>
                        <option value="DEP-62">62 - Pas-de-Calais</option>
                        <option value="DEP-63">63 - Puy-de-Dôme</option>
                        <option value="DEP-64">64 - Pyrénées-Atlantiques</option>
                        <option value="DEP-65">65 - Hautes-Pyrénées</option>
                        <option value="DEP-66">66 - Pyrénées-Orientales</option>
                        <option value="DEP-67">67 - Bas-Rhin</option>
                        <option value="DEP-68">68 - Haut-Rhin</option>
                        <option value="DEP-69">69 - Rhône</option>
                        <option value="DEP-70">70 - Haute-Saône</option>
                        <option value="DEP-71">71 - Saône-et-Loire</option>
                        <option value="DEP-72">72 - Sarthe</option>
                        <option value="DEP-73">73 - Savoie</option>
                        <option value="DEP-74">74 - Haute-Savoie</option>
                        <option value="DEP-75">75 - Paris</option>
                        <option value="DEP-76">76 - Seine-Maritime</option>
                        <option value="DEP-77">77 - Seine-et-Marne</option>
                        <option value="DEP-78">78 - Yvelines</option>
                        <option value="DEP-79">79 - Deux-Sèvres</option>
                        <option value="DEP-80">80 - Somme</option>
                        <option value="DEP-81">81 - Tarn</option>
                        <option value="DEP-82">82 - Tarn-et-Garonne</option>
                        <option value="DEP-83">83 - Var</option>
                        <option value="DEP-84">84 - Vaucluse</option>
                        <option value="DEP-85">85 - Vendée</option>
                        <option value="DEP-86">86 - Vienne</option>
                        <option value="DEP-87">87 - Haute-Vienne</option>
                        <option value="DEP-88">88 - Vosges</option>
                        <option value="DEP-89">89 - Yonne</option>
                        <option value="DEP-90">90 - Territoire de Belfort</option>
                        <option value="DEP-91">91 - Essonne</option>
                        <option value="DEP-92">92 - Hauts-de-Seine</option>
                        <option value="DEP-93">93 - Seine-St-Denis</option>
                        <option value="DEP-94">94 - Val-de-Marne</option>
                        <option value="DEP-95">95 - Val-d'Oise</option>
                        <option value="DEP-971">971 - Guadeloupe</option>
                        <option value="DEP-972">972 - Martinique</option>
                        <option value="DEP-973">973 - Guyane</option>
                        <option value="DEP-974">974 - La Réunion</option>
                        <option value="DEP-976">976 - Mayotte</option>
                    </select>
                </div>
            </div>

        </div>               
        
        <input type="submit" value="Rechercher" title="Rechercher" class="form__submitBtn" id="searchFormSubmitBtn"/>
    </form>
</template>

<script>
//Vue Elements
import { reactive, watch } from "vue";

export default {
    props: {
        clickedLocation: {
            type: Object,
            required: false
        }
    },
    setup(props, context) {

        const requestCriteria = reactive({
            continent: "",
            country: "",
            departement: "",
        });

        watch(props.clickedLocation, newValue => {

            if (Array.isArray(newValue.locationType)) {

                for (let i = 0; i < newValue.locationType.length; i++) {
                    requestCriteria[newValue.locationType[i]] = newValue.locationName[i];
                }

            } else {
                requestCriteria[newValue.locationType] = newValue.locationName;
            }
            
        });

        watch(() => { return { ...requestCriteria }}, (newValue, oldValue) => {

            if ((newValue.country !== oldValue.country) || (newValue.departement !== oldValue.departement)) {

                let mapToDisplay = "";
                let locationName = "";

                if (newValue.country === "France" && newValue.departement === "") {
                    mapToDisplay = "FranceSearchMap";
                } else if (newValue.country !== "France") {
                    mapToDisplay = "WorldSearchMap";
                    locationName = newValue.country;
                } else if (newValue.departement !== "") {
                    mapToDisplay = "FranceSearchMap";
                    locationName = newValue.departement;
                }

                context.emit("added-form-location", {mapToDisplay: mapToDisplay, locationName: locationName});

            }

            //If user select a continent and a country and then change continent, we delete the selected country
            if (oldValue.continent !== newValue.continent && (oldValue.country !== "" && oldValue.country === newValue.country)) {
                requestCriteria.country = "";
            }

            //If user select a country and a departement and then change country, we delete the selected departement
            if (oldValue.country !== newValue.country && (oldValue.departement !== "" && oldValue.departement === newValue.departement)) {
                requestCriteria.departement = "";
            }

        }, {deep: true});

        function transmitDatas() {

            if (requestCriteria.continent !== "" && requestCriteria.country !== "" && requestCriteria.departement !== "") {

                let searchCriteria = {};
                searchCriteria.country = requestCriteria.country;
                searchCriteria.departement = requestCriteria.departement;
                searchCriteria.continent = requestCriteria.continent;
                typeof searchCriteria.departement === "undefined" ? searchCriteria.locationType = "country" : searchCriteria.locationType = "departement";
                context.emit("form-submitted", searchCriteria);

            }

        }

        return {
            transmitDatas,
            requestCriteria
        }

    }
}
</script>

<style lang="scss">
.form {
    position: static;
	display: flex;
    flex-direction: column;
	justify-content: space-between;
	align-items: baseline;
    flex-wrap: wrap;
    background-color: #334455;
    border-radius: 3px;
    color: white;
    padding: 0.5rem 1rem;
    @media (min-width: 768px) {
        flex-direction: row;
        width: 90%;
        margin: 0 auto;
        position: relative;
        top: 27px;
    }
	&__inputsContainer {
		display: flex;
		flex-direction: column;
        width: 100%;
        @media (min-width: 768px) {
            flex-direction: row;
            width: auto;
            margin: 0 auto;
            position: relative;
            right: 2%;
        }
        @media (min-width: 1024px) {
            right: 0%;
            margin: 0;
        }
	}
	&__checkboxContainer {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	&__submitBtn {
        border-radius: 3px;
		color: white;
		background-color: #ffa600;
		border: none;
		cursor: pointer;
		padding: 0.5rem 1rem;
        width: 90%;
        margin: 1rem auto;
        @media (min-width: 1024px) {
            width: auto;
            margin: 0;
        }
	}
}

.inputContainer {
    display: flex;
    align-items: center;
    margin: 0.4rem auto;
    width: 90%;
    margin-left: 1.5rem;
    @media (min-width: 768xp) {
        margin: 0 1rem 0 0;
        width: auto;
    }
    &__logo {
        display: none;
        font-size: 1.4rem;
        margin-right: 1rem;
        @media (min-width: 768px) {
            display: block;
        }
    }
    &__inputPart {
        display: flex;
        flex-direction: column;
        width: 100%;
        @media (min-width: 768px) {
            width: auto;
        }
    }
    &__title {
        margin: 0;
    }
    &__input {
        border-radius: 3px;
    }
    &__mandatoryInput {
        color: red;
    }
    &__abbr {
        &:hover {
            cursor: pointer;
        }
    }
}

</style>