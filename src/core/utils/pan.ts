import { vec2 } from './helpers';
import { vec2_t } from '../types';
import { ZoomManager } from './zoom';

export class PanManager {
    private panning: boolean;
    private origin: vec2_t;

    constructor(private cvs: HTMLCanvasElement, private offset: vec2_t, private zm: ZoomManager) {
        this.panning = false;
        this.origin = vec2(0, 0);
    }

    start(mp: vec2_t): void {
        this.panning = true;
        this.origin = mp;
        this.cvs.classList.add('cadjs__pan');
    }

    end(): void {
        if (this.panning) {
            this.panning = false;
            this.cvs.classList.remove('cadjs__pan');
        }
    }

    update(mp: vec2_t): void {
        if (this.panning) {
            const dx = (mp.x - this.origin.x) / this.zm.value;
            const dy = (mp.y - this.origin.y) / this.zm.value;
            this.offset.x -= dx;
            this.offset.y -= dy;
            this.origin = mp;
        }
    }
}
