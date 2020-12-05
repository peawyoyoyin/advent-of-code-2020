// input url https://adventofcode.com/2020/day/1/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

export const inputs = rawInput.toString().trim().split('\n').map(x => parseInt(x.trim()));
