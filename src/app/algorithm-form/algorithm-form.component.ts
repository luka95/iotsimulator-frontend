import { Component, Input } from '@angular/core';
import { Algorithm, AlgorithmParameters } from '../_models';
import { Reducer } from '../_models/reducer';


@Component({
    selector: 'app-simulation-form',
    templateUrl: './algorithm-form.component.html'
})
export class AlgorithmFormComponent {
    @Input() isDisabled: boolean;

    reducers: Reducer[] = [
        {
            value: 'PrimReducer',
            viewValue: 'Prim Reducer',

        }, {
            value: 'DijkstraReducer',
            viewValue: 'Dijkstra Reducer',
        }
    ];

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
    private selectedReducer: Reducer = this.reducers[0];

    constructor() {
    }

    getAlgorithmParameters(): AlgorithmParameters {
        this.selectedAlgorithm.params.reducer = this.selectedReducer;
        return this.selectedAlgorithm.params;
    }

    setAlgorithmParameters(algorithmParameters: AlgorithmParameters) {
        this.selectedAlgorithm.params = algorithmParameters;
    }
}
