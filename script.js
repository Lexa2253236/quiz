let startWrapper = document.querySelector(".start-wrapper");
let quizWrapper = document.querySelector(".quiz-wrapper");
let startButton = document.querySelector(".start-button");

let quizHeading = document.querySelector(".question-heading");
let answersButtons = document.querySelectorAll(".answer-row>button");
let resultHeading = document.querySelector(".result-heading");

let signs = ["-", "+"];


rightCounter = 0;
wrongCounter = 0;
amountCounter = 0;


function startGame() {
    startWrapper.classList.add('hide');
    quizWrapper.classList.remove('hide');
    setTimeout(showResult, 10000);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateQuestion() {
    let num1 = getRandomInt(50);
    let num2 = getRandomInt(50);
    let sign = signs[getRandomInt(signs.length)];
    let result = 0;
    quizHeading.innerHTML = `${num1} ${sign} ${num2}`;

    buttonRightIndex = getRandomInt(answersButtons.length);    
        if (sign === "-"){
            result = num1 - num2;
        } else{
            result = num1 + num2;
        }
        for (let i = 0; i < answersButtons.length; i += 1){
            if (i === buttonRightIndex) {
                answersButtons[i].innerHTML = result;
                answersButtons[i].classList.add("right");
            } else {
              answersButtons[i].innerHTML = getRandomInt(50);
              answersButtons[i].classList.add("wrong");
            }
        }
    }

function removeClasses() {
    for (let i = 0; i < answersButtons.length; i += 1){
        if (answersButtons[i].classList.contains("right")){
           (answersButtons[i].classList.remove("right"));
        }
    
    if (answersButtons[i].classList.contains("wrong")) {
           (answersButtons[i].classList.remove("wrong"));
    }
  }
}

function checkAnswer(item) {
    return function() {
        if (answersButtons[item].classList.contains("right")) {
            rightCounter += 1
        } else {
            wrongCounter += 1
        }
        amountCounter += 1
    }
}

function endGame() {
    startWrapper.classList.remove('hide');
    quizWrapper.classList.add('hide');
    resultHeading.classList.remove("hide");
    resultHeading.innerHTML = `total: ${amountCounter}, right: ${rightCounter}, wrong: ${wrongCounter}`;
}

startButton.addEventListener('click', startGame);
generateQuestion();

for (let i = 0; i < answersButtons.length; i += 1) {
    answersButtons[i].addEventListener("click", generateQuestion);
    answersButtons[i].addEventListener("mouseup", removeClasses);
    answersButtons[i].addEventListener("click", checkAnswer(i));
}

function showResult() {
    resultHeading.innerHTML = `total: ${amountCounter}, right: ${rightCounter}, wrong: ${wrongCounter}`;
    resultHeading.classList.remove("hide");
    startWrapper.classList.remove("hide");
    quizWrapper.classList.add("hide");
}
