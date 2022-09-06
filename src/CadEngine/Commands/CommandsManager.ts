import { Command } from '../Interfaces/Command';
import { Scene } from '../Scene';
import { Transform } from '../Transform';
import { ZoomManager } from '../ZoomManager';
import { ArcCommand } from './ArcCommand';
import { CircleCommand } from './CircleCommand';
import { RectangleCommand } from './RectangleCommand';
import { SegmentCommand } from './SegmentCommand';
import { SelectCommand } from './SelectCommand';
import { Point } from '@mathigon/euclid';

export enum CommandNames {
    'Segment' = 'Segment',
    'Circle' = 'Circle',
    'Rectangle' = 'Rectangle',
    'Polygon' = 'Polygon',
    'Select' = 'Select',
    'Arc' = 'Arc',
}

export class CommandsManager {
    currentCommand: Command | null;
    lastCommandName: CommandNames | null;
    readonly commands: Command[];
    readonly scene: Scene;
    readonly transform: Transform;
    readonly zoomManager: ZoomManager;
    constructor(scene: Scene, transform: Transform, zomManager: ZoomManager) {
        this.currentCommand = new SelectCommand(this);
        this.lastCommandName = null;
        this.commands = [];
        this.scene = scene;
        this.transform = transform;
        this.zoomManager = zomManager;
    }

    start(command: CommandNames): void {
        if (command === CommandNames.Segment)
            this.currentCommand = new SegmentCommand(this);
        else if (command === CommandNames.Circle)
            this.currentCommand = new CircleCommand(this);
        else if (command === CommandNames.Arc) this.currentCommand = new ArcCommand(this);
        else if (command === CommandNames.Rectangle)
            this.currentCommand = new RectangleCommand(this);
        else if (command === CommandNames.Select)
            this.currentCommand = new SelectCommand(this);
        this.lastCommandName = command;
    }

    stop(): void {
        if (!this.currentCommand) return;
        if (
            !(this.currentCommand instanceof SelectCommand) &&
            this.currentCommand.valid()
        ) {
            this.commands.push(this.currentCommand);
            this.currentCommand.store();
        }
        if (!this.lastCommandName) this.start(CommandNames.Select);
        else this.start(this.lastCommandName);
    }

    pick(p: Point): void {
        if (!this.currentCommand) return;
        this.currentCommand.pick(this.transform.screenToWorld(p, this.zoomManager.value));
    }

    move(p: Point): void {
        if (!this.currentCommand) return;
        this.currentCommand.move(this.transform.screenToWorld(p, this.zoomManager.value));
    }

    undo(): void {
        if (this.commands.length === 0) return;
        const command = this.commands.pop();
        if (command) command.undo();
    }

    cancel(): void {
        this.lastCommandName = null;
        this.start(CommandNames.Select);
    }

    deselectAll(): void {
        this.scene.selectedShapes.forEach((shape) => shape.selected = false)
        this.scene.selectedShapes = [];
    }

    render(context: CanvasRenderingContext2D): void {
        if (!this.currentCommand) return;
        this.currentCommand.render(context);
    }
}
