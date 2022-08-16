<template>

    <div class="externalLinks">

        <div class="externalLinks__container">

            <div class="externalLink externalLink--one">
                <div class="externalLink__headerContainer">
                    <h2 class="externalLink__header externalLink__header--mainHeader">Restez informé !</h2>
                </div>
                <img class="externalLink__img externalLink__img--one" src="../../assets/img/externalLinks/linksHeader.jpg"/>
            </div>
            
            <external-link :linkContent="LINKS_CONTENT.DEFINITION" :arrowPosition="'horizontal'" :type="'two'"></external-link>
            <external-link :linkContent="LINKS_CONTENT.GUIDELINES" :arrowPosition="'vertical'" :type="'three'"></external-link>
            <external-link :linkContent="LINKS_CONTENT.NEWS" :arrowPosition="'vertical'" :type="'four'"></external-link>
            <external-link :linkContent="LINKS_CONTENT.MYTHS" :arrowPosition="'horizontal'" :type="'five'"></external-link>

        </div>

    </div>

</template>

<script>
import ExternalLink from "./ExternalLinks/ExternalLink.vue";

export default {
    setup() {

        return {
            LINKS_CONTENT: {
                DEFINITION: {
                    HEADER: "En savoir plus sur le COVID-19",
                    IMG: "covidInfos",
                    URL: "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/maladie-covid-19-nouveau-coronavirus",
                    TITLE: "En savoir plus sur le COVID-19 (Institut Pasteur)",
                    ALT_TEXT: "Image d'un virus modélisé"
                },
                MYTHS: {
                    HEADER: "Idées reçues sur le COVID-19",
                    IMG: "fakeNews",
                    URL: "https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
                    TITLE: "Idées reçues sur le COVID-19 (OMS)",
                    ALT_TEXT: "Image d'un homme desinfectant des pages de journaux intitulées 'Fake News'"
                },
                GUIDELINES: {
                    HEADER: "Conseils de l'OMS",
                    IMG: "omsTips",
                    URL: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
                    TITLE: "Conseils de l'OMS (OMS)",
                    ALT_TEXT: "Tableau détourné la Joconde portant un masque sur le visage ainsi que du gel hydroalcoolique dans les bras"
                },
                NEWS: {
                    HEADER: "Dernières actualités",
                    IMG: "news",
                    URL: "https://www.francetvinfo.fr/sante/maladie/coronavirus/",
                    TITLE: "Dernières actualités (FranceTvInfos)",
                    ALT_TEXT: "Image regroupant plusieurs pages de journaux superposées"
                }
            }
        }

    },
    components: {
        ExternalLink
    }
}
</script>

<style lang="scss" scoped>
@mixin headerFontSize {
    font-size: clamp(1.8rem, 3vw, 5rem);
}

.externalLinks {
    background-color: $secondary-light;
    display: flex;
    justify-content: center;
    align-items: center;
    &__container {
        min-height: 52vw;
        width: 90%;
        margin: 4rem auto 4rem auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 4vw;
        font-family: "Open-Sans", sans-serif;
        @media (min-width: 1024px) {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5vw;
        }
    }
}

.externalLink {
    display: block;
    text-decoration: none;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    min-height: 15rem;
    @media (min-width: 1024px) {
        min-height: 12rem;
        &--one {
            grid-column: 1/3;
            grid-row: 1;
        }
        &--two {
            grid-column: 3 / 5;
            grid-row: 1/3;
        }
        &--three {
            grid-column: 1;
            grid-row: 2/4;
        }
        &--five {
            grid-column: 2/5;
            justify-content: left;
        }
    }
    @media (min-width: 1440px) {
        min-height: 14rem;
    }
    //Does not apply hover effect on the header div
    &:hover:not(div) {
        cursor: pointer;
        img {
            transform: scale(1.05);
        }
        .externalLink__arrow--verticalArrow {
            transform: translateY(25%);
        }
        .externalLink__arrow--horizontalArrow {
            transform: translateX(25%);
        }
    }
    &__headerContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 1;
        text-align: center;
        color: $white;
        &--two {
            width: 50%;
            @media (min-width: 1024px) {
                width: 80%;
            }
        }
        &--three {
            width: 85%;
        }
        &--four {
            width: 85%;
        }
        &--five {
            width: 70%;
            text-align: left;
            @media (min-width: 768px) {
                width: 50%;
            }
            @media (min-width: 1024px) {
                position: relative;
                left: 5.5%;
            }
        }
    }
    &__header {
        margin: 0;
        + i, > i {
            @include headerFontSize;
        }
        &--mainHeader {
            @include headerFontSize;
        }
    }
    &__arrow {
        transition: all 300ms ease-out;
        &--horizontalArrow {
            transform: translateX(0%);
            transform-origin: left;
        }
        &--verticalArrow {
            transform-origin: top;
            transform: translateY(0%);
        }
    }
    &__img {
        max-width: 100%;
        transform: scale(1);
        transition: all 300ms ease-out;
        position: absolute;
        -webkit-user-drag: none;
        &--one {
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
        }
        &--two {
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
        }
        &--three {
            top: -20%;
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
            @media (min-width: 768px) {
                top: -80%;
            }
            @media (min-width: 1024px) {
                top: 0%;
            }
        }
        &--four {
            min-height: 100%;
            min-width: 100%;
            object-fit: cover;
        }
        &--five {
            height: 100%;
            max-width: fit-content;
            @media (min-width: 768px) {
                height: auto;
                margin-top: -8%;
                max-width: 100%;
            }
        }
    }
}
</style>