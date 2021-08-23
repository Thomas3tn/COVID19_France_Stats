<template>
    <div class="covidInfo">
        <div class="covidInfo__textContainer">
            <div>
                <h2 class="covidInfo__header">Tout savoir le virus du COVID-19</h2>
                <p>Depuis l’émergence de la crise sanitaire à la fin de l'année de 2019, les connaissaires sur le virus n’ont cessées d’évoluées au fil des mois. Ainsi suivre l'évolution des avancées scientifiques peut être fastidieux.</p>
            </div>
            <div>
                <p>En effet quels peuvent être les riques de transmission ? Que faut-il faire pour se protéger efficacement du virus ? Quels sont réellement les symptômes de la maladie ? Ou encore faire en cas de contamination supposée ou avérée au COVID-19 ? Faut-il aller à l'hôpital ou rester chez soi ? Les interrogations restent encore à ce jour très nombreuses dans un monde en constant changement. Par conséquent nous avons réunis et résumé les toutes dernières informations sur le COVID-19.</p>
            </div>
        </div>
        <div class="covidInfo__cardsContainer">
            <covid-info-card v-for="item in cardsContent" :title="item.title" :subTitle="item.subTitle" :content="item.content" :key="item.title"></covid-info-card>
        </div>
        <div class="covidInfo__infosAccordionsContainer">
            <dropdown-element v-for="item in cardsContent" :key="item.title" :detailsElementId="item.title">
                <template v-slot:header>
                    <h3>{{ item.title }}</h3>
                </template>
                <template v-slot:content>
                    <p v-for="itemContent in item.content" :key="itemContent">{{ itemContent }}</p>
                </template>
            </dropdown-element>
        </div>
    </div>
</template>

<script>
import CovidInfoCard from "./CovidInfos/CovidInfoCard.vue";
import DropdownElement from "../SearchSection/Dashboard/LocationAsidePanel/DropdownElement.vue";

export default {
    setup() {

        const cardsContent = [
            {
                title: "Transmission",
                content: [
                    "La transmission se fait essentiellement par voie aérienne (goutelettes de postillons) et passe par un contact rapproché (moins d'un mètre) et durable (au moins 15 mins) avec un sujet contagieux.",
                    "Des particules de plus petites tailles peuvent être aussi émises sous formes d'aérosols au cours de la parole, ce qui expliquerait que le virus puisse persister en suspension dans l'air dans une pièce non ventilée.",
                    "Le virus peut conserver une infectiosité pendant quelques heures sur des surfaces inertes d'où il peut être transporté par les mains."
                    ]
            },
            {
                title: "Symptômes",
                content: [
                    "La durée de l'incubation est en moyenne de 5 jours, avec des extrêmes de 2 à 12 jours.",
                    "Les premiers symptômes sont peu spécifiques : maux de tête, douleurs musculaires, fatigue. La fièvre et les signes respiratoires arrivent secondairement.",
                    "Il s'écoule en moyenne une semaine entre l'apparition des premiers symptômes et l'admission à l'hôpital à la phase d'état de la maladie.",
                    "La gravité des signes cliniques nécessite le maintien à l'hôpital d'environ 20% des malades et 5% nécessitent une admission en réanimation.",
                    "L'infection peut être asymptomatique ou paucisymptomatique (entrainer pas ou peu de manifestations cliniques) chez 30 à 60 % des sujets infectés, en particulier chez les jeunes enfants (moins de 12 ans)."
                ]
            },
            {
                title: "Diagnostic",
                content: [
                    "Les tests virologiques (RT-PCR) permettent de déterminer si une personne est porteuse du virus au moment du test grâce à un prélèvement par voie nasale ou salivaire.",
                    "Les tests antigéniques rapides constituent ou outil supplémentaire pour réduire les chaînes de transmission virale. Ils viennent en complément des tests RT-PCR. Ce test est prioritairement réservé aux personnes symptomatiques.",
                    "Les tests sérologiques permettent de rechercher si une personne a développé une réaction immunitaire après avoir été en contact avec le virus."
                ]
            },
            {
                title: "Précautions et prévention",
                content: [
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
                title: "Traitement et prise en charge",
                content: [
                    "J'ai des symptômes (toux, fièvres) qui me font penser au COVID-19: Je reste à domicile, j'évite les contacts. Je prends contact avec mon médecin traitant qui pourra me proposer une consultation et un test de diagnostic en fonction des symptômes que je présente.",
                    "J'ai des symptômes qui s'aggravent avec des difficultés respiratoires et signes d'étouffement: J'appelle le SAMU qui décidera de la conduite à venir. J'évite tout contact avec l'entourage, je ne me rends pas chez mon médecin taitant ou aux urgences pour éviter toute potentielle contamination. je limite mes déplacements au strict nécessaire."
                ]
            }
        ];

        return {
            cardsContent
        }

    },
    components: {
        CovidInfoCard,
        DropdownElement
    }
}
</script>

<style lang="scss">
.covidInfo {
    background-color: #457b9d;
    color: white;
    padding: 3rem 0rem;
    overflow: hidden;
    position: relative;
    &__textContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        text-align: justify;
        line-height: 1.5;
        width: 85%;
        margin: 0 auto;
        @media (min-width: 1024px) {
            p {
                margin-top: 0;
            }
            flex-direction: row;
            div:first-of-type {
            margin-right: 2rem;
            }
            div {
                flex: 1;
                z-index: 1;
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
    &__cardsContainer {
        padding: 2rem 0;
        display: flex;
        justify-content: center;
        position: relative;
        height: 28vw;
        //left: 60px;
        left: 7vw;
        display: none;
        @media (min-width: 1024px) {
            display: flex;
        }
    }
    &__infosAccordionsContainer {
        display: flex;
        flex-direction: column;
        position: relative;
        left: 8%;
        width: 85%;
        @media (min-width: 1024px) {
            display: none;
        }
    }
    &__accordionDetails {
        cursor: pointer;
        margin: 0.5rem 0;
        p {
            text-align: justify;
        }
    }
    &__accordionSummary > * {
        display: inline;
        font-size: clamp(1rem, 1.1vw, 2.5rem);
    }
}
</style>