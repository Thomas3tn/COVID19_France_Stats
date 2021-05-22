<template>
    <div class="datasPanel relativeDatasPanel">
        <div class="datasPanel__headerContainer">
            <h2 class="datasPanel__header">Données relative</h2>
        </div>
        <div class="datasPanel__contentContainer relativeDatasPanel__contentParentContainer">
            <div class="relativeDatasPanel__contentChildContainer">
                <stat-item :statName="'Infections/km²'" :statNumber="displayedDatas.statPerKms"></stat-item>
                <stat-item :statName="'Infections/milliers d\'habs'" :statNumber="displayedDatas.statPerThousand"></stat-item>
            </div>
        </div>
        <div class="relativeDatasPanel__btnsContainer">
            <button v-for="item in statusBtnsList" :key="item.idName" :id="item.idName + 'RelativeDatasBtn'" @click="updateDisplayedDatatype" :value="item.idName" :title="item.dashboardName">{{ item.dashboardName }}</button>
        </div>
    </div>
</template>

<script>
import StatItem from "./statItem.vue";
import { computed, reactive, ref, watch, onMounted } from "vue";
import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

export default {
    props: {
        relativeDatas: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const datasCalculator = new DatasCalculator();
        const defaultValue = "N/A";

        //Current datatype displayed
        let displayedDatatype = ref("");

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

                datas[key] = {};
                typeof props.relativeDatas.sq_km_area !== "undefined" ? datas[key]["statPerKms"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.sq_km_area)) : datas[key]["statPerKms"] = defaultValue;
                typeof props.relativeDatas.population !== "undefined" ? datas[key]["statPerThousand"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.population)) : datas[key]["statPerThousand"] = defaultValue;

            }

        }

        displayedDatatype.value = Object.keys(statusBtnsList)[0];

        onMounted(() => {
            document.getElementById(Object.keys(statusBtnsList)[0] + "RelativeDatasBtn").className = "selectedBtn";
        });

        watch(() => displayedDatatype.value, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                displayedDatas.statPerKms = datas[newValue]["statPerKms"];
                displayedDatas.statPerThousand = datas[newValue]["statPerThousand"];

                //The restyling btns part is only executed once the DOM is mounted
                if (typeof oldValue !== "undefined") {

                    let statusBtns = Array.from(document.querySelectorAll(".relativeDatasPanel__btnsContainer button"));

                    for (let i = 0; i < statusBtns.length; i++) {
                        statusBtns[i].className = "relativeDatasPanel__btnsContainer";
                    }

                    document.getElementById(newValue + "RelativeDatasBtn").className += " selectedBtn";

                }

            }

        }, {immediate: true});

        return {
            displayedDatatype,
            displayedDatas,
            datas,
            statusBtnsList,
            updateDisplayedDatatype
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
        justify-content: center;
        align-items: center;
    }
    &__contentChildContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
}

.selectedBtn {
    background-color: lightblue;
}
</style>