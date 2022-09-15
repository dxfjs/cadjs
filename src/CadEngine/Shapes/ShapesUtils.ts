export function render(
    context: CanvasRenderingContext2D,
    zoom: number,
    selected: boolean,
    renderShape: (context: CanvasRenderingContext2D) => void
): void {
    const strokeStyle = context.strokeStyle;
    const dash = context.getLineDash();
    if (selected) {
        const dashLength = 10 / zoom;
        context.strokeStyle = '#ab2346';
        context.setLineDash([dashLength, dashLength]);
    }
    renderShape(context);
    context.strokeStyle = strokeStyle;
    context.setLineDash(dash);
}
