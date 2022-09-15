import { Command } from '../Interfaces/Command';
import { CircleShape } from '../Shapes/CircleShape';
import { CommandsManager } from './CommandsManager';
import { PointGeometry } from '../Geometry/PointGeometry';
import { distance } from '../Geometry/GeometryUtils';

export class CircleCommand implements Command {
    circle: CircleShape | null;
    commandsManager: CommandsManager;
    centerPicked: boolean;
    radiusPicked: boolean;
    constructor(comandsManager: CommandsManager) {
        this.commandsManager = comandsManager;
        this.circle = null;
        this.centerPicked = false;
        this.radiusPicked = false;
    }

    pick(mousePosition: PointGeometry): void {
        if (!this.centerPicked) {
            this.circle = new CircleShape(
                mousePosition,
                this.commandsManager.zoomManager
            );
            this.centerPicked = true;
        } else if (this.circle) {
            this.circle.radius = distance(this.circle.center, mousePosition);
            this.radiusPicked = true;
            this.circle.updateNodes();
            this.commandsManager.stop();
        }
    }

    move(mousePosition: PointGeometry): void {
        if (!this.circle) return;
        this.circle.radius = distance(this.circle.center, mousePosition);
    }

    valid(): boolean {
        return this.radiusPicked;
    }

    store(): void {
        if (!this.circle) return;
        this.commandsManager.scene.addShape(this.circle);
    }

    undo(): void {
        this.commandsManager.scene.shapes.pop();
    }

    render(context: CanvasRenderingContext2D): void {
        if (!this.circle) return;
        this.circle.render(context);
    }
}
