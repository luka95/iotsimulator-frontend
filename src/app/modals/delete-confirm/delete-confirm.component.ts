import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'delete-confirm-modal',
    templateUrl: './delete-confirm.component.html',
    styleUrls: ['./delete-confirm.component.css']
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