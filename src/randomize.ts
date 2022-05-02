
/** 
 * Returns a random hex color value by generating random hex values in a loop and adding them to a string.
 * https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript IceMetalPunk
 * 
 * @returns {string} Random hex color value.
*/
function randomHexValue() : string{
    let randomHexString = '#';
    for (let i = 0; i < 6; ++i) {
        randomHexString += (Math.floor(Math.random() * 16)).toString(16);
    }
    return randomHexString;
}

/** 
 * Shuffels a given array with the algorithm by Fisher–Yates.
 * 
 * @property {any[]} array The Array to be shuffled.
 * @returns {any[]} The shuffled array.
*/
function shuffleArray(array : any[]) : any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { randomHexValue, shuffleArray };