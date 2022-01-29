<template>
  <div class="datasPanel">
    <header class="datasPanel__headerContainer locationEvolutionDatasPanel__headerContainer">
      <h3 class="datasPanel__header">Évolution épidémique quotidienne</h3>
      <button class="datasPanel__toggleFormBtn" title="Ajouter période personnalisée" id="locationEvolutionDatasPanelCustomPeriodFormToggleBtn" @click="isCustomPeriodFormDisplayed = !isCustomPeriodFormDisplayed"><font-awesome-icon :icon="dashboardIcons.form.add_custom_period" aria-hidden="true" class="datasPanelForm__logoLabel"/><span class="screenreaderText">Ajouter période personnalisée</span></button>
    </header>
    <div class="locationEvolutionDatasPanel__contentContainer">
      <div class="locationEvolutionDatasPanel__formsContainer">
        <form class="locationEvolutionDatasForm" id="ledpDatasForm">
          <div class="locationEvolutionDatasForm__datastypeContainer">
            <label for="locationEvolutionGraphDatasTypeInput"><font-awesome-icon :icon="dashboardIcons.form.datatype" aria-hidden="true" class="datasPanelForm__logoLabel"/><span class="screenreaderText">Type de données</span></label>
            <select v-model="chartType" class="datasPanelForm__input datasPanelForm__inputPart" id="locationEvolutionGraphDatasTypeInput" title="Sélectionner un type de données">
              <option value="cumulativeDatas" selected="true">Données cumulatives</option>
              <option value="dailyDatas">Données quotidiennes</option>
            </select>
          </div>
          <div class="locationEvolutionDatasForm__checkboxesContainer">
            <template v-for="item in statusCheckboxesList[chartType]" :key="item.idName">
              <input v-model="chartCriteria[item.idName]" :value="item.idName" type="checkbox" :id="item.idName + '_Input'" class="locationEvolutionDatasForm__checkboxInput" checked="true"/>
              <label v-if="item.idName === 'new_hospitalizations' || item.idName === 'new_intensive_care'" :for="item.idName + '_Input'" :id="item.idName + 'Label'" class="selectableStatus selectableStatus--horizontalDisplay selectableStatus--dashedBorder" :title="item.dashboardName" tabindex="0" @keyup="onKeyboardInput" role="button" aria-pressed="true"><font-awesome-icon :icon="item.logo" aria-hidden="true"/><span class="screenreaderText">{{ item.dashboardName }}</span></label>
              <label v-else :for="item.idName + '_Input'" :id="item.idName + 'Label'" class="selectableStatus selectableStatus--horizontalDisplay" :title="item.dashboardName" tabindex="0" @keyup="onKeyboardInput" role="button" aria-pressed="true"><font-awesome-icon :icon="item.logo" aria-hidden="true"/><span class="screenreaderText">{{ item.dashboardName }}</span></label>
            </template>
          </div>
        </form>
        <form @submit.prevent="onCustomDatesSubmission" id="ledpCustomPeriodForm" class="ledCustomPeriodForm ledCustomPeriodForm--hidden">
          <div class="datasPanelForm__inputContainer">
            <font-awesome-icon :icon="dashboardIcons.form.start_date" aria-hidden="true" class="datasPanelForm__logoLabel"/>
            <div class="datasPanelForm__inputPart">
              <label for="wdpStartDate" class="datasPanelForm__label">Date de début <abbr :title="'Si non renseignée, cette date est fixée au ' + customPeriodDatesLimit.startDate">?</abbr></label>
              <input type="date" placeholder="Ex: 12/03/2020" class="datasPanelForm__input" v-model="customPeriodDates.startDate" :min="customPeriodDatesLimit.startDate" :max="customPeriodDatesLimit.endDate"/>
            </div>
          </div>
          <div class="datasPanelForm__inputContainer">
            <font-awesome-icon :icon="dashboardIcons.form.end_date" aria-hidden="true" class="datasPanelForm__logoLabel"/>
            <div class="datasPanelForm__inputPart">
              <label for="wdpEndDate" class="datasPanelForm__label">Date de fin <abbr :title="'Si non renseignée, cette date est fixée au ' + customPeriodDatesLimit.endDate">?</abbr></label>
              <input type="date" placeholder="Ex: 24/05/2021" class="datasPanelForm__input" v-model="customPeriodDates.endDate" :min="customPeriodDatesLimit.startDate" :max="customPeriodDatesLimit.endDate"/>
            </div>
          </div>
          <button type="submit" class="selectableStatus"><font-awesome-icon :icon="dashboardIcons.form.search" aria-hidden="true" class="datasPanelForm__logoLabel"/><span class="screenreaderText">Valider la période personnalisée</span></button>
        </form>
      </div>
      <div class="locationEvolutionGraph__graphContainer">
        <chart
        :chartId="'locationEvolutionGraph'"
        :chartData="chartDatas"
        :chartOptions="chartOptions"
        :chartType="graphType"
        ></chart>
      </div>
    </div>
  </div>
</template>

<script>
//Vue elements
import { reactive, ref, watch, inject, onMounted, onUpdated } from "vue";

//Vue components
import Chart from "./SharedComponents/Chart.vue";

//JS Script
import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator.js";

//Lodash (deep object cloning)
import _ from "lodash";

export default {
  props: {
    locationType: {
      type: String,
      required: true,
      default: "country"
    },
    locationEvolutionDatas: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    let datasCalculator = new DatasCalculator();
    const chartStatusKey = inject("chartStatusKey", {});
    const dashboardIcons = inject("dashboardIcons", {});

    //Chart type & Chart criteria
    const chartType = ref("dailyDatas");
    let chartCriteria = reactive({});
    const graphType = "line";

    //Stored datas
    const datas = reactive({
      dailyDatas: {},
      cumulativeDatas: {}
    });

    const isCustomPeriodFormDisplayed = ref(false);

    const customPeriodDates = reactive({
      startDate: "",
      endDate: ""
    });

    let chartLineTemplate = {
      label: "",
      dataName: "",
      data: [],
      backgroundColor: "",
      borderColor: "",
      lineTension: 0,
      pointBackgroundColor: "#FFF",
      pointRadius: 0,
      pointHitRadius: 5,
      borderWidth: 2
    }

    //Chart Datas
    const chartDatas = reactive({
      labels: [],
      datasets: [],
    });

    const chartOptions = reactive({
      scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false
              }
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 1,
                callback: function (value, index, values) {
                  if (value % Math.round(values[0] / 6) == 0) {
                    return value;
                  } else if (value === 0) {
                    return value;
                  }
                },
              },
              stacked: true
            },
          ],
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              font: {
                size: 5
              }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        }
    });

    let statusCheckboxesList = reactive({
      dailyDatas: {},
      cumulativeDatas: {}
    });

    function onKeyboardInput(event) {

      if (event.key === "Enter") {
        chartCriteria[event.target.htmlFor.split("_")[0]] = !chartCriteria[event.target.htmlFor.split("_")[0]];
      }

    }

    const customPeriodDatesLimit = reactive({
      startDate: "",
      endDate: ""
    });

    function createChartLine(statusName, dataset, chartStatusKey, chartLineTemplate, customPeriodDates) {

      let currentCumulativeChartLine = _.cloneDeep(chartLineTemplate);
      let currentDailyChartLine = _.cloneDeep(chartLineTemplate);

      currentCumulativeChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusName);
      currentDailyChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusName);
      currentCumulativeChartLine.dataName = statusName;
      currentDailyChartLine.dataName = statusName;
      currentDailyChartLine.backgroundColor = chartStatusKey.statusColor[statusName];
      currentCumulativeChartLine.backgroundColor = chartStatusKey.statusColor[statusName];
      currentCumulativeChartLine.borderColor = chartStatusKey.statusColor[statusName];
      currentDailyChartLine.borderColor = chartStatusKey.statusColor[statusName];

      //We substract one day to the start date to get necessary data in order to calculate the first daily data
      let customStartDate = new Date(customPeriodDates.customStartDate);
      customStartDate = customStartDate.setDate(customStartDate.getDate() - 1);

      //Fill the cumulative datas array (datas are cumulative by nature)
      for (const keyValue of Object.entries(dataset)) {

        const currentDate = new Date(keyValue[0].split("-")[0], keyValue[0].split("-")[1] - 1, keyValue[0].split("-")[2]).getTime();

        if (currentDate >= customStartDate && currentDate <= customPeriodDates.customEndDate) {
          currentCumulativeChartLine.data.push(keyValue[1]);
        }

      }

      //Reverse datas arrays to be in chronological order
      currentCumulativeChartLine.data = currentCumulativeChartLine.data.reverse();

      //Compute and push daily datas from cumulative datas by substraction
      for (let i = 0; i < currentCumulativeChartLine.data.length; i++) {

        //The first data will only be used to get the first daily data
        if (i !== 0) {
          currentCumulativeChartLine.data[i] - currentCumulativeChartLine.data[i - 1] < 0 ? currentDailyChartLine.data.push(0) : currentDailyChartLine.data.push(currentCumulativeChartLine.data[i] - currentCumulativeChartLine.data[i - 1]);
        }

      }

      currentCumulativeChartLine.data.unshift();

      return {cumulativeChartLine: currentCumulativeChartLine, dailyChartLine: currentDailyChartLine};

    }

    function createDepartementChartLine(statusName, dataset, chartStatusKey, chartLineTemplate, datesList, customPeriodDates) {

      let currentChartLine = _.cloneDeep(chartLineTemplate);
      currentChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusName);
      currentChartLine.dataName = statusName;
      currentChartLine.backgroundColor = chartStatusKey.statusColor[statusName];
      currentChartLine.borderColor = chartStatusKey.statusColor[statusName];

      if (statusName === "new_hospitalizations" || statusName === "new_intensive_care") {
        currentChartLine.borderDash = [15, 5];
      }
      
      for (let i = 0; i < dataset.length; i++) {

        const currentDate = new Date(datesList[i].split("-")[0], datesList[i].split("-")[1] - 1, datesList[i].split("-")[2]).getTime();

        if (currentDate >= customPeriodDates.customStartDate && currentDate <= customPeriodDates.customEndDate) {
          currentChartLine.data.push(dataset[i]);
        }

      }

      return currentChartLine;

    }

    function getDatas(locationType, datasets, customPeriodDates) {

      let customStartDate, customEndDate;
      customPeriodDates.startDate !== "" ? customStartDate = new Date(customPeriodDates.startDate.split("-")[0], customPeriodDates.startDate.split("-")[1] - 1, customPeriodDates.startDate.split("-")[2]).getTime() : customStartDate = 0;
      customPeriodDates.endDate !== "" ? customEndDate = new Date(customPeriodDates.endDate.split("-")[0], customPeriodDates.endDate.split("-")[1] - 1, customPeriodDates.endDate.split("-")[2]).getTime() : customEndDate = Date.now();

      if (locationType === "country" || locationType === "global") {

        //Allows us to push only once date labels from the first status
        let hasLabelsBeenComputed = false;

        for (const [key, value] of Object.entries(datasets)) {

          if (key !== "creation_date") {

            //Push datas dates labels if object hasn't been filled yet
            if (hasLabelsBeenComputed === false) {

              let [earliestDate, latestDate] = [0, 0];

              for (const keyValue of Object.entries(value)) {

                const currentDate = new Date(keyValue[0].split("-")[0], keyValue[0].split("-")[1] - 1, keyValue[0].split("-")[2]).getTime();

                if (currentDate >= customStartDate && currentDate <= customEndDate) {
                  chartDatas.labels.unshift(keyValue[0].split("-")[1] + "/" + keyValue[0].split("-")[0]);
                }
                earliestDate = keyValue[0];
                if (currentDate > new Date(latestDate).getTime()) {
                  latestDate = keyValue[0];
                }

              }

              if (customPeriodDates.startDate === "") {
                customPeriodDates.startDate = earliestDate;
              }
              if (customPeriodDatesLimit.startDate === "") {
                customPeriodDatesLimit.startDate = earliestDate;
              }
              if (customPeriodDates.endDate === "") {
                customPeriodDates.endDate = latestDate;
              }
              if (customPeriodDatesLimit.endDate === "") {
                customPeriodDatesLimit.endDate = latestDate;
              }

              hasLabelsBeenComputed = true;

            }

            let currentChartLines = createChartLine(key, value, chartStatusKey, chartLineTemplate, {customStartDate, customEndDate});

            datas.dailyDatas[key] = currentChartLines.dailyChartLine;
            datas.cumulativeDatas[key] = currentChartLines.cumulativeChartLine;

          }

        }

      } else {

        for (const [key, value] of Object.entries(datasets)) {

          if (key === "dates") {

            for (let i = 0; i < value.length; i++) {

              const currentDate = new Date(value[i].split("-")[0], value[i].split("-")[1] - 1, value[i].split("-")[2]).getTime();

              if (i === 0) {
                customPeriodDates.startDate = value[i];
                customPeriodDatesLimit.startDate = value[i];
              }

              if (currentDate >= customStartDate && currentDate <= customEndDate) {
                chartDatas.labels.push(value[i].split("-")[1] + "/" + value[i].split("-")[0]);
              }

              if (i === value.length - 1) {
                customPeriodDates.endDate = value[i];
                customPeriodDatesLimit.endDate = value[i];
              }

            }

          } else {

            for (const [statusKey, statusValue] of Object.entries(value)) {
              let currentLine = createDepartementChartLine(statusKey, statusValue, chartStatusKey, chartLineTemplate, datasets.dates, {customStartDate, customEndDate});
              datas[key][statusKey] = currentLine;
            }

          }

        }

      }

    }

    function onCustomDatesSubmission() {

      //Check if submitted dates are valid
      chartDatas.labels = [];
      chartDatas.datasets = [];
      props.locationType === "departement" ? getDatas(props.locationType, props.locationEvolutionDatas.datas, customPeriodDates) : getDatas(props.locationType, props.locationEvolutionDatas, customPeriodDates);

      //Dynamically fill the chartDatas.datasets array
      for (const keyValue of Object.entries(chartCriteria)) {

        if (keyValue[1] === true) {
          chartDatas.datasets.push(datas[chartType.value][keyValue[0]]);
        }

      }

    }

    watch(props.locationEvolutionDatas, (newValue) => {

      //Fill labels and datas object
      if (props.locationType === "country" || props.locationType === "global") {

        //Iterate over each of data contained inside the locationEvolutionDatas props object
        for (const keyValue of Object.entries(newValue)) {

          if (keyValue[0] !== "creation_date") {

            //Dynamically retrieve status infos
            let statusInfos = {};

            statusInfos.idName = keyValue[0];
            statusInfos.dashboardName = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(keyValue[0]);
            statusInfos.logo = dashboardIcons.status[keyValue[0]];

            for (let statusCheckboxesListKeyValue of Object.entries(statusCheckboxesList)) {
              statusCheckboxesListKeyValue[1][keyValue[0]] = statusInfos;
            }

          }

        }

      } else if (props.locationType === "departement") {

        //Loop over dates array, cumulativeDatas and dailyDatas
        //Set dates labels
        for (const [key, value] of Object.entries(newValue.datas)) {

          if (key === "dailyDatas" || key === "cumulativeDatas") {

            //Loop inside cumulativeDatas/dailyDatas object
            for (const statusKeyValue of Object.entries(value)) {

              statusCheckboxesList[key][statusKeyValue[0]] = {};
              statusCheckboxesList[key][statusKeyValue[0]]["idName"] = statusKeyValue[0];
              statusCheckboxesList[key][statusKeyValue[0]]["dashboardName"] = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusKeyValue[0]);
              statusCheckboxesList[key][statusKeyValue[0]]["logo"] = dashboardIcons.status[statusKeyValue[0]];

            }

          }

        }

      }

      //Dynamically fill the chartCriteria object
      for (const keyValue of Object.entries(statusCheckboxesList[chartType.value])) {
        chartCriteria[keyValue[0]] = true;
      }

      props.locationType === "departement" ? getDatas(props.locationType, props.locationEvolutionDatas.datas, customPeriodDates) : getDatas(props.locationType, props.locationEvolutionDatas, customPeriodDates);

      //Dynamically fill the chartDatas.datasets array
      for (const keyValue of Object.entries(chartCriteria)) {
        chartDatas.datasets.push(datas[chartType.value][keyValue[0]]);
      }

    }, {immediate: true, deep: true});

    //Remove and add new data type
    watch(() => chartType.value, newValue => {

      let undisplayedStatus = [];
      for (const [key, value] of Object.entries(chartCriteria)) {

        if (value === false) {
          undisplayedStatus.push(key);
        }

      }

      //Update chart Datas (dataset)
      for (const keyValue of Object.entries(statusCheckboxesList.dailyDatas)) {

        if (newValue === "dailyDatas" && typeof chartCriteria[keyValue[0]] === "undefined") {
          chartCriteria[keyValue[0]] = true;
        } else if (newValue === "cumulativeDatas" && typeof statusCheckboxesList.cumulativeDatas[keyValue[0]] === "undefined") {
          delete chartCriteria[keyValue[0]];
        }

      }
      
      let newDatasets = [];
      for (const keyValue of Object.entries(datas[newValue])) {
        newDatasets.push(keyValue[1]);
      }
      chartDatas.datasets = newDatasets;

      //Remove status that were not displayed previously
      for (let i = 0; i < undisplayedStatus.length; i++) {

        for (let c = 0; c < chartDatas.datasets.length; c++) {

          if (chartDatas.datasets[c].dataName === undisplayedStatus[i]) {
            chartDatas.datasets.splice(c, 1);
            break;
          }

        }

      }

    });

    onUpdated(() => {
      
      //When displayedDatasType is changed and labels re-rendered we check for each label we need to add the active class
      for (const keyValue of Object.entries(chartCriteria)) {

        if (keyValue[1] === true) {
          document.getElementById(keyValue[0] + "Label").className += " selectableStatus--" + keyValue[0] + "Active";
        }

      }

    })

    //Add/remove chart line
    watch(() => { return { ...chartCriteria }}, (newValue, oldValue) => {

      if (Object.entries(newValue).length === Object.entries(oldValue).length) {

        for (const [key, value] of Object.entries(newValue)) {

        if (value !== oldValue[key]) {

          //Add chart line
          if (value === true) {

            chartDatas.datasets.push(datas[chartType.value][key]);

            let newActiveLabel = document.getElementById(key + "Label");
            newActiveLabel.setAttribute("aria-pressed", "true");

            if (newActiveLabel.className.split(" ").includes("selectableStatus--inactive") || newActiveLabel.className.match(/InactiveHover/)) {

              let newActiveLabelClasses = newActiveLabel.className.split(" ");

              for (let i = 0; i < newActiveLabelClasses.length; i++) {

                  if (newActiveLabelClasses[i] === "selectableStatus--inactive" || newActiveLabelClasses[i].match(/InactiveHover/)) {
                    newActiveLabelClasses.splice(i, 1);
                    i--;
                  }

              }

              newActiveLabel.className = newActiveLabelClasses.join(" ");

            }
            document.getElementById(key + "Label").className += " selectableStatus--" + key + "Active";

          //Remove chart line
          } else if (value === false) {

            for (let i = 0; i < chartDatas.datasets.length; i++) {

              if (chartDatas.datasets[i].dataName === key) {

                chartDatas.datasets.splice(i, 1);
                break;

              }

            }

            for (let i = 0; i < chartDatas.labels.length; i++) {

              if (chartDatas.labels[i] === key) {
                chartDatas.labels.splice(i, 1);
              }

            }

            //Delete selected className
            document.getElementById(key + "Label").className = "selectableStatus selectableStatus--horizontalDisplay selectableStatus--inactive selectableStatus--" + document.getElementById(key + "Label").id.match(/^[a-z]*/)[0] + "InactiveHover";
            document.getElementById(key + "Label").setAttribute("aria-pressed", "false");

          }

        }

      }

      }

      

    }), {deep: true};

    watch(() => isCustomPeriodFormDisplayed.value, newValue => {

      newValue === true ? document.getElementById("ledpCustomPeriodForm").className = "ledCustomPeriodForm" : document.getElementById("ledpCustomPeriodForm").className += " ledCustomPeriodForm--hidden";
      newValue === true ? document.getElementById("ledpDatasForm").className += " locationEvolutionDatasForm--hidden" : document.getElementById("ledpDatasForm").className = "locationEvolutionDatasForm";

    });
    
    onMounted(() => {

      for (const keyValue of Object.entries(chartCriteria)) {
        document.getElementById(keyValue[0] + "Label").className += " selectableStatus--" + keyValue[0] + "Active";
      }

    });

    return {
      chartCriteria,
      chartType,
      chartDatas,
      chartOptions,
      datas,
      statusCheckboxesList,
      graphType,
      customPeriodDates,
      onCustomDatesSubmission,
      onKeyboardInput,
      customPeriodDatesLimit,
      isCustomPeriodFormDisplayed,
      dashboardIcons
    }

  },
  components: {
    Chart,
  }
};
</script>

<style lang="scss">
.locationEvolutionGraph {
  &__graphContainer {
    min-height: 400px;
    height: 25vw;
  }
}

.locationEvolutionDatasPanel {
  &__headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
  &__formsContainer {
    position: relative;
  }
}

.locationEvolutionDatasForm {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0;
  @media (min-width: 768px) {
    position: relative;
    left: 6%;
    flex-direction: row;
  }
  &--hidden {
    display: none;
  }
  &__datastypeContainer {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      margin-bottom: 0;
      margin-right: 2vw;
    }
  }
  &__checkboxesContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    @media (min-width: 768px) {
      width: 17%;
    }
    @media (min-width: 1024px) {
      width: 12%;
    }
  }
  &__selectInput {
    margin-bottom: 1.5rem;
    padding: 0.2rem 0.5rem;
    @media (min-width: 768px) {
      margin-bottom: 0;
      margin-right: 1.5rem;
    }
  }
  &__checkboxInput {
    display: none;
  }
}

.ledCustomPeriodForm {
  position: relative;
  top: 0%;
  left: 6%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.3rem 0;
  &--hidden {
    display: none;
  }
}
</style>