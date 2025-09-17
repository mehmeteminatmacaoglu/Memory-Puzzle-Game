let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

let timer = 0;
let timerInterval = null;
let gameStarted = false;

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").textContent = timer;
        }, 1000);
    }
}

function flipCard(cardElement) {
    startTimer();

    if (lockBoard || cardElement.classList.contains("open") || cardElement.classList.contains("matched")) {
        return;
    }

    cardElement.classList.add("open");

    if (!firstCard) {
        firstCard = cardElement;
    } else {
        secondCard = cardElement;
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    moves++;
    document.getElementById("moves").textContent = moves;

    if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        resetTurn();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".matched");

    if (allCards.length === matchedCards.length) {
        clearInterval(timerInterval);
        document.getElementById("final-moves").textContent = moves;
        document.getElementById("final-time").textContent = timer;
        document.getElementById("winModal").style.display = "block";
    }
}

window.onload = () => {
    timer = 0;
    moves = 0;
    document.getElementById("timer").textContent = 0;
    document.getElementById("moves").textContent = 0;
    gameStarted = false;
    if (timerInterval) clearInterval(timerInterval);
};