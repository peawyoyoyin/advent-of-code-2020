import { Seat } from "../day5/common";

export const emptySeat = 'L';
export const occupiedSeat = '#';
export const floor = '.';

export type Cell = typeof emptySeat | typeof occupiedSeat | typeof floor;
export type SeatState = Cell[][];

export function areSeatsEqual(seats1: SeatState, seats2: SeatState): boolean {
    return seats1.every((row, rowIndex) => {
        return row.every((col, colIndex) => {
            return col === seats2[rowIndex][colIndex];
        });
    });
}


export function countOccupiedSeats(seatState: SeatState): number {
    return seatState.reduce((acc, val) => (
        acc + val.filter(seat => seat == occupiedSeat).length
    ), 0);
}

export function serializeSeats(seatState: SeatState): string {
    return seatState.map(row => row.join('')).join('\n');
}
