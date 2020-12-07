// input url https://adventofcode.com/2020/day/7/input
import fs from 'fs';
import path from 'path';

const rawInput = fs.readFileSync(path.join(__dirname, 'input.txt'));

const inputs = rawInput.toString().trim().split('\r\n');

export interface BagContent {
    amount: number
    color: string
}

export interface Bag {
    color: string
    contains: BagContent[]
}

const bagContentItemRegex = /(\d+) (.*) bags?/;
function readBagContainString(bagContainString: string): BagContent[] {
    if (bagContainString === 'no other bags.') {
        return [];
    }

    const bagContains = bagContainString.split(',');
    return bagContains.map(bagContain => {
        const [_, amount, color, __] = bagContentItemRegex.exec(bagContain)!;

        return {
            color,
            amount: parseInt(amount)
        }
    });
}

const bagStartRegex = /(.*) bags contain (.*)/;
function readBags(inputs: string[]): Bag[] {
    const results: Bag[] = [];

    for (let input of inputs) {
        const [_, color, bagContainString] = bagStartRegex.exec(input)!;

        results.push({
            color,
            contains: readBagContainString(bagContainString)
        });
    }

    return results;
}
export const bags = readBags(inputs);
