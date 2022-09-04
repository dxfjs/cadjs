import { Command } from '../Interfaces/Command';
import { CircleShape } from '../Shapes/CircleShape';
import { CommandsManager } from './CommandsManager';
import { Point } from '@mathigon/euclid';

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

    pick(mousePosition: Point): void {
        if (!this.centerPicked) {
            this.circle = new CircleShape(
                mousePosition,
                this.commandsManager.zoomManager
            );
            this.centerPicked = true;
        } else if (this.circle) {
            this.circle.radius = Point.distance(this.circle.center, mousePosition);
            this.radiusPicked = true;
            this.commandsManager.stop();
        }
    }

    move(mousePosition: Point): void {
        if (!this.circle) return;
        this.circle.radius = Point.distance(this.circle.center, mousePosition);
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
