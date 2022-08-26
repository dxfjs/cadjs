import { vec2_t } from '../types';

export function vec2(x: number, y: number): vec2_t {
    return { x, y };
}

export function rad2deg(angle: number) {
    return (angle * 180) / Math.PI;
}

export function deg2rad(angle: number) {
    return (angle * Math.PI) / 180;
}

/**
 * Screen to world transformation
 * @param p The screen position
 * @param o The offset
 * @param z The current zoom value
 * @returns The world position
 */
export function s2w(p: vec2_t, o: vec2_t, z: number): vec2_t {
    return {
        x: p.x / z + o.x,
        y: p.y / z + o.y,
    };
}

/**
 * World to screen transformation
 * @param p The world position
 * @param o The offset
 * @param z The current zoom value
 * @returns The screen position
 */
export function w2s(p: vec2_t, o: vec2_t, z: number): vec2_t {
    return {
        x: (p.x - o.x) * z,
        y: (p.y - o.y) * z,
    };
}

/**
 * @param f The first point
 * @param s The second point.
 * @returns The distance between the tow points.
 */
export function distance(f: vec2_t, s: vec2_t) {
    return Math.sqrt(Math.pow(f.x - s.x, 2) + Math.pow(f.y - s.y, 2));
}

export function angle(f: vec2_t, s: vec2_t) {
    const dx = s.x - f.x;
    const dy = s.y - f.y;
    let a = Math.atan(dy / dx);
    let r = a;
    if (dx < 0 && dy > 0) r = Math.PI + a;
    else if (dx < 0 && dy < 0) r = Math.PI + a;
    else if (dx > 0 && dy < 0) r = 2 * Math.PI + a;
    return r;
}
