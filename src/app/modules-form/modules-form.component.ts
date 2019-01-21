import {Component, OnInit} from '@angular/core';
import {ModulesDataService} from '../_services/modules-data.service';

export interface CommunicationModule {
    id: number;
    name: string;
    energySending: number;
    energyReceiving: number;
    energyIdle: number;
    range: number;
}

@Component({
    selector: 'app-modules-form',
    templateUrl: './modules-form.component.html'
})
export class ModulesFormComponent implements OnInit {


    private modules: CommunicationModule[];

    constructor(private modulesDataService: ModulesDataService) {
    }

    ngOnInit(): void {
        this.modules = this.modulesDataService.getModules();
        console.log("NGONINIT", this.modules);
    }
}
