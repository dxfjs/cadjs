import { CommandsManager } from '../Commands/CommandsManager';
import { Renderable } from './Renderable';
import { Point } from '@mathigon/euclid';

export interface Command extends Renderable {
    commandsManager: CommandsManager;
    pick(mousePosition: Point): void;
    move(mousePosition: Point): void;
    valid(): boolean;
    store(): void;
    undo(): void;
}
