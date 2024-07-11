const quizContainer = document.querySelector('.quiz-container');
const flagContainer = document.getElementById('flag-container');
const flagImg = document.getElementById('flag');
const optionsContainer = document.querySelector('.options-container');
const nextBtn = document.querySelector('.next-btn');
const resultText = document.getElementById('result');
const changeThemeButton = document.querySelector('.changetheme-btn');
const scoreText = document.querySelector('.score');
const infoText = document.querySelector('.countryInfo');
const diffBtn = document.querySelector('.diff-btn');
const wrongAnswerSound = new Audio("wrong.mp3");
const rightAnswerSound = new Audio("right.mp3");
const changeThemeSound = new Audio("themechange.mp3");
const hardDiffSound = new Audio("harddiff.mp3");
const easyDiffSound = new Audio("easydiff.mp3");
const nextBtnSound = new Audio("nextquestion.mp3");


let responseButtons = [];
let countries = [];
let currentCountry = {};
let index = 0;
let buttonIndex = 0;
let score = 0;
let totalQuestionsIndex = 0;
let rightAnswersIndex = 0;
let diffHard = false;


scoreText.style.visibility = 'hidden';
infoText.style.visibility = 'hidden';

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();
    newQuestion();
}



function newQuestion() {
    resultText.textContent = '';
    infoText.style.visibility = 'hidden';
    resultText.style.visibility = 'hidden';
    optionsContainer.innerHTML = '';

    if (diffHard) {
        const randomCountries = getRandomCountries(1);
        currentCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];
        flagImg.src = currentCountry.flags.png;

        const input = document.createElement('input');
        input.type = "text";
        input.classList.add("openAnswer");

        input.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {

                checkOpenAnswer(input.value)
            }
        });



        optionsContainer.appendChild(input);
    } else {
        const randomCountries = getRandomCountries(4);
        currentCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

        flagImg.src = currentCountry.flags.png;
        responseButtons = [];
        randomCountries.forEach(country => {
            const button = document.createElement('button');
            button.textContent = country.translations.ita.common;
            button.addEventListener('click', () => checkAnswer(country));
            responseButtons.push(button);
            optionsContainer.appendChild(button);
        });
    }
}

function keyPress(event, value) {
    if (event.key === "Enter") {
        inputAnswer = value;
        checkOpenAnswer(inputAnswer)
    }
}

function checkOpenAnswer(inputAnswer) {
    if (inputAnswer.toLowerCase() === currentCountry.translations.ita.common.toLowerCase()) {
        rightAnswerSound.play();
        resultText.style.visibility = 'visible';
        resultText.textContent = 'Corretto!';
        resultText.style.color = 'green';
        infoText.style.visibility = 'visible';
        infoText.textContent = `Lo sapevi? Il paese ${currentCountry.translations.ita.common} ha un area di ${currentCountry.area} km^2 ed una popolazione di ${currentCountry.population} persone!`
        score++;
        score++;
        score++;
        totalQuestionsIndex++;
        rightAnswersIndex++;
    } else {
        wrongAnswerSound.play();
        resultText.style.visibility = 'visible';
        resultText.innerText = `Sbagliato! La risposta corretta era:\n${currentCountry.translations.ita.common}.`;
        resultText.style.color = 'red';
        totalQuestionsIndex++;
    }
    scoreText.style.visibility = 'visible';
    let rightAnswersPerc = Math.floor((rightAnswersIndex / totalQuestionsIndex) * 100);
    scoreText.innerText = `Il tuo punteggio è...\n${score}!\nHai risposto correttamente al ${rightAnswersPerc}% delle domande!`;
}


function getRandomCountries(count) {
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function checkAnswer(selectedCountry) {
    responseButtons.forEach(button => {
        button.disabled = true;
    });
    if (selectedCountry.translations.ita.common === currentCountry.translations.ita.common) {
        rightAnswerSound.play();
        resultText.style.visibility = 'visible';
        resultText.textContent = 'Corretto!';
        resultText.style.color = 'green';
        infoText.style.visibility = 'visible';
        infoText.textContent = `Lo sapevi? Il paese ${currentCountry.translations.ita.common} ha un area di ${currentCountry.area} km^2 ed una popolazione di ${currentCountry.population} persone!`
        score++;
        totalQuestionsIndex++;
        rightAnswersIndex++;
    } else {
        wrongAnswerSound.play();
        resultText.style.visibility = 'visible';
        resultText.innerText = `Sbagliato! La risposta corretta era:\n${currentCountry.translations.ita.common}.`;
        resultText.style.color = 'red';
        totalQuestionsIndex++;
        score--;
    }
    scoreText.style.visibility = 'visible';
    let rightAnswersPerc = Math.floor((rightAnswersIndex / totalQuestionsIndex) * 100);
    scoreText.innerText = `Il tuo punteggio è...\n${score}!\nHai risposto correttamente al ${rightAnswersPerc}% delle domande!`;


}

nextBtn.addEventListener('click', nextSound);

function nextSound() {
    nextBtnSound.play();
    window.setTimeout(() => {stopAudio(nextBtnSound)}, 2000);
}

nextBtn.addEventListener('click', newQuestion);

diffBtn.addEventListener('click', changeDiff);

function changeDiff() {
    if (diffHard == false) {
        diffHard = true;
        diffBtn.innerText = 'HARD'
        hardDiffSound.play();
        window.setTimeout(() => {stopAudio(hardDiffSound)}, 3000);
    } else {
        diffHard = false;
        diffBtn.innerText = 'EASY'
        easyDiffSound.play();

    }
    newQuestion()
}

fetchCountries();

changeThemeButton.addEventListener('click', changeTheme);

function changeTheme() {
    changeThemeSound.play()
    window.setTimeout(() => {stopAudio(changeThemeSound)}, 1500);

    if (index % 2 == 0) {
        document.body.style.backgroundColor = '#C8E6C9';
        index++;
    } else {
        document.body.style.backgroundColor = "#FFCDD2";
        index++;
    }
    quizContainer.classList.toggle("new-quiz-container");

    nextBtn.classList.toggle("new-next-btn");
    changeThemeButton.classList.toggle("new-changetheme-btn");
    diffBtn.classList.toggle("new-diff-btn")
}

function stopAudio(audio) {
audio.pause()
audio.currentTime = 0;
}