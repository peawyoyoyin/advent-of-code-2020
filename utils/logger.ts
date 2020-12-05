import yargs from 'yargs';

const args = yargs
    .option({
        'additionalInfo': {
            alias: 'i',
            default: false,
            boolean: true
        }
    })
    .argv;

export const logSolution = (solution: any, ...additionalInfo: any[]) => {
    if (args.additionalInfo) {
        console.log('additional info:', ...additionalInfo);
    }
    console.log('solution:', solution);
}
