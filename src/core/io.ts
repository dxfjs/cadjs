import { Scene } from './scene';
import { Line } from './shapes/line';
import { DxfWriter, point3d } from '@tarikjabiri/dxf';
import { Circle } from './shapes/circle';
import { Arc } from './shapes/arc';
import { rad2deg } from './utils/helpers';

export class Exporter {
    dxf(scene: Scene) {
        const writer = new DxfWriter();
        scene.shapes.forEach((shape) => {
            if (shape instanceof Line) {
                if (shape.start && shape.end)
                    writer.addLine(
                        point3d(shape.start.x, -shape.start.y),
                        point3d(shape.end.x, -shape.end.y)
                    );
            } else if (shape instanceof Circle) {
                if (shape.center && shape.radius != null)
                    writer.addCircle(point3d(shape.center.x, -shape.center.y), shape.radius);
            } else if (shape instanceof Arc) {
                if (shape.center && shape.radius != null)
                    writer.addArc(
                        point3d(shape.center.x, -shape.center.y),
                        shape.radius,
                        rad2deg(-shape.endAngle),
                        rad2deg(-shape.startAngle)
                    );
            }
        });
        return writer.stringify();
    }
}
