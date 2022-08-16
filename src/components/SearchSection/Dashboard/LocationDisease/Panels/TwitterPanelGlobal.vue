<template>
    <div class="datasPanel globalTwitterPanel">
        <div class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Dernières actualités mondiales</h3>
        </div>
        <div class="globalTwitterPanel__feedContainer">
            <twitter-feed></twitter-feed>
        </div>
    </div>
</template>

<script>
import TwitterFeed from "../SharedComponents/TwitterPanel.vue";

export default {
    setup() {

        let mapInit = document.createElement("script");
        mapInit.setAttribute("src", "https://platform.twitter.com/widgets.js");
        mapInit.setAttribute("charset", "utf-8");
        document.head.appendChild(mapInit);

    },
    components: {
        TwitterFeed
    }
}
</script>

<style lang="scss">
.globalTwitterPanel > div:last-child {
    margin-top: 1rem;
}
</style>