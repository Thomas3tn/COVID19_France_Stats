<template>
    <div class="datasPanel relativeDatasPanel">
        <header class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Données relatives</h3>
        </header>
        <div class="datasPanel__contentContainer relativeDatasPanel__contentParentContainer">
            <div class="relativeDatasPanel__contentChildContainer">
                <stat-item :statName="translatedDisplayedDatatype + '/km²'" :statNumber="displayedDatas.statPerKms"></stat-item>
                <stat-item :statName="translatedDisplayedDatatype + '/milliers d\'habs'" :statNumber="displayedDatas.statPerThousand"></stat-item>
            </div>
            <div class="relativeDatasPanel__btnsContainer">
                <button v-for="item in statusBtnsList" :key="item.idName" class="selectableStatus selectableStatus--verticalDisplay" :id="item.idName + 'RelativeDatasBtn'" @click="updateDisplayedDatatype" :value="item.idName" :title="item.dashboardName">
                    <font-awesome-icon :icon="item.logo" aria-hidden="true"/>
                    <span class="screenreaderText">{{item.dashboardName}}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import StatItem from "./SharedComponents/statItem.vue";
import { computed, reactive, ref, watch, onMounted } from "vue";
import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator.js";
import { faCross, faMale, faWalking, faProcedures, faHospitalUser } from "@fortawesome/free-solid-svg-icons";

export default {
    props: {
        relativeDatas: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        console.log(props.relativeDatas);

        const datasCalculator = new DatasCalculator();
        const defaultValue = "N/A";

        //Current datatype displayed
        let displayedDatatype = ref("");

        let translatedDisplayedDatatype = computed(() => datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(displayedDatatype.value));

        //Current datas displayed
        let displayedDatas = reactive({
            statPerKms: 0,
            statPerThousand: 0
        });

        //Stored datas
        let datas = reactive({});

        function updateDisplayedDatatype(event) {
            displayedDatatype.value = event.currentTarget.value;
        }

        const diseaseStatusValues = ["confirmed", "deaths", "recovered", "hospitalizations", "intensive_care"];
        let statusBtnsList = {};

        for (const [key, value] of Object.entries(props.relativeDatas)) {

            if (diseaseStatusValues.includes(key)) {

                //Will be used for panel buttons
                statusBtnsList[key] = {};
                statusBtnsList[key]["idName"] = key;
                statusBtnsList[key]["dashboardName"] = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key);

                switch (key) {
                    case "confirmed":
                        statusBtnsList[key]["logo"] = faMale;
                        break;

                    case "deaths":
                        statusBtnsList[key]["logo"] = faCross;
                        break;

                    case "recovered":
                        statusBtnsList[key]["logo"] = faWalking;
                        break;

                    case "hospitalizations":
                        statusBtnsList[key]["logo"] = faHospitalUser;
                        break;

                    case "intensive_care":
                        statusBtnsList[key]["logo"] = faProcedures;
                        break;
                
                    default:
                        statusBtnsList[key]["logo"] = "";
                        break;
                }

                datas[key] = {};
                typeof props.relativeDatas.sq_km_area !== "undefined" ? datas[key]["statPerKms"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.sq_km_area)) : datas[key]["statPerKms"] = defaultValue;
                typeof props.relativeDatas.population !== "undefined" ? datas[key]["statPerThousand"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.population)) : datas[key]["statPerThousand"] = defaultValue;

            }

        }

        displayedDatatype.value = Object.keys(statusBtnsList)[0];

        onMounted(() => {
            document.getElementById(Object.keys(statusBtnsList)[0] + "RelativeDatasBtn").className += " selectableStatus--" + displayedDatatype.value + "Active";
        });

        watch(() => displayedDatatype.value, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                displayedDatas.statPerKms = datas[newValue]["statPerKms"];
                displayedDatas.statPerThousand = datas[newValue]["statPerThousand"];

                //The restyling btns part is only executed once the DOM is mounted
                if (typeof oldValue !== "undefined") {

                    let statusBtns = Array.from(document.querySelectorAll(".relativeDatasPanel__btnsContainer button"));

                    for (let i = 0; i < statusBtns.length; i++) {
                        statusBtns[i].className = "selectableStatus selectableStatus--verticalDisplay selectableStatus--inactive";
                    }


                    let newActiveStatus = document.getElementById(newValue + "RelativeDatasBtn");
                    if (newActiveStatus.className.split(" ").includes("selectableStatus--inactive")) {

                        let newActiveStatusClasses = newActiveStatus.className.split(" ");

                        for (let i = 0; i < newActiveStatusClasses.length; i++) {

                            if (newActiveStatusClasses[i] === "selectableStatus--inactive") {
                                newActiveStatusClasses.splice(i, 1);
                                break;
                            }

                        }

                        newActiveStatus.className = newActiveStatusClasses.join(" ");

                    }
                    document.getElementById(newValue + "RelativeDatasBtn").className += " selectableStatus--" + newValue + "Active";

                }

            }

        }, {immediate: true});

        return {
            displayedDatatype,
            displayedDatas,
            datas,
            statusBtnsList,
            updateDisplayedDatatype,
            translatedDisplayedDatatype
        }

    },
    components: {
        StatItem
    }
}
</script>

<style lang="scss">
.relativeDatasPanel {
    &__contentParentContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        height: 83%;
        @media (min-width: 768px) {
            flex-direction: row;
        }
    }
    &__contentChildContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    &__btnsContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 40%;
        @media (min-width: 768px) {
            flex-direction: column;
            justify-content: center;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: auto;
        }
    }
}
</style>