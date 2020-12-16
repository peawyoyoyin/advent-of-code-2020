export function inRange(value:number, [min, max]: [min: number, max: number]) {
    return value >= min && value <= max;
}
