import { randomHexValue, shuffleArray } from "./randomize";
import { validateAnswer } from "./validation";

interface colorChoice {
    value : string;
    domElement : SVGElement;
}

const correctAnswer : string = randomHexValue();
let answers :  colorChoice[] = [];

function createColorChoice(hexValue : string) : colorChoice {
    const element : SVGElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    element.classList.add("color-choice");
    element.setAttribute("width", "121");
    element.setAttribute("height", "105");
    element.setAttribute("viewBox", "0 0 121 105");
    element.setAttribute("fill", "none");
    element.addEventListener("click", e => validateAnswer(e.target as SVGElement));
    element.innerHTML = `<path d="M90.92 0.960022L120.92 52.922L90.92 104.884H30.92L0.920044 52.922L30.92 0.960022H90.92Z" fill="${hexValue}"/>`;

    const choice : colorChoice = { value : hexValue, domElement: element};
    return choice;
}

function generateColorChoices(quantity : number) : void {
    answers = [];
    answers.push(createColorChoice(correctAnswer));
    for (let i = 2; i <= quantity; i++) {
        answers.push(createColorChoice(randomHexValue()));
    }
    answers = shuffleArray(answers);
}

function removeChoice(choice : colorChoice) : void {
    answers = answers.filter(answer => {return answer.value !== choice.value});
}

function getColorChoiceBySVGElement (element : SVGElement) : colorChoice {
    let choice : colorChoice = {} as colorChoice;
    for (let i : number = 0; i < answers.length; i++) {
        if (answers[i].domElement === element){
            choice = answers[i];
        }
    }
    return choice;
}

export { correctAnswer, answers, generateColorChoices, getColorChoiceBySVGElement, removeChoice, colorChoice };