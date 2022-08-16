<template>

  <panel :isContentColumn="true">

    <template v-slot:header>

      <h3 class="datasPanel__header">Évolution épidémique</h3>

    </template>

    <template v-slot:formToggleBtn>

      <form-toggle-btn 
        :isFormDisplayed="queryCriteria.customPeriodForm.isFormDisplayed"
        @form-toggle-btn-clicked="queryCriteria.customPeriodForm.isFormDisplayed = !queryCriteria.customPeriodForm.isFormDisplayed"
      >
      </form-toggle-btn>
      
    </template>

    <template v-slot:content>

      <div class="formsContainer">

        <form 
          v-if="queryCriteria.customPeriodForm.isFormDisplayed === false"
          class="chartForm" 
        >

          <select-input 
            :options="[{id: DATATYPES.DAILY, frName: 'Données quotidiennes'}, {id: DATATYPES.CUMULATIVE, frName: 'Données cumulatives'}]"
            :defaultSelection="DATATYPES.DAILY"
            @new-selection="onNewDataType"
          ></select-input>

          <status-form
            class="statusForm"
            :statusList="Object.keys(queryCriteria.chart.statusStates)"
            :componentName="'evolutionPanel'"
            :inputsType="'checkbox'"
            @selectable-status-change="onStatusStatesUpdate"
          ></status-form>

        </form>

        <div 
          v-else
          class="periodForm"
        >

          <form-toggle-btn
            v-if="queryCriteria.customPeriodForm.hasCustomPeriodBeenSubmitted === true"
            :isFormDisplayed="queryCriteria.customPeriodForm.isCustomPeriodDisplayed"
            :activeTitle="'Cacher la période personnalisée'"
            :inactiveTitle="'Afficher la période personnalisée'"
            :icon="DASHBOARD_ASSETS.ICONS.FORM.SWITCH_PERIOD"
            @form-toggle-btn-clicked="onCustomPeriodToggle"
          ></form-toggle-btn>

          <KeepAlive>
            <custom-period-form 
              class="customPeriodForm"
              @custom-period-submitted="onCustomPeriodSubmission"
              :componentName="'evolutionPanel'"
              :datesLimits="queryCriteria.customPeriodForm.dates.limits"
              :dates="queryCriteria.customPeriodForm.dates.custom"
            ></custom-period-form>
          </KeepAlive>

        </div>

      </div>

      <div class="chartContainer">
        <chart
          :chartId="'locationEvolutionGraph'"
          :chartData="chartDatas"
          :chartOptions="chartOptions"
          :chartType="'line'"
        ></chart>
      </div>

    </template>

  </panel>

</template>

<script>
import { reactive, watch, inject, computed } from "vue";
import { useStore } from "vuex";
import Chart from "./Common/DatasDisplay/Chart.vue";
import CustomPeriodForm from "./Common/Forms/CustomPeriodForm.vue";
import Panel from "./Common/Panel/Panel.vue";
import StatusForm from "./Common/Forms/StatusForm.vue";
import SelectInput from "./Common/Forms/Others/SelectInput.vue";
import DateCustomMethods from "../../../../../assets/JSClasses/CustomMethods/Date.js";
import FormToggleBtn from "./Common/Forms/Others/ToggleButton.vue";

export default {
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const store = useStore();

    const DASHBOARD_ASSETS = computed(() => store.state.DashboardAssets);
    const KEYS_TRANSLATIONS = inject("KEYS_TRANSLATIONS");
    const DATATYPES = {
      DAILY: "daily",
      CUMULATIVE: "cumulative"
    };
    const HIST_TYPES = {
      STANDARD: "standard",
      CUSTOM: "custom"
    };

    const queryCriteria = reactive({
      chart: {
        histType: HIST_TYPES.STANDARD,
        dataType: DATATYPES.DAILY,
        statusStates: {}
      },
      customPeriodForm: {
        hasCustomPeriodBeenSubmitted: false,
        isCustomPeriodDisplayed: false,
        isFormDisplayed: false,
        dates: {
          custom: {
            start: null,
            end: null
          },
          limits: {
            start: props.location.historical[0].date,
            end: props.location.historical[props.location.historical.length - 1].date
          }
        }
      }
    });

    const datas = reactive({
      [HIST_TYPES.STANDARD]: {
        datesLabels: [],
        [DATATYPES.DAILY]: {},
        [DATATYPES.CUMULATIVE]: {},
      },
      [HIST_TYPES.CUSTOM]: {
        datesLabels: [],
        [DATATYPES.DAILY]: {},
        [DATATYPES.CUMULATIVE]: {},
      }
    });

    const chartDatas = reactive({
      labels: [],
      datasets: [],
    });

    const chartOptions = reactive({
      scales: {
          x: {
            grid: {
              display: true,
              drawBorder: false,
              drawOnChartArea: false,
              drawTicks: true,
            },
            title: {
              display: true,
              text: "Temps"
            },
            labels: [],
            ticks: {
              callback: function(value, index) {

                const gap = Math.round((this.options.labels.length - 1) / 10);

                if (value % gap === 0) {

                  //If period array is lower than a year and a half
                  if (this.options.labels.length - 1 < 547) {

                    let formattedYear = this.options.labels[index].split("/")[2].split("").splice(2, 4).join("");
                    let date = this.options.labels[index].split("/").splice(0, 2).join("/");
                    return `${date}/${formattedYear}`;

                  } else {

                    const month = parseInt(this.options.labels[index].split("/")[1], 10);
                    return `${DateCustomMethods.monthsTranslation[month].substring(0, 3)} ${this.options.labels[index].split("/")[2]}`

                  }

                } else {
                  return null;
                }

              }
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Total"
            }
          }
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          }
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        }
    })

    const onNewDataType = (newDataType) => queryCriteria.chart.dataType = newDataType;
    const onStatusStatesUpdate = statusState => queryCriteria.chart.statusStates[statusState.status] = statusState.state;

    function buildChartLines({historical, historicalType = HIST_TYPES.STANDARD}) {

      historical.forEach(day => {

        const formattedDate = DateCustomMethods.switchDateFormat({date: day.date, newSeparator: "/"});

        datas[historicalType].datesLabels.push(formattedDate);

        Object.entries(day).forEach(([datatype, statusDatas]) => {

          if (datatype !== "date") {

            Object.entries(statusDatas).forEach(([status, data]) => {
          
              if (typeof datas[historicalType][datatype][status] === "undefined") {
                datas[historicalType][datatype][status] = createChartLine({status});
              }

              if (typeof queryCriteria.chart.statusStates[status] === "undefined") {
                queryCriteria.chart.statusStates[status] = true;
              }

              datas[historicalType][datatype][status].data.push(data);

            });

          }

        });

      });

    }

    function createChartLine({status, dataset = []}) {

      return {
        label: KEYS_TRANSLATIONS[status],
        id: status,
        data: dataset,
        backgroundColor: DASHBOARD_ASSETS.value.COLORS.COLORS[status.toUpperCase()],
        borderColor: DASHBOARD_ASSETS.value.COLORS.COLORS[status.toUpperCase()],
        lineTension: 0,
        pointBackgroundColor: "#FFF",
        pointRadius: 0,
        pointHitRadius: 5,
        borderWidth: 2
      }

    }

    function onCustomPeriodToggle(isCustomPeriodShown) {

      const histType = isCustomPeriodShown ? HIST_TYPES.CUSTOM : HIST_TYPES.STANDARD;

      queryCriteria.customPeriodForm.isCustomPeriodDisplayed = isCustomPeriodShown;
      chartDatas.labels = datas[histType].datesLabels;
      chartOptions.scales.x.labels = datas[histType].datesLabels;
      chartDatas.datasets = [];

      Object.entries(queryCriteria.chart.statusStates).forEach(([status, isDisplayed]) => {
        
        if (isDisplayed) {
          chartDatas.datasets.push(datas[histType][queryCriteria.chart.dataType][status]);
        }

      });

    }

    function onCustomPeriodSubmission(customDates) {

      const customPeriod = DateCustomMethods.getPeriod({
        datas: props.location.historical, 
        startDate: customDates.start, 
        endDate: customDates.end
      });

      if (customPeriod) {

        datas[HIST_TYPES.CUSTOM].datesLabels = [];
        datas[HIST_TYPES.CUSTOM][DATATYPES.DAILY] = {};
        datas[HIST_TYPES.CUSTOM][DATATYPES.CUMULATIVE] = {};

        buildChartLines({historical: customPeriod, historicalType: HIST_TYPES.CUSTOM});
        onCustomPeriodToggle(true);

        queryCriteria.customPeriodForm.dates.custom.start = customDates.start;
        queryCriteria.customPeriodForm.dates.custom.end = customDates.end;
        queryCriteria.customPeriodForm.hasCustomPeriodBeenSubmitted = true;

      }

    }

    watch(props.location, newValue => {

      buildChartLines({historical: newValue.historical})

      chartDatas.labels = datas[queryCriteria.chart.histType].datesLabels;
      chartOptions.scales.x.labels = datas[queryCriteria.chart.histType].datesLabels;

      chartDatas.datasets = [];
      Object.entries(queryCriteria.chart.statusStates).forEach(([status, isDisplayed]) => {

        if (isDisplayed) {
          chartDatas.datasets.push(datas[queryCriteria.chart.histType][queryCriteria.chart.dataType][status]);
        }

      });

      }, {immediate: true, deep: true});

    watch(() => queryCriteria.chart.dataType, newDataType => {

      chartDatas.datasets = [];
      Object.entries(queryCriteria.chart.statusStates).forEach(([status, isDisplayed]) => {

        if (isDisplayed) {
          chartDatas.datasets.push(datas[queryCriteria.chart.histType][newDataType][status]);
        }

      });

    });

    watch(() => { return { ...queryCriteria.chart.statusStates }}, (newStates, oldStates) => {

      if (Object.entries(newStates).length === Object.entries(oldStates).length) {

        Object.entries(newStates).forEach(([status, isDisplayed]) => {

          if (isDisplayed !== oldStates[status]) {

            if (isDisplayed === true) {
              chartDatas.datasets.push(datas[queryCriteria.chart.histType][queryCriteria.chart.dataType][status]);
            } else {
              chartDatas.datasets.splice(chartDatas.datasets.findIndex(line => line.id === status), 1);
            }

          }

        });

      }

    }), {deep: true};

    return {
      DASHBOARD_ASSETS,
      DATATYPES,
      queryCriteria,
      chartDatas,
      chartOptions,
      datas,
      onStatusStatesUpdate,
      onCustomPeriodSubmission,
      onNewDataType,
      onCustomPeriodToggle
    }

  },
  components: {
    Panel,
    FormToggleBtn,
    Chart,
    CustomPeriodForm,
    StatusForm,
    SelectInput
  }
};
</script>

<style lang="scss" scoped>
.formsContainer {
  position: relative;
  width: 60%;
  right: 12%;
}
.chartForm {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1.75rem 0;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
.statusForm {
  width: 35%;
}
.chartContainer {
  min-height: 400px;
  height: 25vw;
  width: 100%;
}
.periodForm {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.customPeriodForm {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1.75rem 0;
}
</style>