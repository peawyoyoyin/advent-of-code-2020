import { logSolution } from "../../utils/logger";
import { areSeatsEqual, countOccupiedSeats } from "./common";
import { inputs as _inputs } from "./inputs";

const occupiedSeat = '#';
const emptySeat = 'L';

function solve(inputs: typeof _inputs) {
    // deep-copy input
    const seats = inputs.map(input => input.slice());

    const width = seats[0].length;
    const height = seats.length;

    function countAdjacentOccupiedSeats(seatState: typeof seats, y: number, x: number): number {
        let result = 0;
        
        for (let i = -1; i <= 1; i++) {
            for(let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                
                if (y+i < 0 || y+i >= height || x+j < 0 || x+j >= width) {
                    continue;
                }
                
                if (seatState[y+i][x+j] === occupiedSeat) {
                    result += 1;
                }
            }
        }
        return result;
    }
    
    function runSimulation(currentSeats: typeof seats): typeof seats {
        // deep-copy seats
        const nextSeat = currentSeats.map(row => row.slice());

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (currentSeats[y][x] === emptySeat && countAdjacentOccupiedSeats(currentSeats, y, x) === 0) {
                    nextSeat[y][x] = occupiedSeat;
                } else if (currentSeats[y][x] === occupiedSeat && countAdjacentOccupiedSeats(currentSeats, y, x) >= 4) {
                    nextSeat[y][x] = emptySeat;
                }
            }
        }

        return nextSeat;
    }

    let currentSeats: typeof seats = seats.map(row => row.slice());
    let previousSeats: typeof seats = [];
    do {
        previousSeats = currentSeats;
        currentSeats = runSimulation(currentSeats);
    } while(!areSeatsEqual(previousSeats, currentSeats));
    logSolution(countOccupiedSeats(currentSeats), currentSeats.map(row => row.join('')).join('\n'));
}
solve(_inputs);
