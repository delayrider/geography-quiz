const baseURL ='https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple';
const containerEl = document.querySelector('.container');
const form = document.querySelector('#quiz-form');
const questionEl = document.querySelector('.question');
const optionEl = document.querySelector('.all-options');
const buttonEl = document.querySelector('.buttons');
const scoreEl = document.querySelector('.scoreBoard .user-score');
const answeredEl = document.querySelector('.scoreBoard .question-answered');

window.addEventListener('DOMContentLoaded', quizApp);

function quizApp(){
    
}