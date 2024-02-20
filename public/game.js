class Game {
  constructor() {
    this.board = undefined;
  }

  fetchBoard = async () => {
    const res = await fetch('/api/board');
    const data = await res.json();
    this.board = data[0].board;
    return data[0].board;
  };

  createCell = (element, row, col) => {
    const cell = document.createElement('td');
    cell.id = `${row}_${col}_cell`;

    if (this.board[row][col] === '.') {
      const cellInput = document.createElement('input');
      cellInput.type = 'text';
      cellInput.maxLength = 1;
      cellInput.id = `${row}_${col}_input`;
      cell.appendChild(cellInput);
    } else {
      cell.classList.add('filled-in-tile');
      const cellText = document.createElement('div');
      cellText.innerHTML = String(this.board[row][col]);
      cell.appendChild(cellText);
    }

    if (row === 2 || row === 5) {
      cell.classList.add('border-bottom');
    }

    if (col === 2 || col === 5) {
      cell.classList.add('border-right');
    }

    element.appendChild(cell);
  };

  displayBoard = async () => {
    await this.fetchBoard();

    const gameWrapper = document.getElementById('game-wrapper');

    const result = document.createElement('tbody');
    result.className = 'sudoku-board';

    gameWrapper.appendChild(result);

    for (let i = 0; i < 9; i += 1) {
      const row = document.createElement('tr');

      row.className = `${i}_row`;
      result.appendChild(row);

      for (let j = 0; j < 9; j += 1) {
        this.createCell(row, i, j);
      }
    }
  };
}

const game = new Game();

async function startGame() {
  await game.displayBoard();
}

document.addEventListener('DOMContentLoaded', startGame);
