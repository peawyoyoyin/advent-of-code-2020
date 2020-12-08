import { logSolution } from "../../utils/logger";
import { executeInstructions, instructions as _instructions } from "./common";

function solve(instructions: typeof _instructions) {
    let indexToSwap = -1;

    const memo = new Map<string, boolean>();
    function dyn(index: number, swapped: number, visited: Set<number>): boolean {
        const memoKey = `${index}:${swapped === -1}`; 

        if (memo.has(memoKey)) {
            return memo.get(memoKey)!;
        }

        if (index === instructions.length) {
            indexToSwap = swapped;
            return true;
        }

        if (visited.has(index)) {
            return false;
        }

        const [command, parameter] = instructions[index];

        const newVisited = new Set([...visited, index]);

        let stop1: boolean, stop2: boolean;
        switch (command) {
            case 'acc':
                return dyn(index + 1, swapped, newVisited);
            case 'jmp':
                // jmp
                stop1 = dyn(index + parameter, swapped, newVisited);
                // nop
                if (swapped === -1) {
                    stop2 = dyn(index + 1, index, newVisited);
                }
                break;
            case 'nop':
                // nop
                stop1 = dyn(index + 1, swapped, newVisited);
                if (swapped === -1) {
                    stop2 = dyn(index + parameter, index, newVisited);
                }
                break;
        }
        memo.set(memoKey, stop1! || stop2!);
        return stop1! || stop2!;
    }
    dyn(0, -1, new Set<number>());

    const swappedInstructions = [...instructions];
    swappedInstructions[indexToSwap][0] = swappedInstructions[indexToSwap][0] === 'jmp' ? 'nop' : 'jmp';

    const [accumulatorValue, __] = executeInstructions(swappedInstructions);
    logSolution(accumulatorValue, indexToSwap);
}
solve(_instructions);
