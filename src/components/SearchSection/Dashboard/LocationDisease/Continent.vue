<template>

    <current-situation 
        :location="continent"
    >
    </current-situation>
    <!--<detailed-geo-datas-panel 
        :location="continent"
    >
    </detailed-geo-datas-panel>-->
    
    <div class="locationDisease__horizontalDisplay">

        <vaccination 
            :location="continent"
        >
        </vaccination>
        <relative-datas
            :location="continent"
        >
        </relative-datas>
    
    </div>

</template>

<script>
import CurrentSituation from "./Panels/CurrentSituation.vue";
//import DetailedGeoDatasPanel from "./DiseasePanels/DetailedGeographicalSituationPanel.vue";
import Vaccination from "./Panels/Vaccination.vue";
import RelativeDatas from "./Panels/RelativeDatas.vue";

export default {
    props: {
        continent: {
            type: Object,
            required: true
        }
    },
    components: {
        CurrentSituation,
        //DetailedGeoDatasPanel,
        Vaccination,
        RelativeDatas
    }
}
</script>