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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { routing } from './app.routing';
import { LayersComponent } from './layers/layers.component';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { ObstacleFormComponent } from './obstacle-from/obstacle-form.component';
import { AlgorithmFormComponent } from './algorithm-form/algorithm-form.component';
import { ModulesFormComponent } from './modules-form/modules-form.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { SimulationComponent } from './simulation/simulation.component';
import { DeleteConfirmComponent } from './_modals/delete-confirm/delete-confirm.component';
import { ReportComponent } from './report/report.component';
import { ShowModelComponent } from './_modals/show-model/show-model.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {EditSensorPropertiesComponent} from './_modals/edit-sensor-properties/edit-sensor-properties.component';
import {EditObstaclePropertiesComponent} from './_modals/edit-obstacle-properties/edit-obstacle-properties.component';


@NgModule({
    declarations: [
        AppComponent,
        SensorFormComponent,
        LayersComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        ObstacleFormComponent,
        AlgorithmFormComponent,
        ModulesFormComponent,
        SimulationsComponent,
        SimulationComponent,
        DeleteConfirmComponent,
        ReportComponent,
        ShowModelComponent,
        EditSensorPropertiesComponent,
        EditObstaclePropertiesComponent
    ],
    imports: [
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        PaginationModule.forRoot(),
        NgbModule.forRoot(),
        NgxJsonViewerModule,
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
        AlgorithmFormComponent,
        ModulesFormComponent,
        LayersComponent,
        SimulationsComponent,
        ReportComponent,

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
        DeleteConfirmComponent,
        ShowModelComponent,
        EditSensorPropertiesComponent,
        EditObstaclePropertiesComponent
    ]

})
export class AppModule {
}
