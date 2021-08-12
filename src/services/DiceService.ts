import logger from "../util/logger";

export interface IDice {
    emoji: string,
    value: number,
}

export const checkIfWin = (dice: IDice): boolean => {
    // Extract value and emoji from dice
    const {value, emoji} = dice;
    // If dice emoji is basketball
    if (emoji === '🏀') {
        logger.debug(`The dice rolled up with value: ${value}`);
        // Values '5' and '4' are the winning
        // ones, so everything else is lose
        // Return the result of dice
        return value === 5 || value === 4;
    }
    // If no basketball emoji return false
    return false;
}