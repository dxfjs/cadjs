import { s2w } from './helpers';
import { vec2_t } from '../types';

export class ZoomManager {
    value: number;
    step: number;
    constructor(public ctx: CanvasRenderingContext2D, private offset: vec2_t) {
        this.value = 1;
        this.step = 0.18;
    }

    update(mp: vec2_t, bz: vec2_t) {
        const az = s2w(mp, this.offset, this.value);
        this.offset.x += bz.x - az.x;
        this.offset.y += bz.y - az.y;
    }

    zoomIn(mp: vec2_t) {
        const bz = s2w(mp, this.offset, this.value);
        this.value *= 1 + this.step;
        this.update(mp, bz);
    }

    zoomOut(mp: vec2_t) {
        const bz = s2w(mp, this.offset, this.value);
        this.value *= 1 - this.step;
        this.update(mp, bz);
    }
}
