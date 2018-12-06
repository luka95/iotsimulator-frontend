import { Component, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements AfterViewInit {

  map: any;
  constructor(private _elementRef: ElementRef, private ref: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const el = document.getElementById('map');
    console.log(el);
    this.map = L.map(el).setView([51.505, -0.09], 13);
    console.log(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    const pmToGeoJsonShapeMap = new Map([['Marker', 'Point'], ['Circle', 'Circle']]);

    let featureGroup = L.featureGroup(null).addTo(this.map);

    let tmpId = 1;

    this.map.pm.addControls({
      position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
      drawMarker: true, // adds button to draw markers
      drawPolyline: false, // adds button to draw a polyline
      drawRectangle: false, // adds button to draw a rectangle
      drawPolygon: false, // adds button to draw a polygon
      drawCircle: false, // adds button to draw a circle
      cutPolygon: false, // adds button to cut a hole in a polygon
      editMode: false, // adds button to toggle edit mode for all layers
      removalMode: true, // adds a button to remove layers
    });

    function getGeoJsonFeature(e) {

      const coordinates = e.layer._latlng.toLocaleString()
        .replace('LatLng', '')
        .replace('(', '[')
        .replace(')', ']');

      const type = pmToGeoJsonShapeMap.has(e.shape) ? pmToGeoJsonShapeMap.get(e.shape) : e.shape;

      const json =
        '{ "type": "Feature",\n' +
        '  "properties": {\n' +
        '    "ID": ' + tmpId + ',\n' +
        '    "LoRaWAN": true,\n' +
        '    "XBee": true,\n' +
        '    "batteryPercentage": 90\n' +
        '  },\n' +
        '  "geometry": {\n' +
        '    "type": "' + type + '",\n' +
        '    "coordinates": ' + coordinates + '\n' +
        '  }' +
        '}';

      tmpId += 1;

      return L.geoJson(JSON.parse(json));
    }

    this.map.on('pm:create', function (e) {
      let layer = getGeoJsonFeature(e);
      featureGroup.addLayer(layer);
    });

    this.map.on('pm:remove', function (e) {
      console.log(e.shape);
      featureGroup.eachLayer(function (layer) {
        console.log(layer);
      });
    });
    this.ref.markForCheck();
  }
}
