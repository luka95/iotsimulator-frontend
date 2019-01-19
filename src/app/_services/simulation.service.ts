import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { AppComponent } from '../app.component';
import { SimulationInfo } from '../_models/simulation-info';

@Injectable()
export class SimulationService {
    constructor(private http: HttpClient) {
    }

    getAllInfo() {
        return this.http.get<Array<SimulationInfo>[]>(AppComponent.API_URL + `/simulationinfo`);
    }
    getById(id: number) {
        return this.http.get<any>(AppComponent.API_URL + `/simulation/` + id);
    }
    createSimulation(model: any) {
        return this.http.post(AppComponent.API_URL + `/simulation`, model);
    }

    getByIdInfo(id: number) {
        return this.http.get<SimulationInfo>(AppComponent.API_URL + `/simulationinfo/` + id);
    }
    delete(id: number) {
        return this.http.delete(AppComponent.API_URL + `/simulation/` + id);
    }
}
