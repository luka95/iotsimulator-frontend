export interface AlgorithmParameters {
    type: string;
    population?: number;
    limitIterations?: number;
    limitSteadyGenerations?: number;
    reducer?: any;
}
