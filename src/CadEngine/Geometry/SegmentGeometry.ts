import { Line } from '@mathigon/euclid';
import { BBoxGeometry } from './BBoxGeometry';
import { BoundingBox } from './BoundingBox';
import { PointGeometry } from './PointGeometry';
import { distance, intersect, point } from './GeometryUtils';

export class SegmentGeometry {
    start: PointGeometry;
    end: PointGeometry;

    get geometry(): Line {
        return new Line(this.start.geometry, this.end.geometry);
    }

    get bbox(): BBoxGeometry {
        return BoundingBox.segment(this);
    }

    constructor(first: PointGeometry, second: PointGeometry) {
        this.start = first;
        this.end = second;
    }

    contains(p: PointGeometry): boolean {
        const sd = distance(this.start, p);
        const ed = distance(this.end, p);
        const d = distance(this.start, this.end);
        return Math.fround(sd + ed) === Math.fround(d);
    }

    intersects(segment: SegmentGeometry) {
        const pts = intersect(segment, this);
        return pts.filter((p) => {
            const pg = point(p.x, p.y);
            return segment.contains(pg) && this.contains(pg);
        });
    }
}
