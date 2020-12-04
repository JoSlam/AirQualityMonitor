import * as Chart from "chart.js";
import { ChartData } from "./chartData";

export class ChartLoader {
    private charts: Chart[] = [];

    constructor(public chartData: ChartData[], private $container: JQuery) { }

    public renderCharts(): void {
        this.$container.empty();
        this.chartData.forEach(data => {
            const newChart = this.renderChart(data);
            this.charts.push(newChart);
        });
    }

    private renderChart(chartData: ChartData): Chart {
        const $chartCanvas = this.$getChartCanvas(chartData.ID);

        // Append chart to container
        this.$container.append($chartCanvas);

        const chartOptions = this.getChartOptions();
        const chartContext = ($chartCanvas.get(0) as HTMLCanvasElement).getContext("2d");
        const chart = new Chart(chartContext, chartOptions);

        return chart;
    }


    getChartOptions(): Chart.ChartConfiguration {
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
                },
                responsive: false
            }
        };
    }

    private $getChartCanvas(chartID: number): JQuery {
        return $(`<canvas id="chart-${chartID}" class="col-4" width="400" height="400">`);
    }

}