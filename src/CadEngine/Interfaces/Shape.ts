import { ZoomManager } from '../ZoomManager';
import { Renderable } from './Renderable';

export interface Shape extends Renderable {
    selected: boolean;
    zoomManager: ZoomManager;
}
