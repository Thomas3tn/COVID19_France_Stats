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
        <div>
            <button v-for="item in currentStatusKeys" :key="item.idName" @click="updateDisplayedDatatype" :value="item.idName" :title="item.dashboardName">{{ item.dashboardName }}</button>
        </div>
    </div>
</template>

<script>
import StatItem from "./statItem.vue";
import { computed, reactive, ref, watch } from "vue";
import DatasCalculator from "../../../assets/JSClasses/DatasCalculator.js";

export default {
    props: {
        locationType: {
            type: String,
            required: true
        },
        relativeDatas: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const datasCalculator = new DatasCalculator();
        const defaultValue = "N/A";

        //Current datatype displayed
        let displayedDatatype = ref("confirmed");

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

        const diseaseStatusValues = ["confirmed", "deaths", "recovered", "hospitalizations", "intensiveCare"];
        let currentStatusKeys = {};

        for (const [key, value] of Object.entries(props.relativeDatas)) {

            if (diseaseStatusValues.includes(key)) {

                //Will be used for panel buttons
                currentStatusKeys[key] = {};
                currentStatusKeys[key]["idName"] = key;
                currentStatusKeys[key]["dashboardName"] = datasCalculator.translationFunctionalities.getTranslatedKey(key);

                datas[key] = {};
                typeof props.relativeDatas.sq_km_area !== "undefined" ? datas[key]["statPerKms"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.sq_km_area)) : datas[key]["statPerKms"] = defaultValue;
                typeof props.relativeDatas.population !== "undefined" ? datas[key]["statPerThousand"] = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(value / props.relativeDatas.population)) : datas[key]["statPerThousand"] = defaultValue;

            }

        }

        if (typeof datas.confirmed !== "undefined") {

            displayedDatas.statPerKms = datas.confirmed.statPerKms;
            displayedDatas.statPerThousand = datas.confirmed.statPerThousand;

        } else if (typeof datas.hospitalizations !== "undefined") {

            displayedDatas.statPerKms = datas.hospitalizations.statPerKms;
            displayedDatas.statPerThousand = datas.hospitalizations.statPerThousand;

        }

        watch(() => displayedDatatype.value, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                displayedDatas.statPerKms = datas[newValue]["statPerKms"];
                displayedDatas.statPerThousand = datas[newValue]["statPerThousand"];

            }

        }, {immediate: true});

        return {
            displayedDatatype,
            displayedDatas,
            datas,
            currentStatusKeys,
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
</style>