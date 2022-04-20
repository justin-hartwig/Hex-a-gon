import { colorChoice, correctAnswer, getColorChoiceBySVGElement, removeChoice } from "./colorCoice";
import { enablePlayAgain, updateAnswerMessage, updateAnswers } from "./domManipulation";

function validateAnswer(target : SVGElement) : void {
    const choice : colorChoice = getColorChoiceBySVGElement(target);
    console.log(choice);
    console.log("Hex" + choice.value + ", Richtiges ergbeniss" + correctAnswer);
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