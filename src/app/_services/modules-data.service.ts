import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CommunicationModule} from '../modules-form/modules-form.component';

@Injectable()
export class ModulesDataService {

    private messageSource = new BehaviorSubject<CommunicationModule[]>([{
        id: -1,
        energyIdle: -1,
        energySending: -1,
        energyReceiving: -1,
        name: 'default',
        range: -1
    }]);
    currentMessage = this.messageSource.asObservable();

    constructor() {
    }

    changeMessage(module: CommunicationModule[]) {
        this.messageSource.next(module);
    }
}
