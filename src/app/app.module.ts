import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthenticationService, LayersDataService, ModulesDataService, SimulationService, UserService } from './_services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { routing } from './app.routing';
import { LayersComponent } from './layers/layers.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { ObstacleFormComponent } from './obstacle-from/obstacle-form.component';
import { SimulationFormComponent } from './simulation-form/simulation-form.component';
import { ModulesFormComponent } from './modules-form/modules-form.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { SimulationComponent } from './simulation/simulation.component';
import { DeleteConfirmComponent } from './modals/delete-confirm/delete-confirm.component'


@NgModule({
    declarations: [
        AppComponent,
        SensorFormComponent,
        LayersComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        ObstacleFormComponent,
        SimulationFormComponent,
        ModulesFormComponent,
        SimulationsComponent,
        SimulationComponent,
        DeleteConfirmComponent,

    ],
    imports: [
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        PaginationModule.forRoot(),
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule,
        Ng2SmartTableModule
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
    ],
    entryComponents: [
        DeleteConfirmComponent
    ]

})
export class AppModule {
}
