import * as Chart from "chart.js";
export class ChartLoader {
    constructor(chartData, $container) {
        this.chartData = chartData;
        this.$container = $container;
        this.charts = [];
    }
    renderCharts() {
        this.$container.empty();
        this.chartData.forEach(data => {
            const newChart = this.renderChart(data);
            this.charts.push(newChart);
        });
    }
    renderChart(chartData) {
        const $chartCanvas = this.$getChartCanvas(chartData.ID);
        const chartContext = $chartCanvas.get(0).getContext("2d");
        const chartOptions = this.getChartOptions();
        const chart = new Chart(chartContext, chartOptions);
        // Append chart to container
        this.$container.append($chartCanvas);
        return chart;
    }
    getChartOptions() {
        return {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
    }
    $getChartCanvas(chartID) {
        return $(`<canvas id="chart-${chartID}" class="col-4" width="400" height="400">`);
    }
}
//# sourceMappingURL=chartLoader.js.map