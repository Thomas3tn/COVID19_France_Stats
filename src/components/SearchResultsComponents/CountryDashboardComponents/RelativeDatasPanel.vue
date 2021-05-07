<template>
    <div class="datasPanel relativeDatasPanel">
        <div class="datasPanel__headerContainer">
            <h2 class="datasPanel__header">Données relative</h2>
        </div>
        <div class="datasPanel__contentContainer relativeDatasPanel__contentParentContainer">
            <div class="relativeDatasPanel__contentChildContainer">
                <stat-item :statName="'Infections/km2'" :statNumber="infectionsPerKms"></stat-item>
                <stat-item :statName="'Infections/milliers d\'habs'" :statNumber="infectionsPerThousand"></stat-item>
            </div>
        </div>
    </div>
</template>

<script>
import StatItem from "./statItem.vue";
import { computed } from "vue";
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

        let infectionsPerKms = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(props.relativeDatas.confirmed / props.relativeDatas.sq_km_area));
        let infectionsPerThousand = computed(() => datasCalculator.numberFunctionalities.roundFloatNumber(props.relativeDatas.confirmed / props.relativeDatas.population));

        return {
            infectionsPerKms,
            infectionsPerThousand
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