import { PointGeometry } from './Geometry/PointGeometry';
import { point } from './Geometry/GeometryUtils';

export class Transform {
    offsetX: number;
    offsetY: number;

    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    worldToScreen(position: PointGeometry, zoom: number): PointGeometry {
        return point(
            (position.x - this.offsetX) * zoom,
            (position.y - this.offsetY) * zoom
        );
    }

    screenToWorld(position: PointGeometry, zoom: number): PointGeometry {
        return point(
            position.x / zoom + this.offsetX,
            position.y / zoom + this.offsetY
        );
    }
}
