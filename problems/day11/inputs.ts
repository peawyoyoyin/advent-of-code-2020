// input url https://adventofcode.com/2020/day/11/input
import fs from 'fs';
import path from 'path';
import { SeatState } from './common';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

export const inputs = rawInput.toString().trim().split('\r\n').map(row => row.split('')) as SeatState;
