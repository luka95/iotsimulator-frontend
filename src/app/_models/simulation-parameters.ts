import { CommunicationModule, AlgorithmParameters } from '../_models';
import { FeatureCollection } from 'geojson';

export interface SimulationParameters {
    modules: CommunicationModule[];
    algorithm: AlgorithmParameters;
    points: FeatureCollection;
    obstacles: FeatureCollection;
    net: FeatureCollection;
}
