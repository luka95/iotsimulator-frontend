import {Component} from '@angular/core';

export interface CommunicationModule {
  id: number;
  name: string;
  energyOn: number;
  energyIdle: number;
  range: number;
}

@Component({
  selector: 'app-modules-form',
  templateUrl: './modules-form.component.html'
})
export class ModulesFormComponent {

  private configurationOpened = false;

  private lorawanModule: CommunicationModule = {
    id: 0,
    name: 'Lorawan',
    energyOn: 5,
    energyIdle: 0.005,
    range: 5
  };

  private xbeeModule: CommunicationModule = {
    id: 1,
    name: 'Xbee',
    energyOn: 3,
    energyIdle: 0.001,
    range: 2
  };

  private modules = [this.lorawanModule, this.xbeeModule];

  openConfiguration() {
    this.configurationOpened = true;
  }

  closeConfiguration() {
    this.configurationOpened = false;
  }
}
