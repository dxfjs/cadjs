import { Renderable } from './interfaces';
import { Shape } from './shapes/shape';

export class Scene implements Renderable {
    readonly shapes: Shape[];

    constructor() {
        this.shapes = [];
    }

    push(shape: Shape) {
        this.shapes.push(shape);
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.shapes.forEach((shape) => shape.render(ctx));
    }
}
