<template>

    <div 
        class="feedContainer" 
    >

        <a 
            class="twitter-timeline" 
            :href="url" 
            data-chrome="noscrollbar noheader nofooter noborders"
        >
            Feed Twitter non disponible
        </a>

    </div>

</template>

<script>
import { computed } from "vue";

export default {
    props: {
        abbreviation: {
            type: [String, Number],
            required: false
        }
    },
    setup(props) {

        const URLS = {
            FR: "https://twitter.com/Sante_Gouv",
            US: "https://twitter.com/WHCOVIDResponse",
            GB: "https://twitter.com/UKCovid19Stats",
            IN: "https://twitter.com/COVIDNewsByMIB",
            DEFAULT: "https://twitter.com/COVID_19_Latest"
        };

        //Return FR as an abbreviation if location is a departement
        const formattedAbbr = computed(() => typeof props.abbreviation === "string" ? props.abbreviation.toUpperCase() : "FR");
        const url = computed(() => URLS[formattedAbbr.value] || URLS.DEFAULT);

        const mapInit = document.createElement("script");
        mapInit.setAttribute("src", "https://platform.twitter.com/widgets.js");
        mapInit.setAttribute("charset", "utf-8");
        document.head.appendChild(mapInit);

        return {
            url,
        }

    }
}
</script>

<style lang="scss" scoped>
.feedContainer {
    overflow: auto;
    height: 400px;
    &--opening {
        animation: twitterFeedOpening 300ms both ease-in-out;
        transform-origin: top;
    }
    &--closing {
        animation: twitterFeedClosing 300ms both ease-in-out;
        transform-origin: top;
    }
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}
</style>