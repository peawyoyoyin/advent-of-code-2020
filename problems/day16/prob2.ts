import { logSolution } from "../../utils/logger";
import { inRange } from "./common";
import { inputs, Inputs } from "./inputs";

function solve(inputs: Inputs) {
    const allValidRanges = inputs.fields.flatMap(field => field.validRanges);

    const inSomeValidRange = (value: number) => allValidRanges.reduce((acc, range) => acc || inRange(value, range), false);

    const filteredNearbyTickets = inputs.nearbyTickets.filter(
        nearbyTicket => nearbyTicket.every(value => inSomeValidRange(value))
    );
    
    const possibleFieldsForIndex: string[][] = [];
    for (const fieldIndex in inputs.fields) {
        const allFieldValuesOnNearbyTickets = filteredNearbyTickets.map(ticket => ticket[fieldIndex]);

        let possibleFields = [];
        for (const field of inputs.fields) {
            if (allFieldValuesOnNearbyTickets.every(fieldValue => field.validRanges.some(range => inRange(fieldValue, range)))) {
                possibleFields.push(field.name);
            }
        }
        possibleFieldsForIndex.push(possibleFields);
    }

    // if there is only one field possible for an index, then it is for sure
    let possibleFieldsCopy = possibleFieldsForIndex.slice();
    const deductedFields = new Map<string, number>();
    while (true) {
        const singledOutIndex = possibleFieldsCopy.findIndex(possibleFields => possibleFields.length === 1);
        if (singledOutIndex < 0) {
            break;
        }
        const deductedField = possibleFieldsCopy[singledOutIndex][0];
        deductedFields.set(deductedField, singledOutIndex);

        possibleFieldsCopy = possibleFieldsCopy.map(possibleFields => possibleFields.filter(field => field !== deductedField));
    }

    // find product of all fields that starts with "departure"
    let product = 1;
    for (let field of inputs.fields) {
        if (field.name.startsWith('departure')) {
            const fieldIndex = deductedFields.get(field.name)!;
            product *= inputs.yourTicket[fieldIndex];
        }
    }
    logSolution(product);
}
solve(inputs);
