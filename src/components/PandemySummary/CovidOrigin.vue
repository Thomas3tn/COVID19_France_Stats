<template>
    <section class="covidOrigin">
        <div class="covidOrigin__mainContainer">
            <div class="covidOrigin__contentContainer">
                <h2 class="covidOrigin__header">D’où vient le COVID-19 ?</h2>
                <p class="covidOrigin__content">Covid-19 fait référence à « Coronavirus Disease 2019 », la maladie provoquée par un virus de la famille des Coronaviridae, le SARS-CoV-2. Cette maladie infectieuse est une zoonose, dont l'origine est encore débattue, qui a émergé en décembre 2019 dans la ville de Wuhan, dans la province du Hubei en Chine. Elle s'est rapidement propagée, d'abord dans toute la Chine, puis à l'étranger provoquant une épidémie mondiale.</p>
                <a href="#" title="En savoir plus sur l'émergence du COVID-19" class="covidOrigin__link">En savoir plus sur l'émergence du COVID-19</a>
            </div>
            <div class="covidOrigin__mosaicContainer">
                <div class="covidOrigin__mosaic">
                    <img src="../../assets/img/covidOrigin/covidOrigin1.jpg" class="covidOrigin__img covidOrigin__img--1"/>
                    <img src="../../assets/img/covidOrigin/covidOrigin2.jpg" class="covidOrigin__img covidOrigin__img--2"/>
                    <img src="../../assets/img/covidOrigin/covidOrigin3.jpg" class="covidOrigin__img covidOrigin__img--3"/>
                    <img src="../../assets/img/covidOrigin/covidOrigin4.jpg" class="covidOrigin__img covidOrigin__img--4"/>
                </div>
            </div>
            
        </div>
    </section>
</template>

<style lang="scss">
.covidOrigin {
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    &__mainContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 90%;
        min-height: 400px;
    }
    &__contentContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    &__content {
        line-height: 1.5;
    }
    &__link {
        background-color: #93B1A7;
        color: white;
        padding: 2rem 2rem;
        border-radius: 15px;
    }
    &__mosaicContainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__mosaic {
        position: relative;
        border: 3px solid white;
        width: 100%;
        height: 100%;
        border: 1px solid black;
    }
    &__img {
        position: absolute;
        height: auto;
        &--1 {
            left: 0%;
            bottom: 0%;
            width: 20%;
        }
        &--2 {
            left: 0%;
            top: 0%;
            width: 40%;
        }
        &--3 {
            right: 0%;
            top: 10%;
            width: 40%;
        }
        &--4 {
            right: 10%;
            bottom: 0%;
            width: 40%;
        }
    }
}
</style>