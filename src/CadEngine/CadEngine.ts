import { Scene } from './Scene';
import { Transform } from './Transform';
import { PanManager } from './PanManager';
import { ZoomManager } from './ZoomManager';
import { GridManager } from './GridManager';
import { MouseController } from './MouseController';
import { CommandNames, CommandsManager } from './Commands/CommandsManager';
import { KeyboardController } from './KeyboardController';

export class CadEngine {
    scene: Scene;
    commandsManager: CommandsManager;
    transform: Transform;
    zoomManager: ZoomManager;
    panManger: PanManager;
    gridManager: GridManager;
    mouseController: MouseController;
    keyboardController: KeyboardController;
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.canvas = context.canvas;
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.scene = new Scene();
        this.transform = new Transform();
        this.zoomManager = new ZoomManager(this.transform);
        this.panManger = new PanManager(this.canvas, this.zoomManager);
        this.gridManager = new GridManager(this.zoomManager);
        this.commandsManager = new CommandsManager(
            this.scene,
            this.transform,
            this.zoomManager
        );
        this.mouseController = new MouseController({
            canvas: this.canvas,
            commandsManager: this.commandsManager,
            transform: this.transform,
            zoomManager: this.zoomManager,
            panManager: this.panManger,
        });
        this.keyboardController = new KeyboardController(this.commandsManager);
        window.onresize = () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        };
        this.transform.offsetX = -this.canvas.width / 2;
        this.transform.offsetY = -this.canvas.height / 2;
        this.render();
    }

    command(command: CommandNames): void {
        this.commandsManager.start(command);
    }

    render(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the context
        this.context.save();
        this.context.scale(this.zoomManager.value, this.zoomManager.value); // Scale according to zoom.
        this.context.translate(-this.transform.offsetX, -this.transform.offsetY); // Translating according to the panning.
        this.gridManager.render(this.context);
        this.context.lineWidth = 1 / this.zoomManager.value; // Keep the same with of line when zooming.
        this.context.strokeStyle = 'white'; // This hard coded will be dynamic when layers introduced.
        this.scene.render(this.context); // Render the scene.
        this.commandsManager.render(this.context);
        this.context.restore();
        requestAnimationFrame(this.render.bind(this));
    }
}
