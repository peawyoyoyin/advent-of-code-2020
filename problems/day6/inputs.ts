// input url https://adventofcode.com/2020/day/5/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const inputs = rawInput.toString().trim().split('\r\n');

export type Group = string[];

function readGroups(lines: typeof inputs): Group[] {
    let currentGroup: Group = [];
    const result: Group[] = [];
    
    for (let line of lines) {
        if (line === '') {
            result.push(currentGroup);
            currentGroup = [];
            continue;
        }

        currentGroup.push(line);
    }

    result.push(currentGroup);
    return result;
}

export const groups = readGroups(inputs);
