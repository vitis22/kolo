// Inicializace proměnných:
let selectedIcon = "";
let playerName = "";
let currentQuestion = 0;
let score = 0;
let selectedDifficulty = "";
let scoreLehka = 0;
let scoreStredni = 0;
let scoreTezka = 0;
let highestScoreLehka = 0;
let highestScoreStredni = 0;
let highestScoreTezka = 0;
let extremeAttempts = 0;
let wrongAnswersCount = 0;
let currentPuzzleIndex = 0;
let timer;
let elapsedTime = 0;

scoreLehka = parseInt(localStorage.getItem('scoreLehka')) || 0;
scoreStredni = parseInt(localStorage.getItem('scoreStredni')) || 0;
scoreTezka = parseInt(localStorage.getItem('scoreTezka')) || 0;

highestScoreLehka = parseInt(localStorage.getItem('highestScoreLehka')) || 0;
highestScoreStredni = parseInt(localStorage.getItem('highestScoreStredni')) || 0;
highestScoreTezka = parseInt(localStorage.getItem('highestScoreTezka')) || 0;

// Ziskání odkazů na HTML elementy:
const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const options = document.querySelectorAll(".options li");
const questionImage = document.getElementById("question-image");
const nextButton = document.getElementById("next-button");
const resetButton = document.getElementById("reset-button");
const nextDifficultyButton = document.getElementById("next-difficulty-button");
const returnToMenuButton = document.getElementById("return-to-menu-button");
const extremeButton = document.getElementById("extreme-button");
const crossButton = document.getElementById("cross-button");
const extremeContainer = document.getElementById("extreme-container");
const extremeInput = document.getElementById("extreme-input");
const extremeOptions = document.getElementById("extreme-options");
const iconInput = document.getElementById("icon-input");
const iconBox = document.getElementById("icon-box");
const iconButton = document.getElementById("icon-button");
const changeButton = document.getElementById("change-button");
const crossIcone = document.getElementById("cross-icone");
const timerElement = document.getElementById("timer");

/*
připravuje uživatelské rozhraní pro výběr nové ikony tím 
že resetuje předchozí stav a nastavuje odpovídající vizuální prvky.
*/
function showIconSetup() {
    selectedIcon = "";
    playerName = "";

    iconInput.value = "";

    iconBox.style.display = "block";
    iconButton.style.display = "none";
    changeButton.style.display = "none";
    crossIcone.style.display = "block";
    clearIconSelection();
}

// Add an event listener to the cross button
crossIcone.addEventListener("click", function () {
    iconBox.style.display = "none";
    changeButton.style.display = "block";
});


// Ruší výběr ikon tím, že resetuje styly všech obrázků v rámci určeného kontejneru
function clearIconSelection() {
    const iconImages = document.querySelectorAll("#icon-options img");
    iconImages.forEach(img => img.style.border = "none");
}

function selectIcon(clickedImage) {
    // Reset styles of all images
    const iconImages = document.querySelectorAll("#icon-options img");
    iconImages.forEach(img => img.style.border = "none");

    // Set the selected icon and visually indicate selection
    selectedIcon = clickedImage.src;
    clickedImage.style.border = "2px solid blue";
}

function confirmIcon() {
    playerName = iconInput.value;
    if (playerName.trim() !== "" && selectedIcon !== "") {
        // Resetování skóre při změně ikony a jména hráče
        scoreLehka = 0;
        scoreStredni = 0;
        scoreTezka = 0;

        // Obnovení nejvyššího skóre, když hráč změní ikonu a jméno
        highestScoreLehka = 0;
        highestScoreStredni = 0;
        highestScoreTezka = 0;

        createPlayerIcon(playerName, selectedIcon);

        // Save selected icon and player name to localStorage
        localStorage.setItem('selectedIcon', selectedIcon);
        localStorage.setItem('playerName', playerName);
        // Save the reset scores and highest scores to localStorage
        localStorage.setItem('scoreLehka', scoreLehka);
        localStorage.setItem('scoreStredni', scoreStredni);
        localStorage.setItem('scoreTezka', scoreTezka);
        localStorage.setItem('highestScoreLehka', highestScoreLehka);
        localStorage.setItem('highestScoreStredni', highestScoreStredni);
        localStorage.setItem('highestScoreTezka', highestScoreTezka);


        // Přepíše skóre když si hráč zzmění ikonu 
        document.getElementById("easy-score").textContent = `Lehká: ${scoreLehka}% (Nejvyšší skóre: ${highestScoreLehka}%)`;
        document.getElementById("medium-score").textContent = `Střední: ${scoreStredni}% (Nejvyšší skóre: ${highestScoreStredni}%)`;
        document.getElementById("hard-score").textContent = `Těžká: ${scoreTezka}% (Nejvyšší skóre: ${highestScoreTezka}%)`;

        iconBox.style.display = "none";
        selectedIcon = "";

        // Enable the "Start" button
        document.getElementById("start-button").disabled = false;
    } else {
        alert("Please select an icon and enter a name for your player.");
    }
}

function createPlayerIcon(name, iconData) {
    // Try to find the icon container
    let iconContainer = document.getElementById("icon-container");

    // If the icon container doesn't exist, create it dynamically
    if (!iconContainer) {
        iconContainer = document.createElement("div");
        iconContainer.id = "icon-container";
        document.body.appendChild(iconContainer);
    }

    // Display the icon container
    iconContainer.style.display = "block";

    // Set the icon source and alt text
    let playerIcon = document.getElementById("player-icon");

    // If playerIcon doesn't exist, create it dynamically
    if (!playerIcon) {
        playerIcon = document.createElement("img");
        playerIcon.id = "player-icon";
        iconContainer.appendChild(playerIcon);
    }

    playerIcon.src = iconData;
    playerIcon.alt = name;

    // Display the player's chosen name next to the icon
    const playerNameElement = document.getElementById("player-name");
    if (!playerNameElement) {
        // If playerNameElement doesn't exist, create it dynamically
        const newPlayerNameElement = document.createElement("span");
        newPlayerNameElement.id = "player-name";
        iconContainer.appendChild(newPlayerNameElement);
    }

    playerNameElement.textContent = name;

    localStorage.setItem('selectedIcon', iconData);
    localStorage.setItem('playerName', name);

    iconButton.style.display = "none";
    changeButton.style.display = "block";
}

// Funkce pro promíchání pole otázek
function fisherYatesShuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

const shuffledQuestions = fisherYatesShuffle(questions);

// Omezení počtu otázek na 10 pro každou obtížnost
const maxQuestionsPerDifficulty = 10;
const limitedQuestions = {};

shuffledQuestions.forEach(question => {
    const difficulty = question.difficulty;

    if (!limitedQuestions[difficulty]) {
        limitedQuestions[difficulty] = [];
    }

    if (limitedQuestions[difficulty].length < maxQuestionsPerDifficulty) {
        limitedQuestions[difficulty].push(question);
    }
});

// Vytvořte pole finalQuestions obsahující omezený počet otázek pro každou obtížnost
const finalQuestions = Object.values(limitedQuestions).flat();

function startTimer() {
    timer = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

crossButton.addEventListener("click", () => {
    selectedDifficulty = "";
    startScreen.style.display = "block";
    quizContainer.style.display = "none";
    extremeButton.style.display = "block";
    extremeContainer.style.display = "none";
    changeButton.style.display = "block"
    stopTimer();
    resetTimer();
    crossButton.style.display = "none";
});

function showExtremeMode() {
    currentPuzzleIndex = 0;
    wrongAnswersCount = 0;

    if (highestScoreLehka >= 50 && highestScoreTezka >= 50) {
        extremeButton.style.display = "none";
        startScreen.style.display = "none";
        quizContainer.style.display = "none";
        extremeContainer.style.display = "block";

        loadExtremeQuestion();
    } else {
        alert("You need to achieve at least 50% score in both Lehká and Těžká difficulties to unlock Extra Hard.");
    }
}

let found = extremePuzzles.find(function (element) {
    return 1;
});

console.log(found);

function loadExtremeQuestion() {
    extremeInput.value = "";

    const currentExtremeQuestion = getCurrentExtremeQuestion();

    crossButton.style.display = "block";

    document.getElementById("extreme-question").textContent = currentExtremeQuestion.question;

    displayExtremeOptions(currentExtremeQuestion.options);
}

// Define getExtremeModeQuestion function
function getExtremeModeQuestion() {
    // Ensure that currentPuzzleIndex is within the bounds of the extremePuzzles array
    const currentExtremeQuestion = getCurrentExtremeQuestion();
    return currentExtremeQuestion;
}

function displayExtremeOptions(options) {
    // Clear previous options
    const extremeOptionsContainer = extremeOptions;
    extremeOptionsContainer.innerHTML = "";

    // Display new options (pictures)
    options.forEach((option, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = `images/${option}`;
        imgElement.alt = `Option ${index + 1}`;

        // Set the desired width and height for the first image
        if (index === 0) {
            imgElement.style.width = "50px"; // You can adjust the size as needed
            imgElement.style.height = "50px"; // You can adjust the size as needed
        }

        extremeOptionsContainer.appendChild(imgElement);
    });
}

function checkExtremeAnswer() {
    const userInput = extremeInput.value.toLowerCase();
    const correctAnswer = getExtremeModeCorrectAnswer();

    if (userInput === correctAnswer) {
        startScreen.style.display = "block";
        extremeButton.style.display = "block";
        extremeContainer.style.display = "none";
    } else {
        wrongAnswersCount++;

        if (wrongAnswersCount % 3 === 0) {
            // Player has given three wrong answers, display the next picture as a hint
            displayNextExtremePicture();
        }
    }
}

function getRandomExtremeQuestion() {
    const randomIndex = Math.floor(Math.random() * extremePuzzles.length);
    return extremePuzzles[randomIndex];
}

function getCurrentExtremeQuestion() {
    return getRandomExtremeQuestion();
}

function displayNextExtremePicture() {
    const currentExtremeQuestion = getCurrentExtremeQuestion();

    if (wrongAnswersCount % 3 === 0 && wrongAnswersCount / 3 < currentExtremeQuestion.clues.length) {
        const currentClueIndex = Math.floor(wrongAnswersCount / 3);
        const currentExtremePicture = currentExtremeQuestion.clues[currentClueIndex];

        const pictureContainer = extremeOptions;

        const imgElement = document.createElement("img");
        imgElement.src = `images/${currentExtremePicture}`;
        imgElement.alt = `Hint ${currentClueIndex}`;

        // Set the desired width and height for the image
        imgElement.style.width = "50px"; // You can adjust the size as needed
        imgElement.style.height = "50px"; // You can adjust the size as needed


                // Add logs to check the clues and related variables
                console.log("Current Clues Array:", currentExtremeQuestion.clues);
                console.log("Current Clue Index:", currentClueIndex);
                console.log("Current Extreme Picture:", currentExtremePicture);
        

        pictureContainer.appendChild(imgElement);
    }
}

function getExtremeModeCorrectAnswer() {
    const currentExtremeQuestion = getExtremeModeQuestion();

    return currentExtremeQuestion.correctAnswer;
}

// Add an event listener to the extreme mode button
extremeButton.addEventListener("click", showExtremeMode);

function showAlert() {
    alert("Please choose your icon and enter your name before starting the quiz.");
}

startScreen.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const clickedDifficulty = event.target.textContent.toLowerCase();

        // Kontrola, zda si hráč vybral ikonu a jméno
        if (localStorage.getItem('selectedIcon') && localStorage.getItem('playerName')) {
            // Zkontrolujte, zda hráč může hrát zvolenou obtížnost
            if (
                (clickedDifficulty === "lehká") ||
                (clickedDifficulty === "střední" && highestScoreLehka >= 50) ||
                (clickedDifficulty === "těžká" && highestScoreStredni >= 50)
            ) {
                selectedDifficulty = clickedDifficulty;
                startScreen.style.display = "none";
                quizContainer.style.display = "block";
                extremeButton.style.display = "none";
                resetQuiz();
                startTimer();
            } else {
                alert("You need to achieve at least 50% score in the previous difficulty to unlock the next difficulty.");
            }
        } else {
            showAlert();
        }
    }
});

resetButton.addEventListener("click", () => {
    resetQuiz();
    startTimer();
    resetTimer();
});

nextDifficultyButton.addEventListener("click", () => {
    const currentDifficultyIndex = ["lehká", "střední", "těžká"].indexOf(selectedDifficulty);

    selectedDifficulty = ["lehká", "střední", "těžká"][(currentDifficultyIndex + 1) % 3];

    startScreen.style.display = "none";
    quizContainer.style.display = "block";

    resetQuiz(); // Only reset the quiz, don't restart it
    loadQuestion(); // Load the next question for the new difficulty
    resetTimer();
    startTimer();
});

returnToMenuButton.addEventListener("click", () => {
    selectedDifficulty = "";
    startScreen.style.display = "block";
    quizContainer.style.display = "none";
    extremeButton.style.display = "block"
    stopTimer();
    resetTimer();
});

function resetTimer() {
    elapsedTime = 0;
    updateTimerDisplay();
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    options.forEach(option => option.classList.remove('shake'));
    loadQuestion();
}

function loadQuestion() {
    nextButton.style.display = "none";
    resetButton.style.display = "none";
    nextDifficultyButton.style.display = "none";
    returnToMenuButton.style.display = "none";

    const savedIcon = localStorage.getItem('selectedIcon');
    const savedName = localStorage.getItem('playerName');

    if (savedIcon && savedName) {
        // If there are saved icon and name, display them
        createPlayerIcon(savedName, savedIcon);
        // Clear the icon selection to avoid confusion
        clearIconSelection();
    }

    // Show the cross button during gameplay
    crossButton.style.display = "block";

    while (currentQuestion < finalQuestions.length) {
        const questionData = finalQuestions[currentQuestion];
        const currentDifficulty = questionData.difficulty;

        if (currentDifficulty === selectedDifficulty) {
            timerElement.style.display = "block";
            updateQuestion(questionData);
            break;
        } else {
            currentQuestion++;
        }
    }

    if (currentQuestion === finalQuestions.length) {
        showResult();
        // Show the "Change Player" button when the quiz is completed
        changeButton.style.display = "block";
        // Hide the cross button after the quiz is completed
        crossButton.style.display = "none";
    } else {
        // Hide the "Change Player" button during the quiz
        changeButton.style.display = "none";
    }
}


function updateQuestion(questionData) {
    while (true) {
        questionElement.textContent = `(${questionData.difficulty}) ${questionData.question}`;

        questionImage.src = `images/${questionData.image}`; // Oprava: Přidáme cestu k adresáři images
        questionImage.style.display = "block";

        updateOptions(questionData.options);
        break; // Přidáme příkaz break pro ukončení cyklu while
    }
}

function updateOptions(currentOptions) {
    for (let i = 0; i < options.length; i++) {
        if (i < currentOptions.length) {
            options[i].textContent = currentOptions[i];
            options[i].classList.remove("correct", "incorrect");
            options[i].addEventListener("click", checkAnswer);
            options[i].style.display = "block";
        } else {
            options[i].style.display = "none";
        }
    }
}

function checkAnswer(event) {
    const selectedOption = event.target;
    const selectedOptionIndex = Array.from(options).indexOf(selectedOption);
    const correctOptionIndex = finalQuestions[currentQuestion].answer;

    for (let i = 0; i < options.length; i++) {
        options[i].removeEventListener("click", checkAnswer);
        options[i].classList.remove("shake"); // Remove shake class from all options

        if (i === correctOptionIndex) {
            options[i].classList.add("correct");
        } else if (i === selectedOptionIndex) {
            // Use setTimeout to delay the addition of the shake class
            setTimeout(() => {
                options[i].classList.add("incorrect", "shake");
            }, 1);
        }
    }

    if (selectedOptionIndex === finalQuestions[currentQuestion].answer) {
        score++;
        selectedOption.classList.add("correct");
    } else {
        selectedOption.classList.add("incorrect");
    }

    // Remove event listeners after adding classes
    for (let i = 0; i < options.length; i++) {
        options[i].removeEventListener("click", checkAnswer);
    }

    nextButton.style.display = "block";
}

function showResult() {
    stopTimer();

    resetButton.style.display = "block";
    nextDifficultyButton.style.display = "block";
    returnToMenuButton.style.display = "block";

    // Výpočet uplynulého času v minutách a sekundách
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    // Zformátujte uplynulý čas do řetězce (MM:SS)
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const percentage = (score / maxQuestionsPerDifficulty) * 100;
    const formattedPercentage = percentage.toFixed(0);

    if (selectedDifficulty !== "těžká" && percentage > 50) {
        nextDifficultyButton.style.display = "block";
    } else {
        nextDifficultyButton.style.display = "none";
    }

    // Update scores based on difficulty
    if (selectedDifficulty === "lehká") {
        scoreLehka = percentage;
        highestScoreLehka = Math.max(percentage, highestScoreLehka);
    } else if (selectedDifficulty === "střední") {
        scoreStredni = percentage;
        highestScoreStredni = Math.max(percentage, highestScoreStredni);
    } else if (selectedDifficulty === "těžká") {
        scoreTezka = percentage;
        highestScoreTezka = Math.max(percentage, highestScoreTezka);
    }

    localStorage.setItem('highestScoreLehka', highestScoreLehka);
    localStorage.setItem('highestScoreStredni', highestScoreStredni);
    localStorage.setItem('highestScoreTezka', highestScoreTezka);

    localStorage.setItem(`scoreLehka`, scoreLehka);
    localStorage.setItem(`scoreStredni`, scoreStredni);
    localStorage.setItem(`scoreTezka`, scoreTezka);

    document.getElementById("easy-score").textContent = `Lehká: ${scoreLehka}% (Nejvyšší skóre: ${highestScoreLehka}%)`;
    document.getElementById("medium-score").textContent = `Střední: ${scoreStredni}% (Nejvyšší skóre: ${highestScoreStredni}%)`;
    document.getElementById("hard-score").textContent = `Těžká: ${scoreTezka}% (Nejvyšší skóre: ${highestScoreTezka}%)`;


    questionElement.textContent = `Váš výsledek: ${score} správných odpovědí z ${maxQuestionsPerDifficulty}. Váš kvíz trval: ${formattedTime}. Celkové procento: ${formattedPercentage}%.`;

    options.forEach(option => option.style.display = "none");
    nextButton.style.display = "none";

    if (questionImage.style.display !== "none") {
        questionImage.style.display = "none";
    }

    if (timerElement.style.display !== "none") {
        timerElement.style.display = "none";
    }
}

loadQuestion();

nextButton.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});