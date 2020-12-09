import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

const preambleLength = 25;
let solution;
function solve(inputs: typeof _inputs) {
    const reverseMap = new Map<number, Set<number>>();

    function updateReverseMap(num: number, index: number) {
        if (reverseMap.has(num)) {
            reverseMap.get(num)?.add(index);
        } else {
            reverseMap.set(num, new Set([index]));
        }
    }

    for (let i = 0; i < preambleLength; i++) {
        updateReverseMap(inputs[i], i);
    }

    for (let i = preambleLength; i < inputs.length; i++) {
        let canConstruct = false;

        for (let j = 1; j <= preambleLength; j++) {
            const index = i-j;
            const target = inputs[i];
            const a = inputs[index];

            if (!reverseMap.has(target - a)) {
                continue;
            }

            const indices = reverseMap.get(target - a)!;
            if ([...indices].some(ind => (ind - i) <= preambleLength)) {
                canConstruct = true;
                break;
            }
        }

        updateReverseMap(inputs[i], i);

        if (!canConstruct) {
            solution = inputs[i];
            logSolution(inputs[i], i);
            break;
        }
    }
}

solve(_inputs);
export const part1Solution = solution;
