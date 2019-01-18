import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthenticationService, LayersDataService, ModulesDataService, UserService} from './_services';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './header';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

import {AppComponent} from './app.component';
import {SensorFormComponent} from './sensor-form/sensor-form.component';
import {routing} from './app.routing';
import {LayersComponent} from './layers/layers.component';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {AuthGuard} from './_guards';
//import {MarkerIconComponent} from './marker-icon/marker-icon.component';
import {ObstacleFormComponent} from './obstacle-from/obstacle-form.component';
import {SimulationFormComponent} from './simulation-form/simulation-form.component';
import {ModulesFormComponent} from './modules-form/modules-form.component';

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
        ModulesFormComponent
    ],
    imports: [
        LeafletModule.forRoot(),
        LeafletDrawModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        SensorFormComponent,
        ObstacleFormComponent,
        SimulationFormComponent,
        ModulesFormComponent,
        LayersComponent,
        AuthenticationService,
        UserService,
        ModulesDataService,
        LayersDataService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
