import { ZoomManager } from '../ZoomManager';

export interface Shape {
    selected: boolean;
    zoomManager: ZoomManager;
    render(ctx: CanvasRenderingContext2D): void;
}
