<template>
    <div class="statSection">
        <h2 class="statSection__heading">{{ statSectionTitle }}</h2>
        <div class="statSection__container">
            <stat-item :statName="statName1" :statNumber="statNumber1"></stat-item>
            <stat-item :statName="statName2" :statNumber="statNumber2"></stat-item>
        </div>
    </div>
</template>

<script>
import statItem from "./statItem.vue";

export default {
    data() {
        return {

        }
    },
    components: {
        statItem
    },
    props: {
        statSectionTitle: {
            type: String,
        },
        statName1: {
            type: String
        },
        statNumber1: {
            type: String
        },
        statName2: {
            type: String
        },
        statNumber2: {
            type: String
        }
    }
}
</script>

<style lang="scss">
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