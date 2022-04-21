import { correctAnswer, generateColorChoices, regenerateCorrectAnswer } from "./colorCoice";
import { currentDifficulty } from "./difficulty";
import { renderDifficultyOptions, updateAnswers, updateQuestionNumber } from "./domManipulation";
import { initalizePlayAgain } from "./replay";


function initalize() : void {
    initalizePlayAgain();
    renderDifficultyOptions();
    play();
}

function play() : void {
    regenerateCorrectAnswer();
    updateQuestionNumber(correctAnswer);
    generateColorChoices(currentDifficulty);
    updateAnswers();
}

initalize();

export { play };