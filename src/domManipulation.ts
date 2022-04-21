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
    }
    else {
        answerMessage.innerText = "Das ist die Falsche Antwort! Versuche es nochmal!"
    }
}

function renderDifficultyOptions() : void {
    difficultyOptions.forEach( option => difficultyOptionContainer.appendChild(option.domElement));
}

function togglePlayAgain() : void {
    playAgainButton.disabled = !playAgainButton.disabled;
}

function toggleColorChoice() : void {
    if(colorChoiceContainer.classList.contains("disabled")) {
        colorChoiceContainer.classList.remove("disabled");
    }
    else {
        colorChoiceContainer.classList.add("disabled");
    }
}

export { updateQuestionNumber, updateAnswers, updateAnswerMessage, togglePlayAgain, renderDifficultyOptions, toggleColorChoice };