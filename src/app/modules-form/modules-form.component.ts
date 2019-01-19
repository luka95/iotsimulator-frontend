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

    private defaultModules: CommunicationModule[] = [
        {id: 0, name: 'Lorawan', energySending: 5, energyReceiving: 0.5, energyIdle: 0.005, range: 5},
        {id: 1, name: 'Xbee', energySending: 3, energyReceiving: 0.3, energyIdle: 0.001, range: 2}
    ];
    private modules: CommunicationModule[];

    constructor(private modulesDataService: ModulesDataService) {
    }

    ngOnInit(): void {
        if (this.modulesDataService.getModules().length == 0){
            this.modulesDataService.updateModules(this.defaultModules);
        }
        this.modules = this.modulesDataService.getModules();
    }

    save(){
        this.modulesDataService.updateModules(this.modules);
    }
}
