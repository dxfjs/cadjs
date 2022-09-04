import { Command } from '../Interfaces/Command';
import { CommandsManager } from './CommandsManager';
import { Shape } from '../Interfaces/Shape';
import { RectangleShape } from '../Shapes/RectangleShape';
import { Circle, Point } from '@mathigon/euclid';
import { CircleShape } from '../Shapes/CircleShape';

export class SelectCommand implements Command {
    rectangle: RectangleShape | null;
    commandsManager: CommandsManager;
    topleftPicked: boolean;
    pts: Point[] = [];
    c: Circle | null = null;
    constructor(commandsManager: CommandsManager) {
        this.commandsManager = commandsManager;
        this.rectangle = null;
        this.topleftPicked = false;
    }

    private _select() {
        this.commandsManager.scene.selectedShapes = [];
        const shapes = this.commandsManager.scene.shapes;
        const selectedShapes: Shape[] = [];
        if (this.rectangle) {
            for (const shape of shapes) {
                if (shape instanceof CircleShape) {
                    const c = new Circle(shape.center, shape.radius);
                    this.pts = this.rectangle.intersects(c);
                    this.c = c;
                    console.log(this.rectangle.intersects(c));
                }
            }
            this.commandsManager.scene.selectedShapes = selectedShapes;
        }
    }

    pick(mousePosition: Point): void {
        if (!this.topleftPicked) {
            this.rectangle = new RectangleShape(
                mousePosition,
                this.commandsManager.zoomManager
            );
            this.topleftPicked = true;
        } else if (this.rectangle) {
            this.rectangle.width = mousePosition.x - this.rectangle.topleft.x;
            this.rectangle.height = mousePosition.y - this.rectangle.topleft.y;
            this._select();
            this.topleftPicked = false;
            this.commandsManager.stop();
        }
    }

    move(mousePosition: Point): void {
        if (!this.rectangle) return;
        this.rectangle.width = mousePosition.x - this.rectangle.topleft.x;
        this.rectangle.height = mousePosition.y - this.rectangle.topleft.y;
    }

    valid(): boolean {
        return this.rectangle != null;
    }

    store(): void {}
    undo(): void {}

    render(context: CanvasRenderingContext2D): void {
        if (this.rectangle) this.rectangle.render(context);
        this.pts.forEach((p) => {
            if (this.c) {
                context.beginPath();
                context.moveTo(this.c.c.x, this.c.c.y);
                context.lineTo(p.x, p.y);
                context.stroke();
            }
        });
    }
}
