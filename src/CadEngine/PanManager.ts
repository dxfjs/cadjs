import { ZoomManager } from './ZoomManager';
import { Point } from '@mathigon/euclid';

export class PanManager {
    private panning: boolean;
    private origin: Point;

    constructor(public canvas: HTMLCanvasElement, public zoomManager: ZoomManager) {
        this.panning = false;
        this.origin = new Point(0, 0);
    }

    start(mousePosition: Point): void {
        this.panning = true;
        this.origin = mousePosition;
        this.canvas.classList.add('cadjs__pan');
    }

    stop(): void {
        this.panning = false;
        this.canvas.classList.remove('cadjs__pan');
    }

    update(mousePosition: Point): void {
        if (this.panning) {
            const dx = (mousePosition.x - this.origin.x) / this.zoomManager.value;
            const dy = (mousePosition.y - this.origin.y) / this.zoomManager.value;
            this.zoomManager.transform.offsetX -= dx;
            this.zoomManager.transform.offsetY -= dy;
            this.origin = mousePosition;
        }
    }
}
