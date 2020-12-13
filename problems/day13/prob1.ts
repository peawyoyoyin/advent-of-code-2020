import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const [startTimeStamp, linesRaw] = inputs;
    const availableLines = linesRaw.filter(line => line !== 'x').map(line => parseInt(line, 10));

    let minTimeToWait = Infinity;
    let earliestDepartingLine = -1;
    for (let lineID of availableLines) {
        const timeToWait = lineID - (startTimeStamp % lineID);

        if (timeToWait < minTimeToWait) {
            minTimeToWait = timeToWait;
            earliestDepartingLine = lineID;
        }
    }

    logSolution(minTimeToWait * earliestDepartingLine, minTimeToWait, earliestDepartingLine);
}
solve(_inputs)
