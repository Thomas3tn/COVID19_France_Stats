<template>
  <div class="datasPanel">
    <div class="datasPanel__headerContainer">
      <h3 class="datasPanel__header">Evolution</h3>
    </div>
    <div class="">
      <form>
        <div>
          <select v-model="chartType">
            <option value="cumulativeDatas" selected="true">Données cumulatives</option>
            <option value="dailyDatas">Données quotidiennes</option>
          </select>
          <div>
            <input
              v-model="chartCriteria"
              value="confirmed"
              type="checkbox"
              id="confirmedInput"
              checked="true"
            /><label for="confirmedInput">Cas confirmés</label>
            <input
              v-model="chartCriteria"
              value="deaths"
              type="checkbox"
              id="deathsInput"
              checked="true"
            /><label for="deathsInput">Décès</label>
            <input
              v-model="chartCriteria"
              value="recovered"
              type="checkbox"
              id="recoveredInput"
              checked="true"
            /><label for="recoveredInput">Guéris</label>
          </div>
        </div>
      </form>
      <div class="locationEvolutionGraph__graphContainer">
        <chart
        :chartId="'locationEvolutionGraph'"
        :chartData="chartDatas"
        :chartOptions="chartOptions"
        :chartType="'line'"
        ></chart>
      </div>
    </div>
  </div>
</template>

<script>
//Vue elements
import { reactive, ref, watch } from "vue";

//Vue components
import Chart from "../../APIComponents/Chart.vue";

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

    //Chart type & Chart criteria
    const chartType = ref("dailyDatas");
    const chartCriteria = ref(["confirmed", "deaths", "recovered"]);

    //Chart datas
    const datas = reactive({
      dailyDatas: {
        confirmed: {
          label: "Cas confirmés",
          dataName: "confirmed",
          data: [],
          backgroundColor: "#FF413E",
          borderColor: "#FF413E",
          lineTension: 0,
          pointBackgroundColor: "#FFF",
        },
        deaths: {
          label: "Décès",
          dataName: "deaths",
          data: [],
          backgroundColor: "#2D2D2D",
          borderColor: "#2D2D2D",
          lineTension: 0,
          pointBackgroundColor: "#FFF",
        },
        recovered: {
          label: "Guéris",
          dataName: "recovered",
          data: [],
          backgroundColor: "#64E64D",
          borderColor: "#64E64D",
          lineTension: 0,
          pointBackgroundColor: "#FFF",
        }
      },
      cumulativeDatas: {
        confirmed: {
        label: "Cas confirmés",
        dataName: "confirmed",
        data: [],
        backgroundColor: "#FF413E",
        borderColor: "#FF413E",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
        },
        deaths: {
          label: "Décès",
          dataName: "deaths",
          data: [],
          backgroundColor: "#2D2D2D",
          borderColor: "#2D2D2D",
          lineTension: 0,
          pointBackgroundColor: "#FFF",
        },
        recovered: {
          label: "Guéris",
          dataName: "recovered",
          data: [],
          backgroundColor: "#64E64D",
          borderColor: "#64E64D",
          lineTension: 0,
          pointBackgroundColor: "#FFF",
        }
      }
      
    });

    if (props.locationType === "departement") {

      datas.dailyDatas.hospitalizations = {
        label: "Hospitalisations",
        dataName: "hospitalizations",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };
      datas.dailyDatas.newHospitalizations = {
        label: "Nouvelles hospitalisations",
        dataName: "newHospitalizations",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };
      datas.dailyDatas.intensiveCare = {
        label: "Réanimations",
        dataName: "intensiveCare",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };
      datas.dailyDatas.newIntensiveCare = {
        label: "Nouvelles réanimations",
        dataName: "newIntensiveCare",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };

      datas.cumulativeDatas.intensiveCare = {
        label: "Réanimations",
        dataName: "intensiveCare",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };
      datas.cumulativeDatas.hospitalizations = {
        label: "Hospitalisations",
        dataName: "hospitalizations",
        data: [],
        backgroundColor: "#64E64D",
        borderColor: "#64E64D",
        lineTension: 0,
        pointBackgroundColor: "#FFF",
      };

    }

    //Chart Datas
    const chartDatas = reactive({
      labels: [],
      datasets: [
        datas.dailyDatas.confirmed,
        datas.dailyDatas.deaths,
        datas.dailyDatas.recovered
      ],
    });
    const chartOptions = reactive({
      scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: { display: false },
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
        legend: {
          labels: {
            boxWidth: 10,
          },
          position: "top",
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        }
    });

    watch(props.locationEvolutionDatas, (newValue) => {

      if (props.locationType === "country" || props.locationType === "global") {

        //Iterate over each of data contained inside the locationEvolutionDatas props object
        for (const [key, value] of Object.entries(newValue)) {

          if (key !== "creation_date") {

            //Access corresponding reactive object
            let currentCumulativeChartLine = datas.cumulativeDatas[key];
            let currentDailyChartLine = datas.dailyDatas[key];

            let keysArray = [];
            let valuesArray = [];

            //Create cumulative datas
            for (const [dateProp, dataValue] of Object.entries(value)) {

              //Adding date graph keys
              //We only add the 1st day of the month to not overload the graph key
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

          }

        }

      } else if (props.locationType === "departement") {

        let datesLabels = [];

        for (let i = 0; i < props.locationEvolutionDatas.length; i++) {

          //Iterate over each day datas type object
          for (const [dataTypeKey, dataTypeValue] of Object.entries(dataTypeValue)) {

            if (dataTypeKey === "date") {
              datesLabels.push(dataTypeValue);
            } else {

              let currentDataType = dataTypeKey;

              //Iterate over each property of a certain datatype of a certain date
              for (const [dataName, dataNumber] of Object.entries(dataTypeValue)) {

                if (typeof datas[currentDataType][dataName] !== "undefined") {
                  datas[currentDataType][dataName]["data"].push(dataNumber);
                }

              }

            }
          
          }

        }

        chartDatas.labels = datesLabels;

      }

    }, {immediate: true, deep: true});

    //Remove and add new data type
    watch(chartType, (newValue, oldValue) => {

      if (newValue !== oldValue) {

        chartDatas.datasets = [];

        if (newValue === "cumulativeDatas") {
          for (let i = 0; i < chartCriteria.value.length; i++) {
            chartDatas.datasets.push(datas.cumulativeDatas[chartCriteria.value[i]]);
          }
        } else if (newValue === "dailyDatas") {
          for (let i = 0; i < chartCriteria.value.length; i++) {
            chartDatas.datasets.push(datas.dailyDatas[chartCriteria.value[i]]);
          }
        } else {
          console.error("The chart value data type" + newValue + " hasn't been recognized, it has to be either: cumulativeDatas or dailyDatas");
        }

      }

    });

    //Add/remove chart line
    watch(chartCriteria, (newValue, oldValue) => {

      console.log(newValue, oldValue);

      //Add new line
      if (newValue.length > oldValue.length) {
        console.log("Add line");
        console.log(chartDatas.datasets);
        let newStatus = newValue;
        const statusOrder = ["confirmed", "deaths", "recovered"];

        for (let i = 0; i < chartDatas.datasets.length; i++) {

          for (let c = 0; c < newStatus.length; c++) {
            if (newStatus[c] === chartDatas.datasets[i].dataName) {
              newStatus.splice(c, 1);
              c = c - 1;
            }
          }

        }

        let statusIndex;
        for (let i = 0; i < statusOrder.length; i++) {
          if (statusOrder[i] === newStatus[0]) {
            statusIndex = i;
            break;
          }
        }

        chartDatas.datasets.splice(statusIndex, 0, datas[chartType.value][newStatus[0]]);
        console.log(chartDatas.datasets);

      //Remove line
      } else if (newValue.length < oldValue.length) {
        console.log("Remove Line");

        for (let i = 0; i < chartDatas.datasets.length; i++) {

          //For each chart line registered in datasets, we find if that line is still in the chartCriteria array
          //If not we delete it
          if (newValue.includes(chartDatas.datasets[i].dataName) === false) {

            const labelToRemove = chartDatas.datasets[i].dataName;
            chartDatas.datasets.splice(i, 1);

            for (let c = 0; c < chartDatas.labels.length; c++) {

              if (chartDatas.labels[c] === labelToRemove) {
                chartDatas.labels.splice(c, 1);
                break;
              }

            }

            break;

          }

        }

      }

    });

    console.log(chartDatas.datasets);

    return {
      chartCriteria,
      chartType,
      chartDatas,
      chartOptions
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
</style>