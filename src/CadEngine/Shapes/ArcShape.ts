import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { ArcGeometry } from '../Geometry/ArcGeometry';
import { PointGeometry } from '../Geometry/PointGeometry';
import { NodesManager } from '../NodesManager';
import { render } from './ShapesUtils';

export class ArcShape extends ArcGeometry implements Shape {
    selected: boolean;
    zoomManager: ZoomManager;
    nodesManager: NodesManager;

    constructor(center: PointGeometry, zoomManager: ZoomManager) {
        super(center, 0, 0, 2 * Math.PI);
        this.selected = false;
        this.zoomManager = zoomManager;
        this.nodesManager = new NodesManager(zoomManager);
    }

    updateNodes(): void {
        this.nodesManager.clear();
        this.nodesManager.add(this.center);
        this.nodesManager.add(this.start);
        this.nodesManager.add(this.end);
    }

    render(context: CanvasRenderingContext2D): void {
        render(context, this.zoomManager.value, this.selected, (context) => {
            context.beginPath();
            context.arc(
                this.center.x,
                this.center.y,
                this.radius,
                this.startAngle,
                this.endAngle
            );
            context.stroke();
        });
        if (this.selected) this.nodesManager.render(context);
    }
}
