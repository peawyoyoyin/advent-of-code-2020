export type Seat = [row: number, column: number];

export const binarySpacePartitioning = (min: number, max: number) => (lowerChar: string, upperChar: string) => (searchString: string) => {
    let currentMin = min;
    let currentMax = max;

    for (let char of searchString) {
        const middle = Math.floor((currentMin + currentMax) / 2);

        if (char === lowerChar) {
            currentMax = middle;
            continue;
        }

        if (char === upperChar) {
            currentMin = middle + 1;
        }
    }

    if (currentMin !== currentMax) {
        throw new Error(`currentMin not equal to currentMax: ${currentMin}, ${currentMax}, ${searchString}`);
    }

    return currentMin;
}

export function calculateSeat(boardingPass: string): Seat {
    const rowID = boardingPass.slice(0, 7);
    const columnID = boardingPass.slice(7);

    const column = binarySpacePartitioning(0, 7)('L', 'R')(columnID);
    const row = binarySpacePartitioning(0, 127)('F', 'B')(rowID);

    return [row, column];
}

export function seatID([row, column]: Seat): number {
    return (row * 8) + column;
}
