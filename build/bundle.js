(function (exports) {
    'use strict';

    /**
     * Returns a random hex color value by generating random hex values in a loop and adding them to a string.
     * https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript IceMetalPunk
     *
     * @returns {string} Random hex color value.
    */
    function randomHexValue() {
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
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Accessing the DOM and save specific elements which have to be manipulated.
    const questionNumber = document.querySelector("#random-hex-value");
    const colorChoiceContainer = document.querySelector("#color-choice-container");
    const answerMessage = document.querySelector("#answer-message");
    const playAgainButton = document.querySelector("#play-again");
    const difficultyOptionContainer = document.querySelector("#difficulty-container");

    // Initialize active difficulty.
    let currentDifficulty = 5;
    /**
     * Initialize basic difficulty options.
     * Additional options can be added dynamically.
    */
    const difficultyOptions = [
        { name: "einfach",
            value: 3,
            domElement: createDifficultyOptionDomElement("einfach", 3) },
        { name: "normal",
            value: 5,
            domElement: createDifficultyOptionDomElement("normal", 5) },
        { name: "schwehr",
            value: 8,
            domElement: createDifficultyOptionDomElement("schwehr", 8) },
    ];
    /**
     * Creates a new difficulty option.
     * Builds a button with the given name and sets a class. EventListener is also added.
     *
     * @param {string} name Name of the difficulty option.
     * @param {number} difficultyNumber Difficulty value which determines the number of color choices.
     * @returns {HTMLButtonElement} Button for the difficulty option, which can be rendered in the DOM.
    */
    function createDifficultyOptionDomElement(name, difficultyNumber) {
        const element = document.createElement('button');
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
    function changeDifficulty(difficulty) {
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
    function getDifficultyOptionByNumber(value) {
        let option = {};
        for (let i = 0; i < difficultyOptions.length; i++) {
            if (difficultyOptions[i].value === value) {
                option = difficultyOptions[i];
            }
        }
        return option;
    }

    /**
     * Changes the displayed color value to the given string.
     *
     * @param {string} hexValue Color value to be displayed.
    */
    function updateQuestionNumber(hexValue) {
        questionNumber.innerHTML = hexValue;
    }
    /**
     * Updates the answers by removing them from the DOM and rendering them again.
    */
    function updateAnswers() {
        colorChoiceContainer.innerHTML = "";
        answers.forEach(answer => colorChoiceContainer.appendChild(answer.domElement));
    }
    /**
     * Displays a message after the validation depending on the result.
     *
     * @param {boolean} answerValidity Result of the validation.
    */
    function updateAnswerMessage(answerValidity) {
        if (answerValidity) {
            answerMessage.innerText = "Das ist die richtige Antwort! Glückwunsch!";
        }
        else {
            answerMessage.innerText = "Das ist die falsche Antwort! Versuche es nochmal!";
        }
    }
    /**
     * Renders the default question after replay.
    */
    function defaultAnswer() {
        answerMessage.innerText = "Finde die richtige Farbe für den Hex-Wert.";
    }
    /**
     * Renders all difficult options.
    */
    function renderDifficultyOptions() {
        difficultyOptions.forEach(option => difficultyOptionContainer.appendChild(option.domElement));
    }
    /**
     * Disables the play again button.
    */
    function disablePlayAgain() {
        playAgainButton.disabled = true;
    }
    /**
     * Enables the play again button.
    */
    function enablePlayAgain() {
        playAgainButton.disabled = false;
    }
    /**
     * Disables clicking on the color choices.
    */
    function disableColorChoice() {
        colorChoiceContainer.classList.add("disabled");
    }
    /**
     * Enables clicking on the color choices.
    */
    function enableColorChoice() {
        colorChoiceContainer.classList.remove("disabled");
    }
    /**
     * Changes the active difficulty option by removing the class on all options and adding them to the given one.
     *
     * @param {number} difficulty Difficulty value of the active option.
    */
    function changeActiveDifficultyOption(difficulty) {
        difficultyOptions.forEach(option => option.domElement.classList.remove("active"));
        getDifficultyOptionByNumber(difficulty).domElement.classList.add("active");
    }
    /**
     * Adds active difficulty on the default option during start.
    */
    function initalizeActiveDifficulty() {
        getDifficultyOptionByNumber(currentDifficulty).domElement.classList.add("active");
    }

    /**
     * Validates an answer by the clicked SVGElement.
     * The clicked element is used to determine the color choice it belongs to.
     * This choice is compared to the correct answer.
     * If they don't match, the choice is removed.
     * If they match, the play again button is enabled and all choices are disabled.
     * The Answer message is updated depending on the result.
     *
     * @property {SVGElement} target The clicked SVGElement which color choice should be validated.
    */
    function validateAnswer(target) {
        const choice = getColorChoiceBySVGElement(target);
        updateAnswerMessage(choice.value === correctAnswer);
        if (choice.value !== correctAnswer) {
            removeChoice(choice);
            updateAnswers();
        }
        else {
            enablePlayAgain();
            disableColorChoice();
        }
    }

    // Initalize correct answer with random value.
    let correctAnswer = randomHexValue();
    // Array containing the color choices.
    let answers = [];
    /**
     * Creates a new color choice.
     * Builds a SVGElement with fixed attributes and a given color value. EventListener is also added.
     * Element and value are added to the Datastructure.
     *
     * @param {string} hexValue Color value in Hex Code.
     * @returns {colorChoice} Color choice with given color value and generated SVGElement.
    */
    function createColorChoice(hexValue) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        element.classList.add("color-choice");
        element.setAttribute("width", "121");
        element.setAttribute("height", "105");
        element.setAttribute("viewBox", "0 0 128 112");
        element.setAttribute("fill", "none");
        element.addEventListener("click", function (event) {
            colorChoiceOnClick(event);
        }, false);
        element.innerHTML = `<path d="M90.92 0.960022L120.92 52.922L90.92 104.884H30.92L0.920044 52.922L30.92 0.960022H90.92Z" fill="${hexValue}"/>`;
        const choice = { value: hexValue, domElement: element };
        return choice;
    }
    /**
     * Creates multiple color choices depending on the given quantity.
     * The choices are added to an array and shuffled.
     *
     *  @param {number} quantity Quantity of color choices to be generated.
    */
    function generateColorChoices(quantity) {
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
    function removeChoice(choice) {
        answers = answers.filter(answer => { return answer.value !== choice.value; });
    }
    /**
     * Searches the answer array for a matching SVGElement, and returns the corresponding color choice.
     *
     * @param {SVGElement} element SVGElement which is searched.
     * @returns {colorChoice} Corresponding color choice to the given SVGElement.
    */
    function getColorChoiceBySVGElement(element) {
        let choice = {};
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].domElement === element) {
                choice = answers[i];
            }
        }
        return choice;
    }
    /**
     * Generates a new color value and saves it as the correct answer.
    */
    function regenerateCorrectAnswer() {
        correctAnswer = randomHexValue();
    }
    /**
     * On click function for the EventListener of the color choice.
     * Triggers validation of the clicked choice.
    */
    function colorChoiceOnClick(event) {
        validateAnswer(event.target);
    }

    /**
     * Adds an EventListener on the play again button on app start.
    */
    function initalizePlayAgain() {
        playAgainButton.addEventListener("click", () => play());
    }

    /**
     * Initalize the game by using helper functions in other modules.
    */
    function initalize() {
        initalizePlayAgain();
        renderDifficultyOptions();
        initalizeActiveDifficulty();
        play();
    }
    /**
     * Starts/Restarts the game by using helper functions in other modules.
     * Gets called on replay and difficulty change.
    */
    function play() {
        regenerateCorrectAnswer();
        updateQuestionNumber(correctAnswer);
        generateColorChoices(currentDifficulty);
        updateAnswers();
        enableColorChoice();
        disablePlayAgain();
        defaultAnswer();
    }
    // Initilization on app start.
    initalize();

    exports.play = play;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
