import { logSolution } from "../../utils/logger";
import { inRange } from "./common";
import { inputs, Inputs } from "./inputs";

function solve(inputs: Inputs) {
    const allValidRanges = inputs.fields.flatMap(field => field.validRanges);

    const inSomeValidRange = (value: number) => allValidRanges.some(range => inRange(value, range));

    const ticketScanningErrorRate = inputs.nearbyTickets.flat().reduce((acc, val) => {
        if (!inSomeValidRange(val)) {
            return acc + val;
        }
        return acc;
    }, 0);

    logSolution(ticketScanningErrorRate);
}
solve(inputs);
