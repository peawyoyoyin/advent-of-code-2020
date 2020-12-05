import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    let x = 0;
    let y = 0;

    let trees = 0;

    while (y < inputs.length) {
        if (inputs[y][x] === '#') {
            trees++;
        }

        x += 3;
        x %= inputs[y].length;
        y++;
    }

    logSolution(trees);
}
solve(_inputs);
