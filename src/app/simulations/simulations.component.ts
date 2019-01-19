import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimulationService } from '../_services';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';


@Component({
    templateUrl: 'simulations.component.html',
    styleUrls: ['simulations.component.scss']
})
export class SimulationsComponent implements OnInit {
    source = new LocalDataSource();

    constructor(
        private router: Router,
        private simulationService: SimulationService) {
    }

    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.simulationService.getAllInfo()
            .subscribe(
                data => {
                    this.source = new LocalDataSource();
                    this.source.load(data);
                },
                error => {
                    console.log(error);
                });
    }


    settings = {
        mode: "external",
        actions: false,
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

}
