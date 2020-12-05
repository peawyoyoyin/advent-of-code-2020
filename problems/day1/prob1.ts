import { logSolution } from "../../utils/logger";
import { inputs as _inputs } from "./inputs";

function solve(inputs: typeof _inputs) {
    for (let i = 0; i < inputs.length; i++) {
        const found = inputs.indexOf(2020 - inputs[i]);
        if (found >= 0 && found != i) {
            logSolution(inputs[i] * inputs[found], i, found, inputs[i], inputs[found]);
            break;
        }
    }
}

solve(_inputs);
