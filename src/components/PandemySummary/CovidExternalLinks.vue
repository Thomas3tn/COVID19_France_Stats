<template>
    <div class="externalLinks">
        <div class="externalLinksContainer">
            <div class="externalLink externalLink--one">
                <div class="externalLink__headerContainer">
                    <h2 class="externalLink__header externalLink__header--mainHeader">Restez informé !</h2>
                </div>
                <img class="externalLink__img externalLink__img--one" src="../../assets/img/externalLinksMosaic/linksHeaderBg.jpg"/>
            </div>
            <a class="externalLink externalLink--two" :href="covidDefinition.url" :title="covidDefinition.title">
                <div class="externalLink__headerContainer externalLink__headerContainer--two">
                    <h3 class="externalLink__header">En savoir plus sur le COVID-19 <i class="fas fa-long-arrow-alt-right externalLink__arrow externalLink__arrow--horizontalArrow" aria-hidden="true"></i></h3>
                </div>
                <img class="externalLink__img externalLink__img--two" src="../../assets/img/externalLinksMosaic/covidInfosBg.jpg" :alt="covidDefinition.imgAltText"/>
            </a>
            <a class="externalLink externalLink--three" :href="covidGuidelines.url" :title="covidGuidelines.title">
                <div class="externalLink__headerContainer externalLink__headerContainer--three">
                    <h3 class="externalLink__header">Conseils de l'OMS</h3>
                    <i class="fas fa-long-arrow-alt-down externalLink__arrow externalLink__arrow--verticalArrow" aria-hidden="true"></i>
                </div>
                <img class="externalLink__img externalLink__img--three" src="../../assets/img/externalLinksMosaic/omsTipsBg.jpg" :alt="covidGuidelines.imgAltText"/>
            </a>
            <a class="externalLink externalLink--four" :href="covidNews.url" :title="covidNews.title">
                <div class="externalLink__headerContainer externalLink__headerContainer--four">
                    <h3 class="externalLink__header">Dernières actualités</h3>
                    <i class="fas fa-long-arrow-alt-down externalLink__arrow externalLink__arrow--verticalArrow" aria-hidden="true"></i>
                </div>
                <img class="externalLink__img externalLink__img--four" src="../../assets/img/externalLinksMosaic/newsBg.jpg" :alt="covidNews.imgAltText"/>
            </a>
            <a class="externalLink externalLink--five" :href="covidMyths.url" :title="covidMyths.title">
                <div class="externalLink__headerContainer externalLink__headerContainer--five">
                    <h3 class="externalLink__header">Idées reçues sur le COVID-19 <i class="fas fa-long-arrow-alt-right externalLink__arrow externalLink__arrow--horizontalArrow" aria-hidden="true"></i></h3>
                </div>
                <img id="img" class="externalLink__img externalLink__img--five" src="../../assets/img/externalLinksMosaic/fakeNewsBg.jpg" :alt="covidMyths.imgAltText"/>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    setup() {

        //External Links
        const covidDefinition = {
            url: "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/maladie-covid-19-nouveau-coronavirus",
            title: "En savoir plus sur le COVID-19 (Institut Pasteur)",
            imgAltText: "Image d'un virus modélisé"
        };
        const covidMyths = {
            url: "https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
            title: "Idées reçues sur le COVID-19 (OMS)",
            imgAltText: "Image d'un homme desinfectant des pages de journaux intitulées 'Fake News'"
        };
        const covidGuidelines = {
            url: "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
            title: "Conseils de l'OMS (OMS)",
            imgAltText: "Tableau détourné la Joconde portant un masque sur le visage ainsi que du gel hydroalcoolique dans les bras"
        };
        const covidNews = {
            url: "https://www.francetvinfo.fr/sante/maladie/coronavirus/",
            title: "Dernières actualités (FranceTvInfos)",
            imgAltText: "Image regroupant plusieurs pages de journaux superposées"
        };

        return {
            covidDefinition,
            covidMyths,
            covidGuidelines,
            covidNews
        }

    },
}
</script>

<style lang="scss">
@mixin headerFontSize {
    font-size: clamp(1.8rem, 3vw, 5rem);
}

.externalLinks {
    background-color: $secondary-light;
    display: flex;
    justify-content: center;
    align-items: center;
}

.externalLinksContainer {
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