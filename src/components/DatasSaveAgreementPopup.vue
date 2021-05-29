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
export default {
    setup(props, context) {

        function closePopup() {
            context.emit("close-dsa-popup");
        }

        window.addEventListener("scroll", () => {

            if (window.scrollY > screen.height) {
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
    z-index: 10;
    width: 20%;
    background: url("../assets/img/DatasSaveAgreementPopup/medicalFolder.svg") no-repeat center;
    background-size: 50%;
    background-color: rgb(248, 248, 248);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    bottom: 3%;
    right: 1.5%;
    padding: 1rem;
    opacity: 1;
    transition: all 500ms;
    &--hidden {
        display: none;
        opacity: 0;
    }
    &__img {
        width: 30%;
        height: auto;
        margin: 0 auto;
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
        background-color: #93B1A7;
        color: white;
        width: 60%;
        border: none;
        padding: 0.5rem 0;
        transition: all 300ms;
        &:hover {
            cursor: pointer;
            background-color: lighten(#93B1A7, 5%);
        }
    }
    &__moreInfosLink {
        margin-top: 0.5rem;
        color: black;
        font-size: 0.7rem;
    }
}
</style>