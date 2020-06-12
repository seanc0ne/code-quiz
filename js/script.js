const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement ('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '202', correct: false },
            { text: '2002', correct: false }
        ]
    },
    {
        question: 'If 4(x) = 8, what does x equal?',
        answers: [
            { text: '4', correct: false },
            { text: '22', correct: false },
            { text: '202', correct: false },
            { text: '2', correct: true }
        ]
    },
    {
        question: 'What is Madonnas real name?',
        answers: [
            { text: 'Madonna', correct: true },
            { text: 'Sharon', correct: false },
            { text: 'Baby Girl', correct: false },
            { text: 'Mariah', correct: false }
        ]
    },
    {
        question: 'What is your favorite Prince album?',
        answers: [
            { text: '1999', correct: true },
            { text: 'Controversy', correct: false },
            { text: 'Purple Rain', correct: false },
            { text: 'Graffiti Bridge', correct: false }
        ]
    },
    {
        question: 'Who did your hair?',
        answers: [
            { text: 'Me', correct: true },
            { text: 'You', correct: false },
            { text: 'What', correct: false },
            { text: 'OK', correct: false }
        ]
    },
    {
        question: 'Do you want to party?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'Maybe', correct: false },
            { text: 'Not tonight', correct: false },
            { text: 'Never', correct: false }
        ]
    },
    {
        question: 'Thank you?',
        answers: [
            { text: 'Youre welcome', correct: true },
            { text: 'No', correct: false },
            { text: '202', correct: false },
            { text: '2002', correct: false }
        ]
    },
    {
        question: 'How much is that doggie in the window?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '202', correct: false },
            { text: '2002', correct: false }
        ]
    },
    
]