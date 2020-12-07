import { ChartData } from "./chartData";

export class LocationChartData {
    constructor(public location: string, public charts: ChartData[]) { }
}