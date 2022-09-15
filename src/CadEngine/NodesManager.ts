import { PointGeometry } from './Geometry/PointGeometry';
import { Renderable } from './Interfaces/Renderable';
import { Node } from './Node';
import { ZoomManager } from './ZoomManager';

export class NodesManager implements Renderable {
    nodes: Node[];
    zoomManager: ZoomManager;

    constructor(zoomManager: ZoomManager) {
        this.nodes = [];
        this.zoomManager = zoomManager;
    }

    clear() {
        this.nodes = [];
    }

    add(center: PointGeometry) {
        this.nodes.push(new Node(center));
    }

    addNode(node: Node) {
        this.nodes.push(node);
    }

    render(context: CanvasRenderingContext2D): void {
        this.nodes.forEach((node) => {
            node.zoom = this.zoomManager.value;
            node.render(context);
        });
    }
}
