import { logSolution } from "../../utils/logger";
import { executeInstructions, instructions as _instructions } from "./common";

function solve(instructions: typeof _instructions) {
    let indexToSwap = -1;

    /*
     explanation: DP approach to find the index we have to swap between jmp and nop
     recursion function: is F(N: number, W: number, V: set) where
        F(n, *, *) = true if n equals the length of all instructions (means the machine stops at index n)
        F(j, *, V) = false if j in V (means we are running index j for the second time)

        otherwise let i, p be the instruction and parameter of the nth instruction
        F(n, w, v) equals the following:
            - F(n+1, w, v U n) if i == 'acc'
                - explanation: if 'acc' we just go to next index
            - F(n+1, w, v U n) || (F(n+p, w, v U n) && w == -1) if i == 'nop'
                - explanation: if 'nop' we try next index, and if w == -1 (means not swapped yet) we also try jumping ('jmp')
            - F(n+p, w, v U n) || (F(n+1, w, v U n) && w == -1) if i == 'acc'
                - explanation: if 'jmp' we try jumping, and if w == -1 (means not swapped yet) we also try next index ('nop')
        
        then we add memoization with mapping from (s: number, t: boolean) -> w: boolean
            where s = index, t = (w == -1), w = return value of F 
    */
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
