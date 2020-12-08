import { inputs } from "./inputs";

export type Instruction = [instruction: string, parameter: number];

const instructionRegex = /(nop|acc|jmp) ([+-]\d+)/;
export function readInstruction(rawInstruction: string): Instruction {
    const [_, instruction, rawParameter] = instructionRegex.exec(rawInstruction)!;
    const parameter = parseInt(rawParameter);

    return [instruction, parameter];
}

export const instructions = inputs.map(input => readInstruction(input));

export function executeInstructions(instructions: Instruction[]): [result: number, endPointer: number] {
    let instructionPointer = 0;
    let accumulatorValue = 0;

    const executedLines = new Set<number>();

    while(true) {
        if (executedLines.has(instructionPointer) || instructionPointer >= instructions.length) {
            break;
        }

        const executingInstruction = instructions[instructionPointer];
        executedLines.add(instructionPointer);

        const [instruction, parameter] = executingInstruction;
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

    return [accumulatorValue, instructionPointer];
}
