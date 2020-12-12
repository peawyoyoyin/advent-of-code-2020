export type Instruction = [command: string, parameter: number];

export function manhattanDistance(location: [x: number, y: number]): number {
    const [x, y] = location;
    return Math.abs(x) + Math.abs(y);
}
