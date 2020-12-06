import { Axis } from "./axis";
import { DataSet } from "./dataSet";

export class ChartData {
    public ID: number;
    public YAxis: Axis;
    public XAxis: Axis;

    constructor();
    constructor(Title: string, DataSets: DataSet[], Labels: string[]);
    constructor(public Title?: string, public DataSets?: DataSet[], public Labels?: string[]) { }
}

