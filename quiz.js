let score = 0;
let time = 60;
let replayAmount = 0;
let timeInterval;

const startbtn = document.getElementById("start");
const replaybtn = document.getElementById("replay");
const quitbtn = document.getElementById("quit");

const scoredisplay = document.getElementById("score");
const timedisplay = document.getElementById("time");
const replaydisplay = document.getElementById("replays");
const questionsdisplay = document.getElementById("questions");
const questionsLeftDisplay = document.getElementById("questions-left");


startbtn.addEventListener("click", startGame);
replaybtn.addEventListener("click", startGame);
quitbtn.addEventListener("click", endGameEarly);

function startGame(){
    score=0;
    time=60;
    updateDisplay();

  startbtn.style.display = "none";
  replaybtn.style.display = "none";
  quitbtn.style.display = "inline-block";
  questionsdisplay.style.display = "block";

  loadQuestions();
  startTimer();
}

function endGame(){
    clearInterval(timeInterval);
    questionsdisplay.style.display = "none";
    quitbtn.style.display = "none";
    replaybtn.style.display = "inline-block";

    replayAmount++;
    replaydisplay.textContent="Amount of replays: " + replayAmount;
}

function endGameEarly() {
  alert("You quit the quiz.");
  endGame();
}

function updateDisplay() {
    const minutes = Math.floor(time / 60);//seconds into full minutes
    const seconds = time % 60; //get remaining seconds
    timedisplay.textContent = `Time: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    scoredisplay.textContent = "Score: " + score;
}


function startTimer(){
    updateDisplay();
    timeInterval = setInterval(() => {
        time--;
        updateDisplay();

        if(time <= 0){
            alert("Time's up!");
            endGame();
        }
    }, 1000);
}


let currentQuestionIndex = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-btn");

const questions = [
  {
    question: "What is the name of the Colossal Titan's original identity?",
    correct: "Bertholdt Hoover",
    wrong: ["Reiner Braun", "Eren Yeager", "Zeke Yeager"]
  },
  {
    question: "What is L’s favorite food?",
    correct: "Sweets",
    wrong: ["Sushi", "Chips", "Apples"]
  },
  {
    question: "What triggers Rika's time loop in Higurashi?",
    correct: "Her death",
    wrong: ["Keiichi leaving", "The festival ending", "The curse"]
  },
  {
    question: "What is the main prize in MF Ghost races?",
    correct: "Prize money and car sponsorship",
    wrong: ["Marriage proposal", "Title of 'Ghost Master'", "Trophy from Ryosuke"]
  },
  {
    question: "Who is the main rival of Isagi in Blue Lock?",
    correct: "Rin Itoshi",
    wrong: ["Reo Mikage", "Bachira Meguru", "Barou Shoei"]
  },
  {
    question: "What is Bam's goal in Tower of God?",
    correct: "To find Rachel",
    wrong: ["To become king", "To escape the Tower", "To defeat Jahad"]
  },
  {
    question: "What is Kuroko's basketball playstyle?",
    correct: "Misdirection and passes",
    wrong: ["Dunks and power", "Shooting from distance", "Blocking shots"]
  },
  {
    question: "Who is the Servant of Kiritsugu Emiya in Fate/Zero?",
    correct: "Saber (Artoria)",
    wrong: ["Archer (Gilgamesh)", "Rider (Iskandar)", "Assassin (Hassan)"]
  }
];


function loadQuestions() {
    currentQuestionIndex = 0;
    questions.sort(() => 0.5 - Math.random());
    showQuestion();
}

function showQuestion() {
 
    questionsLeftDisplay.textContent = `Questions: ${currentQuestionIndex + 1}/${questions.length}`;

    const current = questions[currentQuestionIndex];
    questionText.textContent = current.question;

    const allOptions = [current.correct, ...current.wrong];
    const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());

    answerButtons.forEach((btn, index) => {
        btn.textContent = shuffledOptions[index];
        btn.onclick = () => {
            if (shuffledOptions[index] === current.correct) {
                score++;
            }
            updateDisplay();

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                alert("Quiz Complete!");
                endGame();
            }
        };
    });
}
