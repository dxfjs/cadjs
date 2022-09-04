import { Command } from '../Interfaces/Command';
import { SegmentShape } from '../Shapes/SegmentShape';
import { CommandsManager } from './CommandsManager';
import { Point } from '@mathigon/euclid';

export class SegmentCommand implements Command {
    temporarySegment: SegmentShape | null;
    segments: SegmentShape[];
    startPicked: boolean;
    commandsManager: CommandsManager;
    constructor(comandsManager: CommandsManager) {
        this.temporarySegment = null;
        this.segments = [];
        this.startPicked = false;
        this.commandsManager = comandsManager;
    }

    pick(mousePosition: Point): void {
        const zoomManager = this.commandsManager.zoomManager;
        if (!this.startPicked) {
            this.temporarySegment = new SegmentShape(mousePosition, zoomManager);
            this.startPicked = true;
        } else if (this.temporarySegment) {
            this.temporarySegment.end = mousePosition;
            this.segments.push(this.temporarySegment);
            this.temporarySegment = new SegmentShape(mousePosition, zoomManager);
        }
    }

    store(): void {
        this.segments.forEach((s) => this.commandsManager.scene.addShape(s));
        this.temporarySegment = null;
    }

    move(mousePosition: Point): void {
        if (this.temporarySegment) this.temporarySegment.end = mousePosition;
    }

    valid(): boolean {
        return this.segments.length > 0;
    }

    undo(): void {
        this.segments.forEach((_) => this.commandsManager.scene.shapes.pop());
    }

    render(context: CanvasRenderingContext2D): void {
        if (!this.temporarySegment) return;
        this.temporarySegment.render(context);
        this.segments.forEach((s) => s.render(context));
    }
}
