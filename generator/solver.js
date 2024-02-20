const { copyBoard } = require('./utils');

function checkValidPuzzle(row, col, val, board) {
  const strVal = String(val);
  // Verify there are no duplicates in the row
  for (let c = 0; c < 9; c += 1) {
    if (board[row][c] === strVal) {
      return false;
    }
  }

  // Verify there are no duplicates in the column
  for (let r = 0; r < 9; r += 1) {
    if (board[r][col] === strVal) {
      return false;
    }
  }

  // Verify there are no duplicates in the square
  const startSquareRow = row - (row % 3);
  const startSquareCol = col - (col % 3);

  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i + startSquareRow][j + startSquareCol] === strVal) {
        return false;
      }
    }
  }
  return true;
}

// recursive function to find solutions to a puzzle
function findOne(idx, stopOnFirst, board, solutions) {
  const boardCopy = copyBoard(board);
  // puzzle has been filled. save as a solution
  if (idx === 81) {
    solutions.push(boardCopy);
    return true;
  }

  // get row and column from index
  const row = Math.floor(idx / 9);
  const col = idx % 9;

  // if the tile is filled in, skip
  if (board[row][col] !== '.') {
    return findOne(idx + 1, stopOnFirst, boardCopy, solutions);
  }

  // Try each number and backtrack on failures
  for (let i = 1; i < 10; i += 1) {
    if (checkValidPuzzle(row, col, i, boardCopy)) {
      boardCopy[row][col] = String(i);
      const found = findOne(idx + 1, stopOnFirst, boardCopy, solutions);

      if (found && stopOnFirst) {
        return true;
      }

      boardCopy[row][col] = '.';
    }
  }
  return false;
}

// Find solutions to a puzzle using recursive function findOne
function findSolutions(board) {
  const solutions = [];
  findOne(0, true, board, solutions);

  if (solutions.length < 1) {
    return [];
  }

  return solutions;
}

module.exports = { findSolutions, checkValidPuzzle };
