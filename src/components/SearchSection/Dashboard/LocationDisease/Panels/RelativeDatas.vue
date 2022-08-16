<template>

    <panel>

        <template v-slot:header>
            <h3 class="datasPanel__header">Données relatives</h3>
        </template>

        <template v-slot:content>

            <div class="container">

                <stat-item 
                    :name="`${displayedDatas.status}/${STAT_ITEM_KEYS.KM2}`" 
                    :number="displayedDatas.datas.perKms" 
                    :type="'RELATIVE'"
                ></stat-item>

                <stat-item 
                    :name="`${displayedDatas.status}/${STAT_ITEM_KEYS.THOUSANDS_OF_HABS}`" 
                    :number="displayedDatas.datas.perThousand" 
                    :type="'RELATIVE'"
                ></stat-item>

            </div>

            <status-form 
                class="form"
                :statusList="statusList" 
                :inputsType="'radio'"
                :componentName="'relativeDatasPanel'"
                @selectable-status-change="onSelectableStatusChange"
            ></status-form>

        </template>

    </panel>

</template>

<script>
import Panel from "./Common/Panel/Panel.vue";
import StatItem from "./Common/DatasDisplay/statItem.vue";
import StatusForm from "./Common/Forms/StatusForm.vue";
import { computed, reactive, watch } from "vue";
import CustomNumberMethods from "../../../../../assets/JSClasses/CustomMethods/Number.js";

export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const KEYS_LIST = ["confirmed", "deaths", "recovered", "hospitalizations", "intensiveCare"];
        const STAT_ITEM_KEYS = {
            THOUSANDS_OF_HABS: "thousandsOfHabs",
            KM2: "km2"
        }

        const displayedDatas = reactive({
            status: "",
            datas: {
                perKms: 0,
                perThousand: 0
            }
        });

        const datas = computed(() => {

            const datas = {};

            Object.entries(props.location.live).forEach(([status, data]) => {

                if (KEYS_LIST.includes(status) && data !== null) {
                    datas[status] = {
                        perKms: CustomNumberMethods.roundFloatNumber(data / props.location.infos.sqKmArea),
                        perThousand: CustomNumberMethods.roundFloatNumber(data / props.location.infos.population)
                    }
                }

            });

            return datas;

        });

        const statusList = computed(() => Object.keys(datas.value));
        displayedDatas.status = statusList.value[0];

        const onSelectableStatusChange = newStatus => displayedDatas.status = newStatus;

        watch(() => displayedDatas.status, (newValue, oldValue) => {

            if (newValue !== oldValue) {

                displayedDatas.datas.perKms = datas.value[newValue].perKms;
                displayedDatas.datas.perThousand = datas.value[newValue].perThousand;

            }

        }, {immediate: true, deep: true});

        return {
            STAT_ITEM_KEYS,
            displayedDatas,
            datas,
            statusList,
            onSelectableStatusChange,
        }

    },
    components: {
        Panel,
        StatItem,
        StatusForm
    }
}
</script>

<style lang="scss" scoped>
.contentParentContainer {
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
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 45%;
    @media (min-width: 768px) {
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: auto;
    }
}
</style>