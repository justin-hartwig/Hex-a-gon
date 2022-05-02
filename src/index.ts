import { correctAnswer, generateColorChoices, regenerateCorrectAnswer } from "./colorCoice";
import { currentDifficulty } from "./difficulty";
import { defaultAnswer, disablePlayAgain, enableColorChoice, initalizeActiveDifficulty, renderDifficultyOptions, updateAnswers, updateQuestionNumber } from "./domManipulation";
import { initalizePlayAgain } from "./replay";

/** 
 * Initalize the game by using helper functions in other modules.
*/
function initalize() : void {
    initalizePlayAgain();
    renderDifficultyOptions();
    initalizeActiveDifficulty();
    play();
}

/** 
 * Starts/Restarts the game by using helper functions in other modules.
 * Gets called on replay and difficulty change.
*/
function play() : void {
    regenerateCorrectAnswer();
    updateQuestionNumber(correctAnswer);
    generateColorChoices(currentDifficulty);
    updateAnswers();
    enableColorChoice();
    disablePlayAgain();
    defaultAnswer();
}

// Initilization on app start.
initalize();

export { play };