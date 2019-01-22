import {Component, Input} from '@angular/core';

export interface Algorithm {
    value: string;
    viewValue: string;
}

export interface AlgorithmParameters {
    type: string;
    population?: number;
    limitIterations?: number;
    limitSteadyGenerations?: number;
}

@Component({
    selector: 'app-simulation-form',
    templateUrl: './simulation-form.component.html'
})
export class SimulationFormComponent {
    @Input() isDisabled: boolean;

    algorithms: Algorithm[] = [
        {value: 'GeneticAlgorithmModel', viewValue: 'Genetic algorithm'}
    ];

    private selectedAlgorithm: AlgorithmParameters = {
        type: this.algorithms[0].value,
        population: 20,
        limitIterations: 1000,
        limitSteadyGenerations: 100
    };

    private findAlgorithmNameByValue(value: string) {
        return this.algorithms.find(value1 => value1.value === value).viewValue;
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
