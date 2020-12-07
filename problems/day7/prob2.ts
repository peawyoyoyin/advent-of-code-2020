import { logSolution } from "../../utils/logger";
import { Bag, BagContent, bags as _bags } from "./inputs";

const targetColor = 'shiny gold';
function solve(bags: Bag[]) {
    const containsMap = new Map<string, BagContent[]>();

    bags.forEach(bag => {
        containsMap.set(bag.color, bag.contains);
    });
    
    function countInnerBags(color: string): number {
        const bagContents = containsMap.get(color);

        if (bagContents?.length === 0) {
            return 0;
        }
        
        return bagContents
            ?.map(bagContent => bagContent.amount + bagContent.amount * countInnerBags(bagContent.color))
            .reduce((acc, val) => acc + val, 0)
            ?? 0;
    }
    const solution = countInnerBags(targetColor);
    logSolution(solution);
}
solve(_bags);
