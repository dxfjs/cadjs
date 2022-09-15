import { Command } from '../Interfaces/Command';
import { ArcShape } from '../Shapes/ArcShape';
import { CommandsManager } from './CommandsManager';
import { Point } from '@mathigon/euclid';
import { PointGeometry } from '../Geometry/PointGeometry';

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

    pick(mousePosition: PointGeometry): void {
        if (!this.centerPicked || !this.arc) {
            this.arc = new ArcShape(
                mousePosition,
                this.commandsManager.zoomManager
            );
            this.centerPicked = true;
        } else if (!this.radiusPicked) {
            this.arc.radius = Point.distance(this.arc.center, mousePosition);
            this.radiusPicked = true;
        } else if (!this.startAnglePicked) {
            this.arc.startAngle = this.arc.center.angle(mousePosition);
            this.startAnglePicked = true;
        } else if (!this.endAnglePicked) {
            this.arc.endAngle = this.arc.center.angle(mousePosition);
            this.endAnglePicked = true;
            this.arc.updateNodes();
            this.commandsManager.stop();
        }
    }

    move(mousePosition: PointGeometry): void {
        if (!this.centerPicked || !this.arc) return;
        if (!this.radiusPicked) {
            this.arc.radius = Point.distance(this.arc.center, mousePosition);
        } else if (!this.startAnglePicked) {
            this.arc.startAngle = this.arc.center.angle(mousePosition);
        } else if (!this.endAnglePicked) {
            this.arc.endAngle = this.arc.center.angle(mousePosition);
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
