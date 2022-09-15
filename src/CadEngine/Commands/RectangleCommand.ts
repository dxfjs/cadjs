import { Command } from '../Interfaces/Command';
import { CommandsManager } from './CommandsManager';
import { RectangleShape } from '../Shapes/RectangleShape';
import { PointGeometry } from '../Geometry/PointGeometry';

export class RectangleCommand implements Command {
    rectangle: RectangleShape | null;
    commandsManager: CommandsManager;
    topleftPicked: boolean;
    bottomrightPicked: boolean;
    constructor(comandsManager: CommandsManager) {
        this.commandsManager = comandsManager;
        this.rectangle = null;
        this.topleftPicked = false;
        this.bottomrightPicked = false;
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
            this.rectangle.adjust();
            this.rectangle.updateNodes();
            this.bottomrightPicked = true;
            this.commandsManager.stop();
        }
    }

    move(mousePosition: PointGeometry): void {
        if (!this.rectangle) return;
        this.rectangle.width = mousePosition.x - this.rectangle.topleft.x;
        this.rectangle.height = mousePosition.y - this.rectangle.topleft.y;
    }

    valid(): boolean {
        return this.bottomrightPicked;
    }

    store(): void {
        if (!this.rectangle) return;
        this.commandsManager.scene.addShape(this.rectangle);
    }

    undo(): void {
        this.commandsManager.scene.shapes.pop();
    }

    render(context: CanvasRenderingContext2D): void {
        if (!this.rectangle) return;
        this.rectangle.render(context);
    }
}
