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
  drawOptions = {
    position: 'topright',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [ 20, 24 ],
          iconAnchor: [ 10, 24 ],
          iconUrl: 'assets/marker-icon-2x.png'
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
