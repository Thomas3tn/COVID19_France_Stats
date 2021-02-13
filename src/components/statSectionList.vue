<template>
    <div v-for="departement in requestResults.stats.departementsList" :key="departement.departementName" class="locationListItem">
        <div class="locationListItem__requestInfosContainer">
            <!--Location shape-->
            <h2 class="locationListItem__locationName">{{ departement.departementName }}</h2>
            <p lass="locationListItem__date">{{ requestResults.requestInfos.date }}</p>
        </div>
        <div class="locationListItem__sectionsContainer">
            <div v-for="statsSection in departement.sections" :key="statsSection.sectionTitle" class="locationListItem__section">
                <h3 class="locationListItem__sectionTitle">{{ statsSection.statSectionTitle }}</h3>
                <div class="locationListItem__statsItemsContainer">
                    <stat-item :statName="statsSection.stat1.statName" :statNumber="statsSection.stat1.statNumber"></stat-item>
                    <stat-item :statName="statsSection.stat2.statName" :statNumber="statsSection.stat2.statNumber"></stat-item>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
import statItem from "./statItem.vue";

export default {
    data() {
        return {
            requestInfos: {},
            departementsList: []
        }
    },
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

            this.requestInfos.locationName = datas.requestInfos.locationName;
            this.requestInfos.locationType = datas.requestInfos.locationType;
            this.requestInfos.date = datas.requestInfos.date;
            this.requestInfos.sourceName = datas.requestInfos.sourceName;

            this.requestStats.statsHeader.statName = datas.stats.statsHeader.statName;
            this.requestStats.statsHeader.statNumber = datas.stats.statsHeader.statNumber;

            for (let i = 0; i < datas.departementsList.length; i++) {

                this.departementsList.push(datas.departementsList[i]);

            }

        }
    }
}
</script>

<style lang="scss">
.locationListItem {
    display: flex;
    background-color: rgb(240,240,240);
    margin: 1rem 0;
    justify-content: space-between;
    padding: 1rem;
    &__requestInfosContainer {
        flex: 1;
    }
    &__sectionsContainer {
        flex: 3;
        display: flex;
    }
    &__section {
        border-left: 2px solid gray;
        padding-left: 1rem;
    }
    &__sectionTitle {
        font-size: 1.5rem;
    }
    &__statsItemsContainer {
        display: flex;
    }
}
</style>