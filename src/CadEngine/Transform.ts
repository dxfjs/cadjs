import { Point } from '@mathigon/euclid';

export class Transform {
    offsetX: number;
    offsetY: number;

    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    worldToScreen(position: Point, zoom: number): Point {
        return new Point(
            (position.x - this.offsetX) * zoom,
            (position.y - this.offsetY) * zoom
        );
    }

    screenToWorld(position: Point, zoom: number): Point {
        return new Point(
            position.x / zoom + this.offsetX,
            position.y / zoom + this.offsetY
        );
    }
}
