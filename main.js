// Using capital letters as it common convention for const primitives as per the MDN
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// Select all game tile cells
const cellElements = document.querySelectorAll('[data-cell]');
// Select board
const board = document.getElementById('board');
// If circleTurn is true it is circles turn
let circleTurn;

// Call startGame function at beginning to actually start the game
startGame();

function startGame() {
    // If circleTurn = true then circle starts game. If circleTurn = false then x starts the game.
    circleTurn = false;
    // Loop through each cell with .forEach and add option { once: true } to run listener once only
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    })
    // Set board hover class to ensure first instance has a hover cursor
    setBoardHoverClass();
}

function handleClick(e) {
    // the target of what cell we click on
    const cell = e.target;
    // If its circles turn return CIRCLE_CLASS otherwise return X_CLASS
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // Now we have the class we are going to place the mark by calling placeMark function
    placeMark(cell, currentClass);
    // Check for win
    // Check for draw
    // Switch Turns
    swapTurns();
    // Make sure that to set board hover class after we swap turns so we get the current player
    setBoardHoverClass();
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