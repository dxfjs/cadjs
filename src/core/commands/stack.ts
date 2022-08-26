import { s2w } from '../utils/helpers';
import { vec2_t } from '../types';
import { ZoomManager } from '../utils/zoom';
import { Command } from './command';
import { Shape } from '../shapes/shape';

export class CommandStack {
    private readonly stack: Command<Shape>[];
    private temp: Command<Shape> | null;

    constructor(private offset: vec2_t, private zm: ZoomManager) {
        this.stack = [];
        this.temp = null;
    }

    cancel() {
        this.temp = null;
    }

    pick(p: vec2_t) {
        if (!this.temp) return;
        const tp = s2w(p, this.offset, this.zm.value);
        this.temp.pick(tp);
    }

    move(p: vec2_t) {
        if (!this.temp) return;
        const tp = s2w(p, this.offset, this.zm.value);
        this.temp.move(tp);
    }

    stop() {
        if (!this.temp) return;
        const r = this.temp.stop();
        if (r) this.stack.push(this.temp);
        this.temp = null;
    }

    execute(cmd: Command<Shape>) {
        this.temp = cmd;
        this.temp.stack = this;
    }

    undo() {
        this.stack.pop()?.undo();
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.temp) this.temp.render(ctx);
    }
}
