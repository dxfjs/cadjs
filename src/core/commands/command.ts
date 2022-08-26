import { Renderable } from '../interfaces';
import { Scene } from '../scene';
import { Shape } from '../shapes/shape';
import { vec2_t } from '../types';
import { CommandStack } from './stack';

// The abstract class or all commands.
export abstract class Command<T extends Shape> implements Renderable {
    abstract temp: T; // The current shape to draw.
    stack?: CommandStack;
    constructor(protected scene: Scene) {}
    abstract undo(): void; // undo the command.
    abstract pick(p: vec2_t): void; // Called when the canvas clicked.
    abstract move(p: vec2_t): void; // Called when the mouse move over canvas.
    abstract stop(): boolean; // For ending the command.
    abstract render(ctx: CanvasRenderingContext2D): void; // render the current shape under drawing.
}
