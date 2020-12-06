import { logSolution } from "../../utils/logger";
import { Group, groups as _groups } from "./inputs";

function countYesInGroup(group: Group): number {
    const yeses = new Set<string>();

    for (let person of group) {
        for (let question of person) {
            yeses.add(question);
        }
    }

    return yeses.size;
}

function solve(groups: Group[]) {
    const yesCount = groups.map(group => countYesInGroup(group));

    const total = yesCount.reduce((acc, val) => acc + val, 0);
    logSolution(total, groups, yesCount);
}
solve(_groups);
