//https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript IceMetalPunk
function randomHexValue() :string{
    let randomHexString = '#';
    for (let i = 0; i < 6; ++i) {
        randomHexString += (Math.floor(Math.random() * 16)).toString(16);
    }
    return randomHexString;
}

//Schuffle Algorithm by Fisher–Yates
 function shuffleArray(array : any[]) : any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { randomHexValue, shuffleArray };