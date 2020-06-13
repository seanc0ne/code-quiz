const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<js>', correct: false },
            { text: '<scripting>', correct: false },
            { text: '<javascript>', correct: false }
        ]
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: [
            { text: 'The <body> section', correct: false },
            { text: 'The <head> section', correct: false },
            { text: 'Both the <head> section and the <body> section are correct', correct: true }
        ]
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: [
            { text: '<script src="xxx.js">', correct: true },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script name="xxx.js">', correct: false }
        ]
    },
    {
        question: 'The external JavaScript file must contain the <script> tag.',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: [
            { text: 'alert("Hello World");', correct: true },
            { text: 'msg("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false },
            { text: 'msgBox("Hello World");', correct: false }
        ]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            { text: 'function myFunction()', correct: true },
            { text: 'function = myFunction()', correct: false },
            { text: 'function:myFunction()', correct: false }
        ]
    },
    {
        question: 'How do you call a function named "myFunction"?',
        answers: [
            { text: 'call myFunction()', correct: false },
            { text: 'call function myFunction()', correct: false },
            { text: 'myFunction()', correct: true }
        ]
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [
            { text: '<!--This is a comment-->', correct: false },
            { text: '//This is a comment', correct: true },
            { text: 'This is a comment', correct: false }
        ]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false },
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
            { text: 'var colors = ["red", "green", "blue"]', correct: true }
        ]
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        answers: [
            { text: 'round(7.25)', correct: false },
            { text: 'rnd(7.25)', correct: false },
            { text: 'Math.round(7.25)', correct: true },
            { text: 'Math.rnd(7.25)', correct: false }
        ]
    },
]

const startButton = document.getElementById('start-btn');
// const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timerTextElement = document.getElementById('timer-text');

let shuffledQuestions, currentQuestionIndex;
let secondsRemaining = 120;

startButton.addEventListener('click', startGame);
// startGame is a named function, anonymous function does not have name
// nextButton.addEventListener('click', () => {
//     currentQuestionIndex++;
//     setNextQuestion();
// })

function startGame() {
    var interval1 = setInterval(function() {
        if (secondsRemaining === 1) {
            clearInterval(interval1);
        }
        timerTextElement.innerText = --secondsRemaining;
    }, 1000);
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(function() {Math.random() - .5});
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement ('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
//    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    console.log(selectedButton);
    console.log(correct);
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
 //       nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    setTimeout(setNextQuestion, 2000);
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
       // secondsRemaining = secondsRemaining - 20;
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

