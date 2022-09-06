import { Arc, Circle, Line, Rectangle } from '@mathigon/euclid';
import { Renderable } from './Interfaces/Renderable';
import { Shape } from './Interfaces/Shape';

export enum SelectionType {
    Intersect,
    Contain,
}

export class Scene implements Renderable {
    readonly shapes: Shape<Line | Arc | Rectangle | Circle>[];
    selectedShapes: Shape<Line | Arc | Rectangle | Circle>[] = [];
    constructor() {
        this.shapes = [];
    }

    addShape(shape: Shape<Line | Arc | Rectangle | Circle>) {
        this.shapes.push(shape);
    }

    removeShape(shape: Shape<Line | Arc | Rectangle | Circle>) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.shapes.forEach((shape) => shape.render(ctx));
    }
}
