<template>
  <div class="dsa">
    <div class="dsa__contentContainer">
      <h1 class="dsa__header">Politique de sauvegarde des données</h1>
      <img src="../assets/img/datasSaveAgreementPage/dsaBg.jpg" class="dsa__img"/>
      <p class="dsa__content">Dans le but d'optimisé la rapidité de cette application, les données demandées concernant continents, pays ou 
        départements (actuelles ou historiques) sont enregistrées sur votre navigateur web permettant de répondre de manière immédiate à des 
        requêtes de même type.</p>
      <div class="dsa__btnsContainer">
        <button @click="deleteLocalStorageDatas" title="Effacer les données sauvegardées" class="dsa__btn dsa__btn--deleteDatas">Effacer les données sauvegardées</button>
        <router-link :to="{name: 'Home'}" title="J'ai compris" class="dsa__btn dsa__btn--agree">J'ai compris</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import CookiesManager from "../assets/JSClasses/CookiesManager.js";

//import { onBeforeRouteLeave } from "vue-router";

export default {
  setup() {

    function deleteLocalStorageDatas() {

      if (typeof localStorage.getItem("worldLiveDatas") !== "undefined") {
        localStorage.removeItem("worldLiveDatas");
      }

      if (typeof localStorage.getItem("franceDepartementsEvolutionDatas") !== "undefined") {
        localStorage.removeItem("franceDepartementsEvolutionDatas");
      }

      if (typeof localStorage.getItem("departementsLiveDatas") !== "undefined") {
        localStorage.removeItem("departementsLiveDatas");
      }

      if (typeof localStorage.getItem("worldLocationEvolutionDatas") !== "undefined") {
        localStorage.removeItem("worldLocationEvolutionDatas");
      }

    }

    function setDsaCookie() {

      if (CookiesManager.isDsaCookieValid() === false) {
        CookiesManager.createDsaCookie();
      }

    }
/*
    onBeforeRouteLeave((to, from, next) => {

    });
*/
    return {
      deleteLocalStorageDatas,
      setDsaCookie
    }

  }
}
</script>

<style lang="scss">
.dsa {
  position: relative;
  height: 100vh;
  @media (min-width: 1024px) {
    background: url("../assets/img/datasSaveAgreementPage/dsaBg.jpg") no-repeat;
    background-size: 60%;
    background-position: 100% 50%;
  }
  &__contentContainer {
    position: absolute;
    left: 50%;
    top: 4%;
    width: 85%;
    transform: translateX(-50%);
    @media (min-width: 1024px) {
      width: 35%;
      left: 4%;
      top: 10%;
      transform: translateX(0%);
    }
  }
  &__header {
    text-align: center;
    @media (min-width: 1024px) {
      text-align: left;
    }
  }
  &__img {
    width: 100%;
    @media (min-width: 1024px) {
      display: none;
    }
  }
  &__content {
    text-align: justify;
    line-height: 1.5;
  }
  &__btnsContainer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  &__btn {
    font-size: inherit;
    border-radius: 15px;
    border: 2px solid #93B1A7;
    padding: 0.7rem 1.2rem;
    margin: 0.5rem 0;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
    &--deleteDatas {
      background-color: rgba(0,0,0,0);
      transition: all 300ms;
      &:hover {
        background-color: #EB4647;
        border-color: #EB4647;
        color: white;
      }
    }
    &--agree {
      background-color: #93B1A7;
      color: white;
      text-decoration: none;
      transition: all 300ms;
      &:hover {
        background-color: darken(#93B1A7, 10%);
        border-color: darken(#93B1A7, 10%);
      }
    }
  }
}
</style>