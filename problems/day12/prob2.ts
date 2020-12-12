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
function solve(inputs: typeof instructions) {
    let waypointRelativePosition: [x: number, y: number] = [10, 1];
    let shipPosition: [x: number, y: number] = [0, 0];

    function rotateEndpoint90DegreesLeft() {
        const [wpx, wpy] = waypointRelativePosition;

        const wpmx = Math.abs(wpx);
        const wpmy = Math.abs(wpy);

        let newWx = wpx;
        let newWy = wpy;
        if (wpx > 0 && wpy > 0) { // waypoint in Q1
            newWx = -1 * wpmy;
            newWy = wpmx;
        } else if (wpx < 0 && wpy > 0) { // waypoint in Q2
            newWx = -1 * wpmy;
            newWy = -1 * wpmx;
        } else if (wpx < 0 && wpy < 0) { // waypoint in Q3
            newWx = wpmy;
            newWy = -1 * wpmx;
        } else if (wpx > 0 && wpy < 0) { // waypoint in Q4
            newWx = wpmy;
            newWy = wpmx;
        } else if (wpx === 0 && wpy !== 0) { // waypoint on Y axis
            newWx = -1 * wpy;
            newWy = 0;
        } else if (wpx !== 0 && wpy === 0) { // waypoint on X axis
            newWx = 0;
            newWy = wpx;
        }

        waypointRelativePosition[0] = newWx;
        waypointRelativePosition[1] = newWy;
    }

    inputs.forEach(instruction => {
        const [command, parameter] = instruction;

        switch(command) {
            case 'N':
                waypointRelativePosition[1] += parameter;
                break;
            case 'S':
                waypointRelativePosition[1] -= parameter;
                break;
            case 'E':
                waypointRelativePosition[0] += parameter;
                break;
            case 'W':
                waypointRelativePosition[0] -= parameter;
                break;
            case 'L':
                const numberOfTimes = Math.floor(parameter / 90);
                for (let i = 0; i < numberOfTimes; i++) {
                    rotateEndpoint90DegreesLeft();
                }
                break;
            case 'R':
                const numberOfTimesLeft = Math.floor((360 - parameter) / 90);
                for (let i = 0; i < numberOfTimesLeft; i++) {
                    rotateEndpoint90DegreesLeft();
                }
                break;
            case 'F':
                shipPosition[0] += waypointRelativePosition[0] * parameter;
                shipPosition[1] += waypointRelativePosition[1] * parameter;
                break;
            default:
                throw new Error(`unknown command ${command}`);
        }
    });

    logSolution(manhattanDistance(shipPosition), shipPosition, waypointRelativePosition);
}
solve(instructions);
