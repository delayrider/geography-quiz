// Gets all the elements from the DOM
const baseURL = 'https://opentdb.com/api.php?amount=1&category=22&type=multiple';
const containerCl = document.querySelector('.container');
const form = document.querySelector('#quiz-form');
const questionCl = document.querySelector('.question');
const optionCl = document.querySelector('.all-options');
const buttonCl = document.querySelector('.buttons');
const scoreCl = document.querySelector('.scoreBoard .user-score');
const answeredCl = document.querySelector('.scoreBoard .question-answered');
// Desclares variable for the quizApp function
let question, answer;
let options = [];
let score = 0;
let questionCount = 0;
// Event listener waits for DOM to be fully loaded before calling the quizApp function
window.addEventListener('DOMContentLoaded', quizApp);
// Statement of the quizApp function 
async function quizApp() {
	updateScore();
	const data = await fetchQuiz();
	question = data[0].question;
	options = [];
	answer = data[0].correct_answer;
	data[0].incorrect_answers.map(option => options.push(option));
	// Pushes the correct answer into the same array as incorrect answer and shuffels the options
	options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);
	console.log(answer, options);
	createHTML(question, options);
	console.log(answer);
}
// Handels the submit button
form.addEventListener('submit', (e) => {
		e.preventDefault();
		if(e.target.quiz.value) {
			checkQuiz(e.target.quiz.value)
			e.target.querySelector('button').style.display = 'none';
			generateButtons();
		} else {
			return
		}
	})
	// Fetches the API
async function fetchQuiz() {
	const response = await fetch(baseURL);
	const data = await response.json();
	console.log(data.results);
	return data.results;
}
// Populates the DOM to display questions and content to user
function createHTML(question, options) {
	optionCl.innerHTML = '';
	questionCl.innerHTML = question;
	options.map((option, index) => {
		const div = document.createElement('div');
		div.classList.add('option');
		div.innerHTML = ` 
        <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
        <label for="option${index + 1}">${option}</label>
        `
		optionCl.appendChild(div)
	})
}

function checkQuiz(selected) {
	questionCount++;
	if(selected === answer) {
		score++;
	}
	updateScore();
	form.quiz.forEach(input => {
		if(input.value === answer) {
			input.parentElement.classList.add('correct');
		}
	})
}
// Updates the score board
function updateScore() {
	scoreCl.innerText = score;
	answeredCl.innerText = questionCount;
}
// Created Next Question and End Game buttons
function generateButtons() {
	const finishButton = document.createElement('button');
	finishButton.innerText = 'End'
	finishButton.setAttribute('type', 'button');
	finishButton.classList.add('finish-button');
	buttonCl.appendChild(finishButton);
	const nextButton = document.createElement('button');
	nextButton.innerText = 'Next'
	nextButton.setAttribute('type', 'button');
	nextButton.classList.add('next-button');
	buttonCl.appendChild(nextButton);
	// Adds event listeners to the new buttons
	finishButton.addEventListener('click', endGame);
	nextButton.addEventListener('click', getNextQuestion);
}
// Gives function to the new buttons
function getNextQuestion() {
	const nextButton = document.querySelector('.next-button');
	const finishButton = document.querySelector('.finish-button');
	buttonCl.removeChild(nextButton);
	buttonCl.removeChild(finishButton);
	// Puts submit button back after selecting next 
	buttonCl.querySelector('button[type="submit"]').style.display = 'block'
	quizApp();
}
// Ends the game
function endGame() {
	const nextButton = document.querySelector('.next-button');
	const finishButton = document.querySelector('.finish-button');
	buttonCl.removeChild(nextButton);
	buttonCl.removeChild(finishButton);
	buttonCl.querySelector('button[type="submit"]').style.display = 'block'
	const overlay = document.createElement('div');
	overlay.classList.add('result-overlay');
	overlay.innerHTML = `
    <div class = "final-result">${score}/${questionCount}</div>
    <button>Play Again!</button>
    `
	containerCl.appendChild(overlay);
	overlay.querySelector('button').addEventListener('click', () => {
		containerCl.removeChild(overlay);
		playAgain();
	});
}

function playAgain() {
	score = 0;
	questionCount = 0;
	quizApp();
}