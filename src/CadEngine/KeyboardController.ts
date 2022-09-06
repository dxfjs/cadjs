import { CommandsManager } from "./Commands/CommandsManager";

export class KeyboardController {
    commandsManager: CommandsManager;
    constructor( commandsManager: CommandsManager) {
        this.commandsManager = commandsManager;
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === 'Escape') {
            this.commandsManager.deselectAll();
        }
    };

    private onKeyUp = (event: KeyboardEvent) => {
        event.preventDefault();
    };
}
