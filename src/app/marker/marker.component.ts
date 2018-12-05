import { Component, OnInit } from '@angular/core';
import { SensorFormComponent } from "../sensor-form/sensor-form.component";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  constructor(private sensorFormComponent: SensorFormComponent) { }

  private loraColor = '#864545';
  private xbeeColor = '#3F3665';

  ngOnInit() {
  }

  getMarkerFill(id: String) {
    const lora = this.sensorFormComponent.getLoraWanSelectedStatus();
    const xbee = this.sensorFormComponent.getXbeeSelectedStatus();
    let colorToReturn = '';

    if (lora === true && xbee === true) {
      if (id === 'Left') {
        colorToReturn = this.loraColor;
      } else if (id === 'Right') {
        colorToReturn = this.xbeeColor;
      }
    } else if (lora === true || xbee === true) {
      colorToReturn = lora === true ? this.loraColor : this.xbeeColor;
    }
    console.log('####COLOR: ' + colorToReturn);
    return colorToReturn;
  }
}
