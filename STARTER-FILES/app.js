startGame()
function startGame() {
    game()
}
function game() {
    const keysArr = document.querySelectorAll(".key"),
        greetWindow = document.querySelector(".start-game"),
        gameMenuWindow = document.querySelector(".game-menu"),
        startButtonDOM = document.querySelector(".key-start"),
        restartButtonDOM = document.querySelector(".key-restart"),
        currentScoreDOM = document.querySelector(".score-count"),
        recordScoreDOM = document.querySelector(".score-record"),
        livesCounterDOM = document.querySelector(".lives-counter"),
        gameOverScoreDOM = document.querySelector("#game-over-score");

    let guessKey,
        enteredKey,
        lives = 3,
        score = 0,
        recordScore = 0;
    
    currentScoreDOM.textContent = score;
    recordScoreDOM.textContent = recordScore;
    livesCounterDOM.textContent = lives;

    function genGuessKey() {
        guessKey = Math.floor(Math.random() * keysArr.length)
        jiggle(guessKey)
    }
    genGuessKey()

    function jiggle(keyNum) {
        keysArr[keyNum].classList.add("jiggle")
    }
    function stopJiggle(keyNum) {
        keysArr[keyNum].classList.remove("jiggle")
    }

    function looseLife() {
        keysArr[guessKey].classList.add("jiggle-wrong")
        setTimeout(() => keysArr[guessKey].classList.remove("jiggle-wrong"), 1000)
        score = 0;
        lives -= 1;
        recordScore = score > recordScore ? score : recordScore;
    }
    function gameover() {
        window.removeEventListener("keydown", keyPress)
        lives = 0;
        gameOverScoreDOM.textContent = `Your best score is ${recordScore}`
        gameMenuWindow.style.display = "flex";
    }
    function startTick(time = 1000) {
        setTimeout(looseLife, time)
    }

    function gameRules() {
        if (keysArr[guessKey].getAttribute("data-key") === enteredKey) {
            stopJiggle(guessKey)
            genGuessKey()
            score = score + 1;
            recordScore = score > recordScore ? score : recordScore;
        } else {
            if (lives > 1) {
                looseLife()
            } else {
                gameover()
            }
        }
    }

    function keyPress(event) {
        enteredKey = event.key.toUpperCase();
        gameRules()
        currentScoreDOM.textContent = score;
        recordScoreDOM.textContent = recordScore;
        livesCounterDOM.textContent = lives;
    }
    startButtonDOM.addEventListener("click", () => setTimeout(() => {
        greetWindow.style.display = "none";
        window.addEventListener("keydown", keyPress)
    }, 300))
    restartButtonDOM.addEventListener("click", () => setTimeout(() => {
        gameMenuWindow.style.display = "none";
        lives = 3;
        window.addEventListener("keydown", keyPress)
    }))
}