import { vec2_t } from '../types';
import { Shape } from './shape';

export class Arc extends Shape {
    center?: vec2_t;
    radius?: number;
    startAngle: number;
    endAngle: number;

    constructor() {
        super();
        this.startAngle = 0;
        this.endAngle = 0;
    }
    render(ctx: CanvasRenderingContext2D): void {
        if (!(this.center && this.radius != null)) return;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, this.startAngle, this.endAngle);
        ctx.stroke();
    }
}
