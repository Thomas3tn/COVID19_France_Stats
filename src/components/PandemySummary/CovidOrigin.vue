<template>
    <section class="covidOrigin">
        <div class="covidOrigin__mainContainer">
            <div class="covidOrigin__contentContainer">
                <h2 class="covidOrigin__header">D’où vient le COVID-19 ?</h2>
                <p class="covidOrigin__content">Covid-19 fait référence à « Coronavirus Disease 2019 », la maladie provoquée par un virus de la famille des Coronaviridae, le SARS-CoV-2. Cette maladie infectieuse est une zoonose, dont l'origine est encore débattue, qui a émergé en décembre 2019 dans la ville de Wuhan, dans la province du Hubei en Chine. Elle s'est rapidement propagée, d'abord dans toute la Chine, puis à l'étranger provoquant une épidémie mondiale.</p>
                <a href="https://www.lemonde.fr/les-decodeurs/article/2020/05/12/coronavirus-de-la-chauve-souris-au-deconfinement-la-chronologie-de-la-pandemie_6039448_4355770.html" title="En savoir plus sur la chronologie du COVID-19" class="covidOrigin__link">En savoir plus sur la chronologie du COVID-19</a>
            </div>
            <div class="covidOrigin__imgContainer">
                <img src="../../assets/img/covidOrigin/covidOriginBg.png" alt=""/>
            </div>
        </div>
        <p class="covidOrigin__backgroundText">COVID-19</p>
    </section>
</template>

<style lang="scss">
.covidOrigin {
    position: relative;
    background-color: #fbfcfd;
    min-height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/img/covidOrigin/covidOriginBgMobile.jpg") no-repeat;
    background-position: center;
    background-size: contain;
    @media (min-width: 1024px) {
        background: none;
    }
    &__backgroundText {
        display: none;
        position: absolute;
        z-index: 1;
        transform: rotate(-90deg);
        top: 65%;
        left: -10%;
        color: #d8d8d899;
        mix-blend-mode: multiply;
        font-size: 12rem;
        user-select: none;
        font-family: "Open Sans", sans-serif;
        margin: 0;
        @media (min-width: 1024px) {
            display: block;
        }
    }
    &__mainContainer {
        width: 85%;
        margin: 2rem auto;
        display: block;
        z-index: 5;
        @media (min-width: 1024px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
    &__contentContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media (min-width: 1024px) {
            align-items: flex-start;
        }
    }
    &__header {
        margin: 0 auto;
        margin-bottom: 1rem;
        font-size: 2.5rem;
        color: #303030;
        text-align: center;
        @media (min-width: 1024px) {
            text-align: left;
            margin-left: 0;
            margin-right: 0;
        }
    }
    &__content {
        line-height: 1.5;
        text-align: justify;
    }
    &__link {
        margin-top: 1rem;
        background-color: #EB4647;
        color: white;
        padding: 1rem 2rem;
        border-radius: 9px;
        text-decoration: none;
        text-align: center;
        transition: all 300ms ease-in-out;
        &:hover {
            background-color: darken(#EB4647, 7%);
        }
    }
    &__imgContainer {
        display: none;
        justify-content: flex-end;
        @media (min-width: 1024px) {
            display: flex;
        }
    }
}
</style>