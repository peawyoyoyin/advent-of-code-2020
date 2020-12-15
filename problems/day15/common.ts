export function findSaidNumberOnTargetTurn(initialNumbers: number[], targetTurn: number) {
    let turnNumber = 1;

    const latestTurnOfOccurence = new Map<number, number>();
    let previouslySaidNumber: number;
    let numberSaidThisTurn: number;
    while (turnNumber <= targetTurn) {
        if (turnNumber <= initialNumbers.length) {
            numberSaidThisTurn = initialNumbers[turnNumber - 1];
        } else {
            if (latestTurnOfOccurence.has(previouslySaidNumber!)) {
                numberSaidThisTurn = turnNumber - latestTurnOfOccurence.get(previouslySaidNumber!)!;
            } else {
                numberSaidThisTurn = 0;
            }
        }
        if (previouslySaidNumber! !== undefined) {
            latestTurnOfOccurence.set(previouslySaidNumber, turnNumber);
        }
        turnNumber++;
        previouslySaidNumber = numberSaidThisTurn!;
    }
    return numberSaidThisTurn!;
}
