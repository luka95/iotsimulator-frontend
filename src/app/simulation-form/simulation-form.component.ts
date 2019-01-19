import {Component, OnInit} from '@angular/core';
import {CommunicationModule} from '../modules-form/modules-form.component';
import {LayersDataService, ModulesDataService} from '../_services';
import {FeatureCollection} from 'geojson';

export interface Algorithm {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-simulation-form',
    templateUrl: './simulation-form.component.html'
})
export class SimulationFormComponent implements OnInit {

    private modules: CommunicationModule[];
    private points: FeatureCollection;
    private obstacles: FeatureCollection;

    private selectedAlgorithm: Algorithm;
    private population = 20;
    private iterationsLimit = 1000;
    private steadyGenerationsLimit = 100;

    algorithms: Algorithm[] = [
        {value: 'GeneticAlgorithmModel', viewValue: 'Genetic'}
    ];

    constructor(private modulesDataService: ModulesDataService, private layersDataService: LayersDataService) {
    }

    ngOnInit(): void {
        this.modulesDataService.currentMessage.subscribe(modules => this.modules = modules);
        this.layersDataService.currentPoints.subscribe(points => this.points = points);
        this.layersDataService.currentObstacles.subscribe(obstacles => this.obstacles = obstacles);
    }

    getAlgorthmParameters() {
        return {
            'type': this.algorithms[0].value,
            'population': this.population,
            'limitIterations': this.iterationsLimit,
            'limitSteadyGenerations': this.steadyGenerationsLimit
        };
    }
}
