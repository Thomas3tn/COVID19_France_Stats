<template>
    <div class="twitterPanel">
        <details class="twitterPanel__detailsContainer" @toggle="toggleIsTwitterFeddDisplayed" open="true" id="twitterPanelDetails">
            <summary class="twitterPanel__summaryContainer" title="Inverser l'affichage des actualités"><i class="fas fa-chevron-down twitterPanel__chevronLogo"></i><font-awesome-icon :icon="faNewspaper"/><h3> Dernières actualités</h3></summary>
                <div class="twitterPanel__feedContainer" id="twitterFeedContainer">
                    <a class="twitter-timeline" :href="url" data-chrome="noscrollbar noheader nofooter noborders">>A Twitter List by TwitterDev</a>
                </div>
        </details>
    </div>
</template>

<script>
//Vue Element
import { ref, watch } from "vue";

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

        function toggleIsTwitterFeddDisplayed() {

            if (isTwitterFeedDisplayed.value === false) {
                isTwitterFeedDisplayed.value = true;
            } else {
                isTwitterFeedDisplayed.value = false;
            }

            console.log(isTwitterFeedDisplayed.value);

        }

        let isTwitterFeedDisplayed = ref(false);
        let url = ref("");

        watch(() => isTwitterFeedDisplayed.value, newValue => {

            let chevronClasses = document.querySelector(".twitterPanel__summaryContainer > i").className;
            let chevronClassesArray = chevronClasses.split(" ");

            for (let i = 0; i < chevronClassesArray.length; i++) {

                if ((newValue === true && chevronClassesArray[i] === "chevronUpsideDown") || (newValue === false && chevronClassesArray[i] === "chevronNormalPosition")) {
                    chevronClassesArray.splice(i, 1);
                    break;
                }

            }

            newValue === true ? chevronClassesArray.push("chevronNormalPosition") : chevronClassesArray.push("chevronUpsideDown");
            document.querySelector(".twitterPanel__summaryContainer > i").className = chevronClassesArray.join(" ");
            console.log(chevronClasses);

        });

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
            url,
            isTwitterFeedDisplayed,
            toggleIsTwitterFeddDisplayed
        }

    }
}
</script>

<style lang="scss">
@keyframes chevronUpsideDown {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(180deg);
    }
}

@keyframes chevronNormalPosition {
    from {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(0deg);
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
        align-items: center;
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
    &__chevronLogo {
        margin-right: 0.5rem;
        border: 2px solid black;
        border-radius: 5px;
        padding: 0.3rem;
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