import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-sensor-form',
    templateUrl: './sensor-form.component.html'
})
export class SensorFormComponent {
    @Input() isDisabled: boolean;

    loraWanSelected = true;
    xbeeSelected = true;
    battery = 100;
    period = 3600;

    getLoraWanSelectedStatus() {
        return this.loraWanSelected;
    }

    getXbeeSelectedStatus() {
        return this.xbeeSelected;
    }

    getBatteryStatus() {
        return this.battery;
    }


    getPeriod() {
        return this.period;
    }
}
