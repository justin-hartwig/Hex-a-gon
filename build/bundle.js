(function (exports) {
    'use strict';

    //https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript IceMetalPunk
    function randomHexValue() {
        let randomHexString = '#';
        for (let i = 0; i < 6; ++i) {
            randomHexString += (Math.floor(Math.random() * 16)).toString(16);
        }
        return randomHexString;
    }
    //Schuffle Algorithm by Fisher–Yates
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const questionNumber = document.querySelector("#random-hex-value");
    const colorChoiceContainer = document.querySelector("#color-choice-container");
    const answerMessage = document.querySelector("#answer-message");
    const playAgainButton = document.querySelector("#play-again");
    const difficultyOptionContainer = document.querySelector("#difficulty-container");

    let currentDifficulty = 5;
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
    function createDifficultyOptionDomElement(name, difficultyNumber) {
        const element = document.createElement('button');
        element.classList.add("difficulty-button");
        element.innerText = name;
        element.addEventListener("click", () => changeDifficulty(difficultyNumber));
        return element;
    }
    function changeDifficulty(difficulty) {
        currentDifficulty = difficulty;
        difficultyOptions.forEach(option => option.domElement.classList.remove("active"));
        getDifficultyOptionByNumber(difficulty).domElement.classList.add("active");
        play();
    }
    function getDifficultyOptionByNumber(value) {
        let option = {};
        for (let i = 0; i < difficultyOptions.length; i++) {
            if (difficultyOptions[i].value === value) {
                option = difficultyOptions[i];
            }
        }
        return option;
    }
    function initalizeActiveDifficulty() {
        getDifficultyOptionByNumber(currentDifficulty).domElement.classList.add("active");
    }

    function updateQuestionNumber(hexValue) {
        questionNumber.innerHTML = hexValue;
    }
    function updateAnswers() {
        colorChoiceContainer.innerHTML = "";
        answers.forEach(answer => colorChoiceContainer.appendChild(answer.domElement));
    }
    function updateAnswerMessage(answerValidity) {
        if (answerValidity) {
            answerMessage.innerText = "Das ist die richtige Antwort! Glückwunsch!";
        }
        else {
            answerMessage.innerText = "Das ist die falsche Antwort! Versuche es nochmal!";
        }
    }
    function defaultAnswer() {
        answerMessage.innerText = "Finde die richtige Farbe für den Hex-Wert.";
    }
    function renderDifficultyOptions() {
        difficultyOptions.forEach(option => difficultyOptionContainer.appendChild(option.domElement));
    }
    function disablePlayAgain() {
        playAgainButton.disabled = true;
    }
    function enablePlayAgain() {
        playAgainButton.disabled = false;
    }
    function disableColorChoice() {
        colorChoiceContainer.classList.add("disabled");
    }
    function enableColorChoice() {
        colorChoiceContainer.classList.remove("disabled");
    }

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

    let correctAnswer = randomHexValue();
    let answers = [];
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
    function generateColorChoices(quantity) {
        answers = [];
        answers.push(createColorChoice(correctAnswer));
        for (let i = 2; i <= quantity; i++) {
            answers.push(createColorChoice(randomHexValue()));
        }
        answers = shuffleArray(answers);
    }
    function removeChoice(choice) {
        answers = answers.filter(answer => { return answer.value !== choice.value; });
    }
    function getColorChoiceBySVGElement(element) {
        let choice = {};
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].domElement === element) {
                choice = answers[i];
            }
        }
        return choice;
    }
    function regenerateCorrectAnswer() {
        correctAnswer = randomHexValue();
    }
    function colorChoiceOnClick(event) {
        validateAnswer(event.target);
    }

    function initalizePlayAgain() {
        playAgainButton.addEventListener("click", () => play());
    }

    function initalize() {
        initalizePlayAgain();
        renderDifficultyOptions();
        initalizeActiveDifficulty();
        play();
    }
    function play() {
        regenerateCorrectAnswer();
        updateQuestionNumber(correctAnswer);
        generateColorChoices(currentDifficulty);
        updateAnswers();
        enableColorChoice();
        disablePlayAgain();
        defaultAnswer();
    }
    initalize();

    exports.play = play;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
