let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restart');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !checkGameActive()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        messageDisplay.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (isDraw()) {
        messageDisplay.textContent = 'Game is a draw!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function checkGameActive() {
    return !checkWin() && !isDraw();
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    messageDisplay.textContent = `Player ${currentPlayer}'s turn`;
}
