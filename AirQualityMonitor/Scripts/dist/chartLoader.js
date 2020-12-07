import * as Chart from "chart.js";
export class ChartLoader {
    constructor(chartData, $container) {
        this.chartData = chartData;
        this.$container = $container;
        this.charts = [];
        this.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };
    }
    renderCharts() {
        this.$container.empty();
        this.chartData.forEach(data => {
            const newChart = this.renderChart(data);
            this.charts.push(newChart);
        });
    }
    renderChart(chartData) {
        const $chartCanvas = this.$getChartCanvas();
        // Append chart to container
        this.$container.append($chartCanvas);
        const chartOptions = this.getChartConfiguration(chartData);
        const chartContext = $chartCanvas.get(0).getContext("2d");
        const chart = new Chart(chartContext, chartOptions);
        return chart;
    }
    getChartConfiguration(chartData) {
        return {
            type: 'line',
            data: {
                labels: chartData.Labels,
                datasets: this.buildDataSets(chartData.DataSets)
            },
            options: this.getChartOptions(chartData)
        };
    }
    $getChartCanvas() {
        return $(`<canvas id="chart-${ChartLoader.chartSeed++}" class="col-4" width="400" height="400">`);
    }
    getChartOptions(chartData) {
        const chartOptions = {
            scales: {
                xAxes: [this.getAxis(chartData.XAxis)],
                yAxes: [this.getAxis(chartData.YAxis)]
            }
        };
        return chartOptions;
    }
    getAxis(axis) {
        return {
            display: true,
            scaleLabel: {
                display: true,
                labelString: axis.Label
            }
        };
    }
    buildDataSets(dataSets) {
        const newDataSetList = [];
        dataSets.forEach(item => {
            const colour = this.getNewColourString(newDataSetList.length);
            const newDataSetObj = {
                label: item.Label,
                data: item.Values,
                backgroundColor: colour,
                borderColor: colour,
                fill: false
            };
            newDataSetList.push(newDataSetObj);
        });
        return newDataSetList;
    }
    getNewColourString(dataSetCount) {
        const colorNames = Object.keys(this.chartColors);
        const colorName = colorNames[dataSetCount % colorNames.length];
        const newColor = this.chartColors[colorName];
        return newColor;
    }
}
ChartLoader.chartSeed = 1;
//# sourceMappingURL=chartLoader.js.map