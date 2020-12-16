// input url https://adventofcode.com/2020/day/16/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const _inputs = rawInput.toString().trim().split('\r\n');

export type Ticket = number[];
export type Field = {
    name: string
    validRanges: [min: number, max: number][]
};
export type Inputs = {
    fields: Field[]
    yourTicket: Ticket
    nearbyTickets: Ticket[]
}

const fieldRegex = /(.*): (\d+)-(\d+) or (\d+)-(\d+)/;
function readTicket(line: string): Ticket {
    return line.split(',').map(num => parseInt(num, 10));
}

function readInputs(inputs: typeof _inputs): Inputs {
    // parse fields
    const inputCopy = inputs.slice();
    const fields: Field[] = [];
    while (true) {
        const line = inputCopy.shift();

        if (line === '') {
            break;
        }

        const [_, fieldName, min1Raw, max1Raw, min2Raw, max2Raw] = fieldRegex.exec(line!)!;
        fields.push({
            name: fieldName,
            validRanges: [
                [parseInt(min1Raw, 10), parseInt(max1Raw, 10)],
                [parseInt(min2Raw, 10), parseInt(max2Raw, 10)]
            ]
        });
    }

    // remove "your ticket:"
    inputCopy.shift();
    const yourTicket = readTicket(inputCopy.shift()!);

    // remove empty line after "your ticket"
    inputCopy.shift();

    // remove "nearby ticket:"
    inputCopy.shift();
    const nearbyTickets: Ticket[] = [];
    while (true) {
        const line = inputCopy.shift();

        if (!line || line === '') {
            break;
        }

        const ticket = readTicket(line);
        nearbyTickets.push(ticket);
    }

    return {
        fields,
        yourTicket,
        nearbyTickets
    }
}

export const inputs = readInputs(_inputs);
