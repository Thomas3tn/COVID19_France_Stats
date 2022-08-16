<template>

    <div class="infos">

        <div class="intro">

            <div class="intro__part intro__part--left">
                <h2 class="intro__header">Tout savoir le virus du COVID-19</h2>
                <p class="intro__content">Depuis l’émergence de la crise sanitaire à la fin de l'année de 2019, les connaissaires sur le virus 
                    n’ont cessées d’évoluées au fil des mois. Ainsi suivre l'évolution des avancées scientifiques peut être fastidieux.</p>
            </div>

            <div class="intro__part intro__part--right">
                <p class="intro__content">En effet quels peuvent être les riques de transmission ? Que faut-il faire pour se protéger 
                    efficacement du virus ? Quels sont réellement les symptômes de la maladie ? Ou encore faire en cas de contamination 
                    supposée ou avérée au COVID-19 ? Faut-il aller à l'hôpital ou rester chez soi ? Les interrogations restent encore à ce 
                    jour très nombreuses dans un monde en constant changement. Par conséquent nous avons réunis et résumé les toutes dernières 
                    informations sur le COVID-19.</p>
            </div>

        </div>

        <div class="cardsContainer">
            <info-card v-for="CARD in CARDS" :title="CARD.TITLE" :subTitle="CARD.subTitle" :content="CARD.CONTENT" :key="CARD.TITLE"></info-card>
        </div>

        <div class="dropdownsContainer">

            <dropdown v-for="CARD in CARDS" :key="CARD.TITLE" :detailsElementId="CARD.TITLE">

                <template v-slot:header>
                    <h3>{{ CARD.TITLE }}</h3>
                </template>

                <template v-slot:content>
                    <p v-for="CONTENT in CARD.CONTENT" :key="CONTENT">{{ CONTENT }}</p>
                </template>

            </dropdown>

        </div>

    </div>

</template>

<script>
import InfoCard from "./Infos/InfoCard.vue";
import Dropdown from "../Common/Dropdown.vue";

export default {
    setup() {

        const CARDS = [
            {
                TITLE: "Transmission",
                CONTENT: [
                    "La transmission se fait essentiellement par voie aérienne (goutelettes de postillons) et passe par un contact rapproché (moins d'un mètre) et durable (au moins 15 mins) avec un sujet contagieux.",
                    "Des particules de plus petites tailles peuvent être aussi émises sous formes d'aérosols au cours de la parole, ce qui expliquerait que le virus puisse persister en suspension dans l'air dans une pièce non ventilée.",
                    "Le virus peut conserver une infectiosité pendant quelques heures sur des surfaces inertes d'où il peut être transporté par les mains."
                    ]
            },
            {
                TITLE: "Symptômes",
                CONTENT: [
                    "La durée de l'incubation est en moyenne de 5 jours, avec des extrêmes de 2 à 12 jours.",
                    "Les premiers symptômes sont peu spécifiques : maux de tête, douleurs musculaires, fatigue. La fièvre et les signes respiratoires arrivent secondairement.",
                    "Il s'écoule en moyenne une semaine entre l'apparition des premiers symptômes et l'admission à l'hôpital à la phase d'état de la maladie.",
                    "La gravité des signes cliniques nécessite le maintien à l'hôpital d'environ 20% des malades et 5% nécessitent une admission en réanimation.",
                    "L'infection peut être asymptomatique ou paucisymptomatique (entrainer pas ou peu de manifestations cliniques) chez 30 à 60 % des sujets infectés, en particulier chez les jeunes enfants (moins de 12 ans)."
                ]
            },
            {
                TITLE: "Diagnostic",
                CONTENT: [
                    "Les tests virologiques (RT-PCR) permettent de déterminer si une personne est porteuse du virus au moment du test grâce à un prélèvement par voie nasale ou salivaire.",
                    "Les tests antigéniques rapides constituent ou outil supplémentaire pour réduire les chaînes de transmission virale. Ils viennent en complément des tests RT-PCR. Ce test est prioritairement réservé aux personnes symptomatiques.",
                    "Les tests sérologiques permettent de rechercher si une personne a développé une réaction immunitaire après avoir été en contact avec le virus."
                ]
            },
            {
                TITLE: "Précautions et prévention",
                CONTENT: [
                    "Se laver les mains régulièrement (eau+savon) ou utilisez une solution hydroalcoolique.",
                    "Tousser ou éternuer dans votre coude ou dans un mouchoir.",
                    "Eviter de se toucher le visage.",
                    "Utiliser des mouchoirs à usage unique (et les jeter à la poubelle après le premier usage).",
                    "Saluer sans serrer la main et sans embrassades.",
                    "Conserver une distance d'au moins 1.5m avec tout interlocuteur.",
                    "Bien arérer les pièces."
                ]
            },
            {
                TITLE: "Traitement et prise en charge",
                CONTENT: [
                    "J'ai des symptômes (toux, fièvres) qui me font penser au COVID-19: Je reste à domicile, j'évite les contacts. Je prends contact avec mon médecin traitant qui pourra me proposer une consultation et un test de diagnostic en fonction des symptômes que je présente.",
                    "J'ai des symptômes qui s'aggravent avec des difficultés respiratoires et signes d'étouffement: J'appelle le SAMU qui décidera de la conduite à venir. J'évite tout contact avec l'entourage, je ne me rends pas chez mon médecin taitant ou aux urgences pour éviter toute potentielle contamination. je limite mes déplacements au strict nécessaire."
                ]
            }
        ];

        return {
            CARDS
        }

    },
    components: {
        InfoCard,
        Dropdown
    }
}
</script>

<style lang="scss" scoped>
$breakpoint: 1024px;

.infos {
    background-color: $secondary;
    color: $white;
    padding: 3rem 0rem;
    overflow: hidden;
    position: relative;
}
.intro {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: justify;
    line-height: 1.5;
    width: 85%;
    @media (min-width: $breakpoint) {
        flex-direction: row;
        margin: 0 auto;
    }
    &__part {
        @media (min-width: $breakpoint) {
            flex: 1;
            z-index: 1;
        }
        &--left {
            @media (min-width: $breakpoint) {
                margin-right: 1rem;
            }
        }
        &--right {
            @media (min-width: $breakpoint) {
                margin-left: 1rem;
            }
        }
    }
    &__header {
        text-align: center;
        margin-top: 0;
        @media (min-width: 768px) {
            text-align: left;
        }
    }
    &__content {
        margin-top: 0;
    }
}
.cardsContainer {
    padding: 2rem 0;
    display: flex;
    justify-content: center;
    position: relative;
    height: 28vw;
    left: 7vw;
    display: none;
    @media (min-width: $breakpoint) {
        display: flex;
    }
}
.dropdownsContainer {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto;
    width: 85%;
    @media (min-width: $breakpoint) {
        display: none;
    }
    p {
        text-align: justify;
    }
}
</style>