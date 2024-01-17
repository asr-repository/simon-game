const buttonColors = ["red", "blue", "green", "yellow"];
let randomPattern = [];
let userClickedPattern = [];

let level = 0;
let allowClick = false;
let c = true;
let x = true;

// All Functions

function init() {
    randomPattern = [];
    // userClickedPattern = [];
    level = 0;
    c = false;
    x = false;
    setupNextPattern();
}

// 1. To create the Random Pattern Array by pushing the random color at the end.
function setupNextPattern() {
    allowClick = false;
    level++;
    $("#level-title").text(`Level ${level}`);
    userClickedPattern = [];
    var randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
    randomPattern.push(randomChosenColour);
    setTimeout(flashLastColorRandomPattern, 500);
    setTimeout(() => { allowClick = true }, 900);
}

// 2. To flash the newly added color in the Random Pattern Array:
function flashLastColorRandomPattern() {
    $(`#${randomPattern[randomPattern.length - 1]}`).fadeOut(200).fadeIn(200);
};

// 3. This function will 

function checkPattern() {
    if (userClickedPattern[userClickedPattern.length - 1] !== randomPattern[userClickedPattern.length - 1]) {
        return false;
    }
    return true;
}

function clickResponse(color) {

    // i) Pushes the pressed button's color into the User Clicked Pattern Array:
    userClickedPattern.push(color);

    // ii) Adds momentary class to the pressed button for 100 ms:
    $(`#${color}`).addClass('pressed');

    setTimeout(function () {
        $(`#${color}`).removeClass('pressed');
    }, 100);

    if (!checkPattern()) {
        var buzzer = new Audio('./sounds/wrong.mp3');
        buzzer.play();
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        allowClick = false;
        c = true;
        $("#start-btn").text("Restart!");
        // Show the start button
        if (window.innerWidth <= 728) {
            $("#start-btn").show();
            $("#level-title").text("Game Over, Press Restart!");
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }
    } else if (userClickedPattern.length === randomPattern.length) {
        setupNextPattern();
        // iii-A) Plays audio according to color:
        var audio = new Audio(`./sounds/${color}.mp3`);
        audio.play();
    } else {
        // iii-B) Plays audio according to color:
        var audio = new Audio(`./sounds/${color}.mp3`);
        audio.play();
    }
}

$(document).keydown(function () {
    if (c) {
        init();
    }
});

// Independent Event Listeners. (They must happen no matter what).

function checkWindowSize() {
    if (!checkPattern()) {
        if (window.innerWidth <= 728) {
            $("#level-title").text("Game Over, Press Restart!");
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }
    }
}
$(window).resize(checkWindowSize);

// 1. On first time page load

function checkWindowSizeInit() {
    if (x && window.innerWidth <= 728) {
        $("#level-title").text("Press the Start Button");
    } else if (x && window.innerWidth > 728) {
        $("#level-title").text("Press Any Key to Start");
    }
}

// Initial check on page load
checkWindowSizeInit();

// Add event listener for window resize
$(window).resize(checkWindowSizeInit);

// 2. On Clicking The Button Tile:

$(`.btn`).on("click", function () {
    let pressedButtonId = $(this).attr('id');
    if (allowClick) {
        clickResponse(pressedButtonId);
    }
});

// 3. Event listener for the start button
$("#start-btn").on("click", function () {
    if (c) {
        init();
        // Hide the start button to avoid multiple initiations
        $(this).hide();
    }
});