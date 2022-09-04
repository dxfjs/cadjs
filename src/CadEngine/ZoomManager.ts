import { Transform } from './Transform';
import { Point } from '@mathigon/euclid';

export class ZoomManager {
    value: number;
    step: number;
    constructor(public transform: Transform) {
        this.value = 1;
        this.step = 0.18;
    }

    update(mousePosition: Point, beforeZoom: Point) {
        const afterZoom = this.transform.screenToWorld(mousePosition, this.value);
        this.transform.offsetX += beforeZoom.x - afterZoom.x;
        this.transform.offsetY += beforeZoom.y - afterZoom.y;
    }

    zoomIn(mousePosition: Point) {
        const beforeZoom = this.transform.screenToWorld(mousePosition, this.value);
        this.value *= 1 + this.step;
        this.update(mousePosition, beforeZoom);
    }

    zoomOut(mousePosition: Point) {
        const beforeZoom = this.transform.screenToWorld(mousePosition, this.value);
        this.value *= 1 - this.step;
        this.update(mousePosition, beforeZoom);
    }
}
