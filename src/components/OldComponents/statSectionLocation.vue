<template>
    <div class="statSectionHeader">
        <div class="statSectionHeader__headerPart">
            <!--Img-->
            <h2 class="statSectionHeader__heading">{{ requestResults.requestInfos.locationName }}</h2>
            <p class="statSectionHeader__date">{{ requestResults.requestInfos.date }}</p>
            <!--Population-->
        </div>
        <stat-item v-if="requestResults.stats.statsHeader.statName && requestResults.stats.statsHeader.statNumber" :statName="requestResults.stats.statsHeader.statName" :statNumber="requestResults.stats.statsHeader.statNumber" class="statSectionHeader__statItem"></stat-item>
    </div>
    <div class="statSection" v-for="sectionStats in requestResults.stats.statsBody" :key="sectionStats.sectionTitle">
        <h2 class="statSection__heading">{{ sectionStats.sectionTitle }}</h2>
        <div class="statSection__container">
            <stat-item :statName="sectionStats.stat1.statName" :statNumber="sectionStats.stat1.statNumber"></stat-item>
            <stat-item :statName="sectionStats.stat2.statName" :statNumber="sectionStats.stat2.statNumber"></stat-item>
        </div>
    </div>
</template>

<script>
import statItem from "./statItem.vue";

export default {
    components: {
        statItem
    },
    props: {
        requestResults: {
            type: Object,
            required: true
        }
    },
    methods: {
        recordDatas: function(datas) {

            this.requestInfos = datas.requestInfos;

            this.requestStats.statsHeader.statName = datas.stats.statsHeader.statName;
            this.requestStats.statsHeader.statNumber = datas.stats.statsHeader.statNumber;

            for (let i = 0; i < datas.stats.statsBody.length; i++) {

                this.requestStats.statsBody.push(datas.stats.statsBody[i]);

            }

        }
    }
}
</script>

<style lang="scss">
.statSectionHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    &__headerPart {
        padding-right: 1.5rem;
    }
    &__heading {
        font-size: 2rem;
        margin: 0;
    }
    &__date {
        margin: 0;
    }
    > .statSectionHeader__statItem {
        border-left: 2px solid black;
    }
}

.statSection {
    border-top: 2px solid black;
    padding: 1rem;
    &__heading {
        text-align: center;
        margin: 0;
        font-size: 1.6rem;
    }
    &__container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
}
</style>