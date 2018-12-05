import { Component, OnInit } from '@angular/core';


// declare let pmToGeoJsonShapeMap = new Map([['Marker', 'Point'], ['Circle', 'Circle']]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static API_URL="http://localhost:8080";

  constructor() {
  }

  ngOnInit(){}
}
