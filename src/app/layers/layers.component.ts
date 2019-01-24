import { Component, OnInit, ViewChild } from '@angular/core';

import * as L from 'leaflet';
import { featureGroup, FeatureGroup, latLng, Layer, marker, tileLayer } from 'leaflet';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';
import { ObstacleFormComponent } from '../obstacle-from/obstacle-form.component';
import { FeatureCollection } from 'geojson';
import { AlgorithmFormComponent } from '../algorithm-form/algorithm-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SimulationParameters } from '../_models';
import { ModulesDataService, SimulationService } from '../_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowModelComponent } from '../_modals/show-model';


@Component({
    selector: 'app-layers',
    templateUrl: './layers.component.html'
})
export class LayersComponent implements OnInit {

    @ViewChild(SensorFormComponent) sensorFormComponent;
    @ViewChild(ObstacleFormComponent) obstacleFormComponent;
    @ViewChild(AlgorithmFormComponent) simulationFormComponent;

    map: any;
    loading = false;
    error: string;

    constructor(private sanitizer: DomSanitizer,
                private simulationService: SimulationService,
                private modulesDataService: ModulesDataService,
                private modalService: NgbModal) {
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
    layersControlOptions = {position: 'bottomright'};
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
                    iconUrl: this.getMarkerIcon(),
                    popupAnchor: [0, -24]
                })
            },
            polyline: false,
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
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Polyline) {
                this.map.removeLayer(layer);
            }
        });
        this.layers = []; // remove existing layers
        this.simulationFormComponent.setAlgorithmParameters(configuration.algorithm);

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
                    iconUrl: this.getMarkerIcon(availableModules.includes(0), availableModules.includes(1)),
                    popupAnchor: [0, -24]
                }));

                (layer as any).props = value.properties;
                layer.bindPopup(this.getSensorPopupContent((layer as any).props));
                this.editableLayers.addLayer(layer);
                layer.options.draggable = true;
                layer.options.clickable = true;
                newLayers.push(layer);
                this.map.addLayer(layer);
            });
        }
        this.layers = newLayers;
    }

    drawObstaclesAndNet(featureCollection: FeatureCollection, color: string): void {
        if (LayersComponent.hasFeatures(featureCollection)) {
            featureCollection.features.forEach((value) => {
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
                    layer.bindPopup(this.getObstaclePopupContent(value.properties));
                } else if (value.geometry.type === 'LineString') {
                    const reversedCoordinates = (value.geometry as any).coordinates;
                    const coordinates = [];

                    reversedCoordinates.forEach(arr => {
                        coordinates.push(arr.reverse());
                    });

                    layer = L.polyline((value.geometry as any).coordinates);
                    const mColor = this.modulesDataService.getColorByModuleId(value.properties.module);
                    layer.setStyle({
                        color: mColor
                    });
                } else {
                    return;
                }

                (layer as any).props = value.properties;
                this.editableLayers.addLayer(layer);
                this.layers.push(layer);
                this.map.addLayer(layer);
            });
        }
    }

    handleFileUpload($event): void {
        const file = $event.target.files.item(0);
        const reader = new FileReader();

        reader.readAsText(file);
        reader.onload = ev => this.applyConfiguration(JSON.parse((ev as any).target.result));
    }

    onDrawDeleted(event) {
        console.log(event.layers.eachLayer(layer => {
            const layerIndex = this.layers.indexOf(layer);
            this.layers.splice(layerIndex, 1);
        }));
    }

    onDrawCreated(event): void {
        if (event.layerType === 'marker') {
            event.layer.setIcon(L.icon({
                iconSize: [20, 24],
                iconAnchor: [10, 24],
                iconUrl: this.getMarkerIcon(),
                popupAnchor: [0, -24]
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
            event.layer.bindPopup(this.getSensorPopupContent(event.layer.props));

        } else {
            event.layer.props = {
                communicationEfficiencyPercentage: this.obstacleFormComponent.getCommunicationEfficiencyPercentage(),
                height: this.obstacleFormComponent.getHeight()
            };
            event.layer.bindPopup(this.getObstaclePopupContent(event.layer.props));
        }
        this.layers.push(event.layer);
        this.map.removeLayer(event.layer);
    }

    getSensorPopupContent(props: any): string {
        return L.Util.template(
            '<p>id:{id}<br>' +
            'available modules: [{availableModules}]<br>' +
            'modules on: [{modulesOn}]<br>' +
            'battery percentage: {batteryPercentage}<br>' +
            '</p>', props);
    }

    getObstaclePopupContent(props: any): string {
        return L.Util.template(
            '<p>communication efficiency :{communicationEfficiencyPercentage}%<br>' +
            'height: {height}</p>', props);
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

    findPointById(model: SimulationParameters, id: number): any {
        for (let i = 0; i < model.points.features.length; i++) {
            if (model.points.features[i].properties.id === id) {
                return model.points.features[i];
            }
        }
        return undefined;
    }

    startSimulation(): void {
        this.loading = true;

        const simulationParameters = this.getAllSimulationParameters();

        // validation
        if (simulationParameters.points.features.length === 0) {
            this.loading = false;
            this.error = 'Nije postavljen niti jedan čvor';
            return;
        }

        if (simulationParameters.algorithm.reducer.id) {
            const srcNode = this.findPointById(simulationParameters, simulationParameters.algorithm.reducer.id);
            if (!srcNode) {
                this.loading = false;
                this.error = 'Čvor ' + simulationParameters.algorithm.reducer.id + ' ne postoji na karti';
                return;
            }
        }


        this.simulationService.createSimulation(simulationParameters)
            .subscribe(
                data => {
                    this.loading = false;
                },
                error => {
                    this.loading = false;
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

    showModelPopup(): void {
        const modalRef = this.modalService.open(ShowModelComponent, {size: 'lg'});
        modalRef.componentInstance.data = this.getAllSimulationParameters();
    }

    closeAlert(): void {
        this.error = '';
    }
}
