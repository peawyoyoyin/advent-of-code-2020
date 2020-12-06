import { logSolution } from "../../utils/logger";
import { Group, groups as _groups } from "./inputs";

function countAllYes(group: Group): number {
    const yeses = new Map<string, number>();

    for (let person of group) {
        for (let question of person) {
            if (yeses.has(question)) {
                yeses.set(question, yeses.get(question)! + 1);
            } else {
                yeses.set(question, 1);
            }
        }
    }

    return [...yeses.entries()].filter(([question, yeses]) => yeses === group.length).length;
}

function solve(groups: Group[]) {
    const yesCount = groups.map(group => countAllYes(group));

    const total = yesCount.reduce((acc, val) => acc + val, 0);
    logSolution(total, groups, yesCount);
}
solve(_groups);
