import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';
import { part1Solution } from './prob1';


/*
    Solution with better time complexity (of O(N)): simple sliding window
*/
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
    
    let i=0, j=1;
    while (true) {
        const sum = sumFrom(i, j);
        if (sum == target) {
            break;
        }

        if (sum < target!) {
            j++;
        } else if (sum > target!) {
            i++;
        }
    }

    const range = inputs.slice(i, j);
    const min = Math.min(...range);
    const max = Math.max(...range);
    logSolution(min + max, i, j);
}
solve(_inputs);
