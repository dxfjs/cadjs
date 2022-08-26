import { vec2_t } from '@tarikjabiri/dxf';
import { Renderable } from '../interfaces';
import { s2w, vec2 } from './helpers';
import { ZoomManager } from './zoom';

export class Grid implements Renderable {
    value = 100; // TODO Need a dynamic way to update according to zoom
    constructor(private offset: vec2_t, private zm: ZoomManager) {}

    ceil(v: number, w: number) {
        return v - (v % w);
    }

    update() {}

    render(ctx: CanvasRenderingContext2D): void {
        const cw = ctx.canvas.width;
        const ch = ctx.canvas.height;
        const tl: vec2_t = s2w(vec2(0, 0), this.offset, this.zm.value);
        const br: vec2_t = s2w(vec2(cw, ch), this.offset, this.zm.value);

        const nx = (br.x - tl.x) / this.value;
        const ny = (br.y - tl.y) / this.value;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5 / this.zm.value;
        ctx.beginPath();
        for (let i = 0; i < nx; i++) {
            const x = this.ceil(tl.x, this.value);
            ctx.moveTo(x + this.value * i, br.y);
            ctx.lineTo(x + this.value * i, tl.y);
        }
        for (let i = 0; i < ny; i++) {
            const y = this.ceil(tl.y, this.value);
            ctx.moveTo(br.x, y + this.value * i);
            ctx.lineTo(tl.x, y + this.value * i);
        }
        ctx.stroke();
    }
}
