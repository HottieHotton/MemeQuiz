var frontPage = document.querySelector(".front-page");
var quizQuestions = document.querySelector(".quiz-questions");
var submitScore = document.querySelector(".quiz-end");
var start = document.querySelector("#start");
var countdown = document.querySelector("#timer-value");
var highScorebtn = document.querySelector("#submit");
var currentQuestionIndex = 0;
var timer = 60;

var questionArray = [
  {
      title: "What was introduced to Del Taco?",
      buttonOne: "1. Grilled Stuff Nacho",
      buttonTwo: "2. Fre shavaca do",
      buttonThree: "3. Beans",
      buttonFour: "4. Nestle Crunch",
      correct: "2. Fre shavaca do"
  },
  {
      title: "How old was Jared when he was asked to read number 23?",
      buttonOne: "1. 15",
      buttonTwo: "2. 9",
      buttonThree: "3. 19",
      buttonFour: "4. 22",
      correct: "3. 19"
  },
  {
      title: "You know what, I'm about to say it",
      buttonOne: "1. Numbers and Strings",
      buttonTwo: "2. I smell like beaf",
      buttonThree: "3. Hi, welcome to chilis",
      buttonFour: "4. I don't care that you broke your elbow",
      correct: "4. I don't care that you broke your elbow"
  },
  {
      title: "That's why I love....",
      buttonOne: "1. Crimus",
      buttonTwo: "2. Nestle Crunch",
      buttonThree: "3. Wednesday my dudes",
      buttonFour: "4. Chicken Strips",
      correct: "2. Nestle Crunch"
  },
  {
      title: "Two dudes, chilling in the hot tub. 5 feet apart because...",
      buttonOne: "1. they're not gay.",
      buttonTwo: "2. they like chickens",
      buttonThree: "3. guys are guys.",
      buttonFour: "4. Iridocyclitis",
      correct: "1. they're not gay."
  },
]

function startQuiz(timerId) {
  frontPage.style.display = "none"
  quizQuestions.style.display = "flex"
  submitScore.style.display = "none"
  
  clock();
  createQuestion();
};

function createQuestion() {
  const buttonOne = questionArray[currentQuestionIndex].buttonOne;
  const buttonTwo = questionArray[currentQuestionIndex].buttonTwo;
  const buttonThree = questionArray[currentQuestionIndex].buttonThree;
  const buttonFour = questionArray[currentQuestionIndex].buttonFour;
  const correct = questionArray[currentQuestionIndex].correct;

  var questionTextH1 = document.createElement("h1");
  questionTextH1.textContent = questionArray[currentQuestionIndex].title;

  var optionBtn1 = document.createElement("button");
  optionBtn1.textContent = buttonOne;
  optionBtn1.addEventListener("click", buttonOne === correct ? nextQuestion : wrongAnswer)

  var optionBtn2 = document.createElement("button");
  optionBtn2.textContent = buttonTwo;
  optionBtn2.addEventListener("click", buttonTwo === correct ? nextQuestion : wrongAnswer)

  var optionBtn3 = document.createElement("button");
  optionBtn3.textContent = buttonThree;
  optionBtn3.addEventListener("click", buttonThree === correct ? nextQuestion : wrongAnswer)

  var optionBtn4 = document.createElement("button");
  optionBtn4.textContent = buttonFour;
  optionBtn4.addEventListener("click", buttonFour === correct ? nextQuestion : wrongAnswer)

  quizQuestions.appendChild(questionTextH1)
  quizQuestions.appendChild(optionBtn1)
  quizQuestions.appendChild(optionBtn2)
  quizQuestions.appendChild(optionBtn3)
  quizQuestions.appendChild(optionBtn4)
}

function nextQuestion() {
  currentQuestionIndex++;
  var quizQuestionsDiv = document.querySelector(".quiz-questions");
  quizQuestionsDiv.innerHTML = "";

  if (currentQuestionIndex >= questionArray.length || timer <= 0) {
      window.alert("You are finished with the quiz! Let's see how you did.")

      quizQuestions.style.display = "none"
      submitScore.style.display = "flex"
      document.getElementById("final-score").textContent = ("Your Final Score is: " + timer);
  }
  else {
      createQuestion();
  }
}

function wrongAnswer(countdown) {
  console.log("Incorrect!")

  if (timer >= 10) {
      timer = timer - 10;
      nextQuestion();
  }
  else {
      timer = 0;
      countdown.textContent = ("Timer: " + timer);
  }
};

function clock() {
  var timerId = setInterval(function() {
    if (timer <= 0 || currentQuestionIndex >= questionArray.length) {
      clearInterval(timerId)
      
      quizQuestions.style.display = "none"
      submitScore.style.display = "flex"
    }
    else {
      timer--;
      console.log(timer);
      countdown.textContent = ("Timer: " + timer);
    }
  }, 1000);
}

var updateLocal = function() {

  // check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");
   if (highScore === null) {
      highScore = 0;
  }
    
  if (timer > highScore) {
      localStorage.setItem(document.getElementById('initials').value, JSON.stringify(timer));
    
  } else {
      localStorage.setItem(document.getElementById('initials').value, JSON.stringify(timer));
  }
  location.href="highscore.html"
}

function startUp() {
  frontPage.style.display = "flex"
  quizQuestions.style.display = "none"
  submitScore.style.display = "none"
};


start.addEventListener("click", startQuiz);
highScorebtn.addEventListener("click", updateLocal);
startUp();