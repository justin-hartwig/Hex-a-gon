import { answerMessage, colorChoiceContainer, difficultyOptionContainer, playAgainButton, questionNumber } from "./domElements";
import { answers } from "./colorCoice";
import { currentDifficulty, difficultyOptions, getDifficultyOptionByNumber } from "./difficulty";

/** 
 * Changes the displayed color value to the given string.
 * 
 * @param {string} hexValue Color value to be displayed.
*/
function updateQuestionNumber(hexValue : string) : void{
    questionNumber.innerHTML = hexValue;
}

/** 
 * Updates the answers by removing them from the DOM and rendering them again.
*/
function updateAnswers() : void{
    colorChoiceContainer.innerHTML = "";
    answers.forEach( answer => colorChoiceContainer.appendChild(answer.domElement));
}

/** 
 * Displays a message after the validation depending on the result.
 * 
 * @param {boolean} answerValidity Result of the validation.
*/
function updateAnswerMessage (answerValidity : boolean) : void {
    if (answerValidity) {
        answerMessage.innerText = "Das ist die richtige Antwort! Glückwunsch!"
    }
    else {
        answerMessage.innerText = "Das ist die falsche Antwort! Versuche es nochmal!"
    }
}

/** 
 * Renders the default question after replay.
*/
function defaultAnswer() : void {
    answerMessage.innerText = "Finde die richtige Farbe für den Hex-Wert."
}

/** 
 * Renders all difficult options.
*/
function renderDifficultyOptions() : void {
    difficultyOptions.forEach( option => difficultyOptionContainer.appendChild(option.domElement));
}

/** 
 * Disables the play again button.
*/
function disablePlayAgain() : void {
    playAgainButton.disabled = true;
}

/** 
 * Enables the play again button.
*/
function enablePlayAgain() : void {
    playAgainButton.disabled = false;
}

/** 
 * Disables clicking on the color choices.
*/
function disableColorChoice() : void {
    colorChoiceContainer.classList.add("disabled");
}

/** 
 * Enables clicking on the color choices.
*/
function enableColorChoice() : void {
    colorChoiceContainer.classList.remove("disabled");
}

/** 
 * Changes the active difficulty option by removing the class on all options and adding them to the given one.
 * 
 * @param {number} difficulty Difficulty value of the active option.
*/
function changeActiveDifficultyOption(difficulty : number) : void {
    difficultyOptions.forEach(option => option.domElement.classList.remove("active"));
    getDifficultyOptionByNumber(difficulty).domElement.classList.add("active");
}

/** 
 * Adds active difficulty on the default option during start.
*/
function initalizeActiveDifficulty() : void {
    getDifficultyOptionByNumber(currentDifficulty).domElement.classList.add("active");
}

export { updateQuestionNumber, updateAnswers, updateAnswerMessage, renderDifficultyOptions, disableColorChoice, enableColorChoice, disablePlayAgain, enablePlayAgain, defaultAnswer, changeActiveDifficultyOption, initalizeActiveDifficulty };