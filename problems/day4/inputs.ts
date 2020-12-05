// input url https://adventofcode.com/2020/day/4/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const lines = rawInput.toString().trim().split('\r\n');

export type Passport = Map<string, string>;
const regex = /(\w+):(\S+)/g;
function readPassports(inputs: typeof lines): Passport[] {
    const result: Passport[] = [];
    let current = new Map<string, string>();

    for (let line of inputs) {
        if (line === '') {
            result.push(current);
            current = new Map<string, string>();
            continue;
        }

        const matches = Array.from(line.matchAll(regex));

        for (let match of matches) {
            const [_, key, value] = match;
            current.set(key, value);
        }
    }
    result.push(current);

    return result;
}
export const passports = readPassports(lines);
