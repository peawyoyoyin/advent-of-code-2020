import { logSolution } from "../../utils/logger";
import { executeInstructions, Instruction, readInstruction } from "./common";
import { inputs as _inputs } from "./inputs";

function solve(inputs: typeof _inputs) {
    const instructions = inputs.map(input => readInstruction(input));
    
    for (let i = 0; i < instructions.length; i++) {
        const [currentCommand, currentParameter] = instructions[i];

        if (currentCommand === 'acc') {
            continue;
        }

        const swappedCommand = currentCommand === 'jmp' ? 'nop' : 'jmp';
        const swappedInstruction = [swappedCommand, currentParameter] as Instruction;

        const swappedInstructions = [...instructions.slice(0, i), swappedInstruction, ...instructions.slice(i+1)];
        const [result, endPointer] = executeInstructions(swappedInstructions);

        if (endPointer === instructions.length) {
            logSolution(result, i);
            break;
        }
    }
}
solve(_inputs);
