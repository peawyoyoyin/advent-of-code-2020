import { logSolution } from "../../utils/logger";
import { inputs } from "./inputs";

// O(N) solution: recursive couting with memoization
function solve(joltages: typeof inputs) {
    const sortedJoltages = joltages.slice().sort((a, z) => a - z);

    const chain = [0];
    let currentJoltage = 0;

    for (let joltage of sortedJoltages) {
        if (joltage - currentJoltage > 3) {
            break;
        }

        currentJoltage = joltage;
        chain.push(joltage);
    }

    const memo = new Map<number, number>();
    function countArrangements(startFrom: number): number {
        if (startFrom === chain.length - 1) {
            return 1;
        }
        
        if (memo.has(startFrom)) {
            return memo.get(startFrom)!;
        }
        
        let result = 0;
        let i = startFrom + 1;
        
        while (i < chain.length && (chain[i] - chain[startFrom]) <= 3) {
            result += countArrangements(i);
            i++;
        }
        memo.set(startFrom, result);
        return result;
    }

    logSolution(countArrangements(0));
}
solve(inputs);
