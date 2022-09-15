import {
    Arc,
    Circle,
    intersections,
    Line,
    Point,
    Rectangle,
} from '@mathigon/euclid';
import { Geometry } from '../Interfaces/Geometry';
import { ArcGeometry } from './ArcGeometry';
import { BBoxGeometry } from './BBoxGeometry';
import { CircleGeometry } from './CircleGeometry';
import { PointGeometry } from './PointGeometry';
import { RectangleGeometry } from './RectangleGeometry';
import { SegmentGeometry } from './SegmentGeometry';

export function distance(first: PointGeometry, second: PointGeometry): number {
    return Point.distance(first, second);
}

export function angle(first: PointGeometry, second: PointGeometry): number {
    return new Line(first.geometry, second.geometry).angle;
}

export function intersect(
    ...geometries: Geometry<Line | Arc | Circle | Rectangle>[]
) {
    return intersections(...geometries.map((g) => g.geometry));
}

export function point(x: number, y: number): PointGeometry {
    return new PointGeometry(x, y);
}

export function segment(
    first: PointGeometry,
    second: PointGeometry
): SegmentGeometry {
    return new SegmentGeometry(first, second);
}

export function circle(center: PointGeometry, radius: number): CircleGeometry {
    return new CircleGeometry(center, radius);
}

export function rectangle(
    topleft: PointGeometry,
    bottomright: PointGeometry
): RectangleGeometry {
    const width = distance(topleft, point(bottomright.x, topleft.y));
    const height = distance(topleft, point(topleft.x, bottomright.y));
    return new RectangleGeometry(topleft, width, height);
}

export function arc(
    center: PointGeometry,
    radius: number,
    startAngle: number,
    endAngle: number
): ArcGeometry {
    return new ArcGeometry(center, radius, startAngle, endAngle);
}

export function bbox(topleft: PointGeometry, bottomright: PointGeometry) {
    return new BBoxGeometry(topleft, bottomright);
}
