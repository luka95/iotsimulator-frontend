import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommunicationModule } from '../_models';

@Injectable()
export class ModulesDataService {

    private defaultModulesColors = [{ id: 0, color: 'green' }, { id: 1, color: 'red' }];

    private defaultModules: CommunicationModule[] = [
        { id: 0, name: 'Lorawan', energySending: 5, energyReceiving: 0.5, energyIdle: 0.005, range: 5, color: 'green' },
        { id: 1, name: 'Xbee', energySending: 3, energyReceiving: 0.3, energyIdle: 0.001, range: 2, color: 'red' }
    ];
    modules = new BehaviorSubject<CommunicationModule[]>(this.defaultModules);

    constructor() {
    }

    getModules() {
        return this.modules.value;
    }

    updateModules(module: CommunicationModule[]) {
        this.modules.next(module);
    }
    getColorByModuleId(id: number) {
        for (let i = 0; i < this.defaultModulesColors.length; i++) {
            if (this.defaultModulesColors[i].id === id) {
                return this.defaultModulesColors[i].color;
            }
        }
    }
}
