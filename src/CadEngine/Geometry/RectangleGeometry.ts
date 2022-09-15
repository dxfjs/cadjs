import { Point, Rectangle } from '@mathigon/euclid';
import { ArcGeometry } from './ArcGeometry';
import { BBoxGeometry } from './BBoxGeometry';
import { BoundingBox } from './BoundingBox';
import { CircleGeometry } from './CircleGeometry';
import { PointGeometry } from './PointGeometry';
import { SegmentGeometry } from './SegmentGeometry';
import { point, segment } from './GeometryUtils';

export class RectangleGeometry {
    topleft: PointGeometry;
    width: number;
    height: number;

    get segments() {
        return [this.top, this.right, this.bottom, this.left];
    }

    get top() {
        return segment(
            this.topleft,
            point(this.topleft.x + this.width, this.topleft.y)
        );
    }

    get right() {
        return segment(
            point(this.topleft.x + this.width, this.topleft.y),
            point(this.topleft.x + this.width, this.topleft.y + this.height)
        );
    }

    get bottom() {
        return segment(
            point(this.topleft.x + this.width, this.topleft.y + this.height),
            point(this.topleft.x, this.topleft.y + this.height)
        );
    }

    get left() {
        return segment(
            point(this.topleft.x, this.topleft.y + this.height),
            this.topleft
        );
    }

    get geometry() {
        return new Rectangle(this.topleft.geometry, this.width, this.height);
    }

    get bbox(): BBoxGeometry {
        return BoundingBox.rectangle(this);
    }

    get x() {
        return this.topleft.x;
    }

    get y() {
        return this.topleft.y;
    }

    constructor(topleft: PointGeometry, width: number, height: number) {
        this.topleft = topleft;
        this.width = width;
        this.height = height;
    }

    adjust() {
        if (this.width < 0) {
            this.topleft.x += this.width;
            this.width = -this.width;
        }
        if (this.height < 0) {
            this.topleft.y += this.height;
            this.height = -this.height;
        }
    }

    intersects(
        geometry:
            | ArcGeometry
            | CircleGeometry
            | SegmentGeometry
            | RectangleGeometry
    ) {
        const pts: Point[] = [];
        this.segments.forEach((segment) =>
            pts.push(...geometry.intersects(segment))
        );
        return pts.filter((p) => this.contains(point(p.x, p.y)));
    }

    contains(p: PointGeometry) {
        return (
            this.top.contains(p) ||
            this.right.contains(p) ||
            this.bottom.contains(p) ||
            this.left.contains(p)
        );
    }
}
