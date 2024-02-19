// recursive function to find solutions to a puzzle
function findOne(idx, stopOnFirst, board, solutions) {
    // puzzle has been filled. save as a solution
    if (idx == 81) {
        solutions.push(board)
        return true
    }

    // get row and column from index
    const row = Math.floor(idx / 9)
    const col = idx % 9

    // if the tile is filled in, skip
    if (board[row][col] !== '.') {
        return findOne(idx + 1, stopOnFirst, board, solutions)
    }

    // Try each number and backtrack on failures
    for (let i = 1; i < 10; i++) {
        if (checkValidPuzzle(row, col, i, board)) {
            board[row][col] = String(i);
            found = findOne(idx + 1, stopOnFirst, board, solutions);

            if (found && stopOnFirst) {
                return true;
            }

            board[row][col] = '.';
        }
    }
    return false;
}

function checkValidPuzzle(row, col, val, board) {
    // Verify there are no duplicates in the row
    for (let c = 0; c < 9; c++) {
        if (board[row][c] == val) {
            return false;
        }
    }

    // Verify there are no duplicates in the column
    for (let r = 0; r < 9; r++) {
        if (board[r][col] == val) {
            return false;
        }
    }

    // Verify there are no duplicates in the square
    let startSquareRow = row - row % 3;
    let startSquareCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startSquareRow][j + startSquareCol] == val) {
                return false;
            }
        }
    }
    return true;
}


// Find solutions to a puzzle using recursive function findOne
function findSolutions(board) {
    solutions = []
    findOne(0, true, board, solutions);

    if (solutions.length < 1) {
        return [];
    }

    return solutions[0];
}

module.exports = { findSolutions, checkValidPuzzle }