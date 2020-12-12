// input url https://adventofcode.com/2020/day/12/input
import fs from 'fs';
import path from 'path';
import { Instruction } from './common';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const inputs = rawInput.toString().trim().split('\r\n');

export const instructions: Instruction[] = inputs.map(input => [input.slice(0, 1), parseInt(input.slice(1))]);
