import { logSolution } from "../../utils/logger";
import { instructions } from "./inputs";

function applyMask(mask: string, num: number) {
    const numAsBinary = num.toString(2).padStart(36, '0');
    
    let result: string[] = [];
    for (let i = 0; i < 36; i++) {
        switch (mask[i]) {
            case '1':
                result.push('1');
                break;
            case '0':
                result.push('0');
                break;
            case 'X':
                result.push(numAsBinary[i]);
                break;
        }
    }
    return parseInt(result.join(''), 2);
}

function solve(inputs: typeof instructions) {
    let currentMask: string = '';
    const memory = new Map<number, number>();

    for (const input of inputs) {
        if (input.type === 'mask') {
            currentMask = input.mask;
        } else if (input.type === 'mem') {
            memory.set(input.address, applyMask(currentMask, input.parameter));
        }
    }

    const sum = [...memory.values()].reduce((acc, val) => acc + val, 0);
    logSolution(sum, memory);
}
solve(instructions);
