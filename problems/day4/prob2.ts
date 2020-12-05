import { logSolution } from '../../utils/logger';
import { Passport, passports } from './inputs';

function numberValueInRange(min: number, max: number) {
    return (value: string) => {
        const numberValue = parseInt(value, 10);
        return numberValue >= min && numberValue <= max;
    }
}

const heightRegex = /(\d+)(cm|in)/;
function validHeight(height: string): boolean {
    if (!heightRegex.test(height)) {
        return false;
    }

    const [_, value, unit] = Array.from(height.match(heightRegex)!);

    switch (unit) {
        case 'cm':
            return numberValueInRange(150, 193)(value);
        case 'in':
            return numberValueInRange(59, 76)(value);
        default:
            return false;
    }
}

const pidRegex = /^\d{9}$/;
const hclRegex = /^#[0-9a-f]{6}$/;
const eclRegex = /^(amb|blu|brn|gry|grn|hzl|oth)$/;
function isValidPassport(passport: Passport): boolean {
    const hasAllfields = [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid'
    ].every(key => passport.has(key));

    if (!hasAllfields) {
        return false;
    }

    const isValid = validHeight(passport.get('hgt')!) &&
            pidRegex.test(passport.get('pid')!) &&
            hclRegex.test(passport.get('hcl')!) &&
            eclRegex.test(passport.get('ecl')!) &&
            numberValueInRange(1920, 2002)(passport.get('byr')!) &&
            numberValueInRange(2010, 2020)(passport.get('iyr')!) &&
            numberValueInRange(2020, 2030)(passport.get('eyr')!);

    return isValid;
}

function solve(inputs: typeof passports) {
    const validPassports = inputs.filter(passport => isValidPassport(passport));

    logSolution(validPassports.length, JSON.stringify(validPassports.map(passport => Object.fromEntries(passport.entries())), null, 2));
}
solve(passports);
