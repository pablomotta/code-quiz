// quiz api
var quizData = [
    {
        id: 0,
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<js>', '<scripting>', '<script>', '<javascript>'],
        correct: '<script>'
    },
    {
        id: 1,
        question: 'What are variables used for in JavaScript Programs?',
        answers: [
            'Storing numbers, dates, or other values',
            ' Varying randomly',
            'Causing high-school algebra flashbacks',
            'None of the above'
        ],
        correct: 'Storing numbers, dates, or other values'
    },
    {
        id: 2,
        question:
            "Which of the following can't be done with client-side JavaScript?",
        answers: [
            'Validating a form',
            "Sending a form's contents by email",
            "Storing the form's contents to a database file on the server",
            'None of the above'
        ],
        correct: "Storing the form's contents to a database file on the server"
    },
    {
        id: 3,
        question:
            'Which of the following are capabilities of functions in JavaScript?',
        answers: [
            'Return a value',
            'Accept parameters and Return a value',
            'Accept parameters',
            'None of the above'
        ],
        correct: 'Accept parameters'
    },
    {
        id: 4,
        question:
            'What is the correct JavaScript syntax to write "Hello World"?',
        answers: [
            'System.out.println("Hello World")',
            'println ("Hello World")',
            'document.write("Hello World")',
            'response.write("Hello World")'
        ],
        correct: 'document.write("Hello World")'
    },
    {
        id: 5,
        question: 'What does the <noscript> tag do?',
        answers: [
            'Enclose text to be displayed by non-JavaScript browsers.',
            'Prevents scripts on the page from executing.',
            'Describes certain low-budget movies.',
            'None of the above'
        ],
        correct: 'Enclose text to be displayed by non-JavaScript browsers.'
    },
    {
        id: 6,
        question: 'Which of the following best describes JavaScript?',
        answers: [
            'a low-level programming language.',
            'a scripting language pre-compiled in the browser.',
            'a compiled scripting language.',
            'an object-oriented scripting language.'
        ],
        correct: 'an object-oriented scripting language.'
    },
    {
        id: 7,
        question: 'JavaScript is interpreted by _________',
        answers: ['Client', 'Server', 'Object', ' None of the above'],
        correct: 'Client'
    },
    {
        id: 8,
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<js>', '<scripting>', '<script>', '<javascript>'],
        correct: '<script>'
    },
    {
        id: 9,
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ['<js>', '<scripting>', '<script>', '<javascript>'],
        correct: '<script>'
    }
];
// score
var questionQuantity = quizData.length;
var rightAnswer = 0;

// selectors
var homePage = document.querySelector('#home');
var startQuiz = document.querySelector('#start-quiz');
var quizApp = document.querySelector('#quiz-app');
var quizQuestion = document.querySelector('#question');
var answerButtonsDiv = document.querySelector('#answer-buttons');

// start quiz
startQuiz.addEventListener('click', function() {
    quizApp.style.display = 'block';
    homePage.style.display = 'none';
    renderQuestion();
});

// render question
var iterator = 0;
function renderQuestion() {
    var question = quizData[iterator].question;

    var answerOptions = quizData[iterator].answers;

    quizQuestion.innerText = question;

    for (var i = 0; i < answerOptions.length; i++) {
        var questionNumber = i + 1;

        var button = document.createElement('button');
        button.textContent = `Option ${questionNumber}:    ${answerOptions[i]} `;
        // console.log(button);
        answerButtonsDiv.appendChild(button);
    }
}

// remove questions
function removeQuestion() {}

//check for right answer
answerButtonsDiv.addEventListener('click', function() {
    var correctAnswer = quizData[iterator].correct;
    // console.log(correctAnswer);
    var elementClicked = event.target;
    var liString = elementClicked.parentElement.innerText;
    var regex = new RegExp(correctAnswer, 'gi');
    // console.log(liString);
    if (liString.match(regex)) {
        console.log('it works');
        rightAnswer += 1;
        iterator += 1;
        // renderQuestion();

        console.log(rightAnswer);
    } else {
        console.log('wrong answer');
        iterator += 1;
        // renderQuestion();
    }
});

// var deleteQuestion = document.getElementById('answer-options');
// console.dir(deleteQuestion.childNodes);
