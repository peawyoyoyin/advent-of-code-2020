import { logSolution } from "../../utils/logger";
import { inputs as _inputs } from "./inputs";

const instructionRegex = /(nop|acc|jmp) ([+-]\d+)/;
function solve(inputs: typeof _inputs) {
    let instructionPointer = 0;
    let accumulatorValue = 0;

    const executedLines = new Set<number>();

    while(true) {
        if (executedLines.has(instructionPointer)) {
            break;
        }

        const executingLine = inputs[instructionPointer];
        const [_, instruction, rawParameter] = instructionRegex.exec(executingLine)!;
        const parameter = parseInt(rawParameter);
        
        executedLines.add(instructionPointer);
        switch(instruction) {
            case 'nop':
                instructionPointer += 1;
                break;
            case 'acc':
                accumulatorValue += parameter;
                instructionPointer += 1;
                break;
            case 'jmp':
                instructionPointer += parameter;
                break;
        }
    }

    logSolution(accumulatorValue, instructionPointer);
}
solve(_inputs)
