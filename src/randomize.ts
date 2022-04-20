function randomHexValue() :string{
    const randomHexString = "#" + Math.floor(Math.random()*16777215).toString(16); //16777215 = #ffffff
    console.log(randomHexString);
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