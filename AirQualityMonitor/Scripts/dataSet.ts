export class DataSet {
    constructor();
    constructor(label: string, values: number[]);
    constructor(public label?: string, public values?: number[]) { }
}