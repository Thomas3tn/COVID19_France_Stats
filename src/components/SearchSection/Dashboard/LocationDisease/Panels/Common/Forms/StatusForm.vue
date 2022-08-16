<template>

    <form 
        @submit.prevent
        class="form"
    >

        <selectable-status 
            v-for="(state, status) in statusStates"
            :class="''" 
            :inputType="inputsType"
            :status="status"
            :isChecked="state" 
            :key="status"
            :componentName="componentName"
            :groupName="`${componentName}StatusForm`"
            @selectable-status-change="onSelectableStatusChange"
        >
        </selectable-status>

    </form>

</template>

<script>
import SelectableStatus from "./StatusForm/SelectableStatus.vue";
import { reactive } from "vue";

export default {
    props: {
        statusList: {
            type: Array,
            required: true
        },
        inputsType: {
            type: String,
            required: true,
            default: "checkbox",
            validator(value) {
                return ["radio", "checkbox"].includes(value);
            }
        },
        componentName: {
            type: String,
            required: true
        }
    },
    emits: ["selectable-status-change"],
    setup(props, context) {
        
        const statusStates = reactive({});

        function onSelectableStatusChange(statusState) {

            if (props.inputsType === "radio") {

                const selectedStatus = Object.keys(statusStates).find(status => statusStates[status] === true);

                if (statusState.status !== selectedStatus) {

                    props.statusList.forEach(status => statusStates[status] = false);
                    statusStates[statusState.status] = true;
                    context.emit("selectable-status-change", statusState.status);

                }

            } else {

                statusStates[statusState.status] = statusState.state;
                context.emit("selectable-status-change", statusState);

            }

        }

        props.statusList.forEach(status => statusStates[status] = props.inputsType === "radio" ? false : true);
        if (props.inputsType === "radio") {
            statusStates[props.statusList[0]] = true;
        }

        return {
            statusStates,
            onSelectableStatusChange,
        }

    },
    components: {
        SelectableStatus
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>