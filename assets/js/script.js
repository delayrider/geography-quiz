// Gets all the elements from the DOM

const baseURL ='https://opentdb.com/api.php?amount=1&category=22&type=multiple';
const containerEl = document.querySelector('.container');
const form = document.querySelector('#quiz-form');
const questionEl = document.querySelector('.question');
const optionEl = document.querySelector('.all-options');
const buttonEl = document.querySelector('.buttons');
const scoreEl = document.querySelector('.scoreBoard .user-score');
const answeredEl = document.querySelector('.scoreBoard .question-answered');

// Desclares variable for the quizApp function

let question, answer;
let options = [];
let score = 0;
let answeredQus = 0;

// Event listener waits for DOM to be fully loaded before calling the quizApp function

window.addEventListener('DOMContentLoaded', quizApp);

// Statement of the quizApp function 

async function quizApp(){
    const data = await fetchQuiz();
    question = data[0].question;
    options = [];
    answer = data[0].correct_answer;
    data[0].incorrect_answers.map(option => options.push(option));

// Pushes the correct answer into the same array as incorrect answer and shuffels the options
    options.splice(Math.floor(Math.random()* options.length + 1), 0, answer);
    console.log(answer, options);
    
}

// Fetches the API

async function fetchQuiz(){
    const response = await fetch(baseURL);
    const data = await response.json();

    console.log(data.results);
    return data.results;
}