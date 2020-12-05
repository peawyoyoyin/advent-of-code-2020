import { logSolution } from '../../utils/logger';
import { calculateSeat, seatID } from './common';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const seats = inputs.map(input => calculateSeat(input));

    const seatIDs = seats.map(seat => seatID(seat));

    seatIDs.sort((a, b) => a - b);

    let previous = 0;
    for (let seatID of seatIDs) {
        if (previous == 0) {
            previous = seatID;
            continue;
        }

        if (seatID !== previous + 1) {
            break;
        }
        previous = seatID;
    }
    logSolution(previous + 1, seatIDs);
}

solve(_inputs);
