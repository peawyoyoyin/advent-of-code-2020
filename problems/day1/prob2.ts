import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const map = new Map();

    for (let i = 0; i < inputs.length; i++) {
        map.set(inputs[i], i);
    }

    for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs.length; j++) {
            const target = 2020 - inputs[i] - inputs[j];
            if (map.has(target)) {
                const found = map.get(target);
                if (found >= 0 && found !== i && found !== j) {
                    logSolution(inputs[found] * inputs[i] * inputs[j], i, j, found, inputs[i], inputs[j], inputs[found]);
                    return;
                }
            }
        }
    }
}

solve(_inputs);
