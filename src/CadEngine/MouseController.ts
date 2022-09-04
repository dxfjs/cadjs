import { CommandsManager } from './Commands/CommandsManager';
import { Transform } from './Transform';
import { PanManager } from './PanManager';
import { ZoomManager } from './ZoomManager';
import { Point } from '@mathigon/euclid';

export class MouseController {
    canvas: HTMLCanvasElement;
    commandsManager: CommandsManager;
    transform: Transform;
    zoomManager: ZoomManager;
    panManager: PanManager;

    constructor({
        canvas,
        commandsManager,
        transform,
        zoomManager,
        panManager,
    }: {
        canvas: HTMLCanvasElement;
        commandsManager: CommandsManager;
        transform: Transform;
        zoomManager: ZoomManager;
        panManager: PanManager;
    }) {
        this.canvas = canvas;
        this.commandsManager = commandsManager;
        this.transform = transform;
        this.zoomManager = zoomManager;
        this.panManager = panManager;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.onMouseWheel.bind(this));
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    onMouseDown(event: MouseEvent) {
        event.preventDefault();
        const pos = new Point(event.offsetX, event.offsetY);
        if (event.buttons === 1) this.commandsManager.pick(pos);
        if (event.buttons === 2) this.commandsManager.stop();
        if (event.buttons === 4) this.panManager.start(pos);
    }

    onMouseMove(event: MouseEvent) {
        event.preventDefault();
        const pos = new Point(event.offsetX, event.offsetY);
        this.commandsManager.move(pos);
        if (event.buttons === 4) this.panManager.update(pos);
    }

    onMouseUp(event: MouseEvent) {
        event.preventDefault();
        this.panManager.stop();
    }

    onMouseWheel(event: WheelEvent) {
        event.preventDefault();
        const pos = new Point(event.offsetX, event.offsetY);
        if (event.deltaY > 0) this.zoomManager.zoomOut(pos);
        else this.zoomManager.zoomIn(pos);
    }
}
