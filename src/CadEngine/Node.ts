import { PointGeometry } from './Geometry/PointGeometry';
import { Renderable } from './Interfaces/Renderable';

export class Node implements Renderable {
    center: PointGeometry;
    zoom: number;

    constructor(center: PointGeometry) {
        this.center = center;
        this.zoom = 1;
    }

    move(p: PointGeometry): void {
        console.log(p);
    }

    pick(p: PointGeometry): void {
        console.log(p);
    }

    render(context: CanvasRenderingContext2D): void {
        const radius = 6 / this.zoom;
        const fillStyle = context.fillStyle;
        const strokeStyle = context.strokeStyle;
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        context.beginPath();
        context.arc(this.center.x, this.center.y, radius, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;
    }
}
