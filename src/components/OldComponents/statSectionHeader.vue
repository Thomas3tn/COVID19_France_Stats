<template>
    <div class="statSectionHeader">
        <div class="statSectionHeader__headerPart">
            <!--Img-->
            <h2 class="statSectionHeader__heading">{{ locationName }}</h2>
            <p class="statSectionHeader__date">{{ date }}</p>
            <!--Population-->
        </div>
        <stat-item v-if="statName && statNumber" :statName="statName" :statNumber="statNumber" class="statSectionHeader__statItem"></stat-item>
    </div>
</template>

<script>
import statItem from "./statItem.vue";

export default {
    components: {
        statItem
    },
    props: {
        locationName: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        statName: {
            type: String,
            required: false
        },
        statNumber: {
            type: String,
            required: false
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
</style>