<template>
  <div>
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
            id="confirmedCasesInput"
            checked="true"
          /><label for="confirmedCasesInput">Cas confirmés</label>
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
    <chart
      :chartId="'locationEvolutionGraph'"
      :chartData="chartDatas.data"
      :chartOptions="chartDatas.options"
      :chartType="'line'"
    ></chart>
  </div>
</template>

<script>
//Vue elements
import { reactive, ref, watch } from "vue";

//Vue components
import Chart from "../../APIComponents/Chart.vue";

export default {
  props: {
    locationEvolutionDatas: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    //Chart type & Chart criteria
    const chartType = ref("cumulativeDatas");
    const chartCriteria = ref(["confirmed", "deaths", "recovered"]);

    //Chart Datas
    const chartDatas = {
      data: {
        labels: [],
        datasets: [
          //Reactive objects will be push here...
        ],
      },
      options: {
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
      }
    }

    //Daily datas
    const dailyDatas = reactive({
      confirmed: {
        label: "Cas confirmés",
        dataName: "confirmed",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      },
      deaths: {
        label: "Décès",
        dataName: "deaths",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      },
      recovered: {
        label: "Guéris",
        dataName: "recovered",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      }
    });

    const cumulativeDatas = reactive({
      confirmed: {
        label: "Cas confirmés",
        dataName: "confirmed",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      },
      deaths: {
        label: "Décès",
        dataName: "deaths",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      },
      recovered: {
        label: "Guéris",
        dataName: "recovered",
        data: [],
        backgroundColor: "rgba(224, 248, 255, 0.4)",
        borderColor: "#5cddff",
        lineTension: 0,
        pointBackgroundColor: "#5cddff",
      }
    });

    watch(props.locationEvolutionDatas, (newValue) => {

      console.log("Props LocationEvolutionDatas called");
      console.log(newValue);

      if (typeof newValue === "object") {

        console.log("Props is an object");

        //Iterate over each of data contained inside the locationEvolutionDatas props object
        for (const [key, value] of Object.entries(newValue)) {

          //Access corresponding reactive object
          let currentCumulativeChartLine = cumulativeDatas[key];
          let currentDailyChartLine = dailyDatas[key];

          let keysArray = [];
          let valuesArray = [];

          //Create cumulative datas
          for (const [dateProp, dataValue] of Object.entries(value)) {

            //Adding date graph keys
            //We only add the 1st day of the month to not overload the graph key
            if (key === "confirmed") {

              if (dateProp.split("-")[2] === "01") {
              chartDatas.data.labels.push(dateProp.split("-")[1] + "/" + dateProp.split("-")[0]);
              } else {
                chartDatas.data.labels.push("");
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
          chartDatas.data.labels = chartDatas.data.labels.reverse();
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

    }, {immediate: true, deep: true});

    //Remove and add new data type
    watch(chartType, (newValue, oldValue) => {

      if (newValue !== oldValue) {

        chartDatas.data.datasets = [];

        if (newValue === "cumulativeDatas") {
          for (let i = 0; i < chartCriteria.value.length; i++) {
            chartDatas.data.datasets.push(cumulativeDatas[chartCriteria.value[i]]);
          }
        } else if (newValue === "dailyDatas") {
          for (let i = 0; i < chartCriteria.value.length; i++) {
            chartDatas.data.datasets.push(dailyDatas[chartCriteria.value[i]]);
          }
        } else {
          console.error("The chart value data type" + newValue + " hasn't been recognized, it has to be either: cumulativeDatas or dailyDatas");
        }

      }

    });

    watch(chartCriteria, (newValue) => {
      //Add/remove chart line
      for (let i = 0; i < chartDatas.data.datasets.length; i++) {

        //For each chart line registered in datasets, we find if that line is still in the chartCriteria array
        //If not we delete it
        if (!newValue.includes(chartDatas.data.datasets[i].dataName)) {

          chartDatas.data.datasets.splice(i, 0);
          break;

        }

      }

    });

    return {
      chartCriteria,
      chartType,
      chartDatas,
      dailyDatas,
      cumulativeDatas
    }

  },
  components: {
    Chart,
  }
};
</script>