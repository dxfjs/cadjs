import './style.css';
import { Engine, Shapes } from './core';

window.onload = () => {
    const canvas = document.getElementById('cadjs__canvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        const engine = new Engine(ctx);

        const lineBtn = document.getElementById('cadjs__draw__line') as HTMLButtonElement;
        lineBtn.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            engine.draw(Shapes.Line);
        });

        const circleBtn = document.getElementById('cadjs__draw__circle') as HTMLButtonElement;
        circleBtn.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            engine.draw(Shapes.Circle);
        });

        const arcBtn = document.getElementById('cadjs__draw__arc') as HTMLButtonElement;
        arcBtn.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            engine.draw(Shapes.Arc);
        });

        const undoBtn = document.getElementById('cadjs__draw__undo') as HTMLButtonElement;
        undoBtn.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            engine.undo();
        });

        const dxfBtn = document.getElementById('cadjs__export__dxf') as HTMLButtonElement;
        dxfBtn.addEventListener('click', (event: MouseEvent) => {
            event.preventDefault();
            const blobUrl = URL.createObjectURL(engine.exportDxf());
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'dxf.dxf';
            link.click();
        });
    }
};
