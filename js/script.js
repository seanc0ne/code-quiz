const questions = [
    {
        question: 'What is the purpose of the alt attribute for images?',
        answers: [
            { text: 'To provide context for the image', correct: true },
            { text: 'To prevent search engines from indexing the image', correct: false },
            { text: 'To make it easier to style the image with CSS', correct: false },
            { text: 'To make the image load faster', correct: false }
        ]
    },
    {
        question: 'How can you add more than one class to an HTML element?',
        answers: [
            { text: 'Add a second class attribute', correct: false },
            { text: 'Add a comma between the class names', correct: false },
            { text: 'Add a class-2 attribute', correct: false },
            { text: 'Add a space between the class names', correct: true }
        ]
    },
    {
        question: 'What CSS declaration could you add to a 50%-width <div> to center it?',
        answers: [
            { text: 'margin: 0 auto', correct: true },
            { text: 'text-align: center', correct: false },
            { text: 'float: center', correct: false },
            { text: 'align: center', correct: false }
        ]
    },
    {
        question: 'Which CSS property allows the parent element to display its CSS properties by stretching its dimensions to physically contain its child elements?',
        answers: [
            { text: 'text-align: center;', correct: false },
            { text: 'margin: auto;', correct: false },
            { text: 'overflow: auto;', correct: true },
            { text: 'display: inline-block;', correct: false }
        ]
    },
    {
        question: 'How do you create a flexbox?',
        answers: [
            { text: 'display: flex;', correct: true },
            { text: 'display: flexbox;', correct: false },
            { text: 'display: box;', correct: false },
            { text: 'flex: display box', correct: false }
        ]
    },
    {
        question: 'By default, in which direction does a flexbox lay out its items?',
        answers: [
            { text: 'A row (horizontal), with all of the child elements laid out side by side.', correct: true },
            { text: 'A column (vertical), with all of the child elements laid out on top of one another.', correct: false },
        ]
    },
    {
        question: 'Which of the following is NOT a method for spanning multiple columns?',
        answers: [
            { text: 'grid-column: repeat(2, 1fr);', correct: true },
            { text: 'grid-column: 3 / span 2;', correct: false },
            { text: 'grid-column: 3 / 4;', correct: false },
            { text: 'grid-column: -2 / -1;', correct: false }
        ]
    },
    {
        question: 'What does the selector div:hover a apply to?',
        answers: [
            { text: 'Any <a> element inside a <div> that’s in a hover state.', correct: true },
            { text: 'Any <div> element whose child <a> element is in a hover state.', correct: false },
            { text: 'Any <div> or <a> element that’s in a hover state.', correct: false },
            { text: 'Any <a> element sitting next to a <div> that’s in a hover state.', correct: false }
        ]
    },
    {
        question: 'What do the values in transition: color 1s mean?',
        answers: [
            { text: 'Apply the transition to the color property, but only run once.', correct: false },
            { text: 'Apply the transition to the color and 1s properties.', correct: false },
            { text: 'Transition the color from its original value to plus one on the RGB scale.', correct: false },
            { text: 'Apply the transition to the color property that lasts one second.', correct: true }
        ]
    },
    {
        question: 'What is the purpose of overflow: hidden?',
        answers: [
            { text: 'Hide all content inside of the element.', correct: false },
            { text: 'Hide any neighboring content.', correct: false },
            { text: 'Hide content that flows outside of the element.', correct: true },
            { text: 'Fix issues caused by CSS floats.', correct: false }
        ]
    },
]

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;
let startTimer = 120;

startButton.addEventListener('click', startGame);
// startGame is a named function, anonymous function does not have name
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    setInterval(function() {
        
    }
    // use anonymous function, setInterval and nowhere else
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
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
    nextButton.classList.add('hide');
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
        setStatusClass(button, button.dataset.correct)
    })
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    setTimeout(setNextQuestion, 2000);
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

