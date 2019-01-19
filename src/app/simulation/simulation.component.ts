import { Component, OnInit, ViewChild } from '@angular/core';

import * as L from 'leaflet';
import { geoJSON, latLng, tileLayer } from 'leaflet';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';
import { ObstacleFormComponent } from '../obstacle-from/obstacle-form.component';
import { Feature, FeatureCollection, Point } from 'geojson';
import { CommunicationModule, ModulesFormComponent } from '../modules-form/modules-form.component';
import { SimulationFormComponent } from '../simulation-form/simulation-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SimulationService } from '../_services/simulation.service';
import { ModulesDataService } from '../_services/modules-data.service';
import { ActivatedRoute } from "@angular/router";

export interface SimulationParameters {
    modules: CommunicationModule[];
    algorithm: {};
    points: FeatureCollection;
    obstacles: FeatureCollection;
    net: FeatureCollection;
}

@Component({
    selector: 'app-layers',
    templateUrl: './simulation.component.html'
})
export class SimulationComponent implements OnInit {

    @ViewChild(SensorFormComponent) sensorFormComponent;
    @ViewChild(ObstacleFormComponent) obstacleFormComponent;
    @ViewChild(SimulationFormComponent) simulationFormComponent;

    map: any;
    loading: boolean = false;
    simId: string;

    constructor(private sanitizer: DomSanitizer, public activatedRouter: ActivatedRoute, private simulationService: SimulationService, private modulesDataService: ModulesDataService) {
        this.simId = this.activatedRouter.snapshot.params['id'];
        console.log(this.simId);
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
            circle: false,
            circlemarker: false
        }
    };

    static hasFeatures(featureCollection: FeatureCollection): boolean {
        return featureCollection.features !== undefined && featureCollection.features.length > 0;
    }

    ngOnInit(): void {
    }

    applyConfiguration(configuration: SimulationParameters) {
        this.map.eachLayer(function (layer) {
            if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Polyline) {
                layer.remove();
            }
        });

        console.log(configuration);

        // this.drawObstacles(configuration.points);
        this.drawObstaclesAndNet(configuration.obstacles, '#ffcb7a');
        this.drawObstaclesAndNet(configuration.obstacles, '#ff1c17');

    }

    // drawPoints(featureCollection: FeatureCollection) {
    //     if (LayersComponent.hasFeatures(featureCollection)) {
    //         featureCollection.features.forEach((value) => {
    //             const layer = geoJSON(value);
    //             layer.setIcon(L.icon({
    //                 iconSize: [20, 24],
    //                 iconAnchor: [10, 24],
    //                 iconUrl: this.getMarkerIcon()
    //             }));
    //
    //             this.map.addLayer(layer);
    //         });
    //     }
    // }

    drawObstaclesAndNet(featureCollection: FeatureCollection, color: string) {
        if (SimulationComponent.hasFeatures(featureCollection)) {
            featureCollection.features.forEach((value) => {
                const layer = geoJSON(value);
                layer.setStyle(() => ({ color: color }));
                this.map.addLayer(layer);
            });
        }
    }

    handleFileUpload($event) {
        const file = $event.target.files.item(0);
        const reader = new FileReader();

        reader.readAsText(file);
        reader.onload = ev => this.applyConfiguration(JSON.parse((ev as any).target.result));
    }

    onDrawCreated(event) {
        if (event.layerType === 'marker') {
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
            event.layer.props = {
                communicationEfficiencyPercentage: this.obstacleFormComponent.getCommunicationEfficiencyPercentage(),
                height: this.obstacleFormComponent.getHeight()
            };
        }

    }

    getMarkerFill(id: String, loraAvailable?: boolean, xbeeAvailable?: boolean) {
        if (this.sensorFormComponent === undefined) {
            return 'none';
        }

        if (loraAvailable === undefined) {
            loraAvailable = this.sensorFormComponent.getLoraWanSelectedStatus();
        }

        if (xbeeAvailable === undefined) {
            xbeeAvailable = this.sensorFormComponent.getXbeeSelectedStatus();
        }

        const loraColor = '#3F3665';
        const xbeeColor = '#864545';

        let colorToReturn = '';

        if (loraAvailable === true && xbeeAvailable === true) {
            if (id === 'Left') {
                colorToReturn = loraColor;
            } else if (id === 'Right') {
                colorToReturn = xbeeColor;
            }
        } else if (loraAvailable === true || xbeeAvailable === true) {
            colorToReturn = loraAvailable === true ? loraColor : xbeeColor;
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

    onMapReady(map) {
        this.map = map;
    }

    startSimulation() {
        this.loading = true;
        const simulationParameters = this.getAllSimulationParameters();
        this.simulationService.createSimulation(simulationParameters)
            .subscribe(
                data => {
                    this.loading = false;
                    console.log(data);
                },
                error => {
                    this.loading = false;
                    console.log(error);
                });
    }

    export() {
        const simulationParameters = this.getAllSimulationParameters();
        const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(simulationParameters));
        return this.sanitizer.bypassSecurityTrustUrl(data);
    }

    selectFile() {
        document.getElementById("file").click();
    }

    getAllSimulationParameters() {
        const markers: FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        const obstacles: FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };
        // extract all geometries from the map
        this.map.eachLayer(function (layer) {
            const l: any = layer;

            if (layer instanceof L.Marker) {
                const point: Point = {
                    type: 'Point',
                    coordinates: [layer.getLatLng().lat, layer.getLatLng().lng]
                };

                const feature: Feature<Point> = {
                    type: 'Feature',
                    properties: l.props,
                    geometry: point
                };

                markers.features.push(feature);

            } else if (layer instanceof L.Polygon) {
                const polygon = layer.toGeoJSON();
                polygon.properties = l.props;
                obstacles.features.push(polygon);
            } else if (layer instanceof L.Polyline) {
                const polyline = layer.toGeoJSON();
                polyline.properties = l.props;
                obstacles.features.push(polyline);
            }
        });

        const simulationParameters = {
            modules: [],
            algorithm: {},
            points: {},
            obstacles: {}
        };

        simulationParameters.algorithm = this.simulationFormComponent.getAlgorthmParameters();
        simulationParameters.modules = this.modulesDataService.getModules();
        simulationParameters.obstacles = obstacles;
        simulationParameters.points = markers;

        return simulationParameters;
    }
}