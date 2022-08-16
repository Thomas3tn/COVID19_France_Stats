<template>

    <div class="container">

        <span ref="ellipsis" class="ellipsis">
            <template v-if="count >= 1">.</template>
            <template v-if="count >= 2">.</template>
            <template v-if="count >= 3">.</template>
        </span>

    </div>

</template>

<script>
import { ref } from "vue";
export default {
    setup() {

        const INTERVAL = 600;
        let count = ref(1);
        
        setInterval(() => count.value === 3 ? count.value = 1 : count.value++, INTERVAL);

        return {
            count
        }

    }
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}
.ellipsis {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%);
}
</style>