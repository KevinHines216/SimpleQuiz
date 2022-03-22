const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')

let currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})



function startGame(){
    console.log('Started')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    currentQuestionIndex = 0
    nextQuestion()
}

function nextQuestion(){
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        //Displaying the options
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        //checking if answer is correct 
        if (answer.correct){
            button.dataset.correct = answer.correct 
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
    
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(answer){
    const selected = answer.target
    const correct = selected.dataset.correct 
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "Who is Kevin's favourite emporer?",
        answers: [
            {text: "Julius Ceaser", correct: false},
            {text: "Justinian", correct: true},
            {text: "Basil II", correct: false},
            {text: "Napoloen Bonaparte", correct: false}
        ]
    },
    {
        question: "What is 2 * 2?",
        answers: [
            {text: "22", correct: false},
            {text: "4", correct: true}
        ]
    },
    {
        question: "What is the capital of Vietnam?",
        answers: [
            {text: "Hoang-long", correct: false},
            {text: "Haiphong", correct: false},
            {text: "Ho Chi Minh City", correct: false},
            {text: "Hanoi", correct: true}
        ]
    }
]