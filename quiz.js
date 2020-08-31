const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const next = document.getElementById('next');
const previous = document.getElementById('previous');

const scoreText = document.getElementById('scoreText');
const liveScore = document.getElementById('liveScore');

const totalTime = 3;
let totalTimeinSeconds= totalTime * 60;
const timer = document.getElementById('timer');

const navButtons = document.getElementsByClassName('nav-btn');

const highScore = document.getElementById('high-score');
const highTime = document.getElementById('high-time');
const highName = document.getElementById('high-name');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Where did the Coronavirus originate?",
        choice1: "Wuhan",
        choice2: "Shenzen",
        choice3: "USA",
        choice4: "Italy",
        answer: 1,
        status: "not answered"
    },
    {
        question: "How many second must you wash your hands",
        choice1: "3",
        choice2: "5",
        choice3: "10",
        choice4: "20",
        answer: 4,
        status: "not answered"
    },
    {
        question: "Which country has the most number of COVID cases",
        choice1: "India",
        choice2: "Brazil",
        choice3: "USA",
        choice4: "China",
        answer: 3,
        status: "not answered"
    },
    {
        question: "How many feet distance (min) must you maintain for safety?",
        choice1: "100",
        choice2: "200",
        choice3: "No distance",
        choice4: "6",
        answer: 4,
        status: "not answered"
    },
    {
        question: "Which of the following is not necessary for safety from COVID?",
        choice1: "Washing hands with soap",
        choice2: "Face Mask",
        choice3: "Watching YouTube everyday",
        choice4: "Hand Sanitizers",
        answer: 3,
        status: "not answered"
    },
    {
        question: "Which year did COVID begin?",
        choice1: "2019",
        choice2: "2020",
        choice3: "2018",
        choice4: "2017",
        answer: 1,
        status: "not answered"
    },
    {
        question: "Is it possible to spread COVID without any symptoms?",
        choice1: "No",
        choice2: "Yes",
        choice3: "Can't be concluded",
        choice4: "None of the above",
        answer: 2,
        status: "not answered"
    },
    {
        question: "Which of the following is not a symptom of COVID-19?",
        choice1: "High Temperature",
        choice2: "Dry Cough",
        choice3: "Stomach Ache",
        choice4: "Difficulty in breathing",
        answer: 3,
        status: "not answered"
    },
    {
        question: "Where should you visit if you contract the virus?",
        choice1: "Beach",
        choice2: "Movie Theatre",
        choice3: "Restaurant",
        choice4: "Hospital",
        answer: 4,
        status: "not answered"
    },
    {
        question: "COVID is a ......?",
        choice1: "Virus",
        choice2: "Bacteria",
        choice3: "Protozoa",
        choice4: "Fungi",
        answer: 1,
        status: "not answered"
    }
];

const plus_points = 10;
const max_questions = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    previous.disabled = true;
    setInterval(changeTimer, 1000);
    getNewQuestions();
}

getNewQuestions = () => {

    if(availableQuestions.length === 0 || questionCounter >= max_questions){
        console.log("Game Over");
        const end = document.getElementById('end');
        end.style.visibility = "visible";
    }
    console.log(currentQuestion.status);
    previous.disabled = questionCounter > 0 ? false : true;
    console.log(questionCounter);
    const questionIndex = questionCounter;
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    console.log(currentQuestion);

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];

        //availableQuestions.splice(questionIndex,1);
        acceptingAnswers = true;
    });
    questionCounter++; 
};

next.addEventListener('click',() => {
    getNewQuestions();
});

previous.addEventListener('click',() => {
    questionCounter-=2;
    getNewQuestions();
});

for(let i=0;i < questions.length;i++)
{
  navButtons[i].addEventListener('click', () => {
    questionCounter=i;
    getNewQuestions();
  })
}

choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        currentQuestion.status = "answered"
        if(selectedAnswer == currentQuestion.answer){
            score+=plus_points;
        }
        console.log(score);
        scoreText.innerText = score;
        liveScore.innerText = score;
        const colorCoding = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        selectedChoice.parentElement.classList.add(colorCoding);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(colorCoding);

            getNewQuestions();   
        },600);
    });
});

function actionToggle(){
    var action = document.querySelector('.action');
    action.classList.toggle('active');
}


function changeTimer() {
    let minutes = Math.floor(totalTimeinSeconds/60);
    let seconds = totalTimeinSeconds%60;
  
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    timer.innerHTML = `${minutes}:${seconds}`;
    if(minutes < 1 && seconds < 30)
    {
      timer.style.backgroundColor = 'red';
    }
  
    if( minutes === 0 && seconds === '00')
    {
      console.log("Game Over");
      //const end = document.getElementById('end');
      end.style.visibility = "visible";
    }
    totalTimeinSeconds--;
  }

  startGame();