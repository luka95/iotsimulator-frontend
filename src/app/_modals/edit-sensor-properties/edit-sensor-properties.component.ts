import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-edit-sensor-properties-modal',
    templateUrl: './edit-sensor-properties.component.html'
})
export class EditSensorPropertiesComponent implements OnInit {
    @Input() isDisabled;
    @Input() loraWanSelected;
    @Input() xbeeSelected;
    @Input() battery;

    @Output() saveEvent = new EventEmitter<any>();

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
    }

    save() {
        this.saveEvent.emit({
            loraWanSelected: this.loraWanSelected,
            xbeeSelected: this.xbeeSelected,
            battery: this.battery
        });
        this.activeModal.dismiss('Done click');
    }

}
