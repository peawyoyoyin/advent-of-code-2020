// input url https://adventofcode.com/2020/day/14/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const _inputs = rawInput.toString().trim().split('\r\n');

type MaskInstruction = {
    type: 'mask'
    mask: string
}

type MemInstruction = {
    type: 'mem'
    address: number
    parameter: number
}

type Instruction = MaskInstruction | MemInstruction;

const maskInstructionRegex = /mask = ([10X]{36})/;
const memInstructionRegex = /mem\[(\d+)\] = (\d+)/;
function readInputs(inputs: typeof _inputs): Instruction[] {
    return inputs.map(input => {
        if (maskInstructionRegex.test(input)) {
            const [_, mask] = maskInstructionRegex.exec(input)!;
            return {
                type: 'mask',
                mask
            };
        } else if (memInstructionRegex.test(input)) {
            const [_, rawAddress, rawParameter] = memInstructionRegex.exec(input)!;
            return {
                type: 'mem',
                address: parseInt(rawAddress, 10),
                parameter: parseInt(rawParameter, 10)
            }
        } else {
            throw new Error(`error reading input: unrecognized format '${input}'`);
        }
    });
}
export const instructions = readInputs(_inputs);
