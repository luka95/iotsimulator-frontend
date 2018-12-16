import {Component, ViewChild} from '@angular/core';

import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import {SensorFormComponent} from '../sensor-form/sensor-form.component';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html'
})
export class LayersComponent {

  // @ViewChild(SensorFormComponent) sensorFormComponent;

  LAYER_OTM = {
    id: 'opentopomap',
    name: 'Open Topo Map',
    enabled: true,
    layer: tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      maxZoom: 17,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  };

  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
  };

  // Values to bind to Leaflet Directive
  layersControlOptions = {position: 'bottomright'};
  options = {
    zoom: 16,
    center: latLng(45.801128, 15.9706648)
  };
  baseLayers = {
    'Open Street Map': this.LAYER_OSM.layer,
    'Open Topo Map': this.LAYER_OTM.layer
  };

  // TODO dynamically fetch fill color for elements with id == "Left" and "Right"
  mySvgString = `<svg width="20px" height="24px" viewBox="0 0 20 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <metadata id="metadata1">image/svg+xml</metadata>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="map-pin" transform="translate(1.000000, 1.000000)" stroke="#000000">
                        <path d="M9,21.9999999 C9,21.9999999 0,15.9999999 0,8.99999987 C7.40671569e-08,4.02943717 4.0294373,-2.22044605e-16 9,0 C13.9705627,2.22044605e-16 17.9999999,4.02943717 18,8.99999987 C18,15.9999999 9,21.9999999 9,21.9999999 Z" id="Path" stroke-width="0.7" fill="#48EF18" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="Indicator" transform="translate(2.000000, 4.000000)" stroke-width="0.4">
                          <path d="M0,0 L4,0 C5.65685425,-3.04359188e-16 7,1.34314575 7,3 L7,3 C7,4.65685425 5.65685425,6 4,6 L0,6" id="Left" fill="#3F3665" transform="translate(3.500000, 3.000000) scale(-1, 1) translate(-3.500000, -3.000000) "/>
                          <path d="M7,0 L11,0 C12.6568542,-3.04359188e-16 14,1.34314575 14,3 L14,3 C14,4.65685425 12.6568542,6 11,6 L7,6" id="Right" fill="#864545"/>
                        </g>
                      </g>
                    </g>
                  </svg>`;

  myIconUrl = encodeURI('data:image/svg+xml,' + this.mySvgString).replace('#', '%23');

  drawOptions = {
    position: 'topright',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [ 20, 24 ],
          iconAnchor: [ 10, 24 ],
          iconUrl: this.myIconUrl
        })
      },
      polyline: true,
      circle: true
    }
  };

  onDrawStart(event) {
    console.log(event);
  }

  onDrawCreated(event) {
    console.log(event);
  }
}
