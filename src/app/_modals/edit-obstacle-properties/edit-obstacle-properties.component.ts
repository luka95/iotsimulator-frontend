import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-edit-sensor-properties-modal',
    templateUrl: './edit-obstacle-properties.component.html',
})
export class EditObstaclePropertiesComponent implements OnInit {
    @Input() isDisabled;
    @Input() communicationEfficiencyPercentage;

    @Output() saveEvent = new EventEmitter<any>();

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
    }

    save() {
        this.saveEvent.emit({
            communicationEfficiencyPercentage: this.communicationEfficiencyPercentage
        });
        this.activeModal.dismiss('Done click');
    }

}
