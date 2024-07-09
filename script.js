const quizContainer = document.querySelector('.quiz-container');
const flagContainer = document.getElementById('flag-container');
const flagImg = document.getElementById('flag');
const optionsContainer = document.querySelector('.options-container');
const nextBtn = document.querySelector('.next-btn');
const resultText = document.getElementById('result');
const changeThemeButton = document.querySelector('.changetheme-btn');
const scoreText = document.querySelector('.score');
let responseButtons = [];
let countries = [];
let currentCountry = {};
let index = 0;
let buttonIndex = 0;
let score = 0;
let totalQuestionsIndex = 0;
let rightAnswersIndex = 0;

scoreText.style.visibility = 'hidden';

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();
    newQuestion();
}

function newQuestion() {
    resultText.textContent = '';

    resultText.style.visibility = 'hidden';
    optionsContainer.innerHTML = '';

    const randomCountries = getRandomCountries(4);
    currentCountry = randomCountries[Math.floor(Math.random() * randomCountries.length)];

    flagImg.src = currentCountry.flags.png;
    responseButtons = [];
    randomCountries.forEach(country => {
        const button = document.createElement('button');
        button.textContent = country.name.common;
        button.addEventListener('click', () => checkAnswer(country));
        responseButtons.push(button);
        optionsContainer.appendChild(button);
    });
}

function getRandomCountries(count) {
    const shuffled = countries.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function checkAnswer(selectedCountry) {
    responseButtons.forEach(button => {
        button.disabled = true;
    });
    if (selectedCountry.name.common === currentCountry.name.common) {
        resultText.style.visibility = 'visible';
        resultText.textContent = 'Corretto!';
        resultText.style.color = 'green';
        score++;
        totalQuestionsIndex++;
        rightAnswersIndex++;
    } else {
        resultText.style.visibility = 'visible';
        resultText.innerText = `Sbagliato! La risposta corretta era:\n${currentCountry.name.common}.`;
        resultText.style.color = 'red';
        totalQuestionsIndex++;
        score--;
    }
    scoreText.style.visibility = 'visible';
    let rightAnswersPerc = ((rightAnswersIndex / totalQuestionsIndex) * 100);
    scoreText.innerText = `Il tuo punteggio è...\n${score}!\nHai risposto correttamente al ${rightAnswersPerc}% delle domande!`;


}

nextBtn.addEventListener('click', newQuestion);

fetchCountries();

changeThemeButton.addEventListener('click', changeTheme);

function changeTheme() {
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
}