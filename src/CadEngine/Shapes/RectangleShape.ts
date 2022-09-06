import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { Arc, Circle, intersections, Line, Point, Rectangle } from '@mathigon/euclid';

export class RectangleShape implements Shape<Rectangle> {
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

    get top(): Line {
        return new Line(
            this.topleft,
            new Point(this.topleft.x + this.width, this.topleft.y)
        );
    }

    get right(): Line {
        return new Line(
            new Point(this.topleft.x + this.width, this.topleft.y),
            new Point(this.topleft.x + this.width, this.topleft.y + this.height)
        );
    }

    get bottom(): Line {
        return new Line(
            new Point(this.topleft.x + this.width, this.topleft.y + this.height),
            new Point(this.topleft.x, this.topleft.y + this.height)
        );
    }

    get left(): Line {
        return new Line(
            new Point(this.topleft.x, this.topleft.y + this.height),
            this.topleft
        );
    }

    get geometry(): Rectangle {
        return new Rectangle(this.topleft, this.width, this.height);
    }

    intersects(geometry: Line | Circle | Arc | Rectangle) {
        const pts: Point[] = [];
        pts.push(...this._inter(this.top, geometry));
        pts.push(...this._inter(this.bottom, geometry));
        pts.push(...this._inter(this.left, geometry));
        pts.push(...this._inter(this.right, geometry));
        return pts;
    }

    private _inter(l: Line, g: Line | Circle | Arc | Rectangle) {
        const pts = intersections(l, g);
        const result: Point[] = [];
        pts.forEach((p) => {
            if (
                Point.distance(p, l.p1) + Point.distance(p, l.p2) ===
                Point.distance(l.p1, l.p2)
            )
                result.push(p);
        });        
        return result;
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
