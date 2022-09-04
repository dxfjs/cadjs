import { Renderable } from './Interfaces/Renderable';
import { Shape } from './Interfaces/Shape';

export enum SelectionType {
    Intersect,
    Contain,
}

export class Scene implements Renderable {
    readonly shapes: Shape[];
    selectedShapes: Shape[] = [];
    constructor() {
        this.shapes = [];
    }

    addShape(shape: Shape) {
        this.shapes.push(shape);
    }

    removeShape(shape: Shape) {
        const index = this.shapes.indexOf(shape);
        if (index !== -1) {
            this.shapes.splice(index, 1);
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        this.shapes.forEach((shape) => shape.render(ctx));
    }
}
