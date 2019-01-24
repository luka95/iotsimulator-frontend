import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-show-model-modal',
    templateUrl: './show-model.component.html'
})
export class ShowModelComponent implements OnInit {
    @Input()
    data: any;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }
}
