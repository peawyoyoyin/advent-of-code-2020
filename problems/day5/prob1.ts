import { logSolution } from '../../utils/logger';
import { calculateSeat, seatID } from './common';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const seats = inputs.map(input => calculateSeat(input));

    const seatIDs = seats.map(seat => seatID(seat));

    const maxSeatID = seatIDs.reduce((acc, val) => val > acc ? val : acc, 0);

    logSolution(maxSeatID, seatIDs, seats);
}

solve(_inputs);
