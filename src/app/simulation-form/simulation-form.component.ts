import {Component} from '@angular/core';

export interface Algorithm {
    value: string;
    viewValue: string;
}

export interface AlgorithmParameters {
    type: string;
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
        type: this.algorithms[0].value,
        population: 20,
        iterationsLimit: 1000,
        steadyGenerationsLimit: 100
    };

    private findAlgorithmNameByValue(value: string) {
        return this.algorithms.find(value1 => value1.value === this.selectedAlgorithm.type).viewValue;
    }

    constructor() {
    }

    getAlgorithmParameters(): AlgorithmParameters {
        return this.selectedAlgorithm;
    }

    setAlgorithmParameters(algorithmParameters: AlgorithmParameters) {
        this.selectedAlgorithm = algorithmParameters;
    }
}
