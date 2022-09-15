import { CommandsManager } from '../Commands/CommandsManager';
import { Renderable } from './Renderable';
import { PointGeometry } from '../Geometry/PointGeometry';

export interface Command extends Renderable {
    commandsManager: CommandsManager;
    pick(mousePosition: PointGeometry): void;
    move(mousePosition: PointGeometry): void;
    valid(): boolean;
    store(): void;
    undo(): void;
}
