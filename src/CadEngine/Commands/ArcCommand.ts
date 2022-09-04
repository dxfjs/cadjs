import { Command } from '../Interfaces/Command';
import { ArcShape } from '../Shapes/ArcShape';
import { CommandsManager } from './CommandsManager';
import { Point } from '@mathigon/euclid';

export class ArcCommand implements Command {
    commandsManager: CommandsManager;
    arc: ArcShape | null;
    centerPicked: boolean;
    radiusPicked: boolean;
    startAnglePicked: boolean;
    endAnglePicked: boolean;
    constructor(commandsManager: CommandsManager) {
        this.commandsManager = commandsManager;
        this.arc = null;
        this.centerPicked = false;
        this.radiusPicked = false;
        this.startAnglePicked = false;
        this.endAnglePicked = false;
    }

    pick(mousePosition: Point): void {
        if (!this.centerPicked) {
            this.arc = new ArcShape(mousePosition, this.commandsManager.zoomManager);
            this.centerPicked = true;
        } else if (!this.radiusPicked && this.arc) {
            this.arc.radius = Point.distance(this.arc.center, mousePosition);
            this.radiusPicked = true;
        } else if (!this.startAnglePicked && this.arc) {
            this.arc.startAngle = mousePosition.angle(this.arc.center);
            this.startAnglePicked = true;
        } else if (!this.endAnglePicked && this.arc) {
            this.arc.endAngle = mousePosition.angle(this.arc.center);
            this.endAnglePicked = true;
            this.commandsManager.stop();
        }
    }

    move(mousePosition: Point): void {
        if (!this.centerPicked || !this.arc) return;
        if (!this.radiusPicked) {
            this.arc.radius = Point.distance(this.arc.center, mousePosition);
        } else if (!this.startAnglePicked) {
            this.arc.startAngle = mousePosition.angle(this.arc.center);
        } else if (!this.endAnglePicked) {
            this.arc.endAngle = mousePosition.angle(this.arc.center);
        }
    }

    valid(): boolean {
        return this.endAnglePicked;
    }

    store(): void {
        if (!this.arc) return;
        this.commandsManager.scene.addShape(this.arc);
    }

    undo(): void {
        this.commandsManager.scene.shapes.pop();
    }

    render(context: CanvasRenderingContext2D): void {
        if (this.arc) this.arc.render(context);
    }
}
