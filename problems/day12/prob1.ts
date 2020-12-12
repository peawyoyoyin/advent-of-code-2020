import { logSolution } from "../../utils/logger";
import { manhattanDistance } from "./common";
import { instructions } from "./inputs";

/*
        +y
        N
   -x W   E +x
        S
        -y
*/
function toDirections(facingInDegrees: number): [dx: number, dy: number] {
    switch (facingInDegrees) {
        case 0:
            return [1, 0];
        case 90:
            return [0, 1];
        case 180:
            return [-1, 0];
        case 270:
            return [0, -1];
        default:
            throw new Error(`unknown facing ${facingInDegrees}`);
    }
}

function solve(inputs: typeof instructions) {
    let position: [x: number, y: number] = [0, 0]; // [x, y]
    let facing = 0; // degrees

    inputs.forEach(instruction => {
        const [command, parameter] = instruction;

        switch(command) {
            case 'N':
                position[1] += parameter;
                break;
            case 'S':
                position[1] -= parameter;
                break;
            case 'E':
                position[0] += parameter;
                break;
            case 'W':
                position[0] -= parameter;
                break;
            case 'L':
                facing += parameter;
                facing %= 360;
                break;                
            case 'R':
                facing -= parameter;
                if (facing < 0) {
                    facing += 360;
                }
                facing %= 360;
                break;
            case 'F':
                const [dx, dy] = toDirections(facing);
                position[0] += dx * parameter;
                position[1] += dy * parameter;
                break;
            default:
                throw new Error(`unknown command ${command}`);
        }
    });

    logSolution(manhattanDistance(position), position, facing);
}
solve(instructions);
