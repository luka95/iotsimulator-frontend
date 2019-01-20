import {Component, OnInit, ViewChild} from '@angular/core';

import * as L from 'leaflet';
import {featureGroup, FeatureGroup, latLng, Layer, marker, tileLayer} from 'leaflet';
import {SensorFormComponent} from '../sensor-form/sensor-form.component';
import {ObstacleFormComponent} from '../obstacle-from/obstacle-form.component';
import {FeatureCollection} from 'geojson';
import {CommunicationModule} from '../modules-form/modules-form.component';
import {AlgorithmParameters, SimulationFormComponent} from '../simulation-form/simulation-form.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ModulesDataService, SimulationService} from '../_services';

export interface SimulationParameters {
    modules: CommunicationModule[];
    algorithm: AlgorithmParameters;
    points: FeatureCollection;
    obstacles: FeatureCollection;
    net: FeatureCollection;
}

@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html'
})
export class LayersComponent implements OnInit {

    @ViewChild(SensorFormComponent) sensorFormComponent;
    @ViewChild(ObstacleFormComponent) obstacleFormComponent;
    @ViewChild(SimulationFormComponent) simulationFormComponent;

    map: any;
    loading = false;

    constructor(private sanitizer: DomSanitizer,
                private simulationService: SimulationService,
                private modulesDataService: ModulesDataService) {
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

    layers: Layer[] = [];
    editableLayers: FeatureGroup = featureGroup();

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
        },
        edit: {
            featureGroup: this.editableLayers
        }
    };

    static hasFeatures(featureCollection: FeatureCollection): boolean {
        return featureCollection.features !== undefined && featureCollection.features.length > 0;
    }

    ngOnInit(): void {
    }

    applyConfiguration(configuration: SimulationParameters): void {
        console.log(this.map);
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Polyline) {
                this.map.removeLayer(layer);
            }
        });
        this.layers = []; // remove existing layers
        console.log(this.map);
        console.log(configuration);

        this.simulationFormComponent.setAlgorithmParameters(configuration.algorithm);
        this.modulesDataService.updateModules(configuration.modules);

        this.drawPoints(configuration.points);
        this.drawObstaclesAndNet(configuration.obstacles, '#000000');
        this.drawObstaclesAndNet(configuration.net, '#ff1c17');
    }

    drawPoints(featureCollection: FeatureCollection): void {
        const newLayers = [];
        if (LayersComponent.hasFeatures(featureCollection)) {
            featureCollection.features.forEach((value) => {
                const layer = marker((value.geometry as any).coordinates.reverse());
                const availableModules = value.properties.availableModules;
                layer.setIcon(L.icon({
                    iconSize: [20, 24],
                    iconAnchor: [10, 24],
                    iconUrl: this.getMarkerIcon(availableModules.includes(0), availableModules.includes(1))
                }));

                (layer as any).props = value.properties;
                console.log(this.layers);
                this.editableLayers.addLayer(layer);
                layer.options.draggable = true;
                layer.options.clickable = true;
                newLayers.push(layer);
                this.map.addLayer(layer);
                console.log(this.layers);
            });
        }
        this.layers = newLayers;
    }

    drawObstaclesAndNet(featureCollection: FeatureCollection, color: string): void {
        if (LayersComponent.hasFeatures(featureCollection)) {
            featureCollection.features.forEach((value) => {
                console.log(value);
                let layer;
                if (value.geometry.type === 'Polygon') {
                    const reversedCoordinates = (value.geometry as any).coordinates;
                    const coordinates = [];

                    reversedCoordinates.forEach(arr => {
                        arr.forEach(arr2 => {
                            coordinates.push(arr2.reverse());
                        });
                    });

                    layer = L.polygon(coordinates);
                } else if (value.geometry.type === 'LineString') {
                    const reversedCoordinates = (value.geometry as any).coordinates;
                    const coordinates = [];

                    reversedCoordinates.forEach(arr => {
                        coordinates.push(arr.reverse());
                    });

                    layer = L.polyline((value.geometry as any).coordinates);
                } else {
                    return;
                }

                (layer as any).props = value.properties;
                layer.setStyle(() => ({ color: color }));
                console.log(this.layers);
                this.editableLayers.addLayer(layer);
                this.layers.push(layer);
                this.map.addLayer(layer);
                console.log(this.layers);
            });
        }
    }

    handleFileUpload($event): void {
        const file = $event.target.files.item(0);
        const reader = new FileReader();

        reader.readAsText(file);
        reader.onload = ev => this.applyConfiguration(JSON.parse((ev as any).target.result));
    }

    onDrawCreated(event): void {
        if (event.layerType === 'marker') {
            console.log(event.layer);
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
        this.layers.push(event.layer);
        this.map.removeLayer(event.layer);
    }

    getMarkerFill(id: String, loraAvailable?: boolean, xbeeAvailable?: boolean): string {
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

    getMarkerIcon(loraAvailable?: boolean, xbeeAvailable?: boolean): string {
        const leftFill = this.getMarkerFill('Left', loraAvailable, xbeeAvailable);
        const rightFill = this.getMarkerFill('Right', loraAvailable, xbeeAvailable);

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

    onMapReady(map): void {
        this.map = map;
    }

    startSimulation(): void {
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
        const simulationParameters: SimulationParameters = this.getAllSimulationParameters();
        const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(simulationParameters));
        return this.sanitizer.bypassSecurityTrustUrl(data);
    }

    selectFile() {
        document.getElementById('file').click();
    }

    getAllSimulationParameters(): SimulationParameters {
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

            if (l.props === undefined) {
                return;
            }

            if (layer instanceof L.Marker) {
                const point = layer.toGeoJSON();
                point.properties = l.props;
                markers.features.push(point);
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

        return {
            modules: this.modulesDataService.getModules(),
            algorithm: this.simulationFormComponent.getAlgorithmParameters(),
            points: markers,
            obstacles: obstacles,
            net: {
                type: 'FeatureCollection',
                features: []
            }
        };
    }
}
