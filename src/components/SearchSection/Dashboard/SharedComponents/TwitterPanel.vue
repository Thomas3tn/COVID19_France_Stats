<template>
    <div class="twitterPanel__feedContainer" id="twitterFeedContainer">
        <a class="twitter-timeline" :href="url" data-chrome="noscrollbar noheader nofooter noborders">>A Twitter List by TwitterDev</a>
    </div>
</template>

<script>
//Vue Element
import { ref } from "vue";

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

            case "United States":
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
            url,
        }

    }
}
</script>

<style lang="scss">
@keyframes chevronUpsideDown {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
    }
}

@keyframes chevronNormalPosition {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);

    }
}

.chevronUpsideDown {
    animation: chevronUpsideDown 300ms both ease-in-out;
}

.chevronNormalPosition {
    animation: chevronNormalPosition 300ms both ease-in-out;
}

.twitterPanel {
    background-color: inherit;
    margin-top: 2rem;
    &__headerContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    &__displayToggleBtn {
        border: 1px solid black;
        border-radius: 3px;
        background-color: inherit;
        margin-bottom: 0.5rem;
    }
    &__summaryContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &:hover {
            cursor: pointer;
        }
        > h3 {
            margin-left: 0.5rem;
        }
        &--colored {
            background-color: red;
        }
    }
    &__feedContainer {
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
}
</style>