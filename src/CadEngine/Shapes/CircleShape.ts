import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { CircleGeometry } from '../Geometry/CircleGeometry';
import { PointGeometry } from '../Geometry/PointGeometry';
import { NodesManager } from '../NodesManager';
import { render } from './ShapesUtils';

export class CircleShape extends CircleGeometry implements Shape {
    selected: boolean;
    zoomManager: ZoomManager;
    nodesManager: NodesManager;

    constructor(center: PointGeometry, zoomManager: ZoomManager) {
        super(center, 0);
        this.selected = false;
        this.zoomManager = zoomManager;
        this.nodesManager = new NodesManager(zoomManager);
    }

    updateNodes(): void {
        this.nodesManager.clear();
        this.nodesManager.add(this.center);
        this.nodesManager.add(this.top);
        this.nodesManager.add(this.right);
        this.nodesManager.add(this.bottom);
        this.nodesManager.add(this.left);
    }

    render(context: CanvasRenderingContext2D): void {
        render(context, this.zoomManager.value, this.selected, (context) => {
            context.beginPath();
            context.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
            context.stroke();
        });
        if (this.selected) this.nodesManager.render(context);
    }
}
