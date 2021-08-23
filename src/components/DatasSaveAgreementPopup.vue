<template>
    <div class="dsaPopup dsaPopup--hidden" id="dsaPopup">
        <h2 class="dsaPopup__header">Stockage des données</h2>
        <p class="dsaPopup__content">Pour un fonctionnement optimale, notre application utilise votre navigateur pour stocker une partie de nos données.</p>
        <div class="dsaPopup__choicesContainer">
            <button @click="closePopup" class="dsaPopup__closeBtn" title="J'ai compris">J'ai compris</button>
            <router-link :to="{name: 'Datas Save Agreement'}" class="dsaPopup__moreInfosLink" title="En savoir plus">En savoir plus</router-link>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

import CookiesManager from "../assets/JSClasses/CookiesManager.js";

export default {
    setup(props, context) {

        let dsaPopupDisplayed = ref(true);

        function closePopup() {

            context.emit("close-dsa-popup");
            dsaPopupDisplayed.value = false;
            CookiesManager.createDsaCookie();

        }

        //If a DSA cookie exists, the popup is displayed
        if (CookiesManager.isDsaCookieValid() === true) {
            dsaPopupDisplayed.value = false;
        }

        window.addEventListener("scroll", () => {

            if (window.scrollY > screen.height && dsaPopupDisplayed.value === true) {
                document.getElementById("dsaPopup").className = "dsaPopup";
            }

        });

        return {
            closePopup
        }

    }
}
</script>

<style lang="scss">
.dsaPopup {
    width: 80%;
    right: 50%;
    transform: translateX(50%);
    z-index: 10;
    background: url("../assets/img/datasSaveAgreementPopup/medicalFolder.svg") no-repeat center;
    background-size: 50%;
    background-color: rgb(248, 248, 248);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    bottom: 3%;
    padding: 1rem;
    opacity: 1;
    border-radius: 3px;
    transition: all 500ms;
    @media (min-width: 768px) {
        width: 50%;
        right: 1.5%;
        transform: translateX(0%);
    }
    @media (min-width: 1024px) {
        width: 30%;
    }
    @media (min-width: 1440px) {
        width: 25%;
    }
    &--hidden {
        display: none;
        opacity: 0;
    }
    &__img {
        width: 30%;
        height: auto;
        margin: 0 auto;
    }
    &__header {
        font-size: clamp(1.5rem, 2vw, 3.4rem);
        text-align: center;
    }
    &__content {
        text-align: justify;
    }
    &__choicesContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    &__closeBtn {
        background-color: #457b9d;
        color: white;
        width: 60%;
        border: none;
        padding: 0.5rem 0;
        transition: all 300ms;
        &:hover {
            cursor: pointer;
            background-color: lighten(#457b9d, 5%);
        }
    }
    &__moreInfosLink {
        margin-top: 4%;
        color: black;
        font-size: clamp(0.7rem, 0.9vw, 1.4rem);
    }
}
</style>