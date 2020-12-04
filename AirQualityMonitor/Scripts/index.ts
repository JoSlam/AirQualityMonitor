import { ChartData } from "./chartData";
import { ChartLoader } from "./chartLoader";

console.log("loaded...");

const chartData = [
    new ChartData("Home chart", [1, 2, 3, 4, 5])
];


const $chartContainer = $("#chart-container");
const chartLoader = new ChartLoader(chartData, $chartContainer.find("#content"));
chartLoader.renderCharts();