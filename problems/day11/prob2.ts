import { logSolution } from "../../utils/logger";
import { areSeatsEqual, countOccupiedSeats, floor, serializeSeats } from "./common";
import { inputs as _inputs } from "./inputs";

const occupiedSeat = '#';
const emptySeat = 'L';

function solve(inputs: typeof _inputs) {
    // deep-copy input
    const seats = inputs.map(input => input.slice());

    const width = seats[0].length;
    const height = seats.length;

    function countVisibleOccupiedSeats(seatState: typeof seats, y: number, x: number): number {
        // console.log('count', y, x);
        
        let result = 0;
        
        for (let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if (dy == 0 && dx == 0) {
                    continue;
                }
                
                let my = 1, mx = 1;
                while (true) {
                    const poiY = y + (my*dy);
                    const poiX = x + (mx*dx);
                    // console.log('poi', poiY, poiX)

                    if (poiY < 0 || poiY >= height || poiX < 0 || poiX >= width) {
                        break;
                    }

                    if (seatState[poiY][poiX] === occupiedSeat) {
                        result += 1;
                        break;
                    }

                    if (seatState[poiY][poiX] === emptySeat) {
                        break;
                    }

                    if (seatState[poiY][poiX] === floor) {
                        my += 1;
                        mx += 1;
                    }
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
                if (currentSeats[y][x] === emptySeat && countVisibleOccupiedSeats(currentSeats, y, x) === 0) {
                    nextSeat[y][x] = occupiedSeat;
                } else if (currentSeats[y][x] === occupiedSeat && countVisibleOccupiedSeats(currentSeats, y, x) >= 5) {
                    nextSeat[y][x] = emptySeat;
                }
            }
        }

        return nextSeat;
    }

    let currentSeats: typeof seats = seats.map(row => row.slice());
    let previousSeats: typeof seats = [];
    let iteration = 0;
    do {
        previousSeats = currentSeats;
        currentSeats = runSimulation(currentSeats);
    } while(!areSeatsEqual(previousSeats, currentSeats));
    logSolution(countOccupiedSeats(currentSeats), serializeSeats(currentSeats));
}
solve(_inputs);
