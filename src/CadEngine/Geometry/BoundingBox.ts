import { ArcGeometry } from './ArcGeometry';
import { BBoxGeometry } from './BBoxGeometry';
import { CircleGeometry } from './CircleGeometry';
import { PointGeometry } from './PointGeometry';
import { RectangleGeometry } from './RectangleGeometry';
import { SegmentGeometry } from './SegmentGeometry';
import { bbox, circle, point } from './GeometryUtils';

export class BoundingBox {
    static points(points: PointGeometry[]): BBoxGeometry {
        let xmax = -Infinity;
        let ymax = -Infinity;
        let xmin = Infinity;
        let ymin = Infinity;
        points.forEach((p) => {
            if (p.x > xmax) xmax = p.x;
            if (p.y > ymax) ymax = p.y;
            if (p.x < xmin) xmin = p.x;
            if (p.y < ymin) ymin = p.y;
        });
        return bbox(point(xmax, ymax), point(xmin, ymin));
    }

    static circle(c: CircleGeometry): BBoxGeometry {
        return bbox(
            point(c.center.x - c.radius, c.center.y - c.radius),
            point(c.center.x + c.radius, c.center.y + c.radius)
        );
    }

    static arc(a: ArcGeometry): BBoxGeometry {
        const points = [a.start, a.end];
        const c = circle(a.center, a.radius);
        if (a.contains(c.top)) points.push(c.top);
        if (a.contains(c.bottom)) points.push(c.bottom);
        if (a.contains(c.left)) points.push(c.left);
        if (a.contains(c.right)) points.push(c.right);
        return BoundingBox.points(points);
    }

    static segment(s: SegmentGeometry): BBoxGeometry {
        return BoundingBox.points([s.start, s.end]);
    }

    static rectangle(r: RectangleGeometry): BBoxGeometry {
        return bbox(r.topleft, r.bottom.start);
    }

    static union(bboxes: BBoxGeometry[]): BBoxGeometry {
        const points: PointGeometry[] = [];
        bboxes.forEach((bbox) => points.push(bbox.topleft, bbox.bottomright));
        return BoundingBox.points(points);
    }
}
