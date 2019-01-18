import { Component, OnInit, ViewChild } from '@angular/core';

import * as L from 'leaflet';

import { FeatureGroup, latLng, tileLayer } from 'leaflet';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';
import { ObstacleFormComponent } from '../obstacle-from/obstacle-form.component';
import { LayersDataService } from '../_services';
import { Point, Polygon, MultiPoint, LineString, Feature, FeatureCollection, Geometry, GeometryObject } from 'geojson';
import { ModulesFormComponent } from '../modules-form/modules-form.component';
import { isNgTemplate, AstMemoryEfficientTransformer } from '@angular/compiler';

@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html'
})
export class LayersComponent implements OnInit {

    @ViewChild(SensorFormComponent) sensorFormComponent;
    @ViewChild(ObstacleFormComponent) obstacleFormComponent;
    @ViewChild(ModulesFormComponent) modulesFormComponent;

    map: any;

    constructor(private layersDataService: LayersDataService) {
    }

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
    layersControlOptions = { position: 'bottomright' };
    options = {
        zoom: 16,
        center: latLng(45.801128, 15.9706648)
    };
    baseLayers = {
        'Open Street Map': this.LAYER_OSM.layer,
        'Open Topo Map': this.LAYER_OTM.layer
    };

    numberOfLayers = 0;

    points = new Map<number, Feature>();

    drawOptions = {
        position: 'topright',
        draw: {
            marker: {
                icon: L.icon({
                    iconSize: [20, 24],
                    iconAnchor: [10, 24],
                    iconUrl: this.getMarkerIcon()
                })
            },
            polyline: true,
            circle: true,
            circlemarker: false
        }
    };

    ngOnInit(): void {
    }

    onDrawCreated(event) {
        console.log(event);
        const type = event.layerType;

        if (type === 'marker') {
            event.layer.setIcon(L.icon({
                iconSize: [20, 24],
                iconAnchor: [10, 24],
                iconUrl: this.getMarkerIcon()
            }));

            const availableModules = [];

            if (this.sensorFormComponent.getLoraWanSelectedStatus()) {
                availableModules.push(0);
            }

            if (this.sensorFormComponent.getXbeeSelectedStatus()) {
                availableModules.push(1);
            }

            event.layer.props = {
                id: this.numberOfLayers++,
                availableModules: availableModules,
                modulesOn: [],
                batteryPercentage: this.sensorFormComponent.getBatteryStatus()
            };

        } else {
            // event.layer = event.layer.toGeoJSON();
            event.layer.props = {
                communicationEfficiencyPercentage: this.obstacleFormComponent.getCommunicationEfficiencyPercentage()
            };
        }

    }


    getMarkerFill(id: String) {
        const loraColor = '#3F3665';
        const xbeeColor = '#864545';

        if (this.sensorFormComponent === undefined) {
            return 'none';
        }

        const lora = this.sensorFormComponent.getLoraWanSelectedStatus();
        const xbee = this.sensorFormComponent.getXbeeSelectedStatus();
        let colorToReturn = '';

        if (lora === true && xbee === true) {
            if (id === 'Left') {
                colorToReturn = loraColor;
            } else if (id === 'Right') {
                colorToReturn = xbeeColor;
            }
        } else if (lora === true || xbee === true) {
            colorToReturn = lora === true ? loraColor : xbeeColor;
        } else {
            colorToReturn = 'none';
        }
        return colorToReturn;
    }

    getMarkerIcon() {
        const leftFill = this.getMarkerFill('Left');
        const rightFill = this.getMarkerFill('Right');

        const mySvgString = `<svg width="20px" height="24px" viewBox="0 0 20 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <metadata id="metadata1">image/svg+xml</metadata>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="map-pin" transform="translate(1.000000, 1.000000)" stroke="#000000">
                        <path d="M9,21.9999999 C9,21.9999999 0,15.9999999 0,8.99999987 C7.40671569e-08,4.02943717 4.0294373,-2.22044605e-16 9,0 C13.9705627,2.22044605e-16 17.9999999,4.02943717 18,8.99999987 C18,15.9999999 9,21.9999999 9,21.9999999 Z" id="Path" stroke-width="0.7" fill="#48EF18" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="Indicator" transform="translate(2.000000, 4.000000)" stroke-width="0.4">
                          <path d="M0,0 L4,0 C5.65685425,-3.04359188e-16 7,1.34314575 7,3 L7,3 C7,4.65685425 5.65685425,6 4,6 L0,6" id="Left" fill="` + leftFill + `" transform="translate(3.500000, 3.000000) scale(-1, 1) translate(-3.500000, -3.000000) "/>
                          <path d="M7,0 L11,0 C12.6568542,-3.04359188e-16 14,1.34314575 14,3 L14,3 C14,4.65685425 12.6568542,6 11,6 L7,6" id="Right" fill="` + rightFill + `"/>
                        </g>
                      </g>
                    </g>
                  </svg>`;

        return encodeURI('data:image/svg+xml,' + mySvgString).replace('#', '%23');
    }

    onDrawDeleted(event) {
        console.log(event);
    }

    onDrawEdited(event) {
        console.log(event);
    }

    onMapReady(map) {
        this.map = map;
    }

    startSimulation() {
        var markers = [];
        var polygons = [];
        var circles = [];
        var bounds = [];
        // extract all geometries from the map
        this.map.eachLayer(function (layer) {
            var l: any = layer;

            if (layer instanceof L.Marker) {
                const point: Point = {
                    type: "Point",
                    coordinates: [layer.getLatLng().lat, layer.getLatLng().lng]
                };

                var feature: Feature<Point> = {
                    type: "Feature",
                    properties: l.props,
                    geometry: point
                };

                markers.push(feature);

            } else if (layer instanceof L.Polygon) {
                polygons.push(layer);
            } else if (layer instanceof L.Circle) {
                circles.push(layer);
            } else if (layer instanceof L.Bounds) {
                bounds.push(layer);
            }
        });

        var req = {
            modules: [],
            algorithm: {},
            points: {},
            obstacles: {},
            net: {}
        };
        req.modules = this.modulesFormComponent.getModules();
        console.log(req);
        console.log(markers);







    }


}
