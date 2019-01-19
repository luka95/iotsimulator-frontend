import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CommunicationModule} from '../modules-form/modules-form.component';

@Injectable()
export class ModulesDataService {

    private defaultModules: CommunicationModule[] = [
        {id: 0, name: 'Lorawan', energySending: 5, energyReceiving: 0.5, energyIdle: 0.005, range: 5},
        {id: 1, name: 'Xbee', energySending: 3, energyReceiving: 0.3, energyIdle: 0.001, range: 2}
    ];
    modules = new BehaviorSubject<CommunicationModule[]>(this.defaultModules);

    constructor() {
    }

    getModules(){
        return this.modules.value;
    }

    updateModules(module: CommunicationModule[]) {
        this.modules.next(module);
    }
}
