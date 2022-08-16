<template>

    <section class="origin">

        <div class="origin__container">

            <div class="explanation">
                <h2 class="explanation__header">D’où vient le COVID-19 ?</h2>
                <p class="explanation__content">Covid-19 fait référence à « Coronavirus Disease 2019 », la maladie provoquée par un virus de la famille 
                    des <a :href="LINKS.VIRUS_FAMILLY.HREF" :title="LINKS.VIRUS_FAMILLY.TITLE"><i class="explanation__content--italic">Coronaviridae</i></a>, 
                    le <a :href="LINKS.SARS_COV_2.HREF" :title="LINKS.SARS_COV_2.TITLE">SARS-CoV-2</a>. Cette maladie infectieuse est une zoonose, dont 
                    l'origine est encore débattue, qui a émergé en décembre 2019 dans la ville de Wuhan, dans la province du Hubei en Chine. Elle s'est 
                    rapidement propagée, d'abord dans toute la Chine, puis à l'étranger provoquant une épidémie mondiale.</p>
                <a :href="LINKS.CHRONOLOGY.HREF" :title="LINKS.CHRONOLOGY.TITLE" class="btn btn--info">En savoir plus sur la chronologie du COVID-19</a>
            </div>

            <div class="imgContainer">
                <img :src="IMG.SRC" :alt="IMG.ALT"/>
            </div>

        </div>

        <p class="backgroundText" aria-hidden="true">COVID-19</p>

    </section>

</template>

<script>
export default {
    setup() {

        const LINKS = {
            VIRUS_FAMILLY: {
                HREF: "https://fr.wikipedia.org/wiki/Coronaviridae",
                TITLE: "famille des Coronaviridae (Wikipédia)"
            },
            SARS_COV_2: {
                HREF: "https://fr.wikipedia.org/wiki/SARS-CoV-2",
                TITLE: "SARS-CoV-2 (Wikipédia)"
            },
            CHRONOLOGY: {
                HREF: "https://www.lemonde.fr/les-decodeurs/article/2020/05/12/coronavirus-de-la-chauve-souris-au-deconfinement-la-chronologie-de-la-pandemie_6039448_4355770.html",
                TITLE: "En savoir plus sur la chronologie du COVID-19"
            }
        };

        const IMG = {
            SRC: "../../assets/img/origin/originBackground.png",
            ALT: "Dans le sense des aiguilles d'une montre: carte représentant les cas de COVID dans le monde, deux hommes dans la rue transportant un corps dans un sac mortuaire sur un brancard, agent de laboratoire travaillant, personnes masquées dans un métro assises les uns à côtés des autres"
        };
        
        return {
            LINKS,
            IMG
        }

    },
}
</script>

<style lang="scss" scoped>
.origin {
    position: relative;
    background-color: $primary;
    min-height: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../../assets/img/origin/originMobileBackground.jpg") no-repeat;
    background-position: center;
    background-size: contain;
    @media (min-width: 1024px) {
        background: none;
    }
    &__container {
        width: 85%;
        margin: 2rem auto;
        display: block;
        z-index: 5;
        @media (min-width: 1024px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
}
.explanation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 1024px) {
        align-items: flex-start;
    }
    &__header {
        margin: 0 auto;
        margin-bottom: 1rem;
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
        &--italic {
            font-style: italic;
        }
    }
}
.imgContainer {
    display: none;
    justify-content: flex-end;
    @media (min-width: 1024px) {
        display: flex;
    }
    @media (min-width: 2000px) {
        justify-content: center;
    }
    img {
        -webkit-user-drag: none;
    }
}
.backgroundText {
    display: none;
    position: absolute;
    z-index: 1;
    transform: rotate(-90deg);
    top: 65%;
    left: -10%;
    color: #d8d8d899;
    mix-blend-mode: multiply;
    font-size: clamp(1rem, 14vw, 22rem);
    user-select: none;
    font-family: "Open Sans", sans-serif;
    margin: 0;
    @media (min-width: 1024px) {
        display: block;
    }
}
</style>