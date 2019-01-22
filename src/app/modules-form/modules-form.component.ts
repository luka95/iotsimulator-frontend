import { Component, OnInit } from '@angular/core';
import { ModulesDataService } from '../_services/modules-data.service';
import { CommunicationModule } from '../_models/communication-module';


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
    }
}
