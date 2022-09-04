import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Point, Line, Circle, Arc, intersections } from '@mathigon/euclid';

export class ArcShape implements Shape {
    center: Point;
    radius: number;
    startAngle: number;
    endAngle: number;
    selected: boolean;
    zoomManager: ZoomManager;

    constructor(center: Point, zoomManager: ZoomManager) {
        this.center = center;
        this.radius = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.selected = false;
        this.zoomManager = zoomManager;
    }

    get start() {
        const x = this.center.x + this.radius * Math.cos(this.startAngle);
        const y = this.center.y + this.radius * Math.sin(this.startAngle);
        return new Point(x, y);
    }

    get angle() {
        return this.endAngle - this.startAngle;
    }

    intersects(geometry: Line | Circle | Arc) {
        const is = intersections(new Arc(this.center, this.start, this.angle), geometry);
        console.log(is);
        return is;
    }

    render(context: CanvasRenderingContext2D): void {
        const strokeStyle = context.strokeStyle;
        const dash = context.getLineDash();
        const dashLength = 5 / this.zoomManager.value;
        if (this.selected) {
            context.strokeStyle = 'red';
            context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.arc(
            this.center.x,
            this.center.y,
            this.radius,
            this.startAngle,
            this.endAngle
        );
        context.stroke();
        context.strokeStyle = strokeStyle;
        context.setLineDash(dash);
    }
}
