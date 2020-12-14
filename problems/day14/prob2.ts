import { logSolution } from "../../utils/logger";
import { instructions } from "./inputs";

function* decodeMemoryMasks(mask: string, addressAsBinary: string): Generator<string, void, void> {
    if (mask === '' && addressAsBinary === '') {
        yield '';
    } else {
        const firstMaskBit = mask[0];
        const firstAddressBit = addressAsBinary[0];
        const remainingMasks = mask.slice(1);
        const remainingAddress = addressAsBinary.slice(1);

        const nextMemoryMasks = decodeMemoryMasks(remainingMasks, remainingAddress);

        let prefixes: string[] = [];
        switch (firstMaskBit) {
            case '0':
                prefixes = [firstAddressBit];
                break;
            case '1':
                prefixes = ['1'];
                break;
            case 'X':
                prefixes = ['0', '1'];
                break;
        }

        for (const address of nextMemoryMasks) {
            for (const prefix of prefixes) {
                yield prefix + address;
            }
        }
    }
}

function solve(inputs: typeof instructions) {
    let currentMask: string = '';
    const memory = new Map<number, number>();

    for (const input of inputs) {
        if (input.type === 'mask') {
            currentMask = input.mask;
        } else if (input.type === 'mem') {
            const addressAsBinary = input.address.toString(2).padStart(36, '0');
            for (const addressBinaryString of decodeMemoryMasks(currentMask, addressAsBinary)) {
                const address = parseInt(addressBinaryString, 2); 
                memory.set(address, input.parameter);
            }
        }
    }

    const sum = [...memory.values()].reduce((acc, val) => acc + val, 0);
    logSolution(sum, memory);
}
solve(instructions);
