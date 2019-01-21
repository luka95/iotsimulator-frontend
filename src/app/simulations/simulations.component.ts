import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../_services';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from '../modals/delete-confirm/delete-confirm.component';


@Component({
    templateUrl: 'simulations.component.html',
    styleUrls: ['simulations.component.scss']
})
export class SimulationsComponent implements OnInit {
    source = new LocalDataSource();

    constructor(
        private router: Router,
        private simulationService: SimulationService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.simulationService.getAllInfo()
            .subscribe(
                data => {
                    console.log("LOADING DATA", data);
                    this.source = new LocalDataSource();
                    this.source.load(data);
                },
                error => {
                    console.log(error);
                });
    }


    settings = {
        mode: "external",
        actions: {
            position: 'right',
            add: false,
            edit: false,
            delete: true,
            custom: [
                {
                    name: 'details',
                    title: '<span class="action-button">Details</span>',
                },
            ]
        },
        columns: {
            id: {
                title: 'Id',
                type: 'string'
            },
            simulationStart: {
                title: 'Simulation Start',
                type: 'date',
                valuePrepareFunction: (date) => {
                    var formatted = new DatePipe('en-EN').transform(date, 'yyyy/MM/dd hh:mm:ss');
                    return formatted;
                },
            },
            simulationEnd: {
                title: 'Simulation End',
                type: 'date',
                valuePrepareFunction: (date) => {
                    var formatted = new DatePipe('en-EN').transform(date, 'yyyy/MM/dd hh:mm:ss');
                    return formatted;
                },
            },
            isCompleted: {
                title: 'Is Completed',
                type: 'boolean'
            },
            numberOfNodes: {
                title: 'Number Of Nodes',
                type: 'number'
            }
        }
    };

    onSelect(event): void {
        this.router.navigateByUrl('/simulations/' + event.data.id);
    };
    onCustom(event) {
        this.router.navigateByUrl('/simulations/' + event.data.id);
    }
    onDelete(event): void {
        const modalRef = this.modalService.open(DeleteConfirmComponent);

        modalRef.componentInstance.data = event.data;
        modalRef.componentInstance.deleteEvent.subscribe(($e) => {
            this.simulationService.delete($e.id).subscribe(data => {
                this.loadData();
                this.modalService.dismissAll();
            }, err => {
                this.loadData();
                this.modalService.dismissAll();
            });
        });
    }
}
