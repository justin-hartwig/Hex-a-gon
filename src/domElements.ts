// Accessing the DOM and save specific elements which have to be manipulated.
const questionNumber =  document.querySelector("#random-hex-value") as HTMLElement;
const colorChoiceContainer =  document.querySelector("#color-choice-container") as HTMLElement;
const answerMessage =  document.querySelector("#answer-message") as HTMLElement;
const playAgainButton =  document.querySelector("#play-again") as HTMLButtonElement;
const difficultyOptionContainer =  document.querySelector("#difficulty-container") as HTMLElement;

export {questionNumber, colorChoiceContainer, answerMessage, playAgainButton, difficultyOptionContainer};