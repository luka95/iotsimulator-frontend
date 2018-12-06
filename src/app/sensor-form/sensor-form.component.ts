import { Component } from '@angular/core';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.css']
})
export class SensorFormComponent {

  loraWanSelected = false;
  xbeeSelected = false;
  battery = 100;

  getLoraWanSelectedStatus() {
    return this.loraWanSelected;
  }

  getXbeeSelectedStatus() {
    return this.xbeeSelected;
  }

  getBatteryStatus() {
    return this.battery;
  }

}
