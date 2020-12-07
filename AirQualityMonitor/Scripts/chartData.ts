import { Axis } from "./axis";
import { DataSet } from "./dataSet";

export class ChartData {
    public ID: number;
    public yAxis: Axis;
    public xAxis: Axis;

    constructor();
    constructor(title: string, dataSets: DataSet[], labels: string[]);
    constructor(public title?: string, public dataSets?: DataSet[], public labels?: string[]) { }
}

