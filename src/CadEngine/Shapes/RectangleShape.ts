import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Arc, Circle, intersections, Line, Point } from '@mathigon/euclid';

export class RectangleShape implements Shape {
    topleft: Point;
    width: number;
    height: number;
    selected: boolean;
    zoomManager: ZoomManager;
    constructor(topleft: Point, zoomManager: ZoomManager) {
        this.topleft = topleft;
        this.width = 0;
        this.height = 0;
        this.selected = false;
        this.zoomManager = zoomManager;
    }

    intersects(geometry: Line | Circle | Arc) {
        const pts: Point[] = [];
        const top: Line = new Line(
            this.topleft,
            new Point(this.topleft.x + this.width, this.topleft.y)
        );
        const right: Line = new Line(
            new Point(this.topleft.x + this.width, this.topleft.y),
            new Point(this.topleft.x + this.width, this.topleft.y - this.height)
        );
        const bottom: Line = new Line(
            new Point(this.topleft.x + this.width, this.topleft.y - this.height),
            new Point(this.topleft.x, this.topleft.y - this.height)
        );
        const left: Line = new Line(
            new Point(this.topleft.x, this.topleft.y - this.height),
            this.topleft
        );
        pts.push(...intersections(top, geometry));
        pts.push(...intersections(right, geometry));
        pts.push(...intersections(bottom, geometry));
        pts.push(...intersections(left, geometry));
        return pts;
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
        ctx.rect(this.topleft.x, this.topleft.y, this.width, this.height);
        ctx.stroke();
        ctx.strokeStyle = strokeStyle;
        ctx.setLineDash(dash);
    }
}
