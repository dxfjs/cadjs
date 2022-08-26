import { Scene } from '../scene';
import { Arc } from '../shapes/arc';
import { vec2_t } from '../types';
import { angle, distance } from '../utils/helpers';
import { Command } from './command';

export class ArcCommand extends Command<Arc> {
    temp: Arc;
    private raduisPicked = false;
    private endAnglePicked = false;
    private completed = false;

    constructor(scene: Scene) {
        super(scene);
        this.temp = new Arc();
    }

    undo(): void {
        this.scene.shapes.pop();
    }

    pick(p: vec2_t): void {
        if (!this.temp.center) this.temp.center = p;
        else if (!this.raduisPicked) {
            const d = distance(this.temp.center, p);
            const a = angle(this.temp.center, p);
            this.temp.radius = d;
            this.raduisPicked = true;
            this.temp.startAngle = a;
        } else if (!this.endAnglePicked) {
            const a = angle(this.temp.center, p);
            this.temp.endAngle = a;
            this.scene.push(this.temp);
            this.endAnglePicked = true;
            this.completed = true;
            this.stack?.stop();
        }
    }

    move(p: vec2_t): void {
        if (!this.temp.center) return;
        if (!this.raduisPicked) {
            const d = distance(this.temp.center, p);
            const a = angle(this.temp.center, p);
            this.temp.radius = d;
            this.temp.startAngle = a;
        } else if (!this.endAnglePicked) {
            const a = angle(this.temp.center, p);
            this.temp.endAngle = a;
        }
    }

    stop(): boolean {
        return this.completed;
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.temp.render(ctx);
    }
}
