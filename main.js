// Using capital letters as it common convention for const primitives as per the MDN
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
// Array storing all winning combinations as 0 indexed arrays
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Select all game tile cells
const cellElements = document.querySelectorAll('[data-cell]');
// Select board
const board = document.getElementById('board');
// Select the part of the html that displays end game screen
const winningMessageElement = document.getElementById('winningMessage');
// Restart button
const restartButton = document.getElementById('restartButton');
// Select the part of the html where we display winning text
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
// If circleTurn is true it is circles turn
let circleTurn;

// Call startGame function at beginning to actually start the game
startGame();

// Restart game when we click restart button
restartButton.addEventListener('click', startGame);

function startGame() {
    // If circleTurn = true then circle starts game. If circleTurn = false then x starts the game.
    circleTurn = false;
    // Loop through each cell with .forEach and add option { once: true } to run listener once only
    cellElements.forEach(cell => {
        // Remove classes and eventListener as we loop through the cells to reset game board, before adding eventListener again
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    })
    // Set board hover class to ensure first instance has a hover cursor
    setBoardHoverClass();
    // Remove show class to make end game screen disappear
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    // the target of what cell we click on
    const cell = e.target;
    // If its circles turn return CIRCLE_CLASS otherwise return X_CLASS
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Now we have the class we are going to place the mark by calling placeMark function
    placeMark(cell, currentClass);
    // Check for win. If there's a winner run the endGame function with (false) argument to display winner message
    if(checkWin(currentClass)) {
        endGame(false)
    }
    // If the game is a draw run the endGame function with (true) argument to display draw message
    else if(isDraw()) 
    {
        endGame(true)
    }
    // If there is no winner and game is not a draw then swap turns
    else 
    {
        swapTurns();
        setBoardHoverClass();
    }
}

// End game function
function endGame(draw) {
    // End game message for draw
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        // If it's circles turn O Wins! Else X Win's!
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    // Add the .show class to the end game screen so message appears
    winningMessageElement.classList.add('show');
}

// Check every cell to see whether it contains X_CLASS or CIRCLE_CLASS
function isDraw() {
    // Destructure [...cellElements] so it can run every() method 
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

// Place mark in the cell by adding the current class to the cells classList
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Take circleTurn and set it to opposite of circleTurn to swap turns everytime
function swapTurns() {
    circleTurn = !circleTurn;
}

// Determine which class we apply hover class to
function setBoardHoverClass() {
    // First remove both classes
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    // Then check which classes turn it is and add there class to the board.classList
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

// Check for win
function checkWin(currentClass) {
    // Check all winning combinations against all the current combinations
    // By using .some method we check if at least one combination is true
    return WINNING_COMBINATIONS.some(combination => {
        // For each combination we check if every cell has the same class
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}