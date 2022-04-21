import { colorChoice, correctAnswer, getColorChoiceBySVGElement, removeChoice } from "./colorCoice";
import { disableColorChoice, togglePlayAgain, updateAnswerMessage, updateAnswers } from "./domManipulation";

function validateAnswer(target : SVGElement) : void {
    const choice : colorChoice = getColorChoiceBySVGElement(target);
    updateAnswerMessage(choice.value === correctAnswer);
    if(choice.value !== correctAnswer) {
        removeChoice(choice);
        updateAnswers();
    } 
    else {
        togglePlayAgain();
        disableColorChoice();
    }
}

export { validateAnswer };