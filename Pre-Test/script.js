const boardSize = 9;
const initialPosition = Math.floor(boardSize / 2);
let robotPosition = { x:initialPosition , y: initialPosition };
let facingDirection = 'up'


function initializeBoard() {
    const board = document.getElementById('board');
    for (let i = 0; i < boardSize; i++) {
        const row = board.insertRow();
        for (let j = 0; j < boardSize; j++) {
            const cell = row.insertCell();
            cell.setAttribute('id', `cell-${i}-${j}`);
            cell.classList.add('path');
        }
    }
    updateRobotPosition();
}

function updateRobotPosition() {
    const cellId = `cell-${robotPosition.y}-${robotPosition.x}`;
    const currentCell = document.getElementById(cellId);
    currentCell.classList.add('robot');
    currentCell.classList.remove('path');
    document.getElementById('coordinates').innerText = `ตำแหน่งปัจจุบัน: (${robotPosition.y-4}, ${robotPosition.x-4})`;
}

document.getElementById('commandForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const commands = document.getElementById('command').value.toUpperCase();
    for (const command of commands) {
        processCommand(command);
    }
});


function processCommand(command) {
    switch (command) {
        case 'L':
        case 'l':
            turnLeft();
            break;
        case 'R':
        case 'r':
            turnRight();
            break;
        case 'W':
        case 'w':
            if (facingDirection === null) {
                facingDirection = 'up';
            }
            moveForward();
            break;
        default:
            console.log('Invalid command');
    }
}


function turnLeft() {
    console.log('Robot turns left');
    if (facingDirection === 'up') {
        facingDirection = 'left';
    } else if (facingDirection === 'left') {
        facingDirection = 'down';
    } else if (facingDirection === 'down') {
        facingDirection = 'right';
    } else if (facingDirection === 'right') {
        facingDirection = 'up';
    }
    updateRobotPosition();
}

function turnRight() {
    console.log('Robot turns right');
    if (facingDirection === 'up') {
        facingDirection = 'right';
    } else if (facingDirection === 'right') {
        facingDirection = 'down';
    } else if (facingDirection === 'down') {
        facingDirection = 'left';
    } else if (facingDirection === 'left') {
        facingDirection = 'up';
    }
    updateRobotPosition();
}

function moveForward() {
    console.log('Robot moves forward');
    if (facingDirection === 'up' && robotPosition.y > 0) {
        robotPosition.y--;
    } else if (facingDirection === 'right' && robotPosition.x < boardSize - 1) {
        robotPosition.x++;
    } else if (facingDirection === 'down' && robotPosition.y < boardSize - 1) {
        robotPosition.y++;
    } else if (facingDirection === 'left' && robotPosition.x > 0) {
        robotPosition.x--;
    }
    updateRobotPosition();
}

window.onload = function () {
    initializeBoard();
};