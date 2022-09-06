import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Line, Point } from '@mathigon/euclid';

export class SegmentShape implements Shape<Line> {
    start: Point;
    end: Point;
    selected: boolean;
    zoomManager: ZoomManager;

    constructor(start: Point, zoomManager: ZoomManager) {
        this.start = start;
        this.end = start;
        this.selected = false;
        this.zoomManager = zoomManager;
    }

    get geometry(): Line {
        return new Line(this.start, this.end);
    }

    render(ctx: CanvasRenderingContext2D): void {
        const strokeStyle = ctx.strokeStyle;
        const dash = ctx.getLineDash();
        const dashLength = 5 / this.zoomManager.value;
        if (this.selected) {
            ctx.strokeStyle = 'red';
            ctx.setLineDash([dashLength, dashLength]);
        }
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
        ctx.strokeStyle = strokeStyle;
        ctx.setLineDash(dash);
    }
}
