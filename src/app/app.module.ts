import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SensorFormComponent } from './sensor-form/sensor-form.component';
import { MarkerComponent } from './marker/marker.component';

@NgModule({
  declarations: [
    AppComponent,
    SensorFormComponent,
    MarkerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SensorFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
