// Gets all the elements from the DOM

const baseURL ='https://opentdb.com/api.php?amount=50&category=22&type=multiple';
const containerEl = document.querySelector('.container');
const form = document.querySelector('#quiz-form');
const questionEl = document.querySelector('.question');
const optionEl = document.querySelector('.all-options');
const buttonEl = document.querySelector('.buttons');
const scoreEl = document.querySelector('.scoreBoard .user-score');
const answeredEl = document.querySelector('.scoreBoard .question-answered');

// Event listener waits for DOM to be fully loaded before calling the quizApp function

window.addEventListener('DOMContentLoaded', quizApp);

// Statement of the quizApp function 

function quizApp(){
    const data = fetchQuiz();
}

// Fetches the API

async function fetchQuiz(){
    const response = await fetch(baseURL);
    const data = await response.json();

    // console.log(data.results);
    return data.results;
}