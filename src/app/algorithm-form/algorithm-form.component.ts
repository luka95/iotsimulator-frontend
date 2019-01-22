import { Component, Input } from '@angular/core';
import { Algorithm, AlgorithmParameters } from '../_models';


@Component({
    selector: 'app-simulation-form',
    templateUrl: './algorithm-form.component.html'
})
export class AlgorithmFormComponent {
    @Input() isDisabled: boolean;

    algorithms: Algorithm[] = [
        {
            value: 'GeneticAlgorithmModel',
            viewValue: 'Genetic algorithm',
            params: {
                type: 'GeneticAlgorithmModel',
                population: 20,
                limitIterations: 1000,
                limitSteadyGenerations: 100
            }
        },
        {
            value: 'ClusteringAlgorithmModel',
            viewValue: 'Static clustering algorithm',
            params: {
                type: 'ClusteringAlgorithmModel'
            }
        }
    ];

    private selectedAlgorithm: Algorithm = this.algorithms[0];

    constructor() {
    }

    getAlgorithmParameters(): AlgorithmParameters {
        return this.selectedAlgorithm.params;
    }

    setAlgorithmParameters(algorithmParameters: AlgorithmParameters) {
        this.selectedAlgorithm.params = algorithmParameters;
    }
}
