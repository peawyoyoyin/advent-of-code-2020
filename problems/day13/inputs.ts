// input url https://adventofcode.com/2020/day/13/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const _inputs = rawInput.toString().trim().split('\r\n');

export const inputs = [
    parseInt(_inputs[0]),
    _inputs[1].split(',')
] as const;
