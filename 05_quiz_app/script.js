// Simple quiz app
const questions = [
  {
    q: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: 3,
  },
  {
    q: "What does CSS stand for?",
    choices: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style System",
      "Colorful Style Syntax",
    ],
    answer: 1,
  },
  {
    q: "Which HTML tag is used for the largest heading?",
    choices: ["<h6>", "<h3>", "<h1>", "<head>"],
    answer: 2,
  },
  {
    q: "Which of these is a JavaScript framework?",
    choices: ["Laravel", "Django", "React", "Rails"],
    answer: 2,
  },
  {
    q: "What symbol is used for comments in JavaScript?",
    choices: ["//", "<!-- -->", "#", "/* */ (and //)"],
    answer: 3,
  },
];

// State
let current = 0;
let score = 0;
let answered = false;

// Elements
const qNum = document.getElementById("qNum");
const qTotal = document.getElementById("qTotal");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const results = document.getElementById("results");
const quiz = document.getElementById("quiz");
const scoreText = document.getElementById("scoreText");
const tryAgain = document.getElementById("tryAgain");

qTotal.textContent = questions.length;

function startQuiz() {
  current = 0;
  score = 0;
  answered = false;
  results.classList.add("hidden");
  quiz.classList.remove("hidden");
  restartBtn.hidden = true;
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  const item = questions[current];
  qNum.textContent = current + 1;
  questionEl.textContent = item.q;
  choicesEl.innerHTML = "";
  nextBtn.disabled = true;
  answered = false;

  item.choices.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.setAttribute("role", "listitem");
    btn.innerHTML = c;
    btn.dataset.index = idx;
    btn.addEventListener("click", onChoice);
    choicesEl.appendChild(btn);
  });
}

function onChoice(e) {
  if (answered) return; // prevent multiple
  answered = true;
  nextBtn.disabled = false;
  const picked = Number(e.currentTarget.dataset.index);
  const correct = questions[current].answer;

  // mark choices
  Array.from(choicesEl.children).forEach((el) => {
    const idx = Number(el.dataset.index);
    el.setAttribute("aria-pressed", "false");
    el.classList.remove("correct", "wrong");
    el.disabled = true;
    if (idx === picked) {
      if (picked === correct) {
        el.classList.add("correct");
        score++;
      } else {
        el.classList.add("wrong");
      }
    }
    if (idx === correct) {
      el.classList.add("correct");
    }
  });
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
});

function showResults() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;
  restartBtn.hidden = false;
}

restartBtn.addEventListener("click", startQuiz);
tryAgain.addEventListener("click", startQuiz);

// keyboard support for choices (Space/Enter)
choicesEl.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "Enter" || key === " ") {
    const active = document.activeElement;
    if (active && active.classList.contains("choice")) {
      active.click();
      e.preventDefault();
    }
  }
});

// Initialize
startQuiz();

/* main UI: progress, question area, choices, Next and Restart, results panel*/
