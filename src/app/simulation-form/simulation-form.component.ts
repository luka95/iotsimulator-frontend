import {Component} from '@angular/core';

export interface Algorithm {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html'
})
export class SimulationFormComponent {

  private selectedAlgorithm: Algorithm;
  private population: number;
  private iterationsLimit: number;
  private steadyGenerationsLimit: number;

  algorithms: Algorithm[] = [
    {value: 'GeneticAlgorithmModel', viewValue: 'Genetic'}
  ];

  startSimulation() {
    console.log('CLICKED!');
  }
}
