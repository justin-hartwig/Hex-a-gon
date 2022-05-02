import { playAgainButton } from "./domElements";
import { play } from "./index";

/** 
 * Adds an EventListener on the play again button on app start.
*/
function initalizePlayAgain() : void {
    playAgainButton.addEventListener("click", () => play());
}

export { initalizePlayAgain };