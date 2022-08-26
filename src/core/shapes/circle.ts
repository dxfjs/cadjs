import { vec2_t } from '../types';
import { Shape } from './shape';

export class Circle extends Shape {
    center?: vec2_t;
    radius?: number;
    render(ctx: CanvasRenderingContext2D): void {
        if (!(this.center && this.radius != null)) return;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
