<template>

    <datas-panel v-if="isLocationAuthorized">

        <template v-slot:header>
            <h3 class="datasPanel__header">Situation geographique détaillée</h3>
        </template>

        <template v-slot:content>

            <div class="detailedGeoDatasPanel__locationGraphsContainer">
                <map-container 
                    :mapKeys="''"
                    :location="location"
                    :status="formCriteria.status"
                    :datatype="formCriteria.datatype"
                    :DATATYPES="DATATYPES"
                >
                </map-container>
                <!--Regions List Panel-->
            </div>

            <form class="detailedGeoDatasForm" @submit.prevent>

                <div class="detailedGeoDatasForm__datatypeContainer">

                    <select-input
                        @new-selection="changeDatastype"
                    ></select-input>

                </div>
                <status-form
                    @selectable-status-change="statusChange"
                ></status-form>

            </form>

        </template>

    </datas-panel>

</template>

<script>
import { reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import MapContainer from "./DetailedGeographicalSituationPanel/Map.vue";
import DatasPanel from "./SharedComponents/DatasPanel.vue";
import StatusForm from "./SharedComponents/StatusForm.vue";
import SelectInput from "./SharedComponents/Form/SelectInput.vue";

export default {
    props: {
        location: {
            type: Object, 
            required: true
        }
    },
    setup(props) {

        const DATASTYPES = {
            RAW: 1,
            RELATIVE: 2
        };
        const MAP_KEYS_SETTINGS = {
            [DATASTYPES.RELATIVE]: {
                LEVELS: 6,
                MIN: [0, 2, 6, 12, 19, 32],
                MAX: [2, 6, 12, 19, 32, 100]
            },
            [DATASTYPES.RAW]: {
                LEVELS: 6,
                MIN: [0, 0, 5, 12, 25, 38],
                MAX: [0, 5, 12, 25, 38, 100]
            }
        };
        const LOCATIONS = ["FR", "US", "CA", "IN", "BR", "CN", "RU", "CEU", "CAF", "CSA", "CNA", "CAS", "COC"];

        const isLocationAuthorized = computed(() => LOCATIONS.includes(props.location.infos.abbreviation));

        const store = useStore();
        const DASHBOARD_DATAS = computed(() => store.state.DashboardDatas);

        const formCriteria = reactive({
            datatype: DATASTYPES.RELATIVE,
            status: null,
        });

        const MAP_KEYS = computed(() => {

            if (isLocationAuthorized === false) {
                return null;
            }

            const MAP_KEYS = {};

            Object.entries(MAP_KEYS_SETTINGS).forEach(([DATATYPE, DATAS]) => {

                MAP_KEYS[DATATYPE] = {};

                for (let i = 0; i < DATAS.LEVELS; i++) {

                    MAP_KEYS[DATATYPE][i+1] = {
                        MIN: DATAS.MIN[i],
                        MAX: DATAS.MAX[i],
                        CLASS: `confirmedCasesLvl${i+1}`,
                        COLOR: DASHBOARD_DATAS.value.COLORS.GRADIENTS[formCriteria.status][i+1]
                    }

                }

            });

            return MAP_KEYS;

        });

        const rawMinsMaxs = computed(() => {

            if (isLocationAuthorized === false) {
                return null;
            }

            const highestValues = {};
            const rawMinsMaxs = {};

            //Find the highest value for each status
            Object.values(props.location.provinces).forEach(province => {
                Object.entries(province).forEach(([status, data]) => highestValues[status] = Math.max(highestValues[status], data));
            });

            //Calculate each intermediate values from the highest value
            Object.entries(highestValues).forEach(([status, data]) => {

                const highestValue = Math.round(data * 10 / 100) + data;
                const valuesGap = highestValue / 6;
                rawMinsMaxs[key] = {};

                for (let i = 1; i < 7; i++) {

                    const key = `key${i}`;

                    rawMinsMaxs[status][key] = {};
                    rawMinsMaxs[status][key]["min"] = i === 1 ? 0 : rawMinsMaxs[status]["key" + (i - 1)]["max"] + 1;
                    rawMinsMaxs[status][key]["max"] = Math.round(valuesGap * i);

                }

            });

            return rawMinsMaxs;

        });

        const changeStatus = event => formCriteria.status = event.currentTarget.value;
        const changeDatastype = event => formCriteria.datatype = event.currentTarget.value;

        watch(() => props.location, newLocation => formCriteria.status = newLocation.pro);

        watch(() => formCriteria.datatype, newDatatype => {

            if (newDatatype === DATASTYPES.RAW) {

                Object.keys(MAP_KEYS.value[newDatatype]).forEach(KEY => {
                    
                    MAP_KEYS[KEY].MIN = rawMinsMaxs.value[newValue.status][KEY].min;
                    MAP_KEYS[KEY].MAX = rawMinsMaxs.value[newValue.status][KEY].max;

                });

            }

        });

        watch(() => formCriteria.status, newStatus => {

            Object.entries(DASHBOARD_DATAS.value.COLORS.GRADIENTS[newStatus]).forEach(([KEY, GRADIENT]) => {
                MAP_KEYS.value[DATASTYPES.RELATIVE][KEY].COLOR = GRADIENT;
            });

        });

        
        return {
            DATASTYPES,
            isLocationAuthorized,
            isRegionPanelDisplayed,
            changeStatus,
            changeDatastype
        }

    },
    components: {
        DatasPanel,
        MapContainer,
        StatusForm,
        SelectInput
    }
}
</script>

<style lang="scss">

@mixin highlightRegionsAnimation {
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
}

@mixin highlightAnimationStart {
    transform-origin: center;
    transform: scale(1);
    stroke-width: 0.5px;
}

@mixin highlightAnimationEnd {
    transform: scale(1.01);
    transform-origin: center;
    stroke-width: 1.5px;
}

@keyframes confirmedHighlight {
    0% {
        fill: #FFF5C7;
        @include highlightAnimationStart;
    }
    100% {
        fill: #e73a51;
        @include highlightAnimationEnd;
    }
}

@keyframes recoveredHighlight {
    from {
        fill: #B5F0AD;
        @include highlightAnimationStart;
    }
    to {
        fill: #3CF525;
        @include highlightAnimationEnd;
    }
}

@keyframes deathsHighlight {
    from {
        fill: #D6D6D6;
        @include highlightAnimationStart;
    }
    to {
        fill: #3A3A3A;
        @include highlightAnimationEnd;
    }
}

@keyframes hospitalizationsHighlight {
    from {
        fill: #FFE1A4;
        @include highlightAnimationStart;
    }
    to {
        fill: #FFC042;
        @include highlightAnimationEnd;
    }
}

@keyframes intensiveCareHighlight {
    from {
        fill: #FFF5C7;
        @include highlightAnimationStart;
    }
    to {
        fill: #e73a51;
        @include highlightAnimationEnd;
    }
}

.confirmedHighlightAnimation {
    animation-name: confirmedHighlight;
    @include highlightRegionsAnimation;
}

.recoveredHighlightAnimation {
    animation-name: recoveredHighlight;
    @include highlightRegionsAnimation;
}

.deathsHighlightAnimation {
    animation-name: deathsHighlight;
    @include highlightRegionsAnimation;
}

.hospitalizationsAnimation {
    animation-name: hospitalizationsHighlight;
    @include highlightRegionsAnimation;
}

.intensive_careAnimation {
    animation-name: intensiveCareHighlight;
    @include highlightRegionsAnimation;
}

.detailedGeoDatasPanel {
    &__locationGraphsContainer {
        position: relative;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        .regionsListPanel {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }
    &__formRankingContainer {
        display: flex;
        justify-content: space-between;
        align-content: center;
        div, form {
            flex: 1;
        }
    }
}

.detailedGeoDatasForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    &__mapInputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 2.5rem;
        @media (min-width: 768px) {
            flex-direction: row;
            margin: 0;
        }
    }
    &__datatypeContainer {
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (min-width: 768px) {
            margin-right: 2vw;
            margin-bottom: 0;
        }
    }
    &__selectInput {
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        height: 32px;
        border: 1px solid black;
        background-color: rgb(250, 250, 250);
    }
    &__statusContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        @media (min-width: 768px) {
            justify-content: space-between;
            width: 40%;
        }
    }
    &__radioInput {
        display: none;
    }
    &__contentToggleBtn {
        width: 100%;
        border: 2px solid black;
        border-radius: 3px;
        background-color: inherit;
        padding: 0.2rem 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 300ms;
        @media (min-width: 768px) {
            width: auto;
        }
        &--confirmed:hover {
            color: $confirmed;
            border-color: $confirmed;
        }
        &--deaths:hover {
            color: $deaths;
            border-color: $deaths;
        }
        &--recovered:hover {
            color: $recovered;
            border-color: $recovered;
        }
        &--hospitalizations:hover {
            color: $hospitalizations;
            border-color: $hospitalizations;
        }
        &--intensive_care:hover {
            color: $intensive-care;
            border-color: $intensive-care;
        }
    }
}
</style>