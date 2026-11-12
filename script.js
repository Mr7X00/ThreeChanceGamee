const guessInput = document.getElementById("guess");
const chancesDisplay = document.getElementById("chances");
const message = document.getElementById("message");
const checkBtn = document.getElementById("checkBtn");
const restartBtn = document.getElementById("restartBtn");

let randomNumber;
let chancesLeft;
let gameActive;

function startGame() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    chancesLeft = 3;
    gameActive = true;

    chancesDisplay.textContent = chancesLeft;
    message.textContent = "Start guessing!";
    message.className = "result mt-4 text-center text-primary";

    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;
}

function checkGuess() {
    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 10
    ) {
        message.textContent = "Enter a valid number between 1 and 10.";
        message.className = "result mt-4 text-center text-danger";
        return;
    }

    if (!gameActive) return;

    chancesLeft--;
    chancesDisplay.textContent = chancesLeft;

    if (guess === randomNumber) {
        message.textContent = "Congratulations! You Won!";
        message.className = "result mt-4 text-center text-success";
        endGame();
    } else if (chancesLeft === 0) {
        message.textContent = `Game Over! Correct number was ${randomNumber}.`;
        message.className = "result mt-4 text-center text-danger";
        endGame();
    } else if (guess < randomNumber) {
        message.textContent = "Your guess is too low. Try again.";
        message.className = "result mt-4 text-center text-warning";
    } else {
        message.textContent = "Your guess is too high. Try again.";
        message.className = "result mt-4 text-center text-warning";
    }

    guessInput.value = "";
}

function endGame() {
    gameActive = false;
    guessInput.disabled = true;
    checkBtn.disabled = true;
}

checkBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkGuess();
    }
});

restartBtn.addEventListener("click", startGame);

startGame();
