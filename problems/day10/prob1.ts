import { logSolution } from "../../utils/logger";
import { inputs } from "./inputs";

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

    // device counts as max joltage + 3
    chain.push(currentJoltage + 3);

    let oneJdiff = 0, threeJdiff = 0;
    for (let j = 1; j < chain.length; j++) {
        const diff = chain[j] - chain[j-1];
        if (diff === 1) {
            oneJdiff++;
        } else if (diff === 3) {
            threeJdiff++;
        }
    }

    logSolution(oneJdiff * threeJdiff, oneJdiff, threeJdiff, chain);
}
solve(inputs);
