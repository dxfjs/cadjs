import { Command } from '../Interfaces/Command';
import { CommandsManager } from './CommandsManager';
import { Shape } from '../Interfaces/Shape';
import { RectangleShape } from '../Shapes/RectangleShape';
import { Arc, Circle, Line, Point, Rectangle } from '@mathigon/euclid';

export class SelectCommand implements Command {
    rectangle: RectangleShape | null;
    commandsManager: CommandsManager;
    topleftPicked: boolean;

    constructor(commandsManager: CommandsManager) {
        this.commandsManager = commandsManager;
        this.rectangle = null;
        this.topleftPicked = false;
    }

    private get _dx(): number {
        if (!this.rectangle) return 0;
        return this.rectangle.topleft.x + this.rectangle.width - this.rectangle.topleft.x;
    }

    private _select() {
        this.commandsManager.scene.selectedShapes = [];
        const shapes = this.commandsManager.scene.shapes;
        const selectedShapes: Shape<Line | Arc | Rectangle | Circle>[] = [];
        if (this.rectangle) {
            if (this._dx < 0) {
                for (const shape of shapes) {
                    const pts = this.rectangle.intersects(shape.geometry);
                    if (pts.length > 0) {
                        selectedShapes.push(shape);
                        shape.selected = true;
                    }
                }
                this.commandsManager.scene.selectedShapes = selectedShapes;
            }
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
        if (!this.rectangle) return;
        if (this._dx < 0) context.fillStyle = 'rgba(0, 255, 0, 0.1)';
        else context.fillStyle = 'rgba(0, 0, 255, 0.1)';
        const dash = context.getLineDash();
        const dashLength = 10 / this.commandsManager.zoomManager.value;
        const lineWidth = context.lineWidth;
        context.lineWidth = 0.5 / this.commandsManager.zoomManager.value;
        context.setLineDash([dashLength, dashLength]);
        context.beginPath();
        context.rect(
            this.rectangle.topleft.x,
            this.rectangle.topleft.y,
            this.rectangle.width,
            this.rectangle.height
        );
        context.fill();
        context.stroke();
        context.setLineDash(dash);
        context.lineWidth = lineWidth;
    }
}
