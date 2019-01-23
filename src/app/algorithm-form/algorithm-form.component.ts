import { Component, Input } from '@angular/core';
import { Algorithm, AlgorithmParameters } from '../_models';
import { Reducer } from '../_models/reducer';
import { Evaluator } from '../_models/evaluator';


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

    evaluators: Evaluator[] = [
        {
            value: 'StaticEvaluator',
            viewValue: 'Static Evaluator',

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
        },
        {
            value: 'DeepSearchAlgorithmModel',
            viewValue: 'Deep search algorithm',
            params: {
                type: 'DeepSearchAlgorithmModel'
            }
        }
    ];

    private selectedAlgorithm: Algorithm = this.algorithms[0];
    private selectedReducer: Reducer = this.reducers[0];
    private selectedEvaluator: Evaluator = this.evaluators[0];

    constructor() {
    }

    getAlgorithmParameters(): AlgorithmParameters {
        this.selectedAlgorithm.params.reducer = this.selectedReducer;
        this.selectedAlgorithm.params.evaluator = this.selectedEvaluator;
        return this.selectedAlgorithm.params;
    }

    setAlgorithmParameters(algorithmParameters: AlgorithmParameters) {
        this.selectedAlgorithm.params = algorithmParameters;
    }
}
