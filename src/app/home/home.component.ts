
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
    let el = document.getElementById('map');
    console.log(el);
    this.map = L.map(el).setView([51.505, -0.09], 13);
    console.log(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    const pmToGeoJsonShapeMap = new Map([['Marker', 'Point'], ['Circle', 'Circle']]);

    var featureGroup = L.featureGroup(null).addTo(this.map);
    // featureGroup.on('remove', layerRemoved());
    var tmpId = 1;

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

    console.log(L.Icon.Default.prototype.options);

    var svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="20px" height="24px" viewBox="0 0 20 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
    <svg:title>Untitled 2</svg:title>
    <svg:desc>Created with Sketch.</svg:desc>
    <svg:g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <svg:g id="map-pin" transform="translate(1.000000, 1.000000)" stroke="#000000">
            <svg:path d="M9,21.9999999 C9,21.9999999 0,15.9999999 0,8.99999987 C7.40671569e-08,4.02943717 4.0294373,-2.22044605e-16 9,0 C13.9705627,2.22044605e-16 17.9999999,4.02943717 18,8.99999987 C18,15.9999999 9,21.9999999 9,21.9999999 Z" id="Path" stroke-width="0.7" fill="#55762A" stroke-linecap="round" stroke-linejoin="round"></svg:path>
            <svg:g id="Indicator" transform="translate(2.000000, 4.000000)" stroke-width="0.4">
                <svg:path d="M0,0 L4,0 C5.65685425,-3.04359188e-16 7,1.34314575 7,3 L7,3 C7,4.65685425 5.65685425,6 4,6 L0,6" id="Left" fill="#3F3665" transform="translate(3.500000, 3.000000) scale(-1, 1) translate(-3.500000, -3.000000) "></svg:path>
                <svg:path d="M7,0 L11,0 C12.6568542,-3.04359188e-16 14,1.34314575 14,3 L14,3 C14,4.65685425 12.6568542,6 11,6 L7,6" id="Right" fill="#864545"></path>
            </svg:g>
        </svg:g>
    </svg:g>
</svg>`;
    // var iconUrl = 'data:image/svg+xml;base64,' + btoa(svg);

    var meIcon = L.divIcon({
      // className: "leaflet-data-marker",
      html: svg.replace('#', '%23'),

      // iconAnchor  : [22, 28],
      // iconSize    : [36, 42],
      // popupAnchor : [0, -30],
    });

    // console.log(meIcon);

    L.Marker.prototype.options.icon = meIcon;

    function getGeoJsonFeature(e) {

      var coordinates = e.layer._latlng.toLocaleString()
        .replace("LatLng", "")
        .replace('(', '[')
        .replace(')', ']');

      var type = pmToGeoJsonShapeMap.has(e.shape) ? pmToGeoJsonShapeMap.get(e.shape) : e.shape;

      var json =
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
      var layer = getGeoJsonFeature(e);
      let parser = new DOMParser();
      let parsedHtml = parser.parseFromString(e.layer._icon, 'text/html');
      // console.log(e.layer._icon);
      // console.log(parsedHtml.getElementsByTagName('svg'));
      // console.log(e.layer._icon.getElementById('#Left'));

      featureGroup.addLayer(layer);
      // console.log(map);
      // console.log(featureGroup);
      // console.log(featureGroup.toGeoJSON());
      // console.log(map);
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