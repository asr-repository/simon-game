const colors = ["red", "blue", "green", "yellow"];
let pattern = [];
let playerPattern = [];
let level = 0;


// step#1. Until key is not pressed:

let started = false;
$(document).keydown(function () {
    if (!started) {
        started = true;
        $("h1").text("Level " + level);
        nextRound();
    }
});


// Step#2.On clicking(Player plays)

$(".btn").click(function () {
    if (started) {
        // i)Adding clickedColor into the playerPattern array
        let clickedColor = $(this).attr("id");
        playerPattern.push(clickedColor);


        // ii) Visuals & sound
        animation(clickedColor);
        playSound(clickedColor);


        // iii) Check whether we have clicked the right tile or not?
        checkAnswer(playerPattern.length - 1); //curr idx // no of presses - 1 (0-based idxing){definitely key is pressed atleast 1 time  }
    }
});






// Helper functions:

function animation(clickedColor) {
    $(`#${clickedColor}`).addClass('pressed');
    // wait for 0.1 second then turn off the applied css
    setTimeout(function () {
        $(`#${clickedColor}`).removeClass('pressed');
    }, 100);
}


function playSound(clickedColor) {
    var audio = new Audio(`./sounds/${clickedColor}.mp3`);
    audio.play();
}


function nextRound() {
    //erase the player pattern
    playerPattern = [];

    // increase and show the new level
    level++;
    $("h1").text("Level " + level);

    // add random color to our pattern
    var randomColor = colors[Math.floor(Math.random() * 4)];
    pattern.push(randomColor);

    // Visuals & audios
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    started = true;

}


function checkAnswer(idx) {
    if (pattern[idx] === playerPattern[idx]) {

        if (pattern.length === playerPattern.length) {
            //after 1 second start the next round
            started = false;
            setTimeout(function () {
                nextRound();
            }, 1000);
        }

    } else {

        //Visuals & Audios of Game over
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");

        $("body").addClass("game-over");      //after delay of 0.2seconds remove game-over css
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        restartGame();
    }
}


function restartGame() {
    pattern = [];
    level = 0;
    started = true;
}
