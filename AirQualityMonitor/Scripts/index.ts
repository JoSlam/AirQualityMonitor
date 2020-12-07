import { Axis } from "./axis";
import { ChartData } from "./chartData";
import { ChartLoader } from "./chartLoader";
import { DataSet } from "./dataSet";
import { LocationChartData } from "./locationChartData";

declare var locationChartData;

/*const testDataSet = new DataSet("Test set", [1, 2, 3, 4, 5,]);
const testChartData = new ChartData("Home chart", [testDataSet], ["Mon", "Tue", "Wed", "Thurs", "Fri", "Saturday"]);
testChartData.YAxis = new Axis("Y Axis");
testChartData.XAxis = new Axis("X Axis");
const chartLoader = new ChartLoader([testChartData], $chartContainer.find("#content"));
chartLoader.renderCharts();

const jData = JSON.parse(chartDataList);
console.log(jData);
*/


// Get actual data sets onto the page for use
const $chartContainer = $("#chart-container");
const locationChartDataListJson: LocationChartData[] = JSON.parse(locationChartData);

locationChartDataListJson.forEach(locationData => {
    const charts = locationData.charts;

    charts.forEach(chartData => {
        chartData.yAxis = new Axis("Concentration (micrograms)");
        chartData.xAxis = new Axis("Day of the week");
    });

    const chartRowHtml = `<div class='row' style="padding-top: 15px; padding-bottom: 15px;">
                            <h4>${locationData.location}</h4>
                            <div class="content"></div>
                        </div>`
    const chartRow = $(chartRowHtml);

    $chartContainer.append(chartRow);

    const chartLoader = new ChartLoader(charts, chartRow.find(".content"));
    chartLoader.renderCharts();
});


console.log("Charts loaded...");
