import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { RectangleGeometry } from '../Geometry/RectangleGeometry';
import { PointGeometry } from '../Geometry/PointGeometry';
import { NodesManager } from '../NodesManager';
import { render } from './ShapesUtils';

export class RectangleShape extends RectangleGeometry implements Shape {
    selected: boolean;
    zoomManager: ZoomManager;
    nodesManager: NodesManager;

    constructor(topleft: PointGeometry, zoomManager: ZoomManager) {
        super(topleft, 0, 0);
        this.selected = false;
        this.zoomManager = zoomManager;
        this.nodesManager = new NodesManager(zoomManager);
    }

    updateNodes(): void {
        this.nodesManager.clear();
        this.nodesManager.add(this.top.start);
        this.nodesManager.add(this.top.end);
        this.nodesManager.add(this.bottom.start);
        this.nodesManager.add(this.bottom.end);
    }

    render(ctx: CanvasRenderingContext2D): void {
        render(ctx, this.zoomManager.value, this.selected, (ctx) => {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        });
        if (this.selected) this.nodesManager.render(ctx);
    }
}
