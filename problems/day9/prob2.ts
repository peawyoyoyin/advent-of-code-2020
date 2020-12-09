import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';
import { part1Solution } from './prob1';

const target = part1Solution;
function solve(inputs: typeof _inputs) {
    let quickSums: number[] = [];

    quickSums.push(0, inputs[0]);
    for (let i = 1; i < inputs.length; i++) {
        quickSums.push(inputs[i] + quickSums[quickSums.length - 1]);
    }

    function sumFrom(start: number, end: number) {
        return quickSums[end] - quickSums[start];
    }
    
    let found = false;
    for (let i = 0; i < inputs.length; i++) {
        for (let j = i+1; j <= inputs.length; j++) {
            if (sumFrom(i, j) === target) {
                found = true;

                const range = inputs.slice(i, j);
                const min = Math.min(...range);
                const max = Math.max(...range);

                logSolution(min + max, i, j, range);
                break;
            }
        }

        if (found) {
            break;
        }
    }
}
solve(_inputs);
