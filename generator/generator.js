const { findSolutions } = require('./solver');
const { createEmptyBoard, createShuffledArray } = require('./utils');

function createRandomSquare() {
  const row = createShuffledArray(1, 9);
  return row.map((item) => String(item));
}

function createRandomBoard() {
  const board = createEmptyBoard();

  // randomly fill in diagonal squares (squares 1, 5, 9)
  for (let i = 0; i < 3; i += 1) {
    // get 9 random values to fill in the square with
    const randomSquare = createRandomSquare();

    // fill in the square
    for (let j = 0; j < 9; j += 1) {
      const offset = i * 3;
      const row = Math.floor(j / 3) + offset;
      const col = (j % 3) + offset;

      const newValue = randomSquare[j];

      board[row][col] = newValue;
    }
  }

  const solvedBoard = findSolutions(board);
  return solvedBoard[0];
}

function generateOne() {
  const board = createRandomBoard();

  const queue = createShuffledArray(0, 80);
  let toRemove = 50;

  while (queue.length > 0 && toRemove >= 0) {
    const next = queue.shift();

    const row = Math.floor(next / 9);
    const col = next % 9;

    const temp = board[row][col];
    board[row][col] = '.';

    const solutions = findSolutions(board);
    const canBeRemoved = solutions.length === 1;
    if (canBeRemoved === false) {
      board[row][col] = temp;
    } else {
      toRemove -= 1;
    }
  }
  return board;
}

module.exports = { generateOne };
