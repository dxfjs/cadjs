import { CommandStack } from './commands/stack';
import { vec2 } from './utils/helpers';
import { PanManager } from './utils/pan';
import { ZoomManager } from './utils/zoom';

export function canvasEventsHandler(cvs: HTMLCanvasElement, zm: ZoomManager, pm: PanManager, cmds: CommandStack) {
    cvs.addEventListener('contextmenu', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    });

    cvs.addEventListener('wheel', (event: WheelEvent) => {
        event.preventDefault();
        const pos = vec2(event.offsetX, event.offsetY);
        if (event.deltaY > 0) zm.zoomOut(pos);
        else zm.zoomIn(pos);
    });

    cvs.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();
        const pos = vec2(event.offsetX, event.offsetY);
        if (event.buttons === 4) pm.start(pos);
        if (event.buttons === 1) cmds.pick(pos);
        if (event.buttons === 2) cmds.stop();
    });

    cvs.addEventListener('mouseup', (event: MouseEvent) => {
        event.preventDefault();
        pm.end();
    });

    cvs.addEventListener('mousemove', (event: MouseEvent) => {
        event.preventDefault();
        const pos = vec2(event.offsetX, event.offsetY);
        if (event.buttons === 4) pm.update(pos);
        cmds.move(pos);
    });

    cvs.addEventListener('keydown', (event: KeyboardEvent) => {
        event.preventDefault();
        console.log(event.key);
    });
}
