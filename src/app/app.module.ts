import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { HomeComponent } from './home';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header';

import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { MarkerComponent } from './marker/marker.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SensorFormComponent,
    MarkerComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    SensorFormComponent,
    HomeComponent,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
