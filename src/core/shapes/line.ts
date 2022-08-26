import { vec2_t } from '../types';
import { Shape } from './shape';

export class Line extends Shape {
    start?: vec2_t;
    end?: vec2_t;
    constructor() {
        super();
    }

    render(ctx: CanvasRenderingContext2D): void {
        if (!(this.start && this.end)) return;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }
}
