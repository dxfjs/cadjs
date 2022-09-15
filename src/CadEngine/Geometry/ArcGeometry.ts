import { Arc } from '@mathigon/euclid';
import { Geometry } from '../Interfaces/Geometry';
import { BBoxGeometry } from './BBoxGeometry';
import { BoundingBox } from './BoundingBox';
import { PointGeometry } from './PointGeometry';
import { SegmentGeometry } from './SegmentGeometry';
import { angle, circle, intersect, point } from './GeometryUtils';

export class ArcGeometry implements Geometry<Arc> {
    center: PointGeometry;
    radius: number;
    startAngle: number;
    endAngle: number;

    get start() {
        const x = this.center.x + this.radius * Math.cos(this.startAngle);
        const y = this.center.y + this.radius * Math.sin(this.startAngle);
        return point(x, y);
    }

    get end() {
        const x = this.center.x + this.radius * Math.cos(this.endAngle);
        const y = this.center.y + this.radius * Math.sin(this.endAngle);
        return point(x, y);
    }

    get geometry(): Arc {
        return new Arc(
            this.center.geometry,
            this.start.geometry,
            this.endAngle - this.startAngle
        );
    }

    constructor(
        center: PointGeometry,
        radius: number,
        startAngle: number,
        endAngle: number
    ) {
        this.center = center;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    contains(p: PointGeometry) {
        const _angle = angle(this.center, p);
        if (this.startAngle < this.endAngle)
            return this.startAngle <= _angle && _angle <= this.endAngle;
        else return !(this.endAngle <= _angle && _angle <= this.startAngle);
    }

    intersects(segment: SegmentGeometry) {
        const pts = intersect(segment, circle(this.center, this.radius));
        return pts.filter((p) => {
            const pg = point(p.x, p.y);
            return segment.contains(pg) && this.contains(pg);
        });
    }

    get bbox(): BBoxGeometry {
        return BoundingBox.arc(this);
    }
}
