import {Component} from '@angular/core';

export interface Algorithm {
    value: string;
    viewValue: string;
}

export interface AlgorithmParameters {
    algorithm: Algorithm;
    population?: number;
    iterationsLimit?: number;
    steadyGenerationsLimit?: number;
}

@Component({
    selector: 'app-simulation-form',
    templateUrl: './simulation-form.component.html'
})
export class SimulationFormComponent {

    algorithms: Algorithm[] = [
        {value: 'GeneticAlgorithmModel', viewValue: 'Genetic algorithm'}
    ];

    private selectedAlgorithm: AlgorithmParameters = {
        algorithm: this.algorithms[0],
        population: 20,
        iterationsLimit: 1000,
        steadyGenerationsLimit: 100
    };

    constructor() {
    }

    getAlgorithmParameters(): AlgorithmParameters {
        return this.selectedAlgorithm;
    }

    setAlgorithmParameters(algorithmParameters: AlgorithmParameters) {
        this.selectedAlgorithm = algorithmParameters;
    }
}
