<template>
    <div class="statsGrid">
        <div>
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
        <div>
            <h2>Hôpital</h2>
            <div>
                <stat-item></stat-item>
                <stat-item></stat-item>
            </div>
        </div>
        <div>
            <h2>EHPAD</h2>
            <div>
                <stat-item></stat-item>
                <stat-item></stat-item>
            </div>
            <stat-item></stat-item>
        </div>
        <div>
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