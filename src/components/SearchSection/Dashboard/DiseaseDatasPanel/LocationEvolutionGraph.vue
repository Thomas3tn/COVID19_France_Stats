<template>
  <div class="datasPanel">
    <div class="datasPanel__headerContainer">
      <h3 class="datasPanel__header">Évolution épidémique quotidienne</h3>
    </div>
    <div class="locationEvolutionDatasPanel__contentContainer">
      <form class="locationEvolutionChartForm">
        <select v-model="chartType" class="locationEvolutionChartForm__selectInput">
          <option value="cumulativeDatas" selected="true">Données cumulatives</option>
          <option value="dailyDatas">Données quotidiennes</option>
        </select>
        <div class="locationEvolutionChartForm__checkboxesContainer">
          <template v-for="item in statusCheckboxesList[chartType]" :key="item.idName">
            <input v-model="chartCriteria[item.idName]" :value="item.idName" type="checkbox" :id="item.idName + 'Input'" class="locationEvolutionChartForm__checkboxInput" checked="true"/>
            <label :for="item.idName + 'Input'" :id="item.idName + 'Label'" class="selectableStatus" :title="item.dashboardName"><font-awesome-icon :icon="item.logo"/></label>
          </template>
        </div>
      </form>
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
import { reactive, ref, watch, inject, onMounted } from "vue";

//Vue components
import Chart from "./SharedComponents/Chart.vue";

//JS Script
import DatasCalculator from "../../../../assets/JSClasses/DatasCalculator.js";

import { faCross, faMale, faWalking, faHospitalUser, faHospital, faAmbulance, faProcedures } from "@fortawesome/free-solid-svg-icons";

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

    console.log(props.locationEvolutionDatas, props.locationType);

    let datasCalculator = new DatasCalculator();
    const chartStatusKey = inject("chartStatusKey", {});

    //Chart type & Chart criteria
    const chartType = ref("dailyDatas");
    let chartCriteria = reactive({});
    const graphType = "line";

    //Stored datas
    const datas = reactive({
      dailyDatas: {},
      cumulativeDatas: {}
    });

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
              // stacked: true
            },
          ],
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
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

    watch(props.locationEvolutionDatas, (newValue) => {

      let chartLine = {
        label: "",
        dataName: "",
        data: [],
        backgroundColor: "",
        borderColor: "",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
        pointRadius: 0,
        pointHitRadius: 5
      }

      //Fill labels and datas object
      if (props.locationType === "country" || props.locationType === "global") {

        //Iterate over each of data contained inside the locationEvolutionDatas props object
        for (const [key, value] of Object.entries(newValue)) {

          if (key !== "creation_date") {

            //Dynamically create chartCriteria object keys
            chartCriteria[key] = true;

            statusCheckboxesList[key] = {};
            statusCheckboxesList[key]["idName"] = key;
            statusCheckboxesList[key]["dashboardName"] = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key);

            switch (key) {
              case "confirmed":
                statusCheckboxesList[key]["logo"] = faMale;
                break;

              case "deaths":
                  statusCheckboxesList[key]["logo"] = faCross;
                  break;

              case "recovered":
                  statusCheckboxesList[key]["logo"] = faWalking;
                  break;
            
              default:
                statusCheckboxesList[key]["logo"] = "";
                break;
            }

            //Access corresponding reactive object
            let currentCumulativeChartLine = _.cloneDeep(chartLine);
            let currentDailyChartLine = _.cloneDeep(chartLine);

            currentCumulativeChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key);
            currentDailyChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(key);
            currentCumulativeChartLine.dataName = key;
            currentDailyChartLine.dataName = key;
            currentDailyChartLine.backgroundColor = chartStatusKey.statusColor[key];
            currentCumulativeChartLine.backgroundColor = chartStatusKey.statusColor[key];
            currentCumulativeChartLine.borderColor = chartStatusKey.statusColor[key];
            currentDailyChartLine.borderColor = chartStatusKey.statusColor[key];

            console.log(currentCumulativeChartLine, currentDailyChartLine);

            let keysArray = [];
            let valuesArray = [];

            //Create cumulative datas
            for (const [dateProp, dataValue] of Object.entries(value)) {

              //Add chart date labels (only first day of each month)
              if (key === "confirmed") {

                if (dateProp.split("-")[2] === "01") {
                  chartDatas.labels.push(dateProp.split("-")[1] + "/" + dateProp.split("-")[0]);
                } else {
                  chartDatas.labels.push("");
                }

              }
              
              //Push cumulative data
              currentCumulativeChartLine.data.push(dataValue);

              //Collect keys/values into arrays to iterate over them from the end to the beginning to get daily datas
              keysArray.push(dateProp);
              valuesArray.push(dataValue);

            }

            //Reversing datas arrays to be in chronological order
            currentCumulativeChartLine.data = currentCumulativeChartLine.data.reverse();
            chartDatas.labels = chartDatas.labels.reverse();
            valuesArray = valuesArray.reverse();

            if (keysArray.length !== valuesArray.length) {
              console.error("The keysArray length and the valuesArray length are different");
            }

            //Compute and push daily datas
            for (let i = 0; i < valuesArray.length; i++) {

              let dailyData;

              if (i === 0) {
                dailyData = valuesArray[i];
              } else {
                dailyData = valuesArray[i] - valuesArray[i - 1];
              }

              currentDailyChartLine.data.push(dailyData);

            }

            datas.dailyDatas[key] = currentDailyChartLine;
            datas.cumulativeDatas[key] = currentCumulativeChartLine;

          }

        }

      } else if (props.locationType === "departement") {

        //Loop over dates array, cumulativeDatas and dailyDatas
        //Set dates labels
        for (const [key, value] of Object.entries(newValue.datas)) {

          if (key === "dates") {

            for (let i = 0; i < value.length; i++) {

              if (value[i].split("-")[2] === "01") {
                  chartDatas.labels.push(value[i].split("-")[1] + "/" + value[i].split("-")[0]);
                } else {
                  chartDatas.labels.push("");
                }

            }

          } else if (key === "dailyDatas" || key === "cumulativeDatas") {

            //Loop inside cumulativeDatas/dailyDatas object
            for (const [statusKey, statusValue] of Object.entries(value)) {

              statusCheckboxesList[key][statusKey] = {};
              statusCheckboxesList[key][statusKey]["idName"] = statusKey;
              statusCheckboxesList[key][statusKey]["dashboardName"] = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusKey);

              switch (statusKey) {
                case "hospitalizations":
                  statusCheckboxesList[key][statusKey]["logo"] = faHospital;
                  break;

                case "deaths":
                  statusCheckboxesList[key][statusKey]["logo"] = faCross;
                  break;

                case "recovered":
                  statusCheckboxesList[key][statusKey]["logo"] = faWalking;
                  break;

                case "intensive_care":
                  statusCheckboxesList[key][statusKey]["logo"] = faProcedures;
                  break;

                case "new_hospitalizations":
                  statusCheckboxesList[key][statusKey]["logo"] = faHospitalUser;
                  break;

                case "new_intensive_care":
                  statusCheckboxesList[key][statusKey]["logo"] = faAmbulance;
                  break;
              
                default:
                  statusCheckboxesList[key][statusKey]["logo"] = "";
                  break;
              }

              console.log(statusCheckboxesList);

              let currentChartLine = _.cloneDeep(chartLine);
              currentChartLine.label = datasCalculator.translationFunctionalities.getTranslatedKeyFromEng(statusKey);
              currentChartLine.dataName = statusKey;
              currentChartLine.backgroundColor = chartStatusKey.statusColor[statusKey];
              currentChartLine.borderColor = chartStatusKey.statusColor[statusKey];
              currentChartLine.data = statusValue;

              datas[key][statusKey] = currentChartLine;

            }

          }

        }

      }

      //Dynamically fill the chartCriteria object
      for (const keyValue of Object.entries(statusCheckboxesList[chartType.value])) {
        chartCriteria[keyValue[0]] = true;
      }

      //Dynamically fill the chartDatas.datasets array
      for (const keyValue of Object.entries(chartCriteria)) {
        chartDatas.datasets.push(datas[chartType.value][keyValue[0]]);
      }

    }, {immediate: true, deep: true});

    //Remove and add new data type
    watch(() => chartType.value, (newValue, oldValue) => {

      console.log(oldValue, newValue)

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

    });

    //Add/remove chart line
    watch(() => { return { ...chartCriteria }}, (newValue, oldValue) => {

      console.log(newValue, oldValue);

      if (Object.entries(newValue).length === Object.entries(oldValue).length) {

        for (const [key, value] of Object.entries(newValue)) {

        if (value !== oldValue[key]) {

          //Add chart line
          if (value === true) {

            chartDatas.datasets.push(datas[chartType.value][key]);
            chartDatas.labels.push(key);

            let newActiveLabel = document.getElementById(key + "Label");
            if (newActiveLabel.className.split(" ").includes("selectableStatus--inactive")) {

              let newActiveLabelClasses = newActiveLabel.className.split(" ");

              for (let i = 0; i < newActiveLabelClasses.length; i++) {

                  if (newActiveLabelClasses[i] === "selectableStatus--inactive") {
                    newActiveLabelClasses.splice(i, 1);
                    break;
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
            document.getElementById(key + "Label").className = "selectableStatus selectableStatus--inactive";

          }

        }

      }

      }

      

    }), {deep: true};

    onMounted(() => {
      console.log(statusCheckboxesList);
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
      graphType
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
    height: 400px;
  }
}

.locationEvolutionChartForm {
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
  &__checkboxesContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    @media (min-width: 768px) {
      width: 17%;
    }
    @media (min-width: 1024px) {
      width: 12%;
    }
    label {
      margin-right: 0.8rem;
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
</style>