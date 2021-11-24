<script>
import { Bar } from "vue-chartjs";
export default {
  extends: Bar,
  props: {
    subLen: Number,
    busLen: Number,
    bikeLen: Number,
  }, //[지하철길이, 버스길이, 따릉이길이]

  data() {
    return {
      options: {
        plugins: {
          legend: false, // Hide legend
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      },
      chartData: {
        labels: ["지하철", "버스", "따릉이"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [this.subway, this.bus, this.bike],
          },
        ],
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  computed: {
    subway: function() {
      return this.subLen;
    },
    bus: function() {
      return this.busLen;
    },
    bike: function() {
      return this.bikeLen;
    },
  },
  watch: {
    subLen: function() {
      this.chartData.datasets[0].data[0] = this.subLen;
      this.renderChart(this.chartData, this.options);
    },
    busLen: function() {
      this.chartData.datasets[0].data[1] = this.busLen;
      this.renderChart(this.chartData, this.options);
    },
    bikeLen: function() {
      this.chartData.datasets[0].data[2] = this.bikeLen;
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>

<style></style>
