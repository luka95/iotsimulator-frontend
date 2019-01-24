import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-delete-confirm-modal',
    templateUrl: './delete-confirm.component.html'
})
export class DeleteConfirmComponent implements OnInit {
    @Input()
    data: any;
    @Output() deleteEvent = new EventEmitter<string>();
    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    deleteRecord() {
        this.deleteEvent.emit(this.data);
    }

}
