import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SimulationInfo, SimulationParameters } from '../_models';

@Injectable()
export class SimulationService {
    constructor(private http: HttpClient) {
    }

    getAllInfo() {
        return this.http.get<Array<SimulationInfo>[]>(AppComponent.API_URL + `/simulationinfo`);
    }
    getById(id: string) {
        return this.http.get<SimulationParameters>(AppComponent.API_URL + `/simulation/` + id);
    }
    createSimulation(model: SimulationParameters) {
        return this.http.post(AppComponent.API_URL + `/simulation`, model);
    }

    getByIdInfo(id: number) {
        return this.http.get<SimulationInfo>(AppComponent.API_URL + `/simulationinfo/` + id);
    }
    delete(id: number) {
        return this.http.delete(AppComponent.API_URL + `/simulation/` + id);
    }
}
