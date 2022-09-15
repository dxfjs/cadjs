import { Point } from '@mathigon/euclid';
import { BBoxGeometry } from './BBoxGeometry';
import { BoundingBox } from './BoundingBox';
import { angle } from './GeometryUtils';

export class PointGeometry {
    x: number;
    y: number;

    get geometry(): Point {
        return new Point(this.x, this.y);
    }

    get bbox(): BBoxGeometry {
        return BoundingBox.points([this]);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    angle(p: PointGeometry) {
        return angle(this, p);
    }
}
