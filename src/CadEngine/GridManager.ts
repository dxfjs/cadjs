import { Renderable } from './Interfaces/Renderable';
import { ZoomManager } from './ZoomManager';
import { Point } from '@mathigon/euclid';

export class GridManager implements Renderable {
    value = 100; // TODO Need a dynamic way to update according to zoom.
    constructor(private zoomManager: ZoomManager) {}

    update() {}

    render(ctx: CanvasRenderingContext2D): void {
        const cw = ctx.canvas.width;
        const ch = ctx.canvas.height;

        const topleft = this.zoomManager.transform.screenToWorld(
            new Point(0, 0),
            this.zoomManager.value
        );
        const bottomright = this.zoomManager.transform.screenToWorld(
            new Point(cw, ch),
            this.zoomManager.value
        );
        const nx = Math.ceil((bottomright.x - topleft.x) / this.value);
        const ny = Math.ceil((bottomright.y - topleft.y) / this.value);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5 / this.zoomManager.value;
        const x = Math.ceil(topleft.x / this.value) * this.value;
        const y = Math.ceil(topleft.y / this.value) * this.value;
        ctx.beginPath();
        for (let i = 0; i < nx; i++) {
            ctx.moveTo(x + this.value * i, bottomright.y);
            ctx.lineTo(x + this.value * i, topleft.y);
        }
        for (let i = 0; i < ny; i++) {
            ctx.moveTo(bottomright.x, y + this.value * i);
            ctx.lineTo(topleft.x, y + this.value * i);
        }
        ctx.closePath();
        ctx.stroke();
    }
}
