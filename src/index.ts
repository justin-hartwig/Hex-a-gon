import { correctAnswer, generateColorChoices } from "./colorCoice";
import { currentDifficulty } from "./difficulty";
import { renderDifficultyOptions, updateAnswers, updateQuestionNumber } from "./domManipulation";
import { initalizePlayAgain } from "./replay";


function initalize() : void {
    initalizePlayAgain();
    renderDifficultyOptions();
    play();
}

function play() : void {
    generateColorChoices(currentDifficulty);
    updateQuestionNumber(correctAnswer);
    updateAnswers();
}

initalize();

export { play };