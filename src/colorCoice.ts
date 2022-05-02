import { randomHexValue, shuffleArray } from "./randomize";
import { validateAnswer } from "./validation";

/** 
 * Data structure for the generated color choices.
*/ 
interface colorChoice {
    value : string;
    domElement : SVGElement;
}

// Initalize correct answer with random value.
let correctAnswer : string = randomHexValue();
// Array containing the color choices.
let answers :  colorChoice[] = [];

/** 
 * Creates a new color choice. 
 * Builds a SVGElement with fixed attributes and a given color value. EventListener is also added.
 * Element and value are added to the Datastructure. 
 * 
 * @param {string} hexValue Color value in Hex Code.
 * @returns {colorChoice} Color choice with given color value and generated SVGElement.
*/
function createColorChoice(hexValue : string) : colorChoice {
    const element : SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.classList.add("color-choice");
    element.setAttribute("width", "121");
    element.setAttribute("height", "105");
    element.setAttribute("viewBox", "0 0 128 112");
    element.setAttribute("fill", "none");
    element.addEventListener("click", function(event : Event) {
        colorChoiceOnClick(event);
    }, false);
    element.innerHTML = `<path d="M90.92 0.960022L120.92 52.922L90.92 104.884H30.92L0.920044 52.922L30.92 0.960022H90.92Z" fill="${hexValue}"/>`;

    const choice : colorChoice = { value : hexValue, domElement: element};
    return choice;
}

/** 
 * Creates multiple color choices depending on the given quantity.
 * The choices are added to an array and shuffled.
 * 
 *  @param {number} quantity Quantity of color choices to be generated.
*/
function generateColorChoices(quantity : number) : void {
    answers = [];
    answers.push(createColorChoice(correctAnswer));
    for (let i = 2; i <= quantity; i++) {
        answers.push(createColorChoice(randomHexValue()));
    }
    answers = shuffleArray(answers);
}

/** 
 * Removes a given choice from the answer array.
 * 
 * @param {colorChoice} choice Color which is removed.
*/
function removeChoice(choice : colorChoice) : void {
    answers = answers.filter(answer => {return answer.value !== choice.value});
}

/** 
 * Searches the answer array for a matching SVGElement, and returns the corresponding color choice.
 * 
 * @param {SVGElement} element SVGElement which is searched.
 * @returns {colorChoice} Corresponding color choice to the given SVGElement.
*/
function getColorChoiceBySVGElement (element : SVGElement) : colorChoice {
    let choice : colorChoice = {} as colorChoice;
    for (let i : number = 0; i < answers.length; i++) {
        if (answers[i].domElement === element){
            choice = answers[i];
        }
    }
    return choice;
}

/** 
 * Generates a new color value and saves it as the correct answer.
*/
function regenerateCorrectAnswer() : void {
    correctAnswer = randomHexValue();
}

/** 
 * On click function for the EventListener of the color choice. 
 * Triggers validation of the clicked choice.
*/
function colorChoiceOnClick(event : Event) : void {
    validateAnswer(event.target as SVGElement)
}

export { correctAnswer, answers, generateColorChoices, getColorChoiceBySVGElement, removeChoice, regenerateCorrectAnswer, colorChoice };