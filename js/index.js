// quiz api
var quizData = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<scripting>',
        choice3: '<script>',
        choice4: '<javascript>',
        correct: 3
    },
    {
        question: 'What are variables used for in JavaScript Programs?',
        choice1: 'Storing numbers, dates, or other values',
        choice2: ' Varying randomly',
        choice3: 'Causing high-school algebra flashbacks',
        choice4: 'None of the above',
        correct: 1
    },
    {
        question:
            "Which of the following can't be done with client-side JavaScript?",
        choice1: 'Validating a form',
        choice2: "Sending a form's contents by email",
        choice3: "Storing the form's contents to a database file on the server",
        choice4: 'None of the above',
        correct: 3
    },
    {
        question:
            'Which of the following are capabilities of functions in JavaScript?',
        choice1: 'Return a value',
        choice2: 'Accept parameters and Return a value',
        choice3: 'Accept parameters',
        choice4: 'None of the above',
        correct: 3
    },
    {
        question:
            'What is the correct JavaScript syntax to write "Hello World"?',

        choice1: 'System.out.println("Hello World")',
        choice2: 'println ("Hello World")',
        choice3: 'document.write("Hello World")',
        choice4: 'response.write("Hello World")',
        correct: 3
    },
    {
        question: 'What does the <noscript> tag do?',
        choice1: 'Enclose text to be displayed by non-JavaScript browsers.',
        choice2: 'Prevents scripts on the page from executing.',
        choice3: 'Describes certain low-budget movies.',
        choice4: 'None of the above',
        correct: 1
    },
    {
        question: 'Which of the following best describes JavaScript?',
        choice1: 'a low-level programming language.',
        choice2: 'a scripting language pre-compiled in the browser.',
        choice3: 'a compiled scripting language.',
        choice4: 'an object-oriented scripting language.',
        correct: 4
    },
    {
        question: 'JavaScript is interpreted by _________',
        choice1: 'Client',
        choice2: 'Server',
        choice3: 'Object',
        choice4: ' None of the above',
        correct: 1
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<scripting>',
        choice3: '<script>',
        choice4: '<javascript>',
        correct: 3
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<js>',
        choice2: '<scripting>',
        choice3: '<script>',
        choice4: '<javascript>',
        correct: 3
    }
];
// global variables
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

// selectors
var question = document.getElementById('question');
var choices = Array.from(document.getElementsByClassName('choice-text'));
var homePage = document.getElementById('home');
var startQuizBtn = document.getElementById('start-quiz');
var quizApp = document.getElementById('quiz-app');
var resultsPage = document.getElementById('results');
var questionTrackerText = document.getElementById('questionTracker');
var scoreText = document.getElementById('score');
var username = document.getElementById('username');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var timer = document.getElementById('timer');

var mostRecentScore = localStorage.getItem('mostRecentScore');

// functions
function startQuiz() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...quizData];
    loadNewQuestion();
}
function loadNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTION) {
        localStorage.setItem('mostRecentScore', score);
        quizApp.style.display = 'none';
        homePage.style.display = 'none';
        resultsPage.style.display = 'block';
        mostRecentScore = localStorage.getItem('mostRecentScore');
        finalScore.innerText = mostRecentScore;
    }
    questionCounter++;
    questionTrackerText.innerText = `${questionCounter}/${MAX_QUESTION}`;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length); // generate random number based on available questions left
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    //load answers
    choices.forEach(function(choice) {
        var number = choice.dataset['number'];
        choice.innerText = currentQuestion[`choice${number}`];
    });
    //remove used questions
    availableQuestions.splice(questionIndex, 1);
    //start accepting answers
    acceptingAnswers = true;
    startTimer(15, timer);
}

function startTimer(duration, display) {
    var timer = duration,
        minutes,
        seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            quizApp.style.display = 'none';
            timer = duration;
            resultsPage.style.display = 'block';
            // // alert('TIME IS UP');
            // homePage.style.display = 'none';
        }
    }, 1000);
}

choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
        if (!acceptingAnswers) return; // check if not accepting answers
        acceptingAnswers = false;
        var chosenChoice = e.target;
        var chosenAnswer = chosenChoice.dataset['number'];

        classToApply = 'incorrect';
        if (chosenAnswer == currentQuestion.correct) {
            classToApply = 'correct';
        }
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        console.log(classToApply);
        chosenChoice.classList.add(classToApply);
        setTimeout(function() {
            chosenChoice.classList.remove(classToApply);
            //load new question
            loadNewQuestion();
        }, 1000);
    });
});

function incrementScore(number) {
    score += number;
    scoreText.innerText = score;
}

//handle high scores with localStorage

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var MAX_HIGH_SCORES = 5;

function saveHighScore(event) {
    console.log('clicked the save button');
    event.preventDefault();

    const highScoresObj = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(highScoresObj);
    highScores.sort(function(a, b) {
        b.highScoresObj - a.highScoresObj;
    });
    highScores.splice(5);

    localStorage.setItem(highScores, JSON.stringify(highScores));

    console.log(highScores);

    quizApp.style.display = 'none';
    resultsPage.style.display = 'none';
    homePage.style.display = 'block';
    location.reload();
}

saveScoreBtn.addEventListener('click', function() {
    saveHighScore();
});

// start quiz
startQuizBtn.addEventListener('click', function() {
    quizApp.style.display = 'block';
    homePage.style.display = 'none';
    startQuiz();
});

username.addEventListener('keyup', function() {
    saveScoreBtn.disabled = !username.value;
});
