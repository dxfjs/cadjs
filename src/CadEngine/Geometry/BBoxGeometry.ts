import { PointGeometry } from './PointGeometry';

export class BBoxGeometry {
    topleft: PointGeometry;
    bottomright: PointGeometry;

    constructor(topleft: PointGeometry, bottomright: PointGeometry) {
        this.topleft = topleft;
        this.bottomright = bottomright;
    }

    containsPoint(p: PointGeometry) {
        return (
            p.x >= this.topleft.x &&
            p.x <= this.bottomright.x &&
            p.y >= this.topleft.y &&
            p.y <= this.bottomright.y
        );
    }

    containsBBox(bbox: BBoxGeometry) {
        return (
            this.containsPoint(bbox.topleft) &&
            this.containsPoint(bbox.bottomright)
        );
    }
}
