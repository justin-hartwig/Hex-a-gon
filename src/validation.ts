import { colorChoice, correctAnswer, getColorChoiceBySVGElement, removeChoice } from "./colorCoice";
import { disableColorChoice, enablePlayAgain, updateAnswerMessage, updateAnswers } from "./domManipulation";

function validateAnswer(target : SVGElement) : void {
    const choice : colorChoice = getColorChoiceBySVGElement(target);
    updateAnswerMessage(choice.value === correctAnswer);
    if(choice.value !== correctAnswer) {
        removeChoice(choice);
        updateAnswers();
    } 
    else {
        enablePlayAgain();
        disableColorChoice();
    }
}

export { validateAnswer };