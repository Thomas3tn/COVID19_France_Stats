<template>

    <panel>

        <template v-slot:header>
            <h3 class="datasPanel__header">Situation actuelle</h3>
        </template>

        <template v-slot:content>

            <stat-item 
                v-for="item in datas" 
                :key="item.status" 
                :name="item.status" 
                :number="item.data"
            ></stat-item>

        </template>

    </panel>

</template>

<script>
import StatItem from "./Common/DatasDisplay/statItem.vue";
import Panel from "./Common/Panel/Panel.vue";
import { computed } from "vue";

export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    setup(props) {

        const UNWANTED_KEYS = ["partiallyVaccinated", "administredVaccines", "dailyHospitalizations", "dailyIntensiveCare", "dailyDeaths", "dailyRecovered"];
        let datas = computed(() => {

            const datas = [];
            
            Object.entries(props.location.live).forEach(([status, data]) => {

                if (UNWANTED_KEYS.includes(status) === false && data !== null) {
                    datas.push({status, data})
                }

            });

            return datas;

        });

        console.log(datas);

        return {
            datas
        }

    },
    components: {
        Panel,
        StatItem
    }
}
</script>