import { logSolution } from '../../utils/logger';
import { inputs as _inputs } from './inputs';

function solve(inputs: typeof _inputs) {
    const regex = /(\d+)-(\d+) (\w): (\w+)/;
    
    const validPasswords = inputs.filter(input => {
        const [_, p1, p2, char, password] = Array.from(regex.exec(input)!);

        const charAtp1 = password[parseInt(p1)-1] === char;
        const charAtp2 = password[parseInt(p2)-1] === char;

        return (charAtp1 !== charAtp2) && (charAtp1 || charAtp2);
    })

    logSolution(validPasswords.length, validPasswords);
}
solve(_inputs);
