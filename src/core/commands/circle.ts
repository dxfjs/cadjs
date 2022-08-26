import { Scene } from '../scene';
import { Circle } from '../shapes/circle';
import { vec2_t } from '../types';
import { distance } from '../utils/helpers';
import { Command } from './command';

export class CircleCommand extends Command<Circle> {
    temp: Circle;
    constructor(scene: Scene) {
        super(scene);
        this.temp = new Circle();
    }

    undo(): void {
        this.scene.shapes.pop();
    }

    pick(p: vec2_t): void {
        if (!this.temp.center) this.temp.center = p;
        else {
            const d = distance(this.temp.center, p);
            this.temp.radius = d;
            this.scene.push(this.temp);
            this.stack?.stop();
        }
    }

    move(p: vec2_t): void {
        if (!this.temp.center) return;
        const d = distance(this.temp.center, p);
        this.temp.radius = d;
    }

    stop(): boolean {
        if (this.temp.center && this.temp.radius) return true;
        return false;
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.temp.render(ctx);
    }
}
