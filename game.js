const buttonColors = ["red", "blue", "green", "yellow"];
let randomPattern = [];
let userClickedPattern = [];

let level = 0;
let allowClick = false;
let c = true;

// All Functions

function init() {
    randomPattern = [];
    // userClickedPattern = [];
    level = 0;
    c = false;
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
    setTimeout(function () { allowClick = true }, 900);
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

    // i) Plays audio according to color:
    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();

    // ii) Pushes the pressed button's color into the User Clicked Pattern Array:
    userClickedPattern.push(color);

    // iii) Adds momentary class to the pressed button for 100 ms:
    $(`#${color}`).addClass('pressed');

    setTimeout(function () {
        $(`#${color}`).removeClass('pressed');
    }, 100);

    if (!checkPattern()) {
        var buzzer = new Audio('./sounds/wrong.mp3');
        buzzer.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        allowClick = false;
        c = true;
    } else if (userClickedPattern.length === randomPattern.length) {
        setupNextPattern();
    }
}

function changeWithWindowSize() {
    if (window.innerWidth <= 768) {
        // Your mobile-specific code here
        $("#level-title").text("Tap Anywhere to Start the Game");
        $(document).ontouchstart = function () {
            if (c) {
                init();
            }
        };
    } else {
        // Code for non-mobile devices
        $("#level-title").text("Press Any Key to Start")
        $(document).keydown(function () {
            if (c) {
                init();
            }
        });
    }
}

// Initial check on page load
changeWithWindowSize();

// Add event listener for window resize
window.addEventListener('resize', changeWithWindowSize);


// Independent Event Listeners. (They must happen no matter what).

// 1. On Clicking The Button Tile:

$(`.btn`).on("click", function () {
    let pressedButtonId = $(this).attr('id');
    if (allowClick) {
        clickResponse(pressedButtonId);
    }
});