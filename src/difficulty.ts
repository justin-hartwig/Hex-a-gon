import { changeActiveDifficultyOption } from "./domManipulation";
import { play } from "./index";

/** 
 * Data structure for the difficulty option.
 * Containing:
 * - Difficulty name
 * - Difficulty value: Determines the number of color choices, to be rendered.
 * - Button: Used to switch between difficulty options.
*/
interface difficultyOption {
    name : string;
    value : number;
    domElement : HTMLButtonElement;
}

// Initialize active difficulty.
let currentDifficulty : number = 5;

/** 
 * Initialize basic difficulty options. 
 * Additional options can be added dynamically.
*/
const difficultyOptions :  difficultyOption[] = [
    { name : "einfach",
    value : 3,
    domElement : createDifficultyOptionDomElement("einfach", 3) },
    { name : "normal",
    value : 5,
    domElement : createDifficultyOptionDomElement("normal", 5) },
    { name : "schwehr",
    value : 8,
    domElement : createDifficultyOptionDomElement("schwehr", 8) },
];

/** 
 * Creates a new difficulty option. 
 * Builds a button with the given name and sets a class. EventListener is also added.
 * 
 * @param {string} name Name of the difficulty option.
 * @param {number} difficultyNumber Difficulty value which determines the number of color choices.
 * @returns {HTMLButtonElement} Button for the difficulty option, which can be rendered in the DOM.
*/
function createDifficultyOptionDomElement (name : string, difficultyNumber : number) : HTMLButtonElement {
    const element : HTMLButtonElement = document.createElement('button');
    element.classList.add("difficulty-button");
    element.innerText = name;
    element.addEventListener("click", () => changeDifficulty(difficultyNumber));

    return element;
}

/** 
 * Changes current active difficulty for a given number. 
 * Restarts the game.
 * 
 * @param {number} difficulty Difficulty value which will be set as active.
*/
function changeDifficulty(difficulty : number) : void {
    currentDifficulty = difficulty;
    changeActiveDifficultyOption(difficulty);
    play();
}

/** 
 * Searches the difficulty option array for a matching number value, and returns the corresponding option.
 * 
 * @param {number} value Number value which is searched.
 * @returns {difficultyOption} Corresponding difficulty option to the given number.
*/
function getDifficultyOptionByNumber(value : number) : difficultyOption {
    let option : difficultyOption = {} as difficultyOption;
    for (let i : number = 0; i < difficultyOptions.length; i++) {
        if (difficultyOptions[i].value === value){
            option = difficultyOptions[i];
        }
    }
    return option;
}

export { currentDifficulty, difficultyOptions, getDifficultyOptionByNumber };