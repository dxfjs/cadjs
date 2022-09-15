import { BBoxGeometry } from '../Geometry/BBoxGeometry';

export interface Geometry<G> {
    get geometry(): G;
    get bbox(): BBoxGeometry;
}
