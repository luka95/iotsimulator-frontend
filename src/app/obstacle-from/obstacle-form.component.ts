import { Component } from '@angular/core';

@Component({
  selector: 'app-obstacle-form',
  templateUrl: './obstacle-form.component.html'
})
export class ObstacleFormComponent {

  private communicationEfficiencyPercentage = 100;

  getCommunicationEfficiencyPercentage() {
    return this.communicationEfficiencyPercentage;
  }
}
