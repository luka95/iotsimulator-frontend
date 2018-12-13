import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthenticationService, UserService } from './_services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { routing } from './app.routing';
import { LayersComponent } from './layers/layers.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AuthGuard } from './_guards';

@NgModule({
  declarations: [
    AppComponent,
    SensorFormComponent,
    LayersComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
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
    LayersComponent,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
