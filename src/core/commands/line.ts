import { Scene } from '../scene';
import { Line } from '../shapes/line';
import { vec2_t } from '../types';
import { Command } from './command';

export class LineCommand extends Command<Line> {
    shapes: Line[];
    temp: Line;
    constructor(scene: Scene) {
        super(scene);
        this.shapes = [];
        this.temp = new Line();
    }

    undo(): void {
        this.shapes.forEach(() => this.scene.shapes.pop());
    }

    pick(p: vec2_t): void {
        if (!this.temp.start) this.temp.start = p;
        else {
            this.temp.end = p;
            this.shapes.push(this.temp);
            this.temp = new Line();
            this.temp.start = p;
        }
    }

    move(p: vec2_t): void {
        if (this.temp.start) this.temp.end = p;
    }

    stop(): boolean {
        if (this.shapes.length === 0) return false;
        this.shapes.forEach((shape) => this.scene.push(shape));
        return true;
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.shapes.forEach((shape) => shape.render(ctx));
        this.temp.render(ctx);
    }
}
