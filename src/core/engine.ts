// Include css
import './style/vars.css';
import './style/main.css';
import { ZoomManager } from './utils/zoom';
import { canvasEventsHandler } from './events';
import { vec2_t } from './types';
import { PanManager } from './utils/pan';
import { Scene } from './scene';
import { CommandStack } from './commands/stack';
import { LineCommand } from './commands/line';
import { CircleCommand } from './commands/circle';
import { ArcCommand } from './commands/arc';
import { Exporter } from './io';

export enum EngineState {
    Select = 'SELECT',
    Draw = 'DRAW',
}

export enum Shapes {
    None = 'NONE',
    Line = 'LINE',
    Circle = 'CIRCLE',
    Arc = 'ARC',
}

export class Engine {
    private zm: ZoomManager;
    private pm: PanManager;
    private cvs: HTMLCanvasElement;
    scene: Scene;
    private offset: vec2_t;
    private cmds: CommandStack;
    private exporter: Exporter;
    constructor(private ctx: CanvasRenderingContext2D) {
        this.cvs = ctx.canvas;
        this.cvs.width = this.cvs.offsetWidth;
        this.cvs.height = this.cvs.offsetHeight;
        this.offset = { x: -this.cvs.width / 2, y: -this.cvs.height / 2 };
        this.zm = new ZoomManager(ctx, this.offset);
        this.pm = new PanManager(this.cvs, this.offset, this.zm);
        this.scene = new Scene();
        this.cmds = new CommandStack(this.offset, this.zm);
        canvasEventsHandler(this.cvs, this.zm, this.pm, this.cmds);
        window.onresize = () => {
            this.cvs.width = this.cvs.offsetWidth;
            this.cvs.height = this.cvs.offsetHeight;
        };
        this.exporter = new Exporter();
        this.render();
    }

    draw(shape: Shapes) {
        if (shape === Shapes.Line) this.cmds.execute(new LineCommand(this.scene));
        else if (shape === Shapes.Circle) this.cmds.execute(new CircleCommand(this.scene));
        else if (shape === Shapes.Arc) this.cmds.execute(new ArcCommand(this.scene));
    }

    undo() {
        this.cmds.undo();
    }

    exportDxf() {
        return new Blob([this.exporter.dxf(this.scene)]);
    }

    render() {
        this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height); // Clear the ctx
        this.ctx.save();
        this.ctx.scale(this.zm.value, this.zm.value); // Scale according to zoom.
        this.ctx.translate(-this.offset.x, -this.offset.y); // Translating according to the panning.
        this.ctx.lineWidth = 1 / this.zm.value; // Keep the same with of line when zooming.
        this.ctx.strokeStyle = 'white'; // This hard coded will be dynamic when layers introduced.
        this.scene.render(this.ctx); // Render the scene.
        this.cmds.render(this.ctx); // Render the current shape drawing if exist.
        this.ctx.restore();
        requestAnimationFrame(this.render.bind(this));
    }
}
