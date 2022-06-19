// Gets all the elements from the DOM

const baseURL ='https://opentdb.com/api.php?amount=1&category=22&type=multiple';
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
    createHTML(question, options);
   
}

// Fetches the API

async function fetchQuiz(){
    const response = await fetch(baseURL);
    const data = await response.json();

    console.log(data.results);
    return data.results;
}

// Manipulates DOM to display questions and content to user

function createHTML(question, options){

    optionCl.innerHTML = '';
    questionCl.innerHTML = question;
}