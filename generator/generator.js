const { findSolutions } = require("./solver");
const { createEmptyBoard, createShuffledArray } = require("./utils");


function createRandomSquare() {
    row = createShuffledArray(1, 9)
    return row.map(item => String(item))
}

function removeOne(idx, board) {
    let row = Math.floor(idx / 9);
    let col = idx % 9;

    temp = board[row][col];
    board[row][col] = '.';

    solutions = findSolutions(board);
    if (solutions.length > 1) {
        board[row][col] = temp;
        return false;
    }
    return true;
}

function createRandomBoard() {

    board = createEmptyBoard()

    // randomly fill in diagonal squares (squares 1, 5, 9). This ensures no conflicts in row/column/square.
    for (let i = 0; i < 3; i++) {

        // get 9 random values to fill in the square with
        randomSquare = createRandomSquare();

        // fill in the square
        for (let j = 0; j < 9; j++) {
            let rowOffset = Math.floor(j / 3);
            let colOffset = j % 3;
            let offset = i * 3;
            let row = rowOffset + offset;
            let col = colOffset + offset;

            board[row][col] = randomSquare[j];
        }
    }

    return board
}


function generateOne() {
    board = createRandomBoard();

    var queue = createShuffledArray(0, 81);
    var toRemove = 50;

    while (queue.length > 0 && toRemove >= 0) {
        var next = queue.shift();
        var removed = removeOne(next, board);
        if (removed) {
            toRemove -= 1;
        }
    }
    return board;
}

module.exports = { generateOne }