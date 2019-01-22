import { Component, Input } from '@angular/core';
import {Algorithm, AlgorithmParameters} from '../_models';


@Component({
    selector: 'app-simulation-form',
    templateUrl: './algorithm-form.component.html'
})
export class AlgorithmFormComponent {
    @Input() isDisabled: boolean;

    algorithms: Algorithm[] = [
        { value: 'GeneticAlgorithmModel', viewValue: 'Genetic algorithm' }
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
