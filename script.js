// Character Array
const characters = ['tanjiro', 'nezuko', 'zenitsu', 'inosuke', 'giyu', 'shinobu', 'kanao', 'rengoku'];

// DOM Elements
const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const gameOverModal = document.getElementById('gameOverModal');
const winnerModal = document.getElementById('winnerModal');
const closeGameOverModal = document.querySelector('#gameOverModal .close');
const closeWinnerModal = document.querySelector('#winnerModal .close');
const restartGameOverButton = document.getElementById('restartGameOver');
const restartWinnerButton = document.getElementById('restartWinner');
const closeGameOverButton = document.getElementById('closeGameOver');
const closeWinnerButton = document.getElementById('closeWinner');

// Game Variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeRemaining = 60;

// Function to Create the Game Board
function createBoard() {
    const cardPairs = [...characters, ...characters];
    const shuffledCards = cardPairs.sort(() => 0.5 - Math.random());

    shuffledCards.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.character = character;
        card.addEventListener('click', flipCard);

        const img = document.createElement('img');
        img.src = `images/${character}.jpg`;
        img.alt = character;

        card.appendChild(img);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

// Function to Start the Timer
function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Tiempo restante: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            showModal(gameOverModal);
        }
    }, 1000);
}

// Function to Flip a Card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

// Function to Check for a Match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.character === card2.dataset.character;

    if (isMatch) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === characters.length) {
            clearInterval(timer);
            setTimeout(() => showModal(winnerModal), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Function to Show the Modal
function showModal(modal) {
    modal.style.display = 'block';
}

// Event Listeners
closeGameOverModal.onclick = () => gameOverModal.style.display = 'none';
closeWinnerModal.onclick = () => winnerModal.style.display = 'none';
restartGameOverButton.onclick = restartWinnerButton.onclick = () => location.reload();
closeGameOverButton.onclick = closeWinnerButton.onclick = () => window.close();

window.onclick = (event) => {
    if (event.target === gameOverModal) {
        gameOverModal.style.display = 'none';
    }
    if (event.target === winnerModal) {
        winnerModal.style.display = 'none';
    }
};

// Initialize the Game
createBoard();