import { answerMessage, colorChoiceContainer, difficultyOptionContainer, playAgainButton, questionNumber } from "./domElements";
import { answers } from "./colorCoice";
import { difficultyOptions } from "./difficulty";

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

export { updateQuestionNumber, updateAnswers, updateAnswerMessage, renderDifficultyOptions, disableColorChoice, enableColorChoice, disablePlayAgain, enablePlayAgain };