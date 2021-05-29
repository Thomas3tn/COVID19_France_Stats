<template>
    <div class="covidInfo">
        <div class="covidInfo__textContainer">
            <div>
                <h2 class="covidInfo__header">Tout savoir le COVID-19</h2>
                <p>Depuis l’émergence de la crise sanitaire, les connaissaires sur le virus n’ont cessées d’évoluées au fil des mois créant parfois une confusion parmis la population. Quels sont les riques de transmission ?</p>
            </div>
            <div>
                <p>Quels réellement les symptômes ? Ou encore que faire an cas de contamination supposée ou avérée au COVID-19 ? Les interrogations restent encore à ce jour très nombreuses, de ce fait nous avons réunis et résumé les toutes dernières informations sur le COVID-19. "Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
        </div>
        <div class="covidInfo__cardsContainer">
            <covid-info-card v-for="item in cardsContent" :title="item.title" :subTitle="item.subTitle" :content="item.content" :key="item.title"></covid-info-card>
        </div>
    </div>
</template>

<script>
import CovidInfoCard from "./CovidInfoCard.vue";

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
        CovidInfoCard
    }
}
</script>

<style lang="scss">
.covidInfo {
    background-color: #93B1A7;
    color: white;
    padding: 2.5rem;
    overflow: hidden;
    &__textContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: justify;
        line-height: 1.5;
        width: 90%;
        margin: 0 auto;
        div:first-of-type {
            margin-right: 2rem;
        }
        div {
            flex: 1;
        }
    }
    &__header {
        font-size: 2rem;
    }
    &__cardsContainer {
        padding: 2rem 0;
        display: flex;
        justify-content: center;
        position: relative;
        left: 60px;
    }
}
</style>