import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-show-model-modal',
    templateUrl: './show-model.component.html',
    styleUrls: ['./show-model.component.css']
})
export class ShowModelComponent implements OnInit {
    @Input()
    data: any;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }
}
