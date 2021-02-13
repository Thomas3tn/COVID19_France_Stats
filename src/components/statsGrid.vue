<template>
    <div class="statsPage">
        <div class="statsPage__container">
            <div>
                <!--Land Shape-->
                <h2>{{ territory }}</h2>
                <h2>{{ date }}</h2>
                <!--Population-->
            </div>
            <div>
                <stat-item></stat-item>
            </div>
        </div>
        <div class="statsPage__container">
            <h2>Hôpital</h2>
            <div>
                <stat-item></stat-item>
                <stat-item></stat-item>
            </div>
        </div>
        <div class="statsPage__container">
            <h2>EHPAD</h2>
            <div>
                <stat-item></stat-item>
                <stat-item></stat-item>
            </div>
            <stat-item></stat-item>
        </div>
        <div class="statsPage__container">
            <h2>Issue</h2>
            <div>
                <stat-item></stat-item>
                <stat-item></stat-item>
            </div>
        </div>
    </div>
</template>

<script>
import statItem from "./statItem.vue";

export default {
    data() {

    },
    components: {
        statItem,
    }
}
</script>