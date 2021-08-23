<template>
    <div class="covidInfoCard" tabindex="0" @focus="onKeyboardFocus" @blur="onKeyboardBlur">
        <div class="covidInfoCard__headerSlide" :id="title">
            <div class="covidInfoCard__headerBanner">
                <div class="covidCardInfo__headerContainer">
                    <h3 class="covidInfoCard__header">{{ cardMainTitle }}</h3>
                    <h3 v-if="cardSubTitle !== ''" class="covidInfoCard__subHeader">{{ cardSubTitle }}</h3>
                </div>
            </div>
        </div>
        <div class="covidInfoCard__contentSlide" tabindex="-1">
            <ul>
                <li v-for="item in content" :key="item">{{ item }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
    props: {
        title: {
            type: String,
            required: false
        },
        content: {
            type: Array,
            required: true
        }
    },
    setup(props) {

        let cardTitle = ref(props.title);
        const cardMainTitle = cardTitle.value.split(" ").splice(0,1)[0];
        let cardSubTitle;
        typeof cardTitle.value.split(" ")[1] !== "undefined" ? cardSubTitle = cardTitle.value.split(" ").slice(1).join(" ") : cardSubTitle = "";


        onMounted(() => {

            let cardBackgroundClass = " covidInfoCard__headerSlide--";

            switch (props.title) {
                case "Transmission":
                    cardBackgroundClass += "transmission";
                    break;
            
                case "Symptômes":
                    cardBackgroundClass += "symptom";
                    break;

                case "Diagnostic":
                    cardBackgroundClass += "diagnosis";
                    break;

                case "Précautions et prévention":
                    cardBackgroundClass += "prevention";
                    break;

                case "Prise en charge et traitement":
                    cardBackgroundClass += "treatment";
                    break;

                default:
                    cardBackgroundClass += "treatment";
                    break;
            }

            document.getElementById(props.title).className += cardBackgroundClass;

        });

        //Add hover effect on keyboard focus
        function onKeyboardFocus(event) {
            event.currentTarget.className += " covidInfoCard--keyboardFocus";
        }

        function onKeyboardBlur(event) {

            if (event.currentTarget.firstElementChild.nextSibling !== document.activeElement) {

                let currentInfoCardClasses = event.currentTarget.className.split(" ");

                for (let i = 0; i < currentInfoCardClasses.length; i++) {

                    if (currentInfoCardClasses[i] === "covidInfoCard--keyboardFocus") {
                        currentInfoCardClasses.splice(i, 1);
                        break;
                    }

                }

                event.currentTarget.className = currentInfoCardClasses.join(" ");

            }

        }

        return {
            cardMainTitle,
            cardSubTitle,
            onKeyboardFocus,
            onKeyboardBlur,
        }

    }

}
</script>

<style lang="scss">
@keyframes contentAppearance {
    from {
        background-color: rgba(0,0,0,0);
        opacity: 0;
    }
    to {
        background-color: rgba(0,0,0,0.7);
        opacity: 1;
    }
}

@keyframes contentDisappearance {
    from {
        background-color: rgba(0,0,0,0.7);
        opacity: 1;
    }
    to {
        background-color: rgba(0,0,0,0);
        opacity: 0;
    }
}

.covidInfoCard {
    z-index: 1;
    height: 100%;
    width: 20vw; 
    border: 5px solid lightgray;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    left: 0px;
    margin-left: -12%;
    transform: translateY(0%);
    transition: all 700ms ease-out;
    &:hover {
        cursor: pointer;
        transform: translateY(-8%);
        .covidInfoCard__headerBanner {
            opacity: 0;
        }
        ~ .covidInfoCard {
            position: relative;
            left: 12%;
            transition: 1000ms all ease-in-out;
            
        }
        .covidInfoCard__contentSlide {
            opacity: 1;
            background-color: lightgray;
            animation: contentAppearance 300ms ease-in-out both;
            animation-delay: 480ms;
        }
    }
    &--keyboardFocus {
        cursor: pointer;
        transform: translateY(-8%);
        .covidInfoCard__headerBanner {
            opacity: 0;
        }
        ~ .covidInfoCard {
            position: relative;
            left: 12%;
            transition: 1000ms all ease-in-out;
        }
        > .covidInfoCard__contentSlide {
            animation: contentAppearance 300ms ease-in-out both;
            animation-delay: 480ms;
        }
    }
    &__headerSlide {
        transform: translateX(0%);
        transition: all 300ms ease-in-out;
        width: 100%;
        height: 100%;
        position: relative;
        &--transmission {
            background: url("../../../assets/img/covidInfosCards/transmission.png") no-repeat, #EFEFEF;
            background-size: cover;
            background-position: 140% 0%;
        }
        &--symptom {
            background: url("../../../assets/img/covidInfosCards/symptom.png") no-repeat, #EFEFEF;
            background-size: cover;
            background-position: 80% 0%;
        }
        &--diagnosis {
            background: url("../../../assets/img/covidInfosCards/diagnosis.png") no-repeat, #EFEFEF;
            background-size: cover;
            background-position: 105% 0%;
        }
        &--prevention {
            background: url("../../../assets/img/covidInfosCards/prevention.png") no-repeat, #EFEFEF;
            background-size: cover;
            background-position: 105% 0%;
        }
        &--treatment {
            background: url("../../../assets/img/covidInfosCards/treatment.png") no-repeat, #EFEFEF;
            background-size: cover;
            background-position: 105% 0%;
        }
    }
    &__contentSlide {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: auto;
        transition: background-color 1600ms 700ms;
        opacity: 0;
        background-color: rgba(0,0,0,0);
        transition: all 300ms;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
        }
        &::-webkit-scrollbar-thumb {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #e4e4e4;
        }
        ul {
            list-style-type: square;
            li {
                margin-bottom: 0.5rem;
                position: relative;
                right: 4%;
            }
        }
    }
    &__headerBanner {
        position: absolute;
        top: 75%;
        color: #303030;
        opacity: 1;
        transition: all 600ms;
        background-color: white;
        width: 100%;
        text-transform: uppercase;
        background-color: rgb(235, 235, 235);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem 0;
    }
    &__headerContainer {
        width: 90%;
    }
    &__header {
        font-size: calc(0.7rem + 1vw);
        font-family: "Open Sans", sans-serif;
        margin: 0;
        letter-spacing: 3px;
    }
    &__subHeader {
        margin: 0;
        font-size: calc(0.03rem + 1vw);
    }
}
</style>