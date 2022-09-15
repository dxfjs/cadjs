import { PointGeometry } from './Geometry/PointGeometry';
import { Transform } from './Transform';

export class ZoomManager {
    value: number;
    step: number;
    constructor(public transform: Transform) {
        this.value = 1;
        this.step = 0.18;
    }

    update(mousePosition: PointGeometry, beforeZoom: PointGeometry) {
        const afterZoom = this.transform.screenToWorld(
            mousePosition,
            this.value
        );
        this.transform.offsetX += beforeZoom.x - afterZoom.x;
        this.transform.offsetY += beforeZoom.y - afterZoom.y;
    }

    zoomIn(mousePosition: PointGeometry) {
        const beforeZoom = this.transform.screenToWorld(
            mousePosition,
            this.value
        );
        this.value *= 1 + this.step;
        this.update(mousePosition, beforeZoom);
    }

    zoomOut(mousePosition: PointGeometry) {
        const beforeZoom = this.transform.screenToWorld(
            mousePosition,
            this.value
        );
        this.value *= 1 - this.step;
        this.update(mousePosition, beforeZoom);
    }
}
