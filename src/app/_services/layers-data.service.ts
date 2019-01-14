import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FeatureCollection} from 'geojson';

@Injectable()
export class LayersDataService {

    private pointsSource = new BehaviorSubject<FeatureCollection>({type: 'FeatureCollection', features: []});
    currentPoints = this.pointsSource.asObservable();

    private obstaclesSource = new BehaviorSubject<FeatureCollection>({type: 'FeatureCollection', features: []});
    currentObstacles = this.obstaclesSource.asObservable();

    constructor() {
    }

    changePoints(points: FeatureCollection) {
        this.pointsSource.next(points);
    }

    changeObstacles(obstacles: FeatureCollection) {
        this.obstaclesSource.next(obstacles);
    }
}
