<template>
    <div class="datasPanel currentSituationPanel">
        <div class="datasPanel__headerContainer">
            <h2 class="datasPanel__header">Situation actuelle</h2>
        </div>
        <div class="datasPanel__contentContainer currentSituationPanel__contentContainer">
            <stat-item v-for="item in currentSituationDatas" :key="item.dataName" :statName="item.dataName" :statNumber="item.dataNumber"></stat-item>
        </div>
    </div>
</template>

<script>
import StatItem from "./statItem.vue";

export default {
    props: {
        currentSituationDatas: {
            type: Object,
            required: true
        }
    },
    components: {
        StatItem
    }
}
</script>

<style lang="scss">
.currentSituationPanel {
    &__contentContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>