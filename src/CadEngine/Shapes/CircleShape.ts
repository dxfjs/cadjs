import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Arc, Circle, Line, Point } from '@mathigon/euclid';

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
        if(geometry instanceof Line) {
            const dx = geometry.p2.x - geometry.p1.x
            const dy = geometry.p2.y - geometry.p1.y
            const distance = Point.distance(geometry.p1, geometry.p2)
            const det = geometry.p1.x*geometry.p2.y - geometry.p2.x*geometry.p1.y
            const delta = Math.pow(this.radius, 2) * Math.pow(distance, 2) - Math.pow(det, 2)
            if (delta === 0) {
                const x = det*dy/Math.pow(distance, 2)
                const y = -det*dx/Math.pow(distance, 2)
                const p = new Point(x, y)
                return[p]
            } else  {
                let sgn = -1
                if(dy > 0) sgn = 1
                const x1 = (det*dy - sgn*dx*Math.sqrt(delta))/Math.pow(distance, 2)
                const y1 = (-det*dx - Math.abs(dy) * Math.sqrt(delta))/Math.pow(distance, 2)

                const x2 = (det*dy + sgn*dx*Math.sqrt(delta))/Math.pow(distance, 2)
                const y2 = (-det*dx + Math.abs(dy) * Math.sqrt(delta))/Math.pow(distance, 2)

                const p1 = new Point(x1, y1)
                const p2 = new Point(x2, y2)
                return[p1, p2]
            }
        }
        return []
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
