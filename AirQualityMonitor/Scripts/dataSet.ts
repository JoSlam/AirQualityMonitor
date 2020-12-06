export class DataSet {
    constructor();
    constructor(Label: string, Values: number[]);
    constructor(public Label?: string, public Values?: number[]) { }
}