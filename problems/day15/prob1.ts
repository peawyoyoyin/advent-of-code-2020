import { logSolution } from '../../utils/logger';
import { findSaidNumberOnTargetTurn } from './common';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    logSolution(findSaidNumberOnTargetTurn(inputs, 2020));
}
solve(_inputs);
