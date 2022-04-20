import { currentDifficulty } from "./difficulty";
import { playAgainButton } from "./domElements";
import { play } from "./index";

function initalizePlayAgain() : void {
    playAgainButton.addEventListener("click", () => play());
}

export { initalizePlayAgain };