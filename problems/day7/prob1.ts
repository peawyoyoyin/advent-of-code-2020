import { logSolution } from "../../utils/logger";
import { Bag, bags as _bags } from "./inputs";

const targetColor = 'shiny gold';
function solve(bags: Bag[]) {
    const containedByMap = new Map<string, string[]>();

    bags.forEach(bag => {
        bag.contains.forEach(content => {
            if (containedByMap.has(content.color)) {
                containedByMap.set(content.color, [...containedByMap.get(content.color)!, bag.color]);
            } else {
                containedByMap.set(content.color, [bag.color]);
            }
        });
    });

    const outerColors = new Set<string>();
    function findOuterColor(color: string): number {
        if (containedByMap.has(color)) {
            containedByMap.get(color)!.forEach(contentColor => {
                outerColors.add(contentColor);
                findOuterColor(contentColor);
            });
        }
        return 0;
    }
    findOuterColor(targetColor);
    
    logSolution(outerColors.size);
}
solve(_bags);
