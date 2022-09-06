import { ZoomManager } from '../ZoomManager';

export interface Shape<T> {
    selected: boolean;
    zoomManager: ZoomManager;
    get geometry(): T;
    render(ctx: CanvasRenderingContext2D): void;
}
