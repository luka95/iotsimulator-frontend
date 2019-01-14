import {Component} from '@angular/core';

@Component({
    selector: 'app-obstacle-form',
    templateUrl: './obstacle-form.component.html'
})
export class ObstacleFormComponent {

    communicationEfficiencyPercentage = 100;
    height = 0;

    getCommunicationEfficiencyPercentage() {
        return this.communicationEfficiencyPercentage;
    }

    getHeight() {
        return this.height;
    }
}
