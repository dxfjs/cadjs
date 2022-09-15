import { Circle } from '@mathigon/euclid';
import { Geometry } from '../Interfaces/Geometry';
import { BBoxGeometry } from './BBoxGeometry';
import { BoundingBox } from './BoundingBox';
import { PointGeometry } from './PointGeometry';
import { SegmentGeometry } from './SegmentGeometry';
import { distance, intersect, point } from './GeometryUtils';

export class CircleGeometry implements Geometry<Circle> {
    center: PointGeometry;
    radius: number;

    get geometry() {
        return new Circle(this.center.geometry, this.radius);
    }

    get top() {
        return point(this.center.x, this.center.y + this.radius);
    }

    get bottom() {
        return point(this.center.x, this.center.y - this.radius);
    }

    get left() {
        return point(this.center.x - this.radius, this.center.y);
    }

    get right() {
        return point(this.center.x + this.radius, this.center.y);
    }

    get bbox(): BBoxGeometry {
        return BoundingBox.circle(this);
    }

    get cx() {
        return this.center.x;
    }

    get cy() {
        return this.center.y;
    }

    get r() {
        return this.radius;
    }

    constructor(center: PointGeometry, radius: number) {
        this.center = center;
        this.radius = radius;
    }

    contains(p: PointGeometry) {
        return distance(this.center, p) === this.radius;
    }

    intersects(segment: SegmentGeometry) {
        const pts = intersect(segment, this);
        return pts.filter((p) => segment.contains(point(p.x, p.y)));
    }
}
