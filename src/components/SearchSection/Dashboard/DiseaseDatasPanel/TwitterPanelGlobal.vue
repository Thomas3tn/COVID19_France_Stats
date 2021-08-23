<template>
    <div class="datasPanel">
        <div class="datasPanel__headerContainer">
            <h3 class="datasPanel__header">Dernières actualités mondiales</h3>
        </div>
        <div class="datasPanel__contentContainer twitterPanelGlobal__feedContainer">
            <a class="twitter-timeline" href="https://twitter.com/COVID_19_Latest" data-chrome="noscrollbar noheader nofooter noborders">>A Twitter List by TwitterDev</a>
        </div>
    </div>
</template>

<script>
export default {
    setup() {

        let mapInit = document.createElement("script");
        mapInit.setAttribute("src", "https://platform.twitter.com/widgets.js");
        mapInit.setAttribute("charset", "utf-8");
        document.head.appendChild(mapInit);

    }
}
</script>

<style lang="scss">
.twitterPanelGlobal {
    &__feedContainer {
        overflow: hidden;
        height: 536px;
        overflow-y: auto;
        margin: 2rem 1rem
    }
}
</style>