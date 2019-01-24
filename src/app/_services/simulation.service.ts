import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { SimulationInfo, SimulationParameters } from '../_models';

@Injectable()
export class SimulationService {
    constructor(private http: HttpClient) {
    }

    getAllInfo() {
        return this.http.get<Array<SimulationInfo>[]>(AppComponent.API_URL + `/simulationinfo`, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    getById(id: string) {
        return this.http.get<SimulationParameters>(AppComponent.API_URL + `/simulation/` + id, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    createSimulation(model: SimulationParameters) {
        return this.http.post(AppComponent.API_URL + `/simulation`, model, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            responseType: 'text'
        });
    }

    getByIdInfo(id: number) {
        return this.http.get<SimulationInfo>(AppComponent.API_URL + `/simulationinfo/` + id, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    delete(id: number) {
        return this.http.delete(AppComponent.API_URL + `/simulation/` + id, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
    deleteAll() {
        return this.http.delete(AppComponent.API_URL + `/simulation`, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }
}
