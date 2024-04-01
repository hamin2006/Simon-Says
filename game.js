gamePattern = [];
userClickedPattern = [];
const buttonColours = ["red","blue","green","yellow"];
var level = 0;
var randomNumber = -1;
var headerOne = document.getElementById("level-title");
var currButton;
var body = document.getElementsByTagName("body")[0];

document.addEventListener("keydown", function() {
    if (level === 0) {
        body.classList.remove("game-over");
        nextSequence();
    }
});

function nextSequence() {
    level++;
    randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    headerOne.innerHTML = "Level " + level;
    currButton = document.getElementById(randomChosenColour);
    animate(currButton);
}

function animate(b) {
    new Audio("./sounds/" + b.id +".mp3").play();
    b.style.opacity = 1;
    fadeOutAndfadeIn(b);
}

function fadeOutAndfadeIn(but){
	var opacity = 1;
	var timer = setInterval(function(){
		if(opacity < 0.1){
			clearInterval(timer);
			fadeIn(but);
		}
		but.style.opacity = opacity;
		opacity -=  0.1;
	}, 25);
}

function fadeIn(element) {
    var op = 0.1; 
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 25);
}

const buttons = document.getElementsByClassName("btn");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        var userChosenColour = this.id;
        new Audio("./sounds/"+userChosenColour+".mp3").play();
        userClickedPattern.push(userChosenColour);
        press(this);
        checkAnswer(userClickedPattern.length-1);
    });
}

function press(b) {
    b.classList.add("pressed");
    setTimeout(function() {
        b.classList.remove("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    if (userClickedPattern[currLevel] === gamePattern[currLevel]) {
        if (currLevel === (gamePattern.length - 1)) {
            userClickedPattern = [];
            setTimeout(nextSequence,1000);
        }
    } else {
        headerOne.innerHTML = "Game Over, Press Any Key to Restart";
        body.classList.add("game-over");
        new Audio("./sounds/wrong.mp3").play();
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
    
