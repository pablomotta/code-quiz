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
console.log(mostRecentScore);
// functions
function startQuiz() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...quizData];
    startTimer(15, timer);
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
}

function startTimer(duration, display) {
    var timer = duration,
        minutes,
        seconds;
    var timeInterval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if (--timer < 0) {
            quizApp.style.display = 'none';
            resultsPage.style.display = 'block';
            clearInterval(timeInterval);
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
        // console.log(classToApply);
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
var li = document.createElement('li');

var MAX_HIGH_SCORES = 5;

function saveHighScore(event) {
    // console.log('clicked the save button');
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

    var highScoreJSON = JSON.stringify(highScores);

    localStorage.setItem(highScores, highScoreJSON);

    quizApp.style.display = 'none';
    resultsPage.style.display = 'none';
    homePage.style.display = 'block';

    var scoreCardName = document.getElementById('scoreCardName');
    var scoreCardScore = document.getElementById('scoreCardScore');
    var scoreLine = document.getElementById('scoreLine');
    var highScoreParse = JSON.parse(localStorage.getItem(highScores));
    highScoreParse.map(function(item) {
        scoreCardName.innerText = item.name;
        scoreCardScore.innerText = item.score;
        scoreLine.innerText = '-----------';
        console.log(item.name + '  ' + item.score);
    });

    // console.log(localStorage.getItem(highScores));
}

saveScoreBtn.addEventListener('click', function() {
    saveHighScore();
    // console.dir(username.value);
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

// var test1 = JSON.parse(localStorage.getItem('highScores'));
