import { Command } from '../Interfaces/Command';
import { CommandsManager } from './CommandsManager';
import { Shape } from '../Interfaces/Shape';
import { RectangleShape } from '../Shapes/RectangleShape';
import { PointGeometry } from '../Geometry/PointGeometry';
import { ArcShape } from '../Shapes/ArcShape';
import { CircleShape } from '../Shapes/CircleShape';
import { SegmentShape } from '../Shapes/SegmentShape';

export class SelectCommand implements Command {
    rectangle: RectangleShape | null;
    commandsManager: CommandsManager;
    topleftPicked: boolean;
    private _dx: number;
    constructor(commandsManager: CommandsManager) {
        this.commandsManager = commandsManager;
        this.rectangle = null;
        this.topleftPicked = false;
        this._dx = 0;
    }

    private _storedx(): void {
        if (this.rectangle)
            this._dx =
                this.rectangle.topleft.x +
                this.rectangle.width -
                this.rectangle.topleft.x;
        else this._dx = 0;
    }

    private _isShape(
        shape: Shape
    ): shape is RectangleShape | ArcShape | CircleShape | SegmentShape {
        return (
            shape instanceof RectangleShape ||
            shape instanceof ArcShape ||
            shape instanceof CircleShape ||
            shape instanceof SegmentShape
        );
    }

    private _select() {
        const rect = this.rectangle;
        if (!rect) return;
        this.commandsManager.scene.shapes.forEach((shape) => {
            if (shape.selected) return;
            else if (this._isShape(shape)) {
                let select = false;
                const intersects = rect.intersects(shape).length > 0;
                const contained = rect.bbox.containsBBox(shape.bbox);
                if (this._dx < 0) select = intersects || contained;
                else select = contained;
                if (select) this.commandsManager.scene.select(shape);
            }
        });
    }

    pick(mousePosition: PointGeometry): void {
        if (!this.topleftPicked) {
            this.rectangle = new RectangleShape(
                mousePosition,
                this.commandsManager.zoomManager
            );
            this.topleftPicked = true;
        } else if (this.rectangle) {
            this.rectangle.width = mousePosition.x - this.rectangle.topleft.x;
            this.rectangle.height = mousePosition.y - this.rectangle.topleft.y;
            this._storedx();
            this.rectangle.adjust();
            this._select();
            this.commandsManager.stop();
        }
    }

    move(mousePosition: PointGeometry): void {
        if (!this.rectangle) return;
        this.rectangle.width = mousePosition.x - this.rectangle.topleft.x;
        this.rectangle.height = mousePosition.y - this.rectangle.topleft.y;
        this._storedx();
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
