import { logSolution } from '../../utils/logger';
import { Passport, passports } from './inputs';

function isValidPassport(passport: Passport): boolean {
    return [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid'
    ].every(key => passport.has(key));
}

function solve(inputs: typeof passports) {
    const validPassports = inputs.filter(passport => isValidPassport(passport));

    logSolution(validPassports.length, validPassports);
}
solve(passports);
