// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;



// variables to reference DOM elements
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var questionsEl = document.getElementById("questions");
var questionTitle = questionsEl.getElementsByTagName("h2");

var userInfoEl = document.getElementById("user-info");

//sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

//Function Definitions 
function startQuiz() {
    // hide start screen
    var startScreenEl = document.querySelector("#start-screen");
    startScreenEl.style.display = "none";
    // un-hide questions section
    questionsEl.classList.remove("hide");

    // start timer
    //setInterval to call clockTick every second
    timerId = setInterval(clockTick, 1000);

    getQuestion();
}

function getQuestion() {
    var questionsEl = document.getElementById("questions");
    var questionTitle = document.getElementById("question-title");

    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex]
    // update title with current question
    questionTitle.textContent = currentQuestion.title;
    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i]
        // create new button for each choice
        var choiceBtn = document.createElement("button");

        //add answer data attribute
        choiceBtn.dataset.answer = choice;
        //text
        choiceBtn.textContent = choice;
        // attach click event listener to each choice
        choiceBtn.addEventListener('click', questionClick)

        choicesEl.appendChild(choiceBtn);
    }

    //incriment question choice
    currentQuestionIndex++;
}
// display on the page

function questionClick() {
    var isCorrect = this.dataset.answer === questions[currentQuestionIndex].answer;
    if (!isCorrect) {

        //peanilize time
        time -= 10;
        //display new time on page

        //play wrong sound effect
        sfxWrong.play();

        userInfoEl.textContent = "Sorry, wrong answer!"

    }
    else {

        //play right sound effect
        sfxRight.play();
        userInfoEl.textContent = "Correct! Great Job!!"

    }
    //flash right/wrong feedback on page for half-second
    function hideUserInfo() {
        userInfoEl.classList.remove("show-info");
        userInfoEl.innerHTML = "";

    }


    //show
    userInfoEl.classList.remove("show-info")
    setTimeout(hideUserInfo, 500)



    //check if last question
    if (currentQuestionIndex < questions.length - 1) {
        //move to next question   
        getQuestion();
    }

    else { quizEnd() };


}


function quizEnd() {
console.log("quizEnd")


}


function clockTick() {
    //update time
    time--;

    //show starting time 
    //assign time var to time span textContent
    timerEl.textContent = time;

    //check if time elapsed
    if (time <= 0) {
        clearInterval(timerId);
        quizEnd();
    }
}

function saveHighscore() {
    // get value of input box

    // make sure value wasn't empty
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user

    // save to localstorage

    // redirect to next page
}

function checkForEnter(event) {
    //check if event key is enter
    // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;



