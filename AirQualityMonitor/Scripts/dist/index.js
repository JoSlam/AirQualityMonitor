import { Axis } from "./axis";
import { ChartData } from "./chartData";
import { ChartLoader } from "./chartLoader";
import { DataSet } from "./dataSet";
const testDataSet = new DataSet("Test set", [1, 2, 3, 4, 5,]);
const testChartData = new ChartData("Home chart", [testDataSet], ["Mon", "Tue", "Wed", "Thurs", "Fri"]);
testChartData.YAxis = new Axis("Y Axis");
testChartData.XAxis = new Axis("X Axis");
// Get actual data sets onto the page for use
const $chartContainer = $("#chart-container");
const chartLoader = new ChartLoader([testChartData], $chartContainer.find("#content"));
chartLoader.renderCharts();
console.log(chartDataSets);
console.log("Charts loaded...");
//# sourceMappingURL=index.js.map