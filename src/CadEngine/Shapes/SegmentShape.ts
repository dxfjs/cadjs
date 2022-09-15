import { Shape } from '../Interfaces/Shape';
import { ZoomManager } from '../ZoomManager';
import { SegmentGeometry } from '../Geometry/SegmentGeometry';
import { PointGeometry } from '../Geometry/PointGeometry';
import { NodesManager } from '../NodesManager';
import { render } from './ShapesUtils';

export class SegmentShape extends SegmentGeometry implements Shape {
    selected: boolean;
    zoomManager: ZoomManager;
    nodesManager: NodesManager;

    constructor(start: PointGeometry, zoomManager: ZoomManager) {
        super(start, start);
        this.selected = false;
        this.zoomManager = zoomManager;
        this.nodesManager = new NodesManager(zoomManager);
    }

    updateNodes(): void {
        this.nodesManager.clear();
        this.nodesManager.add(this.start);
        this.nodesManager.add(this.end);
    }

    render(context: CanvasRenderingContext2D): void {
        render(context, this.zoomManager.value, this.selected, (context) => {
            context.beginPath();
            context.moveTo(this.start.x, this.start.y);
            context.lineTo(this.end.x, this.end.y);
            context.stroke();
        });
        if (this.selected) this.nodesManager.render(context);
    }
}
