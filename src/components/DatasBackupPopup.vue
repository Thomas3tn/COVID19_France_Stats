<template>

    <div 
        id="dsaPopup"
        ref="popup"
        class="popup popup--hidden"
        v-if="isPopupDisplayed"
    >

        <h2 class="header">Stockage des données</h2>
        <p class="content">Pour un fonctionnement optimale, notre application utilise votre navigateur pour stocker une partie de nos données.</p>
        
        <div class="btnsContainer">

            <button 
                @click="closePopup" 
                class="closeBtn" 
                title="J'ai compris"
            >
                J'ai compris
            </button>
            <router-link 
                :to="{name: 'Datas Backup'}" 
                class="infosBtn" 
                title="En savoir plus"
            >
                En savoir plus
            </router-link>

        </div>

    </div>

</template>

<script>
import { ref } from "vue";
import CookiesManager from "../assets/JSClasses/CookiesManager.js";

export default {
    setup() {

        let isPopupDisplayed = ref(CookiesManager.doesDSACookieExists() ? false : true);
        const popup = ref(null);

        function closePopup() {

            CookiesManager.createDSACookie();
            isPopupDisplayed.value = false;

        }

        window.addEventListener("scroll", () => {
            if (window.scrollY > screen.height && isPopupDisplayed.value === true) {
                popup.value.className = "popup";
            }
        });

        return {
            popup,
            isPopupDisplayed,
            closePopup
        }

    }
}
</script>

<style lang="scss" scoped>
.popup {
    width: 80%;
    right: 50%;
    transform: translateX(50%);
    z-index: 10;
    background: url("../assets/img/datasBackupPopup/medicalFolder.svg") no-repeat center;
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
}

.img {
    width: 30%;
    height: auto;
    margin: 0 auto;
}

.header {
    font-size: clamp(1.5rem, 2vw, 3.4rem);
    text-align: center;
}

.content {
    text-align: justify;
}

.btnsContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.closeBtn {
    background-color: $secondary;
    color: $white;
    width: 60%;
    border: none;
    padding: 0.5rem 0;
    transition: all 300ms;
    &:hover {
        cursor: pointer;
        background-color: lighten($secondary, 5%);
    }
}

.infosBtn {
    margin-top: 4%;
    color: black;
    font-size: clamp(0.7rem, 0.9vw, 1.4rem);
}
</style>