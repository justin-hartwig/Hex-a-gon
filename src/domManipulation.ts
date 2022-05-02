import { answerMessage, colorChoiceContainer, difficultyOptionContainer, playAgainButton, questionNumber } from "./domElements";
import { answers } from "./colorCoice";
import { currentDifficulty, difficultyOptions, getDifficultyOptionByNumber } from "./difficulty";

/** 
 * Removes a given choice from the answer array.
 * 
 * @param {colorChoice} choice Color which is removed.
*/
function updateQuestionNumber(hexValue : string) : void{
    questionNumber.innerHTML = hexValue;
}

function updateAnswers() : void{
    colorChoiceContainer.innerHTML = "";
    answers.forEach( answer => colorChoiceContainer.appendChild(answer.domElement));
}

function updateAnswerMessage (answerValidity : boolean) : void {
    if (answerValidity) {
        answerMessage.innerText = "Das ist die richtige Antwort! Glückwunsch!"
    }
    else {
        answerMessage.innerText = "Das ist die falsche Antwort! Versuche es nochmal!"
    }
}

function defaultAnswer() : void {
    answerMessage.innerText = "Finde die richtige Farbe für den Hex-Wert."
}

function renderDifficultyOptions() : void {
    difficultyOptions.forEach( option => difficultyOptionContainer.appendChild(option.domElement));
}

function disablePlayAgain() : void {
    playAgainButton.disabled = true;
}

function enablePlayAgain() : void {
    playAgainButton.disabled = false;
}

function disableColorChoice() : void {
    colorChoiceContainer.classList.add("disabled");
}

function enableColorChoice() : void {
    colorChoiceContainer.classList.remove("disabled");
}

function changeActiveDifficultyOption(difficulty : number) : void {
    difficultyOptions.forEach(option => option.domElement.classList.remove("active"));
    getDifficultyOptionByNumber(difficulty).domElement.classList.add("active");
}

function initalizeActiveDifficulty() : void {
    getDifficultyOptionByNumber(currentDifficulty).domElement.classList.add("active");
}

export { updateQuestionNumber, updateAnswers, updateAnswerMessage, renderDifficultyOptions, disableColorChoice, enableColorChoice, disablePlayAgain, enablePlayAgain, defaultAnswer, changeActiveDifficultyOption, initalizeActiveDifficulty };