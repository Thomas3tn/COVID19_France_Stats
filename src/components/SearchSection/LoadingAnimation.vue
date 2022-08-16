<template>

    <div class="loadingAnimation">
        
        <div class="statusContainer">
            <status v-for="n in STATUS_TOTAL" :key="n" :changeAlert="statusList[`status${n}`]"></status>
        </div>
        <p class="requestStatus">Chargement des données<ellipsis></ellipsis></p>

    </div>

</template>

<script>
import Status from "./LoadingAnimation/Status.vue";
import Ellipsis from "./LoadingAnimation/Ellipsis.vue";
import { reactive } from "vue";
import _ from "lodash";

export default {
    props: {
        requestStatus: {
            type: String,
            required: false,
            default: "Chargement des données..."
        }
    },
    setup() {

        const INTERVAL = 1900;
        const STATUS_CHANGING = 2;
        const STATUS_TOTAL = 6;

        const statusList = reactive({});

        for (let i = 1; i <= STATUS_TOTAL; i++) {
            statusList[`status${i}`] = 0;
        }

        setInterval(() => {

            const selectedStatus = [];

            for (let i = 0; i < STATUS_CHANGING; i++) {
                
                let isValid = false;

                while (isValid === false) {

                    let statusNum = _.random(1, STATUS_TOTAL);

                    if (selectedStatus.includes(statusNum) === false) {

                        selectedStatus.push(statusNum);
                        isValid = true;

                    }

                }

            }

            selectedStatus.forEach(statusNum => statusList[`status${statusNum}`]++);

        }, INTERVAL);

        return {
            STATUS_TOTAL,
            statusList
        }

    },
    components: {
        Status,
        Ellipsis
    }
}
</script>

<style lang="scss" scoped>
.loadingAnimation {
    padding: 1rem;
    min-height: 80px;
    background-color: #ffffffa1;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.statusContainer {
    display: flex;
    justify-content: center;
    align-items: center;
}
.requestStatus {
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>