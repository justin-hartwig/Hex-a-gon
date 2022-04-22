import { correctAnswer, generateColorChoices, regenerateCorrectAnswer } from "./colorCoice";
import { currentDifficulty, initalizeActiveDifficulty } from "./difficulty";
import { defaultAnswer, disablePlayAgain, enableColorChoice, renderDifficultyOptions, updateAnswers, updateQuestionNumber } from "./domManipulation";
import { initalizePlayAgain } from "./replay";


function initalize() : void {
    initalizePlayAgain();
    renderDifficultyOptions();
    initalizeActiveDifficulty();
    play();
}

function play() : void {
    regenerateCorrectAnswer();
    updateQuestionNumber(correctAnswer);
    generateColorChoices(currentDifficulty);
    updateAnswers();
    enableColorChoice();
    disablePlayAgain();
    defaultAnswer();
}

initalize();

export { play };