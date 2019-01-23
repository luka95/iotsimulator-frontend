import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { DeleteConfirmComponent } from '../_modals/delete-confirm/delete-confirm.component';
import { SimulationService } from '../_services';


@Component({
    templateUrl: 'simulations.component.html',
    styleUrls: ['simulations.component.scss']
})
export class SimulationsComponent implements OnInit {

    constructor(
        private router: Router,
        private simulationService: SimulationService,
        private modalService: NgbModal) {
    }

    source = new LocalDataSource();


    settings = {
        mode: 'external',
        actions: {
            position: 'right',
            add: false,
            edit: false,
            delete: true,
            custom: [
                {
                    name: 'Detalji',
                    title: '<span class="action-button">Detalji</span>',
                },
            ]
        },
        columns: {
            id: {
                title: 'Id',
                type: 'string'
            },
            algorithmName: {
                title: 'Algoritam',
                type: 'string'
            },
            simulationStart: {
                title: 'Početak simulacije',
                type: 'date',
                width: '180px',
                sort: true,
                sortDirection: 'desc',
                valuePrepareFunction: (date) => {
                    const formatted = new DatePipe('en-EN').transform(date, 'yyyy/MM/dd hh:mm:ss');
                    return formatted;
                },
            },
            simulationEnd: {
                title: 'Kraj simulacije',
                type: 'date',
                width: '180px',
                valuePrepareFunction: (date) => {
                    const formatted = new DatePipe('en-EN').transform(date, 'yyyy/MM/dd hh:mm:ss');
                    return formatted;
                },
            },
            isCompleted: {
                title: 'Završena',
                type: 'boolean'
            },
            numberOfNodes: {
                title: 'Broj čvorova',
                type: 'number'
            }
        }
    };

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.simulationService.getAllInfo()
            .subscribe(
                data => {
                    console.log('LOADING DATA', data);
                    this.source = new LocalDataSource();
                    this.source.load(data);
                },
                error => {
                    console.log(error);
                });
    }

    onSelect(event): void {
        if (event.data.isCompleted) {
            this.router.navigateByUrl('/simulations/' + event.data.id);
        }
    } onCustom(event) {
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
    deleteAll(): void {
        const modalRef = this.modalService.open(DeleteConfirmComponent);

        modalRef.componentInstance.deleteEvent.subscribe(($e) => {
            this.simulationService.deleteAll().subscribe(data => {
                this.loadData();
                this.modalService.dismissAll();
            }, err => {
                this.loadData();
                this.modalService.dismissAll();
            });
        });
    }
}
