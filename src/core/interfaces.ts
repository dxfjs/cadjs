export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D extends Point2D {
    z: number;
}

export interface Renderable {
    render(ctx: CanvasRenderingContext2D): void;
}
