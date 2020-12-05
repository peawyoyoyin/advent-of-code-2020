import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const regex = /(\d+)-(\d+) (\w): (\w+)/;
    
    const validPasswords = inputs.filter(input => {
        const [_, min, max, char, password] = Array.from(regex.exec(input)!);

        const charCount = Array.from(password).filter(c => c == char).length;

        return charCount >= parseInt(min) && charCount <= parseInt(max);
    })

    logSolution(validPasswords.length, validPasswords);
}
solve(_inputs);
