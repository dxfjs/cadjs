export class KeyboardController {
    constructor() {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        console.log(event);
    };

    private onKeyUp = (event: KeyboardEvent) => {
        console.log(event);
    };
}
