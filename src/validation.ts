import { colorChoice, correctAnswer, getColorChoiceByHTMLElement, removeChoice } from "./colorCoice";
import { enablePlayAgain, updateAnswerMessage, updateAnswers } from "./domManipulation";

function validateAnswer(target : HTMLElement) : void {
    const choice : colorChoice = getColorChoiceByHTMLElement(target);
    updateAnswerMessage(choice.value === correctAnswer);
    if(choice.value !== correctAnswer) {
        removeChoice(choice);
        updateAnswers();
    } 
    else {
        enablePlayAgain();
    }
}

export { validateAnswer };