import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Arc, Circle, intersections, Line, Point } from '@mathigon/euclid';

export class CircleShape implements Shape {
    center: Point;
    radius: number;
    selected: boolean;
    zoomManager: ZoomManager;
    constructor(center: Point, zoomManager: ZoomManager) {
        this.center = center;
        this.radius = 0;
        this.selected = false;
        this.zoomManager = zoomManager;
    }

    intersects(geometry: Line | Arc | Circle) {
        const c = new Circle(this.center, this.radius);
        return intersections(geometry, c);
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
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeStyle = strokeStyle;
        ctx.setLineDash(dash);
    }
}
