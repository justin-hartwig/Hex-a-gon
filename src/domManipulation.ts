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
        answerMessage.innerText = "Das ist die Richtige Antwort! Glückwunsch!"
        enablePlayAgain();
    }
    else {
        answerMessage.innerText = "Das ist die Falsche Antwort! Versuche es nochmal!"
    }
}

function renderDifficultyOptions() : void {
    difficultyOptions.forEach( option => difficultyOptionContainer.appendChild(option.domElement));
}

function enablePlayAgain() : void {
    playAgainButton.disabled = false;
}

function disablePlayAgain() : void {
    playAgainButton.disabled = true;
}

export { updateQuestionNumber, updateAnswers, updateAnswerMessage, enablePlayAgain, renderDifficultyOptions };