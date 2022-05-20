const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: '🌍 Kateri planet je tretji po vrsti v našem osončju?',
        choice1: 'Luna',
        choice2: 'Jupiter',
        choice3: 'Neptun',
        choice4: 'Zemlja',
        answer: 4,
    },
    {
        question: "🌌 Kako se imenuje galaksija, v kateri se nahaja naš planet?",
        choice1: "Zvezdne steze",
        choice2: "Rimska cesta",
        choice3: "Andromeda",
        choice4: "črna luknja",
        answer: 2,
    },
    {
        question: "👽 Kako je ime simpatičnemu vesoljčku v filmu iz leta 1982?",
        choice1: "Elon Musk",
        choice2: "Yoda",
        choice3: "XÆA-12",
        choice4: "E.T.",
        answer: 4,
    },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });
    
      availableQuestions.splice(questionIndex, 1);
      acceptingAnswers = true;
    };

    choices.forEach(choice => {
        choice.addEventListener("click", e => {
          if (!acceptingAnswers) return;

          acceptingAnswers = false;
          const selectedChoice = e.target;
          const selectedAnswer = selectedChoice.dataset["number"];
          
          const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000);
        });
      });

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}


startGame();
