import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    function checkForSlope(ySlope: number, xSlope: number) {
        let x = 0;
        let y = 0;
    
        let trees = 0;

        while (y < inputs.length) {
            if (inputs[y][x] === '#') {
                trees++;
            }
    
            x += xSlope;
            x %= inputs[y].length;
            y += ySlope;
        }
    
        return trees;
    }

    const slopes: [ySlope: number, xSlope: number][] = [
        [1, 1],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 1]
    ];

    const checks = slopes.map(slope => checkForSlope(...slope))
    const sum = checks.reduce((acc, val) => acc * val, 1);

    logSolution(sum, checks);
}
solve(_inputs);
