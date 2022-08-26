import { Renderable } from '../interfaces';

export abstract class Shape implements Renderable {
    abstract render(ctx: CanvasRenderingContext2D): void;
}
