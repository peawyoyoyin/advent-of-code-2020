// input url https://adventofcode.com/2020/day/8/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

export const inputs = rawInput.toString().trim().split('\r\n');
