import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthenticationService, LayersDataService, ModulesDataService, UserService, SimulationService } from './_services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/pagination';



import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { routing } from './app.routing';
import { LayersComponent } from './layers/layers.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
//import {MarkerIconComponent} from './marker-icon/marker-icon.component';
import { ObstacleFormComponent } from './obstacle-from/obstacle-form.component';
import { SimulationFormComponent } from './simulation-form/simulation-form.component';
import { ModulesFormComponent } from './modules-form/modules-form.component';
import { SimulationsComponent } from './simulations/simulations.component';


@NgModule({
    declarations: [
        AppComponent,
        SensorFormComponent,
        LayersComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        //MarkerIconComponent,
        ObstacleFormComponent,
        SimulationFormComponent,
        ModulesFormComponent,
        SimulationsComponent
    ],
    imports: [
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        PaginationModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule,
        Ng2TableModule
    ],
    providers: [
        AuthGuard,

        SensorFormComponent,
        ObstacleFormComponent,
        SimulationFormComponent,
        ModulesFormComponent,
        LayersComponent,
        SimulationsComponent,

        AuthenticationService,
        UserService,
        ModulesDataService,
        LayersDataService,
        SimulationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
