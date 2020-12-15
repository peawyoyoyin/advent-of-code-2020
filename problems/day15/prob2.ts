import { logSolution } from '../../utils/logger';
import { findSaidNumberOnTargetTurn } from './common';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    logSolution(findSaidNumberOnTargetTurn(inputs, 30000000));
}
solve(_inputs);
