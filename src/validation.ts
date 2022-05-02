import { colorChoice, correctAnswer, getColorChoiceBySVGElement, removeChoice } from "./colorCoice";
import { disableColorChoice, enablePlayAgain, updateAnswerMessage, updateAnswers } from "./domManipulation";

/** 
 * Validates an answer by the clicked SVGElement.
 * The clicked element is used to determine the color choice it belongs to.
 * This choice is compared to the correct answer.
 * If they don't match, the choice is removed.
 * If they match, the play again button is enabled and all choices are disabled.
 * The Answer message is updated depending on the result.
 * 
 * @property {SVGElement} target The clicked SVGElement which color choice should be validated.
*/
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