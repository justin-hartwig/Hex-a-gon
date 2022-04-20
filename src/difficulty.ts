import { play } from "./index";

interface difficultyOption {
    name : string;
    value : number;
    domElement : HTMLButtonElement;
}

let currentDifficulty : number = 5;

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

function createDifficultyOptionDomElement (name : string, difficultyNumber : number) : HTMLButtonElement {
    const element : HTMLButtonElement = document.createElement('button');
    element.classList.add("difficulty-button");
    element.innerText = name;
    element.addEventListener("click", () => changeDifficulty(difficultyNumber));

    return element;
}

function changeDifficulty(difficulty : number) : void {
    currentDifficulty = difficulty;
    play();
}

function getDifficultyOptionByName(name : string) : difficultyOption {
    let option : difficultyOption = {} as difficultyOption;
    for (let i : number = 0; i < difficultyOptions.length; i++) {
        if (difficultyOptions[i].name === name){
            option = difficultyOptions[i];
        }
    }
    return option;
}

export { currentDifficulty, difficultyOptions };