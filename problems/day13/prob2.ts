import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const linesToCheck: [divider: number, remainder: number][] = inputs[1].reduce((acc, val, index) => {
        if (val !== 'x') {
            return [...acc, [parseInt(val, 10), index]];
        }
        return acc;
    }, [] as [divider: number, remainder: number][]);

    const linesToCheckCopy = linesToCheck.slice();
    const [firstDivisor, firstRemainder] = linesToCheck.shift()!;
    let currentNumber = 0;
    let currentDivisor = firstDivisor;
    let currentRemainder = (firstDivisor - firstRemainder) % firstDivisor;
    let currentIncrement = 1;
    while(true) {
        if (currentNumber % currentDivisor === (currentRemainder % currentDivisor)) {
            if (linesToCheck.length === 0) {
                break;
            }

            const [nextDivisor, nextRemainder] = linesToCheck.shift()!;
            currentIncrement *= currentDivisor;
            currentDivisor = nextDivisor;
            currentRemainder = (nextDivisor - nextRemainder) % nextDivisor;
            if (currentRemainder < 0) {
                currentRemainder += nextDivisor;
            }
            continue;
        }
        currentNumber += currentIncrement;
    }
    logSolution(currentNumber, linesToCheckCopy.map(([divider, remainder]) => [divider, remainder % divider, divider - (currentNumber % divider)]));
}
solve(_inputs);
