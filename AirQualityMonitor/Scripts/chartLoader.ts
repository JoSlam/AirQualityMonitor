import * as Chart from "chart.js";
import { Axis } from "./axis";
import { ChartData } from "./chartData";
import { DataSet } from "./dataSet";

export class ChartLoader {
    private charts: Chart[] = [];

    private static chartSeed: number = 1;

    private chartColors: any = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };


    constructor(public chartData: ChartData[], private $container: JQuery) { }

    public renderCharts(): void {
        this.$container.empty();
        this.chartData.forEach(data => {
            const newChart = this.renderChart(data);
            this.charts.push(newChart);
        });
    }

    private renderChart(chartData: ChartData): Chart {
        const $chartCanvas = this.$getChartCanvas();

        // Append chart to container
        this.$container.append($chartCanvas);

        const chartOptions = this.getChartConfiguration(chartData);
        const chartContext = ($chartCanvas.get(0) as HTMLCanvasElement).getContext("2d");
        const chart = new Chart(chartContext, chartOptions);

        return chart;
    }


    getChartConfiguration(chartData: ChartData): Chart.ChartConfiguration {
        return {
            type: 'line',
            data: {
                labels: chartData.labels, // consider passing in Date instead of string
                datasets: this.buildDataSets(chartData.dataSets)
            },
            options: this.getChartOptions(chartData)
        };
    }

    private $getChartCanvas(): JQuery {
        return $(`<canvas id="chart-${ChartLoader.chartSeed++}" class="col m4" width="400" height="400">`);
    }

    private getChartOptions(chartData: ChartData): Chart.ChartOptions {
        const chartOptions = {
            scales: {
                xAxes: [this.getAxis(chartData.xAxis)],
                yAxes: [this.getAxis(chartData.yAxis)]
            },
            responsive: false
        } as Chart.ChartOptions;

        return chartOptions;
    }

    private getAxis(axis: Axis): Chart.CommonAxe {
        return {
            display: true,
            scaleLabel: {
                display: true,
                labelString: axis.label
            }
        } as Chart.CommonAxe;
    }

    private buildDataSets(dataSets: DataSet[]): Chart.ChartDataSets[] {
        const newDataSetList: Chart.ChartDataSets[] = [];

        dataSets.forEach(item => {
            const colour = this.getNewColourString(newDataSetList.length);
            const newDataSetObj = {
                label: item.label,
                data: item.values,
                backgroundColor: colour,
                borderColor: colour,
                fill: false
            } as Chart.ChartDataSets;

            newDataSetList.push(newDataSetObj);
        });

        return newDataSetList;
    }

    private getNewColourString(dataSetCount: number): string {
        const colorNames = Object.keys(this.chartColors);
        const colorName = colorNames[dataSetCount % colorNames.length];
        const newColor = this.chartColors[colorName];

        return newColor;
    }
}