import { Axis } from "./axis";

export class ChartData {
    public ID: number;
    public YAxis: Axis; 
    public XAxis: Axis; 

    constructor();
    constructor(Title: string, DataSets: number[]);
    constructor(public Title?: string, public DataSets?: number[]) {}
}

