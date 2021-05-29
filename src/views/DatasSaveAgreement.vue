<template>
  <div class="dsa">
    <div class="dsa__contentContainer">
      <h1 class="dsa__header">Politique de sauvegarde des données</h1>
      <p class="dsa__content">Dans le but d'améliorer l'efficacité de cette application, les données demandées concernant continents, pays et départements sont enregistrées sur votre navigateur pour éviter de nouvelles requêtes et ainsi optimiser le temps de réponse.</p>
      <button @click="deleteLocalStorageDatas" title="Effacer les données sauvegardées" class="dsa__btn dsa__btn--deleteDatas">Effacer les données sauvegardées</button>
      <router-link :to="{name: 'Home'}" title="J'ai compris" class="dsa__btn dsa__btn--agree">J'ai compris</router-link>
    </div>
  </div>
</template>

<script>
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

    return {
      deleteLocalStorageDatas
    }

  }
}
</script>

<style lang="scss">
.dsa {
  background: url("../assets/img/DatasSaveAgreementPopup/medicalFolder.svg") no-repeat;
  background-position: 100% 50%;
  position: relative;
  height: 100vh;
  &__contentContainer {
    position: absolute;
    left: 7%;
    top: 15%;
    width: 50%;
  }
  &__content {
    text-align: justify;
    line-height: 1.5;
  }
  &__btn {
    border-radius: 15px;
    border: 2px solid #93B1A7;
    padding: 0.7rem 1.2rem;
    &:hover {
      cursor: pointer;
    }
    &--deleteDatas {
      background-color: rgba(0,0,0,0);
    }
    &--agree {
      background-color: #93B1A7;
      color: white;
      text-decoration: none;
    }
  }
}
</style>