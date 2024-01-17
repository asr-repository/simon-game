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
    let randomChosenColour = buttonColors[Math.floor(Math.random() * 4)];
    randomPattern.push(randomChosenColour);
    setTimeout(flashLastColorRandomPattern, 1000);
    setTimeout(() => { allowClick = true }, 1400);
}

// 2. To flash the newly added color in the Random Pattern Array:
function flashLastColorRandomPattern() {
    $(`#${randomPattern[randomPattern.length - 1]}`).fadeOut(200).fadeIn(200);
};

// 3. This function will check if the user's pattern matches the random pattern.

function checkPattern() {
    if (userClickedPattern[userClickedPattern.length - 1] !== randomPattern[userClickedPattern.length - 1]) {
        return false;
    }
    return true;
}

// 4. This function will play audio.

function playSound(sound) {
    let audio = new Audio(`./sounds/${sound}.mp3`);
    audio.play();
}

// 5. This function is invoked after click event has occured and takes pressed button id (which is the color) as argument.

function clickResponse(color) {

    // i) Pushes the pressed button's color into the User Clicked Pattern Array:
    userClickedPattern.push(color);

    // ii) Adds momentary class to the pressed button for 100 ms:
    $(`#${color}`).addClass('pressed');

    setTimeout(function () {
        $(`#${color}`).removeClass('pressed');
    }, 100);

    if (!checkPattern()) {
        // Play Buzzer Sound
        playSound("wrong");

        // Flash Red Body Background
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        // Reset Switches
        allowClick = false;
        c = true;

        // Change Mobile Start Button Text to Restart
        $("#start-btn").text("Restart!");

        // Show Updated Start Button (Now Restart Button) and Change h1 Text as per Device
        if (window.innerWidth <= 728) {
            $("#start-btn").show();
            $("#level-title").text("Game Over, Press Restart!");
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }

    } else if (userClickedPattern.length === randomPattern.length) {
        setupNextPattern();
        // iii-A) Plays audio according to color:
        playSound(color);
    } else {
        // iii-B) Plays audio according to color:
        playSound(color);
    }
}


// Independent Event Listeners. (They must happen no matter what).


// 1. Set Event Listener for Keydown Event on Document and Click Event on Start Button if the Game has Started or Restarted (i.e. c = true)

$(document).keydown(function () {
    if (c) {
        init();
    }
});

$("#start-btn").on("click", function () {
    if (c) {
        init();
        // Hide the start button to avoid multiple initiations
        $(this).hide();
    }
});


// 2. Set Initial h1 Text and Set Event Listener to Change h1 Text Based on Device Window Size

function checkWindowSizeInit() {
    if (x && window.innerWidth <= 728) {
        $("#level-title").text("Press the Start Button");
    } else if (x && window.innerWidth > 728) {
        $("#level-title").text("Press Any Key to Start");
    }
}

// A) Set Initial h1 Text on Page Load
checkWindowSizeInit();

// B) Set Event Listener to Change h1 Text Based on Device Window Size
$(window).resize(checkWindowSizeInit);


// 3. Set Event Listener for Clicking The Button Tile:

$(`.btn`).on("click", function () {
    let pressedButtonId = $(this).attr('id');
    if (allowClick) {
        clickResponse(pressedButtonId);
    }
});


// 4. Set Event Listener to Change h1 After Game Over Based on Device Window Size

function checkWindowSize() {
    if (!checkPattern()) {
        if (window.innerWidth <= 728) {
            $("#start-btn").show();
            $("#level-title").text("Game Over, Press Restart!");
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
        }
    }
}
$(window).resize(checkWindowSize);