<template>
    <div class="twitterPanel datasPanel">
        <h3><font-awesome-icon :icon="faNewspaper"/> Dernières actualités</h3>
        <div class="twitterPanel__feedContainer">
            <a class="twitter-timeline" :href="url" data-chrome="noscrollbar noheader nofooter noborders">>A Twitter List by TwitterDev</a>
        </div>
    </div>
</template>

<script>
//Vue Element
import { ref } from "vue";

//Fontawesome Icon
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

export default {
    props: {
        country: {
            type: String,
            required: false
        }
    },
    setup(props) {

        let url = ref("");

        switch (props.country) {
            case "France":
                url = "https://twitter.com/Covid_infoFR"
                break;

            case "United Stats":
                url = "https://twitter.com/WHCOVIDResponse";
                break;

            case "United Kingdom":
                url = "https://twitter.com/UKCovid19Stats";
                break;

            case "India":
                url = "https://twitter.com/COVIDNewsByMIB";
                break;
        
            default:
                url = "https://twitter.com/COVID_19_Latest";
                break;
        }

        let mapInit = document.createElement("script");
        mapInit.setAttribute("src", "https://platform.twitter.com/widgets.js");
        mapInit.setAttribute("charset", "utf-8");
        document.head.appendChild(mapInit);

        return {
            faNewspaper,
            url
        }

    }
}
</script>

<style lang="scss">
.twitterPanel {
    background-color: inherit;
    margin-top: 2rem;
    &__feedContainer {
        overflow: auto;
        height: 400px;
    }
}
</style>