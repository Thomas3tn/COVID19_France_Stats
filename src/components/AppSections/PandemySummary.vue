<template>
    <div>
        <p>Il y a actuellement {{ worldConfirmedCases }} cas confirmés d'infection au COVID-19 à travers le monde aujourd'hui.</p>
        <p>Depuis le début de la pandémie, {{ worldDeaths }} ont perdues la vie à travers le monde.</p>
    </div>
    <div>
        <p>La France,  {{ francePosition }} pays le plus touché par la pandémie, a enregistré {{ franceConfirmedCases }} cas confirmés de coronavirus.</p>
    </div>
    <div>
        <p>Covid-19 fait référence à « Coronavirus Disease 2019 », la maladie provoquée par un virus de la famille des Coronaviridae, le SARS-CoV-2. Cette maladie infectieuse est une zoonose, dont l'origine est encore débattue, qui a émergé en décembre 2019 dans la ville de Wuhan, dans la province du Hubei en Chine. Elle s'est rapidement propagée, d'abord dans toute la Chine, puis à l'étranger provoquant une épidémie mondiale.</p>
        <p>Le Covid-19 est une maladie respiratoire pouvant être mortelle chez les patients fragilisés par l'âge ou une autre maladie chronique. Elle se transmet par contact rapproché avec des personnes infectées. La maladie pourrait aussi être transmise par des patients asymptomatiques mais les données scientifiques manquent pour en attester avec certitude.</p>
        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">Consulter les recommandations de l'OMS</a>
    </div>
</template>

<script>


export default {
    datas() {
        return {
            worldConfirmedCases: "117,060,462",
            worldDeaths: "2,597,318"
        }
    }
}
</script>